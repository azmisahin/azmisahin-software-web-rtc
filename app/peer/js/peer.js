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

    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
    let rtcOfferOptions = {
        iceRestart: false,
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
        voiceActivityDetection: true
    };

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

            // Add to peer candidate.
            addToPeerCandidate(targetConnection, candidateInitDict)
        }
    }

    // Add to peer candidate.
    function addToPeerCandidate(peerConnection, iceCandidate) {

        // New RTC Ice Candidate
        const newIceCandidate = new RTCIceCandidate(iceCandidate);

        // Other Peer Info
        const otherPeer = peerConnection;

        // Call
        otherPeer.addIceCandidate(newIceCandidate)
            .then(() => {
                trace("Connection   :   " + "Success " + peerConnection);
            })
            .catch((error) => {
                trace("Error        :   " + "addToPeerCandidate " + error)
            })
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

    // Session
    localPeerConnection.createOffer(rtcOfferOptions)
        .then(rtcSessionDescriptionInit)
        .catch(rtcSessionDescriptionError);

    // Set Session Description
    function rtcSessionDescriptionInit(description) {
        trace("Session  :   " + description.type);
        //trace("SDP      :   " + description.sdp);
    }

    // Set Session Error
    function rtcSessionDescriptionError(error) {
        trace("Session  :   " + error);
    }
}