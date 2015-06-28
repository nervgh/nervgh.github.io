

import RecursiveIterator from './recursive-iterator/RecursiveIterator.js';


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
    getSuccessorsOfNode(node, path, deep) {
        return node.getChildren(deep + 1)
            .map((child, key) =>
                this.createSuccessor(node, child, key, path.concat(child.title), deep + 1));
    }
    /**
     * @returns {Object|undefined}
     */
    getNextSuccessor() {
        var successors = this.successors;
        var targetEvaluation = Number.POSITIVE_INFINITY;
        var targetIndex = -1;
        for(var i = 0, len = successors.length; i < len; i++) {
            var successor = successors[i];
            var {node} = successor;
            var nodeEvaluation = node.evaluate();
            if (nodeEvaluation < targetEvaluation) {
                targetEvaluation = nodeEvaluation;
                targetIndex = i;
            }
        }
        if (targetIndex !== -1) {
            return successors.splice(targetIndex, 1)[0];
        }
    }
}