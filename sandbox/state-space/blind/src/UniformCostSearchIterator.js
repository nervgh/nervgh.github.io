
import RecursiveIterator from './../../../../js/recursive-iterator.min.js';


export default class UniformCostSearchIterator extends RecursiveIterator {
    /**
     * @param {Object|Array} root
     * @param {Boolean} [ignoreCircular=false]
     * @param {Number} [maxDeep=100]
     */
    constructor(root, ignoreCircular, maxDeep) {
        super(root, 0, ignoreCircular, maxDeep);
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
                this.getState(node, child, key, path.concat(child.cost), deep + 1))
            .sort((a, b) =>
                a.node.cost - b.node.cost);
    }
}