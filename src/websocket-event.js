exports.init = function (io) {

    // Trace
    function trace(data) {
        console.log(data);
    }

    var connectionCount = 0;
    var loginCount = 0;

    io.on('connection', function (socket) {

        // For each connected user.
        ++connectionCount

        // Only to the connected user.
        socket.emit("connection-response", connectionCount)

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {

            // For each connected user.
            --connectionCount

            // Me Except, all users.
            socket.broadcast.emit("disconnect-response", connectionCount)
        })

        var user;
        socket.on("login-request", function (data) {

            user = data
            var model = { user: user, count: connectionCount }

            trace("login-request:"); trace(model)

            // Only to the connected user.
            socket.emit("login-response", model)

            // Me Except, all users.
            socket.broadcast.emit("login-count-response", connectionCount)
        })

        socket.on("message", function (data) {
            var model = { user: user, content: data }
            socket.broadcast.emit("message-response", model)

            model.me = true;
            socket.emit("message-response", model)
            
        })
    })

    return io
}