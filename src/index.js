/**
 * Nodejs Static Server-Side Boot
 */
var static = require('node-static');

// Root
var file = new static.Server('./');

// Request Listener
function requestListener(request, response) {

    // Request Listener end
    request.addListener('end', function () {

        // Static File Serve
        file.serve(request, response);
    }).resume();
}

// Http Server
const server = require('http').createServer(requestListener);

// Websocket
const io = require('socket.io')(server);

// Socket Connection
io.on('connection', client => {

    // Data
    client.on('data', data => {
        //
        client.broadcast.emit('data', data)
    });
});

// Http Server Listener
server.listen(8080);