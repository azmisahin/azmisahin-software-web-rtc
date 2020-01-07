/**
 * RTC Data Channel
 * 
 * @param {HTMLElement} me Element
 * @param {HTMLElement} remote Element
 */
Application.prototype.DataChannel = function (me, remote, callback) {

    var localConnection;
    var sendChannel
    var remoteConnection;

    // Connection Start
    function createConnection() {
        var servers = null;
        pcConstraint = null;
        dataConstraint = null;
        trace("Data Connection  :   ")

        localConnection = new RTCPeerConnection(servers, pcConstraint);
        sendChannel = localConnection.createDataChannel('sendDataChannel', dataConstraint);

        localConnection.onicecandidate = function (event) {
            if (event.candidate) {
                remoteConnection.addIceCandidate(
                    event.candidate
                ).then(function () { trace("on") });
            };
        }

        remoteConnection = new RTCPeerConnection(servers, pcConstraint);
        remoteConnection.ondatachannel = function (event) {
            receiveChannel = event.channel;
            receiveChannel.onmessage = function (e) {
                trace('Received     :   ' + e.data);
                callback("receive", e.data, e)
            };
        };

        localConnection.createOffer()
            .then(descriptionOne);

        function descriptionOne(description) {

            localConnection.setLocalDescription(description);
            remoteConnection.setRemoteDescription(description);
            remoteConnection.createAnswer().then(descriptionTwo);

            trace("One  :   ")
            trace(description)
        }

        function descriptionTwo(description) {
            remoteConnection.setLocalDescription(description);
            localConnection.setRemoteDescription(description);

            trace("Two  :   ")
            trace(description)
        }
    }

    // Send Data
    function sendPeer(who) {
        // Html Value
        var value = who.value;
        who.value = '';
        var jsonData = { from: who.id, message: value }

        // ref: https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/send
        // data send stringify
        var data = JSON.stringify(jsonData)

        // Send Chanel Data
        sendChannel.send(data);

        // Trace
        trace("Send Data    :   ");
        trace(data);
    }

    // Me Key Press
    me.onkeypress = keyPress;

    // Remote Key Press
    remote.onkeypress = keyPress;

    // Keypress and Send
    function keyPress() {
        var key = window.event.keyCode;
        // If the user has pressed enter
        if (key === 13) {
            sendPeer(this);
            return false;
        }
    }

    createConnection();
}