'use strict';


import Cell from './Cell';
import Vector2 from './Vector2';


const __PRIVATE = '__';


export default class Matrix {
    /**
     * @param {*} data
     */
    constructor(data) {
        this[__PRIVATE] = Matrix.factory(data);
    }
    ///**
    // * @param {Number} rowIndex
    // * @param cellIndex
    // * @returns {*}
    // */
    //get(rowIndex, cellIndex) {
    //    let {width, height, data} = this[__PRIVATE];
    //    cellIndex = Math.min(cellIndex, width);
    //    cellIndex = Math.max(cellIndex, 0);
    //    rowIndex = Math.min(rowIndex, height);
    //    rowIndex = Math.max(rowIndex, 0);
    //    return data[rowIndex][cellIndex];
    //}
    ///**
    // * @returns {Number}
    // */
    //get width() {
    //    let {width} = this[__PRIVATE];
    //    return width;
    //}
    ///**
    // * @returns {Number}
    // */
    //get height() {
    //    let {height} = this[__PRIVATE];
    //    return height;
    //}
    /**
     * @param {Function} cb
     */
    forEach(cb) {
        let {width, height, data} = this[__PRIVATE];
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
            let [r, g, b] = rgba;
            r = r < half ? 0 : full;
            g = g < half ? 0 : full;
            b = b < half ? 0 : full;
            let color = (r + g + b) < full ? 0 : full;
            rgba[0] = rgba[1] = rgba[2] = color;
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
            let [r, g, b] = rgba;
            rgba[0] = MAX - r;
            rgba[1] = MAX - g;
            rgba[2] = MAX - b;
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
            let [r, g, b] = rgba;
            let grey = Math.round(r * R + g * G + b * B);
            rgba[0] = rgba[1] = rgba[2] = grey;
        };
        this.forEach(modify);
    }
    /**
     * @returns {ImageData}
     */
    toImageData() {
        const STEP = 4;
        let {width, height, data} = this[__PRIVATE];
        let array = new Uint8ClampedArray(width * height * STEP);
        let c0 = 0; // counter
        let c1 = 1; // counter
        let c2 = 2; // counter
        let c3 = 3; // counter
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                let cell = data[i][j];
                let {rgba} = cell;
                array[c0] = rgba[0];
                array[c1] = rgba[1];
                array[c2] = rgba[2];
                array[c3] = rgba[3];
                c0 += STEP;
                c1 += STEP;
                c2 += STEP;
                c3 += STEP;
            }
        }
        return new ImageData(array, width, height);
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
                let rgba = [data[c0], data[c1], data[c2], data[c3]];
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
     * @param {*} data
     * @returns {*}
     */
    static factory(data) {
        return Matrix.fromImageData(data);
    }
}