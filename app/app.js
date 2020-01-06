/*
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    * Application: Azmi ŞAHİN
    * https://azmisahin.com/
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Copyright azmisahin@outlook.com
    * Licence (https://azmisahin.gitlab.io/LICENSE)
    ████████████████████████████████████████████████████████████████████████████████████████████████████
*/

'use strict';

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
 * Media Stream Contraints
 */
Application.prototype.Contraints = {
    video: true,
    audio: true,
}