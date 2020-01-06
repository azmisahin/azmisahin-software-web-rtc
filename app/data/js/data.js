/**
 * RTC Data Channel
 * 
 * @param {HTMLElement} me Element
 * @param {HTMLElement} remote Element
 */
Application.prototype.DataChannel = function (me, remote) {

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
            receiveChannel.onmessage = function (event) {
                trace('Received     :   ' + event.data);
                remote.value = event.data;
                me.value = '';
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
    function sendData() {
        var data = me.value;
        sendChannel.send(data);
        trace("Send Data    :   " + data);
    }

    // Me Key Press
    me.onkeypress = function () {
        var key = window.event.keyCode;

        // If the user has pressed enter
        if (key === 13) {

            sendData();
            return false;
        }

    }

    createConnection();
}