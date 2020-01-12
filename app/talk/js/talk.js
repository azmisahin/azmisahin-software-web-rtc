/**
 * Azmi ŞAHİN Web RTC
 *
 * Web Real-Time Communications.
 * 
 * https://github.com/azmisahin/azmisahin-software-web-rtc
 *
 * @author Azmi SAHIN
 * @since 2020
 * */
function TalkEvent() { }

// Trace
function trace(data) {
    console.log(data);
}

/**
 * Signal
 */
TalkEvent.prototype.Signal = function (callback) {

    // Signal Server
    var signal = {
        hostname: "https://azmisahin-software-web-rtc.azurewebsites.net:443",
        options: {
            path: "/socket.io",
        }
    };

    // Websocket
    //socket = io();
    socket = io(signal.hostname, signal.options);
    TalkEvent.prototype.Socket = socket

    socket.on('connection-response', function (data) {

        trace("connection-response:"); trace(data);
        $("#connection").html(data)
    });

    socket.on('disconnect-response', function (data) {

        trace("disconnect-response:"); trace(data);

        close();
    });

    socket.on('login-response', function (data) {

        trace("login-response:"); trace(data);

        open();

    });

    socket.on('login-count-response', function (data) {

        trace("login-count-response:"); trace(data);

    });

    socket.on('message-response', function (data) {

        trace("message-response:"); trace(data);
        callback(data)

    });

    // Open Message
    function open() { $("#" + "message").prop("readonly", false) }

    // Close Message
    function close() { $("#" + "message").prop("readonly", true) }

    // Login
    var user = $.cookie("user")
    socket.emit("login-request", user)

    return socket;
}

TalkEvent.prototype.Send = function (data) {
    this.Socket.emit("message", data);
}