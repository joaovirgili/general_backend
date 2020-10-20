var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (client) => {
	console.log(client.id + ' connected');

	client.on('send message', (msg) => {
		console.log(msg);
		// client.broadcast.emit('messages', client.id + ': ' + msg);
		io.emit('messages', `${client.id}: ${msg}`);
	});

	client.on('disconnect', () => {
		console.log(client.id + ' disconnected');
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
