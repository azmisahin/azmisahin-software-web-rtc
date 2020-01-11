var socket = require('socket.io')

exports.init = function (server) {
    var websocket = socket(server)
    return websocket
}