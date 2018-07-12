const WebSocket = require('ws');
const express = require('express');
let app = express();

server = new WebSocket.Server({
    port: 12345,
});

function broadcast(data) {
    server.clients.forEach(ws => {
        ws.send(data);
    });
}

server.on('connection', ws => {
    ws.on('message', data => {
        broadcast(data);
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html', function(err) {
        if (err) {
            res.status(err.status).end();
        }
    });
});

app.listen(process.env.PORT || 7171, function () {
    console.log('APPServer Port: 7171');
    console.log('WSServer Port: 123456');
});