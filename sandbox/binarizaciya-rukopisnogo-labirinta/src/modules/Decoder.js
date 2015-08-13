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
        //this.__matrix = undefined;
        //this.reader.readAsMatrix(image);
    }
    decode() {

    }
    onDecodeComplete() {

    }
}