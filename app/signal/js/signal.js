wss = location.origin;
/**
 * Web Signal
 * 
 */
Application.prototype.Signal = function () {
    var socket = io(wss);
    return socket;
}