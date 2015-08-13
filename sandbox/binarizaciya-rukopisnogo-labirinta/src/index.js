

import Decoder from './modules/Decoder';


let {document} = window;
let image = document.getElementById('original');
let stage = document.getElementById('stage');


let decoder = new Decoder();

decoder.reader.onReadComplete = function(image, matrix) {
    //matrix.invert();
    decoder.writer.writeAsCanvas(matrix, stage);
};

decoder.reader.readAsMatrix(image);
