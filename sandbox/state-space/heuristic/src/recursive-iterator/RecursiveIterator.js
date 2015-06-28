
// forked from https://github.com/nervgh/recursive-iterator

import isObject from './lang/isObject';
import getKeys from './lang/getKeys';


// PUBLIC PROPERTIES
const BYPASS_MODE = 'bypassMode';
const IGNORE_CIRCULAR = 'ignoreCircular';
const MAX_DEEP = 'maxDeep';
const CACHE = 'cache';
const SUCCESSORS = 'successors';


// PRIVATE PROPERTIES
const __SUCCESSOR = '__successor';


const EMPTY_SUCCESSOR = {};


class RecursiveIterator {
    /**
     * @param {Object|Array} root
     * @param {Number} [bypassMode=0]
     * @param {Boolean} [ignoreCircular=false]
     * @param {Number} [maxDeep=100]
     */
    constructor(root, bypassMode = 0, ignoreCircular = false, maxDeep = 100) {
        this[BYPASS_MODE] = bypassMode;
        this[IGNORE_CIRCULAR] = ignoreCircular;
        this[MAX_DEEP] = maxDeep;
        this[CACHE] = [];
        this[SUCCESSORS] = [];
        this[__SUCCESSOR] = this.createSuccessor(undefined, root);
        this.__makeIterable();
    }
    /**
     * @returns {Object}
     */
    next() {
        var {node, path, deep} = this[__SUCCESSOR] || EMPTY_SUCCESSOR;

        if (this[MAX_DEEP] > deep) {
            if (this.isNode(node)) {
                if (this.isCircular(node)) {
                    if (this[IGNORE_CIRCULAR]) {
                        // skip
                    } else {
                        throw new Error('Circular reference');
                    }
                } else {
                    if (this.onStepInto(this[__SUCCESSOR])) {
                        let descriptors = this.getSuccessorsOfNode(node, path, deep);
                        let method = this[BYPASS_MODE] ? 'push' : 'unshift';
                        this[SUCCESSORS][method](...descriptors);
                        this[CACHE].push(node);
                    }
                }
            }
        }

        var value = this.getNextSuccessor();
        var done = !value;

        this[__SUCCESSOR] = value;

        if (done) this.destroy();

        return {value, done};
    }
    /**
     *
     */
    destroy() {
        this[SUCCESSORS].length = 0;
        this[CACHE].length = 0;
        this[__SUCCESSOR] = null;
    }
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    isNode(any) {
        return isObject(any);
    }
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    isLeaf(any) {
        return !this.isNode(any);
    }
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    isCircular(any) {
        return this[CACHE].indexOf(any) !== -1
    }
    /**
     * @returns {Object|undefined}
     */
    getNextSuccessor() {
        return this[SUCCESSORS].shift();
    }
    /**
     * Returns states of child nodes
     * @param {Object} node
     * @param {Array} path
     * @param {Number} deep
     * @returns {Array<Object>}
     */
    getSuccessorsOfNode(node, path, deep) {
        return getKeys(node).map(key =>
            this.createSuccessor(node, node[key], key, path.concat(key), deep + 1)
        );
    }
    /**
     * Returns state of node. Calls for each node
     * @param {Object} [parent]
     * @param {*} [node]
     * @param {String} [key]
     * @param {Array} [path]
     * @param {Number} [deep]
     * @returns {Object}
     */
    createSuccessor(parent, node, key, path = [], deep = 0) {
        return {parent, node, key, path, deep};
    }
    /**
     * Callback
     * @param {Object} successor
     * @returns {Boolean}
     */
    onStepInto(successor) {
        return true;
    }
    /**
     * Only for es6
     * @private
     */
    __makeIterable() {
        try {
            this[Symbol.iterator] = () => this;
        } catch(e) {}
    }
}


export default RecursiveIterator;
