/**
 * Web Chat
 * 
 */
Application.prototype.Chat = function (form, input) {
    $(function () {
        var socket = io();
        $(form).submit(function (e) {
            e.preventDefault(); // prevents page reloading
            socket.emit('message', $(input).val());
            $(input).val('');
            return false;
        });
    });
}