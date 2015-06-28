

export default class Node {
    /**
     * @param {String} [title]
     * @param {Number} [cost]
     * @param {Array<Node>} [children]
     */
    constructor(title = '', cost = 0, children = []) {
        this.title = title;
        this.cost = cost;
        this.children = children;
    }
    g() {

    }
    h() {

    }
    f() {
        return this.cost;
    }
}