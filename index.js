'use strict'

var app = require('./app');

var port = 3900;

const server = app.listen(port, '192.168.0.7', () => {
    console.log('servidor corriendo localhost:'+port);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log(socket.id)

});

