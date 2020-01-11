exports.init = function (websocket) {

    // Websocket Event
    websocket.on('connection', client => {

        console.log("Connect        :   " + client.id)

        // Disconnect Event
        client.on('disconnect', () => {

            console.log("Disconnect :   " + client.id)
        })

        client.on('event', data => {

            // trace
            console.log("Event      :   " + data)

            // Send Everyone
            websocket.emit('event', data)
        })

        client.on('data', data => {

            // trace
            console.log("Data       :   " + data)

            // Except me(client). Send to everyone
            client.broadcast.emit('data', data);
        })

        client.on('message', function (message) {

            // trace
            console.log('Message    :   ' + client.id + " : " + message);

            // Send to everyone
            websocket.emit("message", message);
        });
    })

    return websocket
}