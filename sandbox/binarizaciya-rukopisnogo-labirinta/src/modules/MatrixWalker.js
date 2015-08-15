'use strict';


import Vector2 from './Vector2';
import {noOperation} from './utils';


export default class MatrixWalker {
    /**
     * @param {Matrix} matrix
     * @param {Vector2} [vector]
     */
    constructor(matrix, vector = new Vector2()) {
        this.__matrix = matrix;
        this.__vector = vector;
    }
    /**
     * @returns {Matrix}
     */
    get matrix() {
        return this.__matrix;
    }
    /**
     * @returns {Vector2}
     */
    get vector() {
        return this.__vector;
    }
    /**
     * @param {Function} [preventStep]
     */
    moveUp(preventStep = noOperation) {
        let {vector} = this;
        let {x, y} = vector;
        this.jumpTo(x, y - 1, preventStep);
    }
    /**
     * @param {Function} [preventStep]
     */
    moveRight(preventStep = noOperation) {
        let {vector} = this;
        let {x, y} = vector;
        this.jumpTo(x + 1, y, preventStep);
    }
    /**
     * @param {Function} [preventStep]
     */
    moveDown(preventStep = noOperation) {
        let {vector} = this;
        let {x, y} = vector;
        this.jumpTo(x, y + 1, preventStep);
    }
    /**
     * @param {Function} [preventStep]
     */
    moveLeft(preventStep = noOperation) {
        let {vector} = this;
        let {x, y} = vector;
        this.jumpTo(x - 1, y, preventStep);
    }
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Function} [preventStep]
     */
    jumpTo(x, y, preventStep = noOperation) {
        let {vector} = this;
        x = this.__fixX(x);
        y = this.__fixY(y);
        if (this.__testPrevent(x, y, preventStep)) return;
        vector.x = x;
        vector.y = y;
    }
    /**
     * @param {Number} x
     * @returns {Number}
     * @private
     */
    __fixX(x) {
        let {matrix} = this;
        let {width} = matrix;
        x = Math.min(x, width - 1);
        x = Math.max(x, 0);
        return x;
    }
    /**
     * @param {Number} y
     * @returns {Number}
     * @private
     */
    __fixY(y) {
        let {matrix} = this;
        let {height} = matrix;
        y = Math.min(y, height - 1);
        y = Math.max(y, 0);
        return y;
    }
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Function} preventFunction
     * @returns {*}
     * @private
     */
    __testPrevent(x, y, preventFunction) {
        let {matrix} = this;
        let cell = matrix.getCellByCoordinates(x, y);
        return preventFunction(cell);
    }
}

