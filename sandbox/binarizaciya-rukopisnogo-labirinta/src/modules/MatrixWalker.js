'use strict';


import Vector2 from './Vector2';


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
     *
     */
    moveUp() {
        let {vector} = this;
        let {y} = vector;
        vector.y = this.__fixY(y - 1);
    }
    /**
     *
     */
    moveRight() {
        let {vector} = this;
        let {x} = vector;
        vector.x = this.__fixX(x + 1);
    }
    /**
     *
     */
    moveDown() {
        let {vector} = this;
        let {y} = vector;
        vector.y = this.__fixY(y - 1);
    }
    /**
     *
     */
    moveLeft() {
        let {vector} = this;
        let {x} = vector;
        vector.x = this.__fixX(x - 1);
    }
    /**
     * @param {Number} x
     * @param {Number} y
     */
    jumpTo(x, y) {
        let {vector} = this;
        vector.x = this.__fixX(x);
        vector.y = this.__fixY(y);
    }
    /**
     * @param {Number} x
     * @returns {Number}
     * @private
     */
    __fixX(x) {
        let {matrix} = this;
        let {width} = matrix;
        x = Math.min(x, width);
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
        y = Math.min(y, height);
        y = Math.max(y, 0);
        return y;
    }
}

