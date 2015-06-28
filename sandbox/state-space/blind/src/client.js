

import UniformCostSearchIterator from './UniformCostSearchIterator';
import Node from  './Node';


var root = new Node(0, [
    new Node(2, [
        new Node(8), new Node(4)
    ]),
    new Node(1, [
        new Node(12, [
            new Node(4)
        ]),
        new Node(9, [
            new Node(7, [
                new Node(6)
            ]),
            new Node(5, [
                new Node(10)
            ])
        ])
    ]),
    new Node(3)
]);


for(var {node, path} of new UniformCostSearchIterator(root)) {
    console.log(node, path.join('.'));
}

// Node {cost: 1, children: Array[2]} "1"
// Node {cost: 9, children: Array[2]} "1.9"
// Node {cost: 5, children: Array[1]} "1.9.5"
// Node {cost: 10, children: Array[0]} "1.9.5.10"
// Node {cost: 7, children: Array[1]} "1.9.7"
// Node {cost: 6, children: Array[0]} "1.9.7.6"
// Node {cost: 12, children: Array[1]} "1.12"
// Node {cost: 4, children: Array[0]} "1.12.4"
// Node {cost: 2, children: Array[2]} "2"
// Node {cost: 4, children: Array[0]} "2.4"
// Node {cost: 8, children: Array[0]} "2.8"
// Node {cost: 3, children: Array[0]} "3"