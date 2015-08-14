'use strict';


export default class Rgba {
    /**
     * @param {Number} red
     * @param {Number} green
     * @param {Number} blue
     * @param {Number} alpha
     */
    constructor(red = 255, green = 255, blue = 255, alpha = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    /**
     * @returns {Boolean}
     */
    isBlack() {
        const color = 0;
        return this.is(color, color, color);
    }
    /**
     * @returns {Boolean}
     */
    isWhite() {
        const color = 255;
        return this.is(color, color, color);
    }
    /**
     * @param {Number} red
     * @param {Number} green
     * @param {Number} blue
     * @param {Number} alpha
     * @returns {Boolean}
     */
    is(red = 255, green = 255, blue = 255, alpha = 255) {
        return this.red === red &&
                    this.green === green &&
                    this.blue === blue &&
                    this.alpha === alpha;
    }
    /**
     * @returns {Rgba}
     */
    clone() {
        let {red, green, blue, alpha} = this;
        return new Rgba(red, green, blue, alpha);
    }
}