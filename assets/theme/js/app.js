/*
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    * Application: Azmi ŞAHİN
    * https://azmisahin.com/
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Copyright azmisahin@outlook.com
    * Licence (https://azmisahin.gitlab.io/LICENSE)
    ████████████████████████████████████████████████████████████████████████████████████████████████████
*/

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
 * App Preview
 */
Application.prototype.Preview = function (videoElement, audioElement) {

    // Request Video and Audio
    function requestVideoAndAudio() {
        navigator.getUserMedia({ video: true, audio: true },
            getUserMediaOkCallback, getUserMediaFailedCallback);
    }

    // Get User Media Failed Call Back
    function getUserMediaFailedCallback(error) {
        alert("User media request denied with error code " + error.code);
    }

    // Get User Media Ok Callback
    function getUserMediaOkCallback(stream) {
        document.getElementById(videoElement).srcObject = stream;
        document.getElementById(audioElement).srcObject = stream;
    }

    // Reuest Video And Audio Start
    requestVideoAndAudio();
}

/**
 * Application Start
 */
Application.prototype.Start = function () {

    this.Preview("video", "audio");
}

/**
 * Application
 */
var app = new Application();

// Start
app.Start();