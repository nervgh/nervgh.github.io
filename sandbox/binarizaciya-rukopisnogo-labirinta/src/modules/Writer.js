'use strict';


export default class Writer {
    /**
     *
     */
    constructor() {
    }
    /**
     * @param {Matrix} matrix
     * @param {HTMLCanvasElement} elementCanvas
     */
    writeAsCanvas(matrix, elementCanvas) {
        let context = elementCanvas.getContext('2d');
        let imageData = matrix.toImageData();
        var {width, height} = imageData;
        elementCanvas.setAttribute('width', width);
        elementCanvas.setAttribute('height', height);
        context.putImageData(imageData, 0, 0);
    }
}