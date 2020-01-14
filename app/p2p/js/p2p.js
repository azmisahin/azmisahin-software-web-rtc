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

// Start handshake Signal Server
var p2pSignal = new P2PSignal();

var messageCount = 0;

// UI a message entered.
talkUI.Event.on("a-message-entered", function (message) {

    // Send a message to the signal server.
    p2pSignal.Send(talkUI.User, message);

    var me = true

    // Add screen message
    talkUI.AddScreenMessage(talkUI.User, message, me);

    // Set Connection count
    ++messageCount
    $("#connection").html(messageCount)
});