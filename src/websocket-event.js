exports.init = function (io) {

    // Trace
    function trace(data) {
        console.log(data);
    }
    
    var connectionCount = 0;
    var user;

    io.on('connection', function (socket) {
    
        // For each connected user.
        ++connectionCount

        // Only to the connected user.
        socket.emit("login-count-response", connectionCount)

        // Me Except, all users.
        socket.broadcast.emit("login-count-response", connectionCount)

        //Trace
        trace("connection start : " + socket.id + "[" + user +"]")

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {

            // For each connected user.
            --connectionCount

            // Only to the connected user.
            socket.emit("disconnect-login-response", connectionCount)

            // Me Except, all users.
            socket.broadcast.emit("disconnect-login-response", connectionCount)
        })

        socket.on("login-request", function (data) {

            user = data
            var model = { user: user, count: connectionCount }

            trace("login-request:"); trace(model)

            // Only to the connected user.
            socket.emit("login-response", model)

            // Me Except, all users.
            socket.broadcast.emit("login-count-response", connectionCount)
        })

        socket.on("message", function (model) {

            socket.broadcast.emit("message-response", model)

            model.me = true;

            socket.emit("message-response", model)

        })
    })

    return io
}