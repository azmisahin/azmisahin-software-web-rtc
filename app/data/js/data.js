/**
 * RTC Data Channel
 * 
 * @param {HTMLElement} me Element
 * @param {HTMLElement} remote Element
 */
Application.prototype.DataChannel = function (me, remote, callback) {

    // Data Channel Remote RTC Connection
    var remotePeerConnection;

    // RTC Remote Data Channel
    var rtcRemoteDataChannel;

    // Connection Start
    function createConnection() {

        // New RTC Peer Connection
        localPeerConnection = new RTCPeerConnection(rtcConfiguration);

        // New Data Channel
        rtcDataChannel = localPeerConnection.createDataChannel('PeerToPeer', rtcDataChannelOptions);

        // Candidate Event
        localPeerConnection.onicecandidate = function (event) {
            if (event.candidate) {

                // Remote ICE
                remotePeerConnection.addIceCandidate(
                    event.candidate
                ).then(function () {
                    trace("on")
                });
            };
        }

        // New RTC Peer Connection with Remote
        remotePeerConnection = new RTCPeerConnection(rtcConfiguration);

        // Data Channel on Ready
        remotePeerConnection.ondatachannel = function (event) {

            // Channel Info
            rtcRemoteDataChannel = event.channel;

            // Channel On Message
            rtcRemoteDataChannel.onmessage = function (e) {
                trace('Received     :   ' + e.data);
                callback("receive", e.data, e)
            };
        };

        // Create a Offer / Order
        localPeerConnection
            .createOffer()
            .then(descriptionOne);


        // Offer Description
        function descriptionOne(description) {

            // Set local
            localPeerConnection.setLocalDescription(description);

            // Set Remote
            remotePeerConnection.setRemoteDescription(description);

            // Answer
            remotePeerConnection.createAnswer().then(descriptionTwo);

            // Log
            trace("One  :   ")
            trace(description)
        }

        // Offer Description
        function descriptionTwo(description) {

            // Set Remote
            remotePeerConnection.setLocalDescription(description);

            // Set Local
            localPeerConnection.setRemoteDescription(description);

            // Log
            trace("Two  :   ")
            trace(description)
        }
    }

    // Send Channel Data
    function sendChannel(who) {

        // Html Value
        var value = who.value;
        who.value = '';
        var jsonData = { from: who.id, message: value }

        // ref: https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/send
        // data send stringify
        var data = JSON.stringify(jsonData)

        // Send RTC Data Channel
        rtcDataChannel.send(data);

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
            sendChannel(this);
            return false;
        }
    }

    createConnection();
}