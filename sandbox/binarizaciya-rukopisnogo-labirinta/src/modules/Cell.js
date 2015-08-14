'use strict';


export default class Cell {
    /**
     * @param {Rgba} rgba
     * @param {Vector2} vector
     */
    constructor(rgba, vector) {
        this.rgba = rgba;
        this.vector = vector;
    }
    /**
     * @returns {Cell}
     */
    clone() {
        let {rgba, vector} = this;
        return new Cell(rgba.clone(), vector.clone());
    }
}