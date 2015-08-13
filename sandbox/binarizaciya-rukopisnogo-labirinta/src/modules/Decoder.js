'use strict';


import Reader from './Reader';
import Writer from './Writer';


export default class Decoder {
    /**
     *
     */
    constructor() {
        this.reader = new Reader();
        this.writer = new Writer();
        this.matrix = null;
        this.reader.onReadComplete = this.__onReadComplete.bind(this);
    }
    /**
     * @param {HTMLImageElement} image
     */
    decode(image) {
        this.reader.readAsMatrix(image);
    }
    /**
     * Callback
     */
    onDecodeComplete() {

    }
    /**
     * @param {HTMLImageElement} image
     * @param {Matrix} matrix
     * @private
     */
    __onReadComplete(image, matrix) {
        matrix.normalize();
        this.matrix = matrix;
        this.onDecodeComplete(matrix);
    }
}