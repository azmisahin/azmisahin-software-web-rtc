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

    // Remote device candidate
    function iceCandidateEvent(event) {
        trace("iceCandidate             :   " + event);
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