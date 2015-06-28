

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
    /**
     * @see http://habrahabr.ru/post/101338/
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @returns {Number}
     */
    static distanceManhattan(v1, v2) {
        return Math.abs(v1[0] - v2[0]) + Math.abs(v1[1] - v2[1]);
    }
}