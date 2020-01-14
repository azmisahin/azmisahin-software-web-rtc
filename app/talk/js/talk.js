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

// Initalize Talk UI
var talkUI = new TalkUI("form", "main", "message");

// Start handshake Signal Server
var talkSignal = new TalkSignal();

// UI a message entered.
talkUI.Event.on("a-message-entered", function (message) {

    // Send a message to the signal server.
    talkSignal.Send(talkUI.User, message);
});

// Server On New Message
talkSignal.Event.on("new-message", function (data) {

    // Add screen message
    talkUI.AddScreenMessage(data.user, data.content, data.me);
});

// Server On New Connection Count
talkSignal.Event.on("new-connection-count", function (data) {

    // Set Connection count
    $("#connection").html(data)
});

var userFlag = "../../media/image/user/-1.jpg"
var userCityName = ""
var userLatitude = ""
var userLongitude = ""

// Login Request
talkSignal.Socket.emit("login-request", talkUI.User)

