

import Decoder from './modules/Decoder';


let {document} = window;
let image = document.getElementById('original');
let stage = document.getElementById('stage');


let decoder = new Decoder();

decoder.reader.onReadComplete = function(image, matrix) {
    matrix.normalize();
    let map = new Map();
    matrix.forEach(function(cell) {
        let {rgba} = cell;
        map.set(String(rgba), rgba);
    });
    for(let item of map.values()) {
        console.log(item);
    }

    decoder.writer.writeAsCanvas(matrix, stage);
};

decoder.reader.readAsMatrix(image);
