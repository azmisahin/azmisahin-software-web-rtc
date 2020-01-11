/**
 * Web Chat
 * 
 */
Application.prototype.Chat = function (form, input) {

    var websocket = io();

    // Focus
    document.getElementById(input).focus();

    // Form submit
    $(form).submit(function (e) {
        e.preventDefault(); // prevents page reloading

        // send to everyone.
        websocket.emit('message', $("#"+input).val());

        // Send to everyone.
        websocket.emit('data', e);

        // Clear Data
        $("#" + input).val('');
        return false;
    });

    // Add screen message
    function addScreenMessage(htmlContent) {
        $('#messages').append($('<li>').html(htmlContent));
    }

    // New Message Send
    websocket.on('message', function (message) {
        addScreenMessage(websocket.id + " : " + "<b>" + message + "</b>");
    });

    // New Data Send
    websocket.on('data', function (data) {
        console.log(data);
    });

    // Return Websocket
    return websocket;
}