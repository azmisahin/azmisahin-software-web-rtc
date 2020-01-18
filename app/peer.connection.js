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

    // Define Connection Property
    const constraints = {
        audio: true,
        video: true
    };

    // Gateway
    const configuration = {
        iceServers: [
            { url: 'stun:stun.l.google.com:19302' }
        ]
    };

    // Peer Connection with configuration
    const pc = new RTCPeerConnection(configuration);

    // send any ice candidates to the other peer
    pc.onicecandidate = ({ candidate }) => signaling.send({ candidate });

    // let the "negotiationneeded" event trigger offer generation
    pc.onnegotiationneeded = async () => {
        try {
            await pc.setLocalDescription();
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
    function start() {
        addCameraMic();
    }

    // add camera and microphone to connection
    async function addCameraMic() {
        try {
            // get a local stream, show it in a self-view and add it to be sent
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            for (const track of stream.getTracks()) {
                pc.addTrack(track, stream);
            }
            selfView.srcObject = stream;
        } catch (err) {
            console.error(err);
        }
    }

    signaling.Event.on("data-response", async ({ data: { description, candidate } }) => {
        try {
            if (description) {
                await pc.setRemoteDescription(description);
                // if we got an offer, we need to reply with an answer
                if (description.type == 'offer') {
                    if (!selfView.srcObject) {
                        // blocks negotiation on permission (not recommended in production code)
                        await addCameraMic();
                    }
                    await pc.setLocalDescription();
                    signaling.send({ description: pc.localDescription });
                }
            } else if (candidate) {
                await pc.addIceCandidate(candidate);
            }
        } catch (err) {
            console.error(err);
        }
    }
    );
}