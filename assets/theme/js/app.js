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

// Video Html Element
const video = document.querySelector('video')

// Audio Html Element
const audio = document.querySelector('audio')

/**
 * Media Stream Contraints
 */
Application.prototype.Contraints = {
    video: true,
    audio: true,
}

/**
 * Media Stream Set
 */
Application.prototype.setStream = function (source) {

    video.srcObject = source;
    audio.srcObject = source;
}

/**
 * An Error
 */
Application.prototype.Error = function (e) {
    console.log(e);
}

/**
 * App Preview
 */
Application.prototype.Preview = function () {

    // Start
    navigator
        .mediaDevices
        .getUserMedia(this.Contraints)
        .then(this.setStream)
        .catch(this.error);
}

/**
 * Application Start
 */
Application.prototype.Start = function () {

    this.Preview();
}

/**
 * Application
 */
var app = new Application();

// Start
app.Start();