
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const cool = require('cool-ascii-faces');
const path = require('path');
const PORT = process.env.PORT || 5000;

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

app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));






// http.listen(3000, () => {
//     console.log('listening on *:3000');
// });