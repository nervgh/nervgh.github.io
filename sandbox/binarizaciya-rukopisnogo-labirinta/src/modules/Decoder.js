'use strict';


import Reader from './Reader';
import Writer from './Writer';
import {randomItems} from './utils';
import Rectangle from './Rectangle';


export default class Decoder {
    /**
     *
     */
    constructor() {
        this.reader = new Reader();
        this.writer = new Writer();
        this.reader.onReadComplete = this.__onReadComplete.bind(this);
        this.__matrix = undefined;
        this.__pointerSize = undefined;
    }
    /**
     * @returns {Number}
     */
    get pointerSize() {
        return this.__pointerSize;
    }
    /**
     * @param {HTMLImageElement} image
     */
    decode(image) {
        this.reader.readAsMatrix(image);
    }
    /**
     * Callback
     * @param {Matrix} matrix
     * @param {Number} pointerSize
     */
    onDecodeComplete(matrix, pointerSize) {
    }
    /**
     * @param {HTMLImageElement} image
     * @param {Matrix} matrix
     * @private
     */
    __onReadComplete(image, matrix) {
        matrix.normalize();
        let pointerSize = this.__getPointerSize(matrix);
        this.__matrix = matrix;
        this.__pointerSize = pointerSize;
        this.onDecodeComplete(matrix, pointerSize);
    }
    /**
     * @param {Matrix} matrix
     * @returns {Number}
     * @private
     */
    __getPointerSize(matrix) {
        let blackCells = matrix.toArray().filter(cell => cell.rgba.isBlack());
        let randomCells = randomItems(blackCells, Math.floor(blackCells.length * 0.01));
        let rectangles = randomCells.map(cell => this.__expandCell(matrix, cell));

        let sizes = [];

        rectangles.forEach(rectangle => {
            let {width, height} = rectangle;
            sizes.push(width, height);
        });

        sizes.sort((a, b) => a - b);
        sizes = sizes.filter(value => value > 0);

        let middle = Math.floor(sizes.length / 3);

        return sizes[middle];
    }
    /**
     * @param {Matrix} matrix
     * @param {Cell} cell
     * @returns {Rectangle}
     * @private
     */
    __expandCell(matrix, cell) {
        let {width, height} = matrix;
        let limit = Math.min(width, height) >> 4;

        let walker1 = matrix.createWalker(cell);
        let walker2 = matrix.createWalker(cell);
        let walker3 = matrix.createWalker(cell);
        let walker4 = matrix.createWalker(cell);

        let preventStep = cell => !cell.rgba.isBlack();

        for(let i = 0; i <= limit; i++) {
            walker1.moveUp(preventStep);
            walker2.moveRight(preventStep);
            walker3.moveDown(preventStep);
            walker4.moveLeft(preventStep);
        }

        let rectangle = new Rectangle(
            walker1.vector.clone(),
            walker2.vector.clone(),
            walker3.vector.clone(),
            walker4.vector.clone()
        );

        return rectangle;
    }
}