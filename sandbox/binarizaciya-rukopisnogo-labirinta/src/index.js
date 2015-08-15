

import Decoder from './modules/Decoder';


let {document} = window;
let image = document.getElementById('original');
let stage = document.getElementById('stage');


let decoder = new Decoder();

decoder.onDecodeComplete = function(matrix, pointerSize) {
    console.log('pointerSize', pointerSize);

    decoder.writer.writeAsCanvas(matrix, stage);

    let context = stage.getContext('2d');
    context.beginPath();
    context.arc(46, 18, pointerSize >> 1, 0, 2 * Math.PI);
    context.strokeStyle = 'rgb(255,0,255)';
    context.stroke();
    context.fillStyle = 'rgb(255,0,255)';
    context.fill();
    context.closePath();
};

decoder.decode(image);