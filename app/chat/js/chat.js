/**
 * Web Chat
 * 
 */
Application.prototype.Chat = function (form, input) {
    $(function () {

        var websocket = io();

        $(form).submit(function (e) {
            e.preventDefault(); // prevents page reloading
            websocket.emit('message', $(input).val());
            $(input).val('');
            return false;
        });

        function addMessage(htmlContent) {
            $('#messages').append($('<li>').html(htmlContent));
        }

        // New Message Send
        websocket.on('message', function (message) {
            addMessage(websocket.id + " : " + "<b>" + message + "</b>");
        });
    });
}