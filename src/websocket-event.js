exports.init = function (websocket) {

    // Websocket Event
    websocket.on('connection', client => {

        client.broadcast.emit('connection', client);

        // Disconnect Event
        client.on('disconnect', () => {

            websocket.emit('disconnect', client);
        })

        // Data
        client.on('data', function (data) {

            // Except me(client). Send to everyone
            websocket.emit('data', data);
        })

        // Standart Message
        client.on('message', function (message) {

            // Send to everyone
            websocket.emit("message", message);
        });
    })

    return websocket
}