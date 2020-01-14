/**
 * Event Emitter
 */
class EventEmitter {

    /**
     * Event Emiter
     */
    constructor() {
        this.callbacks = {}
    }

    /**
     * Event
     * @param {event} event Event
     * @param {funtion} callback Callback Function 
     */
    on(event, callback) {
        if (!this.callbacks[event]) this.callbacks[event] = [];
        this.callbacks[event].push(callback)
    }

    /**
     * Emiter
     * @param {event} event Event
     * @param {json} data Json Data 
     */
    emit(event, data) {
        let _callbacks = this.callbacks[event]
        if (_callbacks) {
            _callbacks.forEach(callback => callback(data))
        }
    }
}