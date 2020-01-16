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

// Initalize Talk UI
var talkUI = new TalkUI("form", "main", "message");

// Signaling Channel
const signaling = new SignalingChannel();

// Define Connection Property
const constraints = { audio: true, video: true };

// Gateway
const configuration = {
    iceServers: [
        { url: 'stun:stun.l.google.com:19302' }
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
        signaling.send({ desc: pc.localDescription });
    } catch (err) {
        console.error(err);
    }
};

pc.ontrack = event => {
    // once media for a remote track arrives, show it in the remote video element
    event.track.onunmute = () => {
        // don't set srcObject again if it is already set.
        if (remoteView.srcObject) return;
        remoteView.srcObject = event.streams[0];
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
        console.error(err);
    }
}
// Server On New Message
signaling.Socket.on("data-response", async function (data) {
    var desc = data.desc
    var candidate = data.candidate
    try {
        if (desc) {
            // if we get an offer, we need to reply with an answer
            if (desc.type == 'offer') {
                await pc.setRemoteDescription(desc);
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                stream.getTracks().forEach((track) => pc.addTrack(track, stream));
                await pc.setLocalDescription(await pc.createAnswer());
                signaling.send({ desc: pc.localDescription });
            } else if (desc.type == 'answer') {
                await pc.setRemoteDescription(desc);
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