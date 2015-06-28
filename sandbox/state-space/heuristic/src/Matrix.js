

import Vector2 from './Vector2';


const __PRIVATE = '__private';


export default class Matrix {
    /**
     * @param {Array.<Array>} matrix
     */
    constructor(matrix = [[]]) {
        this[__PRIVATE] = matrix;
    }
    /**
     * @returns {Object}
     */
    getSizes() {
        var matrix = this[__PRIVATE];
        return {
            height: matrix.length,
            width: matrix[0].length
        };
    }
    /**
     * @param {Function} callback
     */
    forEachCell(callback) {
        var matrix = this[__PRIVATE];
        var {width, height} = this.getSizes();
        for(var i = 0; i < height; i++) {
            for(var j = 0; j < width; j++) {
                var cell = matrix[i][j];
                var vector = new Vector2(j, i);
                callback(cell, vector);
            }
        }
    }
    /**
     * @param {Function} isTargetCell
     * @returns {Vector2}
     * @private
     */
    findCellVector(isTargetCell) {
        var matrix = this[__PRIVATE];
        var {width, height} = this.getSizes();
        var vector = new Vector2();
        for(var i = 0; i < height; i++) {
            for(var j = 0; j < width; j++) {
                var cell = matrix[i][j];
                if (isTargetCell(cell)) {
                    vector[0] = j;
                    vector[1] = i;
                    return vector;
                }
            }
        }
        return vector;
    }
    /**
     * @param {Vector2} vector1
     * @param {Vector2} vector2
     */
    swapCells(vector1, vector2) {
        var matrix = this[__PRIVATE];
        var cell1 = matrix[vector1[1]][vector1[0]];
        var cell2 = matrix[vector2[1]][vector2[0]];
        matrix[vector1[1]][vector1[0]] = cell2;
        matrix[vector2[1]][vector2[0]] = cell1;
    }
    /**
     * @returns {Matrix}
     */
    clone() {
        var matrix = this[__PRIVATE];
        var {height} = this.getSizes();
        var newMatrix = new Array(height);
        for(var i = 0; i < height; i++) {
            newMatrix[i] = matrix[i].slice();
        }
        return new Matrix(newMatrix);
    }
}
