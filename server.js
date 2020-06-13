const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, showListen);


function showListen() {
	const port = server.address().port;
	console.log("je suis en train d'écouter le port" + port);
}

app.use(express.static('public'));

const io = require('socket.io')(server);
console.log(io);

io.sockets.on('connection',(socket) => {
	console.log("we have a new websocket connection " + socket.id);

	socket.on('trigger-click-cell', (data) => {
		console.log(data);

		io.sockets.emit('click-cell' , data);
	})

});
