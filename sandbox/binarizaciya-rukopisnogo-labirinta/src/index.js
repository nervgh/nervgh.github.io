

import Decoder from './modules/Decoder';


let {document} = window;
let image = document.getElementById('original');
let stage = document.getElementById('stage');


let decoder = new Decoder();

decoder.onDecodeComplete = function(matrix, pointerSize) {
    console.log('pointerSize', pointerSize);
    decoder.writer.writeAsCanvas(matrix, stage);
};

decoder.decode(image);