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
 * P2P Signal
 */
function P2PSignal() {

    // Event Emiter
    var event = new EventEmitter();

}

/**
 * Send
 */
P2PSignal.prototype.Send = function (from, message) {

    var model = { user: from, content: message }
}