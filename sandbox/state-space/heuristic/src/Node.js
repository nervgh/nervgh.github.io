

import Matrix from './Matrix';
import Vector2 from './Vector2';


const __COST_OF_PATH = '__costOfPath';
const __COST_TO_GOAL = '__costToGoal';
const __CHILDREN = '__children';
const __MATRIX = '__matrix';
const __TITLE = '__title';


var counter = 0;


export default class Node {
    /**
     * @param {String} title
     * @param {Number} costOfPath
     * @param {Object} matrix
     * @param {Object} [parentNode]
     */
    constructor(title, costOfPath, matrix, parentNode) {
        this.setTitle(title);
        this.setCostOfPath(costOfPath);
        this[__MATRIX] = matrix;
        this[__COST_TO_GOAL] = undefined;
        this[__CHILDREN] = undefined;
        this.parentNode = parentNode;
    }
    /**
     * @returns {String}
     */
    getTitle() {
        return this[__TITLE];
    }
    /**
     * @param {String} title
     */
    setTitle(title = '') {
        this[__TITLE] = title;
    }
    /**
     * g()
     * @returns {Number}
     */
    getCostOfPath() {
        return this[__COST_OF_PATH];
    }
    /**
     * @param {Number} cost
     */
    setCostOfPath(cost = 0) {
        return this[__COST_OF_PATH] = cost;
    }
    /**
     * h()
     * @returns {Number}
     */
    getCostToGoal() {
        if (isUndefined(this[__COST_TO_GOAL])){
            this[__COST_TO_GOAL] = this.__getCostToGoal();
        }
        return this[__COST_TO_GOAL];
    }
    /**
     * f() => g() + h()
     * @returns {*}
     */
    evaluate() {
        return this.getCostOfPath() + this.getCostToGoal();
    }
    /**
     * @param {Number} costOfPath
     * @returns {Array.<Node>}
     */
    getChildren(costOfPath = 0) {
        if (isUndefined(this[__CHILDREN])) {
            this[__CHILDREN] = this.__getChildren(costOfPath);
        }
        return this[__CHILDREN];
    }
    /**
     * @returns {Number}
     */
    __getCostToGoal() {
        var matrix = this[__MATRIX];
        var {width, height} = matrix.getSizes();
        var distances = new Array(width * height);
        var counter = 0;
        matrix.forEachCell(function(cell, currentVector) {
            if (isNumber(cell)) {
                var x = (cell - 1) % width;
                var y = Math.ceil(cell / height) - 1;
                var targetVector = new Vector2(x, y);
                var distance = Vector2.distanceManhattan(targetVector, currentVector);
                distances[counter] = distance;
                counter += 1;
            }
        });
        var sum = distances.reduce((sum, item) => sum + item, 0);
        return sum;
    }
    /**
     * @param {Number} costOfPath
     * @returns {Array.<Node>}
     * @private
     */
    __getChildren(costOfPath) {
        var matrix = this[__MATRIX];
        var {width, height} = matrix.getSizes();
        var vector = matrix.findCellVector(cell => !isNumber(cell));
        var children = [];
        if (vector[0] !== 0) {
            let matrixClone = matrix.clone();
            let vectorClone = vector.clone();
            vectorClone[0] -= 1;
            matrixClone.swapCells(vector, vectorClone);
            children.push(new Node(String(counter++), costOfPath, matrixClone, this));
        }
        if (vector[0] !== width - 1) {
            let matrixClone = matrix.clone();
            let vectorClone = vector.clone();
            vectorClone[0] += 1;
            matrixClone.swapCells(vector, vectorClone);
            children.push(new Node(String(counter++), costOfPath, matrixClone, this));
        }
        if (vector[1] !== 0) {
            let matrixClone = matrix.clone();
            let vectorClone = vector.clone();
            vectorClone[1] -= 1;
            matrixClone.swapCells(vector, vectorClone);
            children.push(new Node(String(counter++), costOfPath, matrixClone, this));
        }
        if (vector[1] !== height - 1) {
            let matrixClone = matrix.clone();
            let vectorClone = vector.clone();
            vectorClone[1] += 1;
            matrixClone.swapCells(vector, vectorClone);
            children.push(new Node(String(counter++), costOfPath, matrixClone, this));
        }
        return children;
    }
}


/**
 * @param {*} any
 * @returns {Boolean}
 */
function isNumber(any) {
    return typeof any === 'number';
}
/**
 * @param {*} any
 * @returns {Boolean}
 */
function isUndefined(any) {
    return any === undefined;
}