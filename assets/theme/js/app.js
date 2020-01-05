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
const video = document.querySelector('#video-me')

// Audio Html Element
const audio = document.querySelector('#audio-me')

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
 * Add Remote Client Stream
 */
Application.prototype.Remote = function(id){
    var html = "";
    html += "<section class='remote'>";
    html +="<div class='col'>";
    html +="<video id='remote-"+ id +"' autoplay playsinline></video>";
    html +="<audio id='remote-"+ id +"'></audio>";
    html +="<header>";
    html +="<h3>"+ id +"</h3>";
    html +="</header>";
    html +="</div>";
    html +="</section>";
    html +="";

    // Add a new Client
    var main = document.querySelector('main');
    let div = document.createElement('div');
    div.innerHTML = html;
    main.append(div);
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