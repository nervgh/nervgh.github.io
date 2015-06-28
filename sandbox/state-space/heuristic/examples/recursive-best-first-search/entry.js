

import RecursiveBestFirstSearchIterator from './src/RecursiveBestFirstSearchIterator';
import Node from  './src/Node';


var root = new Node('Arand', 366, [
    new Node('Sibiu', 393, [
        new Node('Arand', 646),
        new Node('Fagaras', 415, [
            new Node('Sibiu', 591),
            new Node('Bucharest', 450)
        ]),
        new Node('Oredea', 526),
        new Node('Rimnieu Vilcea', 413, [
            new Node('Craiova', 526),
            new Node('Pitesti', 417, [
                new Node('Bucharest', 418),
                new Node('Craiova', 615),
                new Node('Rimnieu Vilcea', 607)
            ]),
            new Node('Sibiu', 553)
        ])
    ]),
    new Node('Timisoara', 447),
    new Node('Zerind', 449)
]);


for(let {node, path} of new RecursiveBestFirstSearchIterator(root)) {
    console.log(node, path.join('.'));
}