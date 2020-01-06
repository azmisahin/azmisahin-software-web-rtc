/**
 * RTC Peer Connection
 * 
 * @param {MediaStream} mediaStream Media Stream Object
 */
Application.prototype.PeerConnection = function (mediaStream) {

    // ICE
    var interactiveConnectivityEstablishment

    // SDP
    var sessionDescriptionProtocol

    // STUN ( Session Traversal Utilities for NAT ) ->  Server ( GET Client Ip Address )
    // TURN ( Traversal Using Relays aoound NAT )   ->  Server ( Tempory Client Server )
    let rtcConfiguration;

    // Video Conferance
    let localPeerConnection;

    // New Conferance
    localPeerConnection = new RTCPeerConnection(rtcConfiguration);

    // When a candidate message is received.
    function iceCandidateEvent(event) {
        
        // A candidate message Event. 
        trace("iceCandidate             :   " + event);

        const targetConnection = event.target;
        const candidateInitDict = event.candidate;

        if (candidateInitDict) {

            // interactive Connectivity Establishment
            trace("ice  :   " + candidateInitDict);

            // New RTC Ice Candidate
            const newIceCandidate = new RTCIceCandidate(candidateInitDict);

        }
    }

    // Interactive Connectivity Establishment Device Candidate
    localPeerConnection.addEventListener("icecandidate", iceCandidateEvent);

    // Remote device state change
    function iceConnectionStateChangeEvent(event) {
        trace("iceConnectionStateChange :   " + event);
    }

    // Remote device state change listener
    localPeerConnection.addEventListener("iceconnectionstatechange", iceConnectionStateChangeEvent)

    // Signal
    localPeerConnection.addStream(mediaStream);
    trace("Peer     :   " + mediaStream.id);

}