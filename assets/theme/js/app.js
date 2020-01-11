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
function Application() { }

/**
 * Add Talk Message
 */
Application.prototype.AddMessage = function (name, message) {

    // Generate Mesage Html Element
    var html = "";
    html += "<div class='me my-3 p-3 bg-white rounded shadow-sm'>"
    html += "<div class='media'>"
    html += "<div class='media-body'>"
    html += "<h5 class='mt-0 mb-1 text-right'>@" + name + "</h5>"
    html += "<span>" + message + "</span>"
    html += "</div>"
    //html += "<img src='media/image/author2.jpg' height='50' class='ml-3 rounded-circle' alt='" + name + "'>"
    html += "</div>"
    html += "</div>"
    html += "<!-- / MESSAGE Me -->"
    html += "";

    // Add a new Message
    let div = document.createElement('div');
    div.innerHTML = html;

    // Main Apped
    main.append(div);
}

/**
 * Add Talk Message for ME
 */
Application.prototype.AddMeMessage = function (message) {

    // Generate Mesage Html Element
    var html = "";
    html += "<div class='me my-3 p-3 bg-white rounded shadow-sm'>"
    html += "<div class='media'>"
    html += "<div class='media-body'>"
    html += "<h5 class='mt-0 mb-1 text-right'>@Jessica</h5>"
    html += "<span>" + message + "</span>"
    html += "</div>"
    html += "<img src='media/image/author2.jpg' height='50' class='ml-3 rounded-circle' alt='Jessica'>"
    html += "</div>"
    html += "</div>"
    html += "<!-- / MESSAGE Me -->"
    html += "";

    // Add a new Message
    let div = document.createElement('div');
    div.innerHTML = html;

    // Main Apped
    main.append(div);
}

/**
 * Add Talk Message for ME
 */
Application.prototype.AddRemoteMessage = function (message) {

    // Generate Mesage Html Element
    var html = "";
    html += "<div class='remote my-3 p-3 bg-white rounded shadow-sm'>"
    html += "<div class='media'>"
    html += "<img src='media/image/author.jpg' height='50' class='align-self-start mr-3 rounded-circle' alt='Jack'>"
    html += "<div class='media-body'>"
    html += "<h5 class='mt-0 mb-1'>@Jack</h5>"
    html += "<span>" + message + "</span>"
    html += "</div>"
    html += "</div>"
    html += "</div>"
    html += "<!-- / MESSAGE Remote -->"
    html += "";

    // Add a new Message
    let div = document.createElement('div');
    div.innerHTML = html;

    // Main Apped
    main.append(div);
}

// Application
var app = new Application();

// Message Element
var input = "message"

// Focus
document.getElementById(input).focus();

// Form submit
$("form").submit(function (e) {

    e.preventDefault(); // prevents page reloading

    // Message.
    message = $("#" + input).val();

    // send to everyone.
    websocket.emit('message', message);

    // Set
    //app.AddMeMessage(message);

    // Clear Data
    $("#" + input).val('');

    return false;
});


// Socket Test
wss = location.origin;
//var websocket = io(wss, { path: "/" });
var websocket = io();

// Websocket Event
websocket.on('connection', client => {

    name = client.id
});

websocket.on('message', function (message) {

    // Set
    app.AddMessage(name, message);
    autoScrool();
});

// Auto Scrool
function autoScrool() {
    var objDiv = document.body;
    objDiv.scrollTop = objDiv.scrollHeight;
}