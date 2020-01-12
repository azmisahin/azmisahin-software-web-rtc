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
function Talk() { }

/**
 * Talk Initalize
 * 
 * @param {string} form Html form element id
 * @param {string} container Html Talk Container id
 * @param {string} input Form input id
 */
Talk.prototype.Init = function (form, container, input, callback) {

    this.Form = form;
    this.Container = container;
    this.Input = input;
    this.User = $.cookie("user");

    // Disabled
    // $("#" + input).prop("readonly", true)

    // Form submit
    $(form).submit(function (e) {

        // prevents page reloading
        e.preventDefault();

        // Get message
        var message = $("#" + input).val();
        callback(message);

        // Clear
        $("#" + input).val('')

        return false;
    });
}

/**
 * Add a Screen talk message
 * 
 * @param {string} from User
 * @param {string} message Text Message
 */
Talk.prototype.AddScreenMessage = function (from, message, me) {

    var user = from;
    var message = message;
    var css = "bg-remote";
    if (me) {
        css = "bg-me"
    }

    // Generate Mesage Html Element
    var html = "";
    html += "<div class='" + css + " my-3 p-3 rounded shadow-sm'>"
    html += "<div class='media'>"
    html += "<div class='media-body'>"
    html += "<h6 class='mt-0 mb-1 text-right font-weight-lighter'>" + user + "</h6>"
    html += "<h4 class='font-italic'>" + message + "</h4>"
    html += "</div>"
    html += "<img src='/media/image/user/-1.jpg' height='50' class='ml-3 rounded-circle' alt='" + user + "'>"
    html += "</div>"
    html += "</div>"
    html += "<!-- / MESSAGE Me -->"
    html += "";

    // Add a new Message
    let div = document.createElement('div');
    div.innerHTML = html;

    // Main Apped
    var main = document.getElementById(this.Container);
    main.append(div);

    // Auto Scrool
    this.Scrool();
}

/**
 * Scrool
 */
Talk.prototype.Scrool = function () {
    var objDiv = document.body;
    objDiv.scrollTop = objDiv.scrollHeight;
}