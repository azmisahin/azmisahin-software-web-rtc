'use strict';

// Static Files
var nodeStatic = require('node-static');

// Http Server
var http = require('http');

// Websocket
var socketIO = require('socket.io');

// File Server
var fileServer = new (nodeStatic.Server)();

// Server Listen
var app = http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(process.env.PORT || 3000);

// Websocket Initalize
var io = socketIO.listen(app);

// Socket Event
io.on('connection', client => {
  client.on('event', data => {

  });
  client.on('disconnect', () => {

  });
  client.on('data', data => {
    client.broadcast.emit('data', data);
  });
});