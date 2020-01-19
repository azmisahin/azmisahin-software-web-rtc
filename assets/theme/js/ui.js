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
function UI() { }

/**
 * UI User
 */
UI.prototype.User = $.cookie("user");

/**
* UI
* 
* @param {string} form Html form element id
* @param {string} container Html Talk Container id
* @param {string} input Form input id
*/
function UI(form, container, input) {

    // Event Emitter
    event = new EventEmitter();

    // Signal Starter
    function signal(type, data) {

        // Event Start
        event.emit(type, data);
    }

    // Form submit
    $(form).submit(function (e) {

        // prevents page reloading
        e.preventDefault();

        // Get message
        var message = $("#" + input).val();

        // new Signal
        signal("a-message-entered", message);

        // Clear
        $("#" + input).val('')

        return false;
    });

    UI.prototype.Event = event;
    UI.prototype.Container = container;
}

/**
 * Add Html
 * 
 * @param {string} id wrapper id
 * @param {element} div html element
 */
UI.prototype.addHtml = function (id, div, classes) {

    // Wrapper
    var wrapper = document.createElement('div');
    wrapper.className = classes
    wrapper.id = id;

    // Main Apped
    var main = document.getElementById(this.Container);
    var element = document.getElementById(wrapper.id);
    if (element) {
        element.append(div);
    } else {
        main.append(wrapper);
        var element = document.getElementById(wrapper.id);
        element.append(div);
    }
}

/**
 * Add a Screen message
 * 
 * @param {string} from User
 * @param {string} message Text Message
 * @param {bool} me Remote or Self
 * @param {string} cityName User City Name
 * @param {double} latitude Coordinat
 * @param {double} longitude Coordinat
 * @param {string} image Profile image
 */
UI.prototype.addMessageScreen = function (from, message, me, cityName, latitude, longitude, image) {

    var user = from;
    var message = message;
    var css = "bg-remote";
    if (me) {
        css = "bg-me"
    }

    // Generate Mesage Html Element
    var html = "";
    if (me) {
        html += "<div class='" + css + " text-right'>"
        html += "<div class='media'>"
        html += "<div class='media-body'>"
        html += "<h6 class='mt-0 mb-1  font-weight-lighter'>"
        html += "<div class='text-left'>" + cityName + latitude + ":" + longitude + "</div>"
        html += "<span>" + user + "</span>"
        html += "</h6>"
        html += "<h6 class='font-italic'>" + message + "</h6>"
        html += "</div>"
        html += "<img src='" + image + "' height='50' class='ml-3 rounded-circle' alt='" + user + "'>"
        html += "</div>"
        html += "</div>"
        html += "<!-- / MESSAGE Me -->"
        html += "";
    } else {
        html += "<div class='" + css + " text-left'>"
        html += "<div class='media'>"
        html += "<img src='" + image + "' height='50' class='ml-3 rounded-circle' alt='" + user + "'>"
        html += "<div class='media-body'>"
        html += "<h6 class='mt-0 mb-1  font-weight-lighter'>"
        html += "<div class='text-left'>" + cityName + latitude + ":" + longitude + "</div>"
        html += "<span>" + user + "</span>"
        html += "</h6>"
        html += "<h6 class='font-italic'>" + message + "</h6>"
        html += "</div>"
        html += "</div>"
        html += "</div>"
        html += "<!-- / MESSAGE Me -->"
        html += "";
    }

    // Add a new Message
    let div = document.createElement('div');
    div.className = "col-12 my-1 p-1 rounded shadow-sm"
    div.innerHTML = html;

    // Add html
    this.addHtml("talk", div, "row")

    // Auto Scrool
    this.Scrool();
}

/**
 * Scrool
 */
UI.prototype.Scrool = function () {
    window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Add Media Screen
 * 
 * @param {socket} client Client informtion
 */
UI.prototype.addMediaScreen = function (client) {

    // Generate Mesage Html Element
    var html = "";

    html += "<div class='card'>"
    html += "<div class='embed-responsive embed-responsive-1by1'>"
    html += "<video class='embed-responsive-item' id='" + client.id + "' playsinline autoplay muted controls></video>"
    html += "</div>"
    html += "</div>"

    // Add a Media Screen
    let div = document.createElement('div');
    div.className = "col-4"
    div.innerHTML = html;

    // Add html
    this.addHtml("media", div, "row horizontal-scrool")
}