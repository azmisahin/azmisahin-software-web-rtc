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

var userFlag = "../../media/image/user/-1.jpg"
var userCityName = ""
var userLatitude = ""
var userLongitude = ""

// Initalize Talk UI
var talkUI = new TalkUI("form", "main", "message");

// Signaling Channel
const signaling = new SignalingChannel();

// UI a message entered.
talkUI.Event.on("a-message-entered", function (message) {

    // Send a message to the signal server.
    signaling.sendMessage(talkUI.User, message);
});

// Server On New Message
signaling.Event.on("new-message", function (data) {

    // Add screen message
    talkUI.AddScreenMessage(data.user, data.content, data.me);
});

// Server On New Connection Count
signaling.Event.on("new-connection-count", function (data) {

    // Set Connection count
    $("#connection").html(data)
});

// Login Request
signaling.Socket.emit("login-request", talkUI.User)