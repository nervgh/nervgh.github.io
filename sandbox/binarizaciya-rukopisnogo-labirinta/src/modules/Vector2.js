'use strict';


export default class Vector2 {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * @returns {Vector2}
     */
    clone() {
        let {x, y} = this;
        return new Vector2(x, y);
    }
}