(function(window) {
    'use strict';

    // http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API

    var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition || null;

    /**
     * Creates instance of VoiceRecognition
     * @returns {VoiceRecognition}
     * @constructor
     */
    function VoiceRecognition() {
        var recognition = new SpeechRecognition();
        VoiceRecognition.assign(recognition, VoiceRecognition.prototype);
        VoiceRecognition.assign(recognition, {
            isProcessed: false,
            startTimeStamp: null,
            interimTranscript: '',
            finalTranscript: '',
            onerror: this._onError,
            onresult: this._onResult
        });
        return recognition;
    }

    /**********************
     * PUBLIC
     **********************/
    /**
     * Starts/stops speech recognition
     */
    VoiceRecognition.prototype.toggle = function() {
        if (!this.isProcessed) {
            this.startTimeStamp = Date.now();
            this.interimTranscript = '';
            this.finalTranscript = '';
            this.isProcessed = true;
            this.onStart();
            this.start();
        } else {
            this.startTimeStamp = null;
            this.isProcessed = false;
            this.onEnd();
            this.stop();
        }
    };
    /**
     * Callback
     */
    VoiceRecognition.prototype.onStart = function() {};
    /**
     * Callback
     * @param {Event} event
     * @param {String} errorMessage
     */
    VoiceRecognition.prototype.onError = function(event, errorMessage) {};
    /**
     * Callback
     * @param {Event} event
     */
    VoiceRecognition.prototype.onResult = function(event) {
        if (!event.results) this.toggle();
    };
    /**
     * Callback. Calls when recognition will be stopped
     */
    VoiceRecognition.prototype.onEnd = function() {};
    /**********************
     * PRIVATE
     **********************/
    /**
     * Inner callback
     * @param {Event} event
     */
    VoiceRecognition.prototype._onError = function(event) {
        switch(event.error) {
            case 'no-speech':
                this.onError(event, 'no-speech');
                break;
            case 'audio-capture':
                this.onError(event, 'no microphone');
                break;
            case 'not-allowed':
                if (event.timeStamp - this.startTimeStamp < 100) {
                    this.onError(event, 'info blocked');
                } else {
                    this.onError(event, 'info denied');
                }
                break;
        }
        this.onError(event, '');
    };
    /**
     * Inner callback
     * @param {Event} event
     */
    VoiceRecognition.prototype._onResult = function(event) {
        var results = event.results;
        this.interimTranscript = '';

        for (var i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                this.finalTranscript += results[i][0].transcript;
            } else {
                this.interimTranscript += results[i][0].transcript;
            }
        }

        this.onResult(event);
    };
    /**********************
     * STATIC
     **********************/
    /**
     * Returns "true" if browser supports {SpeechRecognition}
     * @returns {Boolean}
     */
    VoiceRecognition.isSupported = function() {
        return !!SpeechRecognition;
    };
    /**
     * Copy the values of all of the enumerable own properties from a source object to a target object
     * @param {Object} target
     * @param {Object} source
     * @return {Object}
     */
    VoiceRecognition.assign = function(target, source) {
        for(var key in source) {
            if (Object.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
        return source;
    };


    window.VoiceRecognition = VoiceRecognition;

}(window));