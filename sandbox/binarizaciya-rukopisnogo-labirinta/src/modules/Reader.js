'use strict';


import Matrix from './Matrix';


let {document} = window;


export default class Reader {
    /**
     *
     */
    constructor() {
    }
    /**
     * @param {HTMLImageElement} image
     */
    readAsMatrix(image) {
        image.addEventListener('load', this.__readAsMatrix.bind(this, image));
    }
    /**
     * @param {HTMLImageElement} elementImage
     * @private
     */
    __readAsMatrix(elementImage) {
        let imageData = this.__getImageData(elementImage);
        let matrix = new Matrix(imageData);
        this.onReadComplete(elementImage, matrix);
    }
    /**
     * @param {HTMLImageElement} elementImage
     * @returns {ImageData}
     * @private
     */
    __getImageData(elementImage) {
        let {clientWidth, clientHeight, naturalWidth, naturalHeight} = elementImage;
        let elementCanvas = document.createElement('canvas');
        let context = elementCanvas.getContext('2d');
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        elementCanvas.setAttribute('width', clientWidth);
        elementCanvas.setAttribute('height', clientHeight);
        context.drawImage(elementImage, 0, 0, naturalWidth, naturalHeight, 0, 0, clientWidth, clientHeight);

        // http://xiper.net/manuals/canvas/2D-api/getImageData
        let imageData = context.getImageData(0, 0, clientWidth, clientHeight);

        return imageData;
    }
    /**
     * Callback
     * @param {HTMLImageElement} image
     * @param {Matrix} matrix
     */
    onReadComplete(image, matrix) {
    }
}