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

// Initalize UI
const ui = new UI("form", "main", "message");

// UI Event Emiter
var uiEvent = ui.Event;

// Signaling Channel
const signaling = new SignalingChannel();

// Signaling Event
var signalingEvent = signaling.Event;

// UI a message entered.
uiEvent.on("a-message-entered", function (message) {

    // Send a message to the signal server.
    signaling.sendMessage(ui.User, message);;
});

// Server On New Message
signalingEvent.on("new-message", function (data) {

    var userCityName = ""
    var userLatitude = ""
    var userLongitude = ""
    var userFlag = "../../media/image/user/-1.jpg"

    // Start a call peer to peer media stream.        // Add screen message
    data.content == "start" ? peerConnection.start() : ui.addMessageScreen(data.user, data.content, data.me, userCityName, userLatitude, userLongitude, userFlag);
});

// Server On New Connection Count
signalingEvent.on("new-connection-count", function (data) {

    // Set Connection count
    $("#connection").html(data)
});

// Login Request
signaling.connect(ui.User);

// peerConnection
var peerConnection = new PeerConnection(signaling, function ({ stream: stream }) {
    var view = document.getElementById(stream.id);
    // don't set srcObject again if it is already set.
    if (view) return;

    // Add client
    ui.addMediaScreen({ id: stream.id });
    view = document.getElementById(stream.id);
    view.srcObject = stream;
});
