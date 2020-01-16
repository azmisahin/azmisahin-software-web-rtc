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

    // Control localhost
    var isLocalHost = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "");

    // Websocket
    var socket = isLocalHost == true ? io() : io(signal.hostname, signal.options);

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

    /**
     * Event Emiter
     */
    SignalingChannel.prototype.Event = event;

    /**
     * Socket Event
     */
    SignalingChannel.prototype.Socket = socket;
}

/**
 * Connect user
 * @param {string} user user string
 */
SignalingChannel.prototype.connect = function (user) {

    // Login request
    this.Socket.emit("login-request", user);
}

/**
 * Signaling Channel Send
 * @param {json} model Json Object model
 */
SignalingChannel.prototype.send = function (model) {
    this.Socket.emit('data', model)
}

/**
 * Signaling Channel Send Message
 * @param {string} from User
 * @param {string} message string message
 */
SignalingChannel.prototype.sendMessage = function (from, message) {

    var model = { user: from, content: message }

    this.Socket.emit("message", model);
}