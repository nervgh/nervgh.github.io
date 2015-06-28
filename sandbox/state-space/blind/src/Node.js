

export default class Node {
    /**
     * @param {Number} cost
     * @param {Array<Node>} [children]
     */
    constructor(cost = 0, children = []) {
        this.cost = cost;
        this.children = children;
    }
}