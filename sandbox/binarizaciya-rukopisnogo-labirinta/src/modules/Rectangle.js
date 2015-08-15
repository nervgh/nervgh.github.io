'use strict';


import Vector2 from './Vector2';


export default class Rectangle {
    /**
     * @param {Vector2} top
     * @param {Vector2} right
     * @param {Vector2} bottom
     * @param {Vector2} left
     */
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    /**
     * @returns {Number}
     */
    get width() {
        let {right, left} = this;
        return right.x - left.x;
    }
    /**
     * @returns {Number}
     */
    get height() {
        let {bottom, top} = this;
        return bottom.y - top.y;
    }
    /**
     * @returns {Rectangle}
     */
    clone() {
        let {top, right, bottom, left} = this;
        return new Rectangle(top.clone(), right.clone(), bottom.clone(), left.clone());
    }
}