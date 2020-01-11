// Define
var port = process.env.PORT || 3000

// Web Server
var server = require('./server').init()

// Web Socket
var websocket = require('./websocket').init(server)

// Web Socket Events
var websocketEvent = require('./websocket-event').init(websocket)

// Start Application
var start = function () {

    var message = "listening on *:" + port

    // Server Listener
    server.listen(port, () => {
        console.log(message)
    })

    return message
}

exports.start = start
exports.server = server
exports.websocket = websocket
exports.websocketEvent = websocketEvent