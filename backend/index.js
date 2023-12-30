var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', function (socket) {
    console.log('User connected');
    // Listen for incoming messages
    socket.on('message', function (message) {
        console.log('Message:', message);
        // Broadcast the message to all connected clients
        io.emit('message', message);
    });
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});
var PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
