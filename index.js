var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendfile('index.html')
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('User connected');
	socket.on('disconnect', function() {
		console.log('User disconnected');
	});	
	socket.on('message', function(data) {
		io.emit('chat message', data);
	});
});

http.listen(3000, function() {
	console.log('Express listening on 3000');
});
