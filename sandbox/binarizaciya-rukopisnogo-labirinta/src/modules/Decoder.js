'use strict';


import Reader from './Reader';
import Writer from './Writer';
//import {randomItems} from './utils';
//import Rectangle from './Rectangle';


export default class Decoder {
    /**
     *
     */
    constructor() {
        this.reader = new Reader();
        this.writer = new Writer();
        //this.__matrix = undefined;
        //this.__pointerSize = undefined;
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
        //this.__matrix = matrix;
        //this.__pointerSize = this.__getPointerSize(matrix);
        this.onDecodeComplete(matrix);
    }
    //__getPointerSize(matrix) {
    //    let blackCells = this.__getBlackCells(matrix);
    //    let randomCells = randomItems(blackCells, 10);
    //}
    ///**
    // * @param {Matrix} matrix
    // * @returns {Array<Cell>}
    // * @private
    // */
    //__getBlackCells(matrix) {
    //    let array = matrix.toArray();
    //    return array.filter(cell => cell.isBlack());
    //}
    //__expandCell(matrix, cell) {
    //    let {width, height} = matrix;
    //    let limit = Math.min(width, height) >> 4;
    //    let {vector} = cell;
    //    let rectangle = new Rectangle(vector.clone(), vector.clone(),
    //                                                vector.clone(), vector.clone());
    //    let pointer = cell;
    //    while(pointer.vector.y !== 0) {
    //
    //    }
    //}
}