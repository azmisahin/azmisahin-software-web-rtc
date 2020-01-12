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
Talk.prototype.Init = function (form, container, input) {

    this.Form = form;
    this.Container = container;
    this.Input = input;
    this.User = $.cookie("user");

    // Disabled
    $("#" + input).prop("readonly", true)

    // Form submit
    $(form).submit(function (e) {

        // prevents page reloading
        e.preventDefault();

        // Get message
        var message = $("#" + input).val();

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
Talk.prototype.AddScreenMessage = function (from, message) {

    var user = from;
    var message = message;

    // Generate Mesage Html Element
    var html = "";
    html += "<div class='me my-3 p-3 bg-white rounded shadow-sm'>"
    html += "<div class='media'>"
    html += "<div class='media-body'>"
    html += "<h5 class='mt-0 mb-1 text-right'>" + user + "</h5>"
    html += "<span>" + message + "</span>"
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