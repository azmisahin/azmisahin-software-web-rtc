/**
 * Azmi ŞAHİN Web RTC
 *
 * Web Real-Time Communications.
 * 
 * https://github.com/azmisahin/azmisahin-software-web-rtc
 *
 * @author Azmi SAHIN
 * @since 2020
 * */

/**
 * Peer Connection
 * 
 * @param {SignalingChannel} signaling Signal Server
 * @param {HtmlElement} selfView Self Video
 * @param {HtmlElement} remoteView Remote Video
 */
function PeerConnection(signaling, selfView, remoteView) {

    // Media Streams Contraints
    const constraints = {
        audio: true,
        video: true
    };

    // Peer connection definitions.
    const configuration = {
        // Session Migration Helper for NAT
        // Interactive Connectivity Establishment
        iceServers: [
            {
                url: 'stun:stun.l.google.com:19302',
                url: 'stun:stun1.l.google.com:19302',
                url: 'stun:stun2.l.google.com:19302',
                url: 'stun:stun3.l.google.com:19302',
                url: 'stun:stun4.l.google.com:19302'
            }
        ]
    };

    // Peer to Peer Connection
    const pc = new RTCPeerConnection(configuration);

    // send any ice candidates to the other peer
    pc.onicecandidate = ({ candidate }) => signaling.send({ candidate });

    // let the "negotiationneeded" event trigger offer generation
    pc.onnegotiationneeded = async () => {
        try {
            await pc.setLocalDescription(await pc.createOffer());
            // send the offer to the other peer
            signaling.send({ description: pc.localDescription });
        } catch (err) {
            console.error(err);
        }
    };

    pc.ontrack = ({ track, streams }) => {
        // once media for a remote track arrives, show it in the remote video element
        track.onunmute = () => {
            // don't set srcObject again if it is already set.
            if (remoteView.srcObject) return;
            remoteView.srcObject = streams[0];
        };
    };

    // call start() to initiate
    async function start() {
        try {
            // get a local stream, show it in a self-view and add it to be sent
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            stream.getTracks().forEach((track) => pc.addTrack(track, stream));
            selfView.srcObject = stream;
        } catch (err) {
            console.log(err);
        }
    }

    // Server On New Message
    signaling.Socket.on("data-response", async ({ description, candidate }) => {
        try {
            if (description) {
                // if we get an offer, we need to reply with an answer
                if (description.type == 'offer') {
                    await pc.setRemoteDescription(description);
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
                    await pc.setLocalDescription(await pc.createAnswer());
                    signaling.send({ description: pc.localDescription });
                } else if (description.type == 'answer') {
                    await pc.setRemoteDescription(description);
                } else {
                    console.log('Unsupported SDP type. Your code may differ here.');
                }
            } else if (candidate) {
                await pc.addIceCandidate(candidate);
            }
        } catch (err) {
            console.log(err);
        }
    });

    return {
        // Start Peer to Peer Connection
        start: function () { start(); }
    }
}