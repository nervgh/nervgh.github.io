

import RecursiveIterator from './recursive-iterator/RecursiveIterator.js';


// PRIVATE PROPERTIES
const QUEUE = '__queue';


export default class RecursiveBestFirstSearchIterator extends RecursiveIterator {
    /**
     * @param {Object|Array} root
     * @param {Boolean} [ignoreCircular=false]
     * @param {Number} [maxDeep=100]
     */
    constructor(root, ignoreCircular, maxDeep) {
        super(root, 1, ignoreCircular, maxDeep);
    }
    /**
     * Returns states of child nodes
     * @param {Object} node
     * @param {Array} path
     * @param {Number} deep
     * @returns {Array<Object>}
     */
    getStatesOfChildNodes(node, path, deep) {
        return node.children
            .map((child, key) =>
                this.getState(node, child, key, path.concat(child.title), deep + 1));
    }
    /**
     * @returns {Object|undefined}
     */
    getNextSuccessor() {
        var queue = this[QUEUE];
        var targetCost = Number.POSITIVE_INFINITY;
        var targetIndex = -1;
        for(var index = 0, len = queue.length; index < len; index++) {
            var state = queue[index];
            var nodeCost = state.node.cost;
            if (nodeCost < targetCost) {
                targetCost = nodeCost;
                targetIndex = index;
            }
        }
        if (targetIndex !== -1) {
            return queue.splice(targetIndex, 1)[0];
        }
    }
}