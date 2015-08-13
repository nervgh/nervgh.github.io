'use strict';


export default class Vector2 {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x = 0, y = 0) {
        this[0] = x;
        this[1] = y;
    }
    /**
     * @returns {Vector2}
     */
    clone() {
        return new Vector2(this[0], this[1]);
    }
}