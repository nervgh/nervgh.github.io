/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var Decoder = _interopRequire(__webpack_require__(1));
	
	var document = window.document;
	
	var image = document.getElementById("original");
	var stage = document.getElementById("stage");
	
	var decoder = new Decoder();
	
	decoder.onDecodeComplete = function (matrix) {
	    decoder.writer.writeAsCanvas(matrix, stage);
	};
	
	decoder.decode(image);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Reader = _interopRequire(__webpack_require__(2));
	
	var Writer = _interopRequire(__webpack_require__(8));
	
	//import {randomItems} from './utils';
	//import Rectangle from './Rectangle';
	
	var Decoder = (function () {
	    /**
	     *
	     */
	
	    function Decoder() {
	        _classCallCheck(this, Decoder);
	
	        this.reader = new Reader();
	        this.writer = new Writer();
	        //this.__matrix = undefined;
	        //this.__pointerSize = undefined;
	        this.reader.onReadComplete = this.__onReadComplete.bind(this);
	    }
	
	    _createClass(Decoder, {
	        decode: {
	            /**
	             * @param {HTMLImageElement} image
	             */
	
	            value: function decode(image) {
	                this.reader.readAsMatrix(image);
	            }
	        },
	        onDecodeComplete: {
	            /**
	             * Callback
	             */
	
	            value: function onDecodeComplete() {}
	        },
	        __onReadComplete: {
	            /**
	             * @param {HTMLImageElement} image
	             * @param {Matrix} matrix
	             * @private
	             */
	
	            value: function __onReadComplete(image, matrix) {
	                matrix.normalize();
	                //this.__matrix = matrix;
	                //this.__pointerSize = this.__getPointerSize(matrix);
	                this.onDecodeComplete(matrix);
	            }
	            //__getPointerSize(matrix) {
	            //    let blackCells = this.__getBlackCells(matrix);
	            //    let randomCells = randomItems(blackCells, 10);
	            //}
	            ///**
	            // * @param {Matrix} matrix
	            // * @returns {Array<Cell>}
	            // * @private
	            // */
	            //__getBlackCells(matrix) {
	            //    let array = matrix.toArray();
	            //    return array.filter(cell => cell.isBlack());
	            //}
	            //__expandCell(matrix, cell) {
	            //    let {width, height} = matrix;
	            //    let limit = Math.min(width, height) >> 4;
	            //    let {vector} = cell;
	            //    let rectangle = new Rectangle(vector.clone(), vector.clone(),
	            //                                                vector.clone(), vector.clone());
	            //    let pointer = cell;
	            //    while(pointer.vector.y !== 0) {
	            //
	            //    }
	            //}
	
	        }
	    });
	
	    return Decoder;
	})();
	
	module.exports = Decoder;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Matrix = _interopRequire(__webpack_require__(3));
	
	var document = window.document;
	
	var Reader = (function () {
	  /**
	   *
	   */
	
	  function Reader() {
	    _classCallCheck(this, Reader);
	  }
	
	  _createClass(Reader, {
	    readAsMatrix: {
	      /**
	       * @param {HTMLImageElement} image
	       */
	
	      value: function readAsMatrix(image) {
	        var temp = new Image();
	        temp.onload = this.__readAsMatrix.bind(this, image);
	        temp.src = image.src;
	      }
	    },
	    __readAsMatrix: {
	      /**
	       * @param {HTMLImageElement} elementImage
	       * @private
	       */
	
	      value: function __readAsMatrix(elementImage) {
	        var imageData = this.__getImageData(elementImage);
	        var matrix = new Matrix(imageData);
	        this.onReadComplete(elementImage, matrix);
	      }
	    },
	    __getImageData: {
	      /**
	       * @param {HTMLImageElement} elementImage
	       * @returns {ImageData}
	       * @private
	       */
	
	      value: function __getImageData(elementImage) {
	        var clientWidth = elementImage.clientWidth;
	        var clientHeight = elementImage.clientHeight;
	        var naturalWidth = elementImage.naturalWidth;
	        var naturalHeight = elementImage.naturalHeight;
	
	        var elementCanvas = document.createElement("canvas");
	        var context = elementCanvas.getContext("2d");
	        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	        elementCanvas.setAttribute("width", clientWidth);
	        elementCanvas.setAttribute("height", clientHeight);
	        context.drawImage(elementImage, 0, 0, naturalWidth, naturalHeight, 0, 0, clientWidth, clientHeight);
	
	        // http://xiper.net/manuals/canvas/2D-api/getImageData
	        var imageData = context.getImageData(0, 0, clientWidth, clientHeight);
	
	        return imageData;
	      }
	    },
	    onReadComplete: {
	      /**
	       * Callback
	       * @param {HTMLImageElement} image
	       * @param {Matrix} matrix
	       */
	
	      value: function onReadComplete(image, matrix) {}
	    }
	  });
	
	  return Reader;
	})();
	
	module.exports = Reader;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Cell = _interopRequire(__webpack_require__(4));
	
	var Rgba = _interopRequire(__webpack_require__(5));
	
	var Vector2 = _interopRequire(__webpack_require__(6));
	
	var MatrixWalker = _interopRequire(__webpack_require__(7));
	
	var Matrix = (function () {
	    /**
	     * @param {*} any
	     */
	
	    function Matrix(any) {
	        _classCallCheck(this, Matrix);
	
	        var _Matrix$factory = Matrix.factory(any);
	
	        var width = _Matrix$factory.width;
	        var height = _Matrix$factory.height;
	        var data = _Matrix$factory.data;
	
	        this.width = width;
	        this.height = height;
	        this.data = data;
	    }
	
	    _createClass(Matrix, {
	        destroy: {
	            /**
	             *
	             */
	
	            value: function destroy() {
	                var _ref = this;
	
	                var data = _ref.data;
	
	                data.length = 0;
	            }
	        },
	        clone: {
	            /**
	             * @returns {Matrix}
	             */
	
	            value: function clone() {
	                return new Matrix(this);
	            }
	        },
	        createWalker: {
	            /**
	             * @param {Cell} [cell]
	             * @returns {MatrixWalker}
	             */
	
	            value: function createWalker() {
	                var cell = arguments[0] === undefined ? this.data[0][0] : arguments[0];
	                var vector = cell.vector;
	
	                return new MatrixWalker(this, vector.clone());
	            }
	        },
	        forEach: {
	            /**
	             * @param {Function} cb
	             */
	
	            value: function forEach(cb) {
	                var _ref = this;
	
	                var width = _ref.width;
	                var height = _ref.height;
	                var data = _ref.data;
	
	                for (var i = 0; i < height; i++) {
	                    for (var j = 0; j < width; j++) {
	                        var cell = data[i][j];
	                        cb(cell);
	                    }
	                }
	            }
	        },
	        normalize: {
	            /**
	             *
	             */
	
	            value: function normalize() {
	                var full = 255;
	                var half = full / 2;
	                var modify = function (cell) {
	                    var rgba = cell.rgba;
	                    var red = rgba.red;
	                    var green = rgba.green;
	                    var blue = rgba.blue;
	
	                    red = red < half ? 0 : full;
	                    green = green < half ? 0 : full;
	                    blue = blue < half ? 0 : full;
	                    var color = red + green + blue < full ? 0 : full;
	                    rgba.red = rgba.green = rgba.blue = color;
	                };
	                this.forEach(modify);
	            }
	        },
	        invert: {
	            /**
	             * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#Grayscaling_and_inverting_colors
	             */
	
	            value: function invert() {
	                var MAX = 255;
	                var modify = function (cell) {
	                    var rgba = cell.rgba;
	                    var red = rgba.red;
	                    var green = rgba.green;
	                    var blue = rgba.blue;
	
	                    rgba.red = MAX - red;
	                    rgba.green = MAX - green;
	                    rgba.blue = MAX - blue;
	                };
	                this.forEach(modify);
	            }
	        },
	        greyscale: {
	            /**
	             * @see http://jscience.org/experimental/javadoc/org/jscience/computing/ai/vision/GreyscaleFilter.html
	             * @see http://www.johndcook.com/blog/2009/08/24/algorithms-convert-color-grayscale/
	             * @see http://www.had2know.com/technology/rgb-to-gray-scale-converter.html
	             */
	
	            value: function greyscale() {
	                var R = 0.299;
	                var G = 0.587;
	                var B = 0.114;
	                var modify = function (cell) {
	                    var rgba = cell.rgba;
	                    var red = rgba.red;
	                    var green = rgba.green;
	                    var blue = rgba.blue;
	
	                    var grey = Math.round(red * R + green * G + blue * B);
	                    rgba.red = rgba.green = rgba.blue = grey;
	                };
	                this.forEach(modify);
	            }
	        },
	        toImageData: {
	            /**
	             * @returns {ImageData}
	             */
	
	            value: function toImageData() {
	                var STEP = 4;
	
	                var _ref = this;
	
	                var width = _ref.width;
	                var height = _ref.height;
	
	                var array = new Uint8ClampedArray(width * height * STEP);
	                var c0 = 0; // counter
	                var c1 = 1; // counter
	                var c2 = 2; // counter
	                var c3 = 3; // counter
	                var callback = function (cell) {
	                    var rgba = cell.rgba;
	                    var red = rgba.red;
	                    var green = rgba.green;
	                    var blue = rgba.blue;
	                    var alpha = rgba.alpha;
	
	                    array[c0] = red;
	                    array[c1] = green;
	                    array[c2] = blue;
	                    array[c3] = alpha;
	                    c0 += STEP;
	                    c1 += STEP;
	                    c2 += STEP;
	                    c3 += STEP;
	                };
	                this.forEach(callback);
	                return new ImageData(array, width, height);
	            }
	        },
	        toArray: {
	            /**
	             * @returns {Array}
	             */
	
	            value: function toArray() {
	                var _ref = this;
	
	                var width = _ref.width;
	                var height = _ref.height;
	
	                var array = new Array(width * height);
	                var counter = 0;
	                var callback = function (cell) {
	                    array[counter] = cell;
	                    counter += 1;
	                };
	                this.forEach(callback);
	                return array;
	            }
	        }
	    }, {
	        fromImageData: {
	            /**
	             * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
	             * @param {ImageData} imageData
	             * @returns {Object}
	             */
	
	            value: function fromImageData(imageData) {
	                var STEP = 4;
	                var width = imageData.width;
	                var height = imageData.height;
	                var data = imageData.data;
	
	                var c0 = 0; // counter
	                var c1 = 1; // counter
	                var c2 = 2; // counter
	                var c3 = 3; // counter
	                var rows = new Array(height);
	                for (var i = 0; i < height; i++) {
	                    var cells = new Array(width);
	                    for (var j = 0; j < width; j++) {
	                        var rgba = new Rgba(data[c0], data[c1], data[c2], data[c3]);
	                        var vector = new Vector2(i, j);
	                        cells[j] = new Cell(rgba, vector);
	                        c0 += STEP;
	                        c1 += STEP;
	                        c2 += STEP;
	                        c3 += STEP;
	                    }
	                    rows[i] = cells;
	                }
	                return {
	                    width: width,
	                    height: height,
	                    data: rows
	                };
	            }
	        },
	        fromMatrix: {
	            /**
	             * @param {Matrix} matrix
	             * @returns {Object}
	             */
	
	            value: function fromMatrix(matrix) {
	                var width = matrix.width;
	                var height = matrix.height;
	                var data = matrix.data;
	
	                var rows = new Array(height);
	                for (var i = 0; i < height; i++) {
	                    var row = new Array(width);
	                    for (var j = 0; j < width; j++) {
	                        var cell = data[i][j];
	                        row[j] = cell.clone();
	                    }
	                    rows[i] = row;
	                }
	                return {
	                    width: width,
	                    height: height,
	                    data: rows
	                };
	            }
	        },
	        factory: {
	            /**
	             * @param {*} data
	             * @returns {*}
	             */
	
	            value: function factory(data) {
	                if (data instanceof ImageData) {
	                    return Matrix.fromImageData(data);
	                } else if (data instanceof Matrix) {
	                    return Matrix.fromMatrix(data);
	                } else {
	                    throw new TypeError("This type not supported.\n            Matrix may be created only from {ImageData} or another {Matrix}.");
	                }
	            }
	        }
	    });
	
	    return Matrix;
	})();
	
	module.exports = Matrix;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Cell = (function () {
	    /**
	     * @param {Rgba} rgba
	     * @param {Vector2} vector
	     */
	
	    function Cell(rgba, vector) {
	        _classCallCheck(this, Cell);
	
	        this.rgba = rgba;
	        this.vector = vector;
	    }
	
	    _createClass(Cell, {
	        clone: {
	            /**
	             * @returns {Cell}
	             */
	
	            value: function clone() {
	                var _ref = this;
	
	                var rgba = _ref.rgba;
	                var vector = _ref.vector;
	
	                return new Cell(rgba.clone(), vector.clone());
	            }
	        }
	    });
	
	    return Cell;
	})();
	
	module.exports = Cell;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Rgba = (function () {
	    /**
	     * @param {Number} red
	     * @param {Number} green
	     * @param {Number} blue
	     * @param {Number} alpha
	     */
	
	    function Rgba() {
	        var red = arguments[0] === undefined ? 255 : arguments[0];
	        var green = arguments[1] === undefined ? 255 : arguments[1];
	        var blue = arguments[2] === undefined ? 255 : arguments[2];
	        var alpha = arguments[3] === undefined ? 255 : arguments[3];
	
	        _classCallCheck(this, Rgba);
	
	        this.red = red;
	        this.green = green;
	        this.blue = blue;
	        this.alpha = alpha;
	    }
	
	    _createClass(Rgba, {
	        isBlack: {
	            /**
	             * @returns {Boolean}
	             */
	
	            value: function isBlack() {
	                var color = 0;
	                return this.is(color, color, color);
	            }
	        },
	        isWhite: {
	            /**
	             * @returns {Boolean}
	             */
	
	            value: function isWhite() {
	                var color = 255;
	                return this.is(color, color, color);
	            }
	        },
	        is: {
	            /**
	             * @param {Number} red
	             * @param {Number} green
	             * @param {Number} blue
	             * @param {Number} alpha
	             * @returns {Boolean}
	             */
	
	            value: function is() {
	                var red = arguments[0] === undefined ? 255 : arguments[0];
	                var green = arguments[1] === undefined ? 255 : arguments[1];
	                var blue = arguments[2] === undefined ? 255 : arguments[2];
	                var alpha = arguments[3] === undefined ? 255 : arguments[3];
	
	                return this.red === red && this.green === green && this.blue === blue && this.alpha === alpha;
	            }
	        },
	        clone: {
	            /**
	             * @returns {Rgba}
	             */
	
	            value: function clone() {
	                var _ref = this;
	
	                var red = _ref.red;
	                var green = _ref.green;
	                var blue = _ref.blue;
	                var alpha = _ref.alpha;
	
	                return new Rgba(red, green, blue, alpha);
	            }
	        }
	    });
	
	    return Rgba;
	})();
	
	module.exports = Rgba;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Vector2 = (function () {
	    /**
	     * @param {Number} x
	     * @param {Number} y
	     */
	
	    function Vector2() {
	        var x = arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments[1] === undefined ? 0 : arguments[1];
	
	        _classCallCheck(this, Vector2);
	
	        this.x = x;
	        this.y = y;
	    }
	
	    _createClass(Vector2, {
	        clone: {
	            /**
	             * @returns {Vector2}
	             */
	
	            value: function clone() {
	                var _ref = this;
	
	                var x = _ref.x;
	                var y = _ref.y;
	
	                return new Vector2(x, y);
	            }
	        }
	    });
	
	    return Vector2;
	})();
	
	module.exports = Vector2;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Vector2 = _interopRequire(__webpack_require__(6));
	
	var MatrixWalker = (function () {
	    /**
	     * @param {Matrix} matrix
	     * @param {Vector2} [vector]
	     */
	
	    function MatrixWalker(matrix) {
	        var vector = arguments[1] === undefined ? new Vector2() : arguments[1];
	
	        _classCallCheck(this, MatrixWalker);
	
	        this.__matrix = matrix;
	        this.__vector = vector;
	    }
	
	    _createClass(MatrixWalker, {
	        matrix: {
	            /**
	             * @returns {Matrix}
	             */
	
	            get: function () {
	                return this.__matrix;
	            }
	        },
	        vector: {
	            /**
	             * @returns {Vector2}
	             */
	
	            get: function () {
	                return this.__vector;
	            }
	        },
	        moveUp: {
	            /**
	             *
	             */
	
	            value: function moveUp() {
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var y = vector.y;
	
	                vector.y = this.__fixY(y - 1);
	            }
	        },
	        moveRight: {
	            /**
	             *
	             */
	
	            value: function moveRight() {
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var x = vector.x;
	
	                vector.x = this.__fixX(x + 1);
	            }
	        },
	        moveDown: {
	            /**
	             *
	             */
	
	            value: function moveDown() {
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var y = vector.y;
	
	                vector.y = this.__fixY(y - 1);
	            }
	        },
	        moveLeft: {
	            /**
	             *
	             */
	
	            value: function moveLeft() {
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var x = vector.x;
	
	                vector.x = this.__fixX(x - 1);
	            }
	        },
	        jumpTo: {
	            /**
	             * @param {Number} x
	             * @param {Number} y
	             */
	
	            value: function jumpTo(x, y) {
	                var _ref = this;
	
	                var vector = _ref.vector;
	
	                vector.x = this.__fixX(x);
	                vector.y = this.__fixY(y);
	            }
	        },
	        __fixX: {
	            /**
	             * @param {Number} x
	             * @returns {Number}
	             * @private
	             */
	
	            value: function __fixX(x) {
	                var _ref = this;
	
	                var matrix = _ref.matrix;
	                var width = matrix.width;
	
	                x = Math.min(x, width);
	                x = Math.max(x, 0);
	                return x;
	            }
	        },
	        __fixY: {
	            /**
	             * @param {Number} y
	             * @returns {Number}
	             * @private
	             */
	
	            value: function __fixY(y) {
	                var _ref = this;
	
	                var matrix = _ref.matrix;
	                var height = matrix.height;
	
	                y = Math.min(y, height);
	                y = Math.max(y, 0);
	                return y;
	            }
	        }
	    });
	
	    return MatrixWalker;
	})();
	
	module.exports = MatrixWalker;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Writer = (function () {
	    /**
	     *
	     */
	
	    function Writer() {
	        _classCallCheck(this, Writer);
	    }
	
	    _createClass(Writer, {
	        writeAsCanvas: {
	            /**
	             * @param {Matrix} matrix
	             * @param {HTMLCanvasElement} elementCanvas
	             */
	
	            value: function writeAsCanvas(matrix, elementCanvas) {
	                var context = elementCanvas.getContext("2d");
	                var imageData = matrix.toImageData();
	                var width = imageData.width;
	                var height = imageData.height;
	
	                elementCanvas.setAttribute("width", width);
	                elementCanvas.setAttribute("height", height);
	                context.putImageData(imageData, 0, 0);
	            }
	        }
	    });
	
	    return Writer;
	})();
	
	module.exports = Writer;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map