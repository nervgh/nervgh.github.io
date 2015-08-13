'use strict';


export default class Cell {
    /**
     * @param {Object} rgba
     * @param {Vector2} vector
     */
    constructor(rgba, vector) {
        this.rgba = rgba;
        this.vector = vector;
    }
}