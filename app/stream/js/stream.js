/**
 * Stream
 * 
 * @param {video} video Video Element
 * @param {audio} audio Audio Element 
 */
Application.prototype.Stream = function (video, audio) {

    // Media Ok
    function success(source) {
        video.srcObject = source;
        audio.srcObject = source;

        trace("Stream Start:" + source.id);
    }

    // Start
    navigator
        .mediaDevices
        .getUserMedia(this.Contraints)
        .then(success)
        .catch(this.Error);
}