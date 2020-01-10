wss = location.origin;
/**
 * Web Signal
 * 
 */
Application.prototype.Signal = function () {
    var socket = io(wss, {path: "/"});
    return socket;
}