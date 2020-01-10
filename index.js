'use strict';

// Required
var express = require('express')
var http = require('http')
var socket = require('socket.io')

// Define
var port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var websocket = socket(server)

// Static File
app.use(express.static('./'))

// Websocket Event
websocket.on('connection', client => {

  console.log("User Connect : " + client.id)

  // Disconnect Event
  client.on('disconnect', () => {
    console.log("User Disconnect  : " + client.id)
  })

  client.on('event', data => {
    console.log("Event  : " + data)
    websocket.emit('event', data)
  })

  client.on('data', data => {
    console.log("Data : " + data)
    client.broadcast.emit('data', data);
  })

  client.on('message', function (msg) {
    console.log('Message  : ' + client.id + " : " + msg);
  });
})

// Server Listener
server.listen(port, () => {
  console.log("listening on *:" + port)
})