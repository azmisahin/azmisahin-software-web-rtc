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
function trace(text) {
    if (text[text.length - 1] === '\n') {
        text = text.substring(0, text.length - 1);
    }
    if (window.performance) {
        var now = (window.performance.now() / 1000).toFixed(3);
        console.log(now + ': ' + text);
    } else {
        console.log(text);
    }
}

/**
 * Signal
 */
TalkEvent.prototype.Signal = function () {

    var state;
    var data;

    // Signal Server
    var signal = {
        hostname: "https://azmisahin-software-web-rtc.azurewebsites.net:443",
        options: {
            path: "/socket.io",
        }
    };

    // Websocket
    var websocket = io(signal.hostname, signal.options);

    // Websocket Connection
    websocket.on('connection', client => {
        console.log("connec")
        state = "connection"
        data = client
        trace(state);trace(data)

        $("#" + "message").prop("readonly", false)
    });

    // Websocket Disconnect Event
    websocket.on('disconnect', client => {
        state = "disconnect"
        data = client
        trace(state);trace(data)

        $("#" + "message").prop("readonly", true)
    });

    // Websocket message Event
    websocket.on('message', message => {
        state = "message"
        data = message
        trace(state);trace(data)
    });

    // Websocket data Event
    websocket.on('data', data => {
        state = "data"
        data = data
        trace(state);trace(data)
    });
    
    return websocket;
}