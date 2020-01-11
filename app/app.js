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

'use strict';


// ICE
var interactiveConnectivityEstablishment

// SDP
var sessionDescriptionProtocol

// STUN ( Session Traversal Utilities for NAT ) ->  Server ( GET Client Ip Address )
// TURN ( Traversal Using Relays aoound NAT )   ->  Server ( Tempory Client Server )
var rtcConfiguration;

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
var rtcOfferOptions = {
    iceRestart: false,
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
    voiceActivityDetection: true
};

// RTC Data Channel
var rtcDataChannel;

// Data Channel
var rtcDataChannelOptions = null;

// RTC Peer Connection
var localPeerConnection;

/**
 * Azmi ŞAHİN Web Application
 *
 * Website html User Interface.
 * 
 * https://gitlab.com/azmisahin/azmisahin.gitlab.io
 *
 * @author Azmi SAHIN
 * @since 2019
 * */
function Application() { }

/**
 * 
 * @param {string} text Text or Variable
 */
function trace(text) {
    const now = (window.performance.now() / 1000).toFixed(3);
    console.log(now, text);
}

/**
 * An Error
 */
Application.prototype.Error = function (e) {

    trace("Error    :   " + e);
    trace(e.stack);
}

/**
 * Add Remote Client Stream Screen
 */
Application.prototype.addStreamScreen = function (id) {

    // Generate Stream Screen Html Element
    var html = "";
    html += "<section class='screen'>";
    html += "<div class='col'>";
    html += "<video id='video-" + id + "' autoplay playsinline></video>";
    html += "<audio id='audio-" + id + "'></audio>";
    html += "<header>";
    html += "<h3>" + id + "</h3>";
    html += "</header>";
    html += "</div>";
    html += "</section>";
    html += "";

    // Add a new Client
    var main = document.querySelector('main');
    let div = document.createElement('div');
    div.innerHTML = html;
    main.append(div);

    trace("Stream Screen   :   " + id);
}

/**
 * Add Remote Client Data Screen
 */
Application.prototype.addDataScreen = function (id) {

    // Generate Stream Screen Html Element
    var html = "";
    html += "<section class='screen'>";
    html += "<div class='col'>";
    html += "<textarea id='data-" + id + "' placeholder='Enter some text and press ENTER' rows='5' cols='50' ></textarea>";
    html += "<header>";
    html += "<h3>" + id + "</h3>";
    html += "</header>";
    html += "</div>";
    html += "</section>";
    html += "";

    // Add a new Client
    var main = document.querySelector('main');
    let div = document.createElement('div');
    div.innerHTML = html;
    main.append(div);

    trace("Data Screen   :   " + id);
}

/**
 * Add Talk Screen
 */
Application.prototype.addTalkScreen = function (id) {

    // Generate Stream Screen Html Element
    var html = "";
    html += "<section class='screen' id='" + id + "'>";
    html += "<div class='col'>";
    html += "<header>";
    html += "<h3>Talk</h3>";
    html += "</header>";
    html += "</section>";
    html += "";

    // Add a new Client
    var main = document.querySelector('main');
    let div = document.createElement('div');
    div.innerHTML = html;
    main.append(div);

    talkScreen = document.querySelector('#' + id);

    trace("Talk Screen   :   " + id);
}

var talkScreen;

/**
 * Add Talk Message
 */
Application.prototype.addTalkMessage = function (type, message) {

    // Generate Mesage Html Element
    var html = "";
    html += "<div class='row'>";
    html += "<div class='message'>";
    html += "<span class='talk " + type + "'>" + message + "</span>";
    html += "</div>";
    html += "</div>";
    html += "";

    // Add a new Message
    let div = document.createElement('div');
    div.innerHTML = html;
    talkScreen.append(div);
    trace("Talk Message :   " + type + " : " + message);
}

/**
 * Media Stream Contraints
 */
Application.prototype.Contraints = {
    video: true,
    audio: true,
}