'use strict';


import Cell from './Cell';
import Rgba from './Rgba';
import Vector2 from './Vector2';
import MatrixWalker from './MatrixWalker';


export default class Matrix {
    /**
     * @param {*} any
     */
    constructor(any) {
        let {width, height, data} = Matrix.factory(any);
        this.width = width;
        this.height = height;
        this.data = data;
    }
    /**
     *
     */
    destroy() {
        let {data} = this;
        data.length = 0;
    }
    /**
     * @returns {Matrix}
     */
    clone() {
        return new Matrix(this);
    }
    /**
     * @param {Cell} [cell]
     * @returns {MatrixWalker}
     */
    createWalker(cell = this.data[0][0]) {
        let {vector} = cell;
        return new MatrixWalker(this, vector.clone());
    }
    /**
     * @param {Function} cb
     */
    forEach(cb) {
        let {width, height, data} = this;
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                let cell = data[i][j];
                cb(cell);
            }
        }
    }
    /**
     *
     */
    normalize() {
        const full = 255;
        const half = full / 2;
        let modify = (cell) => {
            let {rgba} = cell;
            let {red, green, blue} = rgba;
            red = red < half ? 0 : full;
            green = green < half ? 0 : full;
            blue = blue < half ? 0 : full;
            let color = (red + green + blue) < full ? 0 : full;
            rgba.red = rgba.green = rgba.blue = color;
        };
        this.forEach(modify);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#Grayscaling_and_inverting_colors
     */
    invert() {
        const MAX = 255;
        let modify = (cell) => {
            let {rgba} = cell;
            let {red, green, blue} = rgba;
            rgba.red = MAX - red;
            rgba.green = MAX - green;
            rgba.blue = MAX - blue;
        };
        this.forEach(modify);
    }
    /**
     * @see http://jscience.org/experimental/javadoc/org/jscience/computing/ai/vision/GreyscaleFilter.html
     * @see http://www.johndcook.com/blog/2009/08/24/algorithms-convert-color-grayscale/
     * @see http://www.had2know.com/technology/rgb-to-gray-scale-converter.html
     */
    greyscale() {
        const R = 0.299;
        const G = 0.587;
        const B = 0.114;
        let modify = (cell) => {
            let {rgba} = cell;
            let {red, green, blue} = rgba;
            let grey = Math.round(red * R + green * G + blue * B);
            rgba.red = rgba.green = rgba.blue = grey;
        };
        this.forEach(modify);
    }
    /**
     * @returns {ImageData}
     */
    toImageData() {
        const STEP = 4;
        let {width, height} = this;
        let array = new Uint8ClampedArray(width * height * STEP);
        let c0 = 0; // counter
        let c1 = 1; // counter
        let c2 = 2; // counter
        let c3 = 3; // counter
        let callback = (cell) => {
            let {rgba} = cell;
            let {red, green, blue, alpha} = rgba;
            array[c0] = red;
            array[c1] = green;
            array[c2] = blue;
            array[c3] = alpha;
            c0 += STEP;
            c1 += STEP;
            c2 += STEP;
            c3 += STEP;
        };
        this.forEach(callback);
        return new ImageData(array, width, height);
    }
    /**
     * @returns {Array}
     */
    toArray() {
        let {width, height} = this;
        let array = new Array(width * height);
        let counter = 0;
        let callback = (cell) => {
            array[counter] = cell;
            counter += 1;
        };
        this.forEach(callback);
        return array;
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
     * @param {ImageData} imageData
     * @returns {Object}
     */
    static fromImageData(imageData) {
        const STEP = 4;
        let {width, height, data} = imageData;
        let c0 = 0; // counter
        let c1 = 1; // counter
        let c2 = 2; // counter
        let c3 = 3; // counter
        let rows = new Array(height);
        for(let i = 0; i < height; i++) {
            let cells = new Array(width);
            for(let j = 0; j < width; j++) {
                let rgba = new Rgba(data[c0], data[c1], data[c2], data[c3]);
                let vector = new Vector2(i, j);
                cells[j] = new Cell(rgba, vector);
                c0 += STEP;
                c1 += STEP;
                c2 += STEP;
                c3 += STEP;
            }
            rows[i] = cells;
        }
        return {
            width,
            height,
            data: rows
        };
    }
    /**
     * @param {Matrix} matrix
     * @returns {Object}
     */
    static fromMatrix(matrix) {
        let {width, height, data} = matrix;
        let rows = new Array(height);
        for(let i = 0; i < height; i++) {
            let row = new Array(width);
            for(let j = 0; j < width; j++) {
                let cell = data[i][j];
                row[j] = cell.clone();
            }
            rows[i] = row;
        }
        return {
            width,
            height,
            data: rows
        };
    }
    /**
     * @param {*} data
     * @returns {*}
     */
    static factory(data) {
        if (data instanceof ImageData) {
            return Matrix.fromImageData(data);
        } else if (data instanceof Matrix) {
            return Matrix.fromMatrix(data);
        } else {
            throw new TypeError(`This type not supported.
            Matrix may be created only from {ImageData} or another {Matrix}.`);
        }
    }
}