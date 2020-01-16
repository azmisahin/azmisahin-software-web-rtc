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

/**
 * Signaling Channel
 */
function SignalingChannel() {

    // Signal Server
    var signal = {
        hostname: "https://azmisahin-software-web-rtc.azurewebsites.net:443",
        options: {
            // transports: ['websocket', 'polling'],
            forceNew: false,
            path: "/socket.io",
        }
    };

    // Event Emiter
    var event = new EventEmitter();

    // Websocket
    var socket = io(signal.hostname, signal.options);

    socket.on('connection-response', function (data) {

        // Server On New Count
        event.emit("new-connection-count", data.count);

    });

    socket.on('disconnect-login-response', function (data) {

        // Server On New Count
        event.emit("new-connection-count", data);
    });

    socket.on('login-response', function (data) {

        // Server On New Count
        event.emit("new-connection-count", data.count);

    });

    // Signal Server Response Count
    socket.on('login-count-response', function (data) {

        // Server On New Count
        event.emit("new-connection-count", data);

    });

    // Signal Server Response Message
    socket.on('message-response', function (data) {

        // Server On New Message
        event.emit("new-message", data);

    });

    SignalingChannel.prototype.Event = event;
    SignalingChannel.prototype.Socket = socket;
}

/**
 * Signaling Channel Send
 */
SignalingChannel.prototype.send = function (model) {
    this.Socket.emit('data', model)
}

/**
 * Signaling Channel Send Message
 */
SignalingChannel.prototype.sendMessage = function (from, message) {

    var model = { user: from, content: message }

    this.Socket.emit("message", model);
}