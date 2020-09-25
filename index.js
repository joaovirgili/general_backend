
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (client) => {
    console.log(client.id + ' connected');

    client.on('chat message', (msg) => {
        console.log(msg);
        io.emit('messages', client.id + ": " + msg);
    });

    client.on('disconnect', () => {
        console.log(client.id + ' disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});