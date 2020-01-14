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

var userFlag = ""
var userCityName = ""
var userLocation = ""
geoip2.city(function (location) {

    countryIsoCode = location.country.iso_code
    userCityName = location.city.names.en;
    userLocation = location.location;
    userFlag = "https://www.countryflags.io/" + countryIsoCode + "/shiny/64.png";

}, function (error) { });

// Login Request
talkSignal.Socket.emit("login-request", talkUI.User)

