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
	
	decoder.onDecodeComplete = function (matrix, pointerSize) {
	    console.log("pointerSize", pointerSize);
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
	
	var Writer = _interopRequire(__webpack_require__(9));
	
	var randomItems = __webpack_require__(8).randomItems;
	
	var Rectangle = _interopRequire(__webpack_require__(10));
	
	var Decoder = (function () {
	    /**
	     *
	     */
	
	    function Decoder() {
	        _classCallCheck(this, Decoder);
	
	        this.reader = new Reader();
	        this.writer = new Writer();
	        this.reader.onReadComplete = this.__onReadComplete.bind(this);
	        this.__matrix = undefined;
	        this.__pointerSize = undefined;
	    }
	
	    _createClass(Decoder, {
	        pointerSize: {
	            /**
	             * @returns {Number}
	             */
	
	            get: function () {
	                return this.__pointerSize;
	            }
	        },
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
	             * @param {Matrix} matrix
	             * @param {Number} pointerSize
	             */
	
	            value: function onDecodeComplete(matrix, pointerSize) {}
	        },
	        __onReadComplete: {
	            /**
	             * @param {HTMLImageElement} image
	             * @param {Matrix} matrix
	             * @private
	             */
	
	            value: function __onReadComplete(image, matrix) {
	                matrix.normalize();
	                var pointerSize = this.__getPointerSize(matrix);
	                this.__matrix = matrix;
	                this.__pointerSize = pointerSize;
	                this.onDecodeComplete(matrix, pointerSize);
	            }
	        },
	        __getPointerSize: {
	            /**
	             * @param {Matrix} matrix
	             * @returns {Number}
	             * @private
	             */
	
	            value: function __getPointerSize(matrix) {
	                var _this = this;
	
	                var blackCells = matrix.toArray().filter(function (cell) {
	                    return cell.rgba.isBlack();
	                });
	                var randomCells = randomItems(blackCells, Math.floor(blackCells.length * 0.01));
	                var rectangles = randomCells.map(function (cell) {
	                    return _this.__expandCell(matrix, cell);
	                });
	
	                var sizes = [];
	
	                rectangles.forEach(function (rectangle) {
	                    var width = rectangle.width;
	                    var height = rectangle.height;
	
	                    sizes.push(width, height);
	                });
	
	                sizes.sort(function (a, b) {
	                    return a - b;
	                });
	                sizes = sizes.filter(function (value) {
	                    return value > 0;
	                });
	
	                var middle = Math.floor(sizes.length / 3);
	
	                return sizes[middle];
	            }
	        },
	        __expandCell: {
	            /**
	             * @param {Matrix} matrix
	             * @param {Cell} cell
	             * @returns {Rectangle}
	             * @private
	             */
	
	            value: function __expandCell(matrix, cell) {
	                var width = matrix.width;
	                var height = matrix.height;
	
	                var limit = Math.min(width, height) >> 4;
	
	                var walker1 = matrix.createWalker(cell);
	                var walker2 = matrix.createWalker(cell);
	                var walker3 = matrix.createWalker(cell);
	                var walker4 = matrix.createWalker(cell);
	
	                var preventStep = function (cell) {
	                    return !cell.rgba.isBlack();
	                };
	
	                for (var i = 0; i <= limit; i++) {
	                    walker1.moveUp(preventStep);
	                    walker2.moveRight(preventStep);
	                    walker3.moveDown(preventStep);
	                    walker4.moveLeft(preventStep);
	                }
	
	                var rectangle = new Rectangle(walker1.vector.clone(), walker2.vector.clone(), walker3.vector.clone(), walker4.vector.clone());
	
	                return rectangle;
	            }
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
	        getCellByCoordinates: {
	            /**
	             * @param {Number} x
	             * @param {Number} y
	             * @returns {Cell}
	             */
	
	            value: function getCellByCoordinates(x, y) {
	                var _ref = this;
	
	                var data = _ref.data;
	
	                return data[y][x];
	            }
	        },
	        getCellByVector: {
	            /**
	             * @param {Vector2} vector
	             * @returns {*}
	             */
	
	            value: function getCellByVector(vector) {
	                var x = vector.x;
	                var y = vector.y;
	
	                return this.getCellByCoordinates(x, y);
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
	        forEachRectangle: {
	            /**
	             * @param {Rectangle} rectangle
	             * @param {Function} cb
	             */
	
	            value: function forEachRectangle(rectangle, cb) {
	                var top = rectangle.top;
	                var right = rectangle.right;
	                var bottom = rectangle.bottom;
	                var left = rectangle.left;
	
	                var _ref = this;
	
	                var data = _ref.data;
	
	                for (var i = top.y; i <= bottom.y; i++) {
	                    for (var j = left.x; j <= right.x; j++) {
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
	                        var vector = new Vector2(j, i);
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
	
	var noOperation = __webpack_require__(8).noOperation;
	
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
	             * @param {Function} [preventStep]
	             */
	
	            value: function moveUp() {
	                var preventStep = arguments[0] === undefined ? noOperation : arguments[0];
	
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var x = vector.x;
	                var y = vector.y;
	
	                this.jumpTo(x, y - 1, preventStep);
	            }
	        },
	        moveRight: {
	            /**
	             * @param {Function} [preventStep]
	             */
	
	            value: function moveRight() {
	                var preventStep = arguments[0] === undefined ? noOperation : arguments[0];
	
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var x = vector.x;
	                var y = vector.y;
	
	                this.jumpTo(x + 1, y, preventStep);
	            }
	        },
	        moveDown: {
	            /**
	             * @param {Function} [preventStep]
	             */
	
	            value: function moveDown() {
	                var preventStep = arguments[0] === undefined ? noOperation : arguments[0];
	
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var x = vector.x;
	                var y = vector.y;
	
	                this.jumpTo(x, y + 1, preventStep);
	            }
	        },
	        moveLeft: {
	            /**
	             * @param {Function} [preventStep]
	             */
	
	            value: function moveLeft() {
	                var preventStep = arguments[0] === undefined ? noOperation : arguments[0];
	
	                var _ref = this;
	
	                var vector = _ref.vector;
	                var x = vector.x;
	                var y = vector.y;
	
	                this.jumpTo(x - 1, y, preventStep);
	            }
	        },
	        jumpTo: {
	            /**
	             * @param {Number} x
	             * @param {Number} y
	             * @param {Function} [preventStep]
	             */
	
	            value: function jumpTo(x, y) {
	                var preventStep = arguments[2] === undefined ? noOperation : arguments[2];
	
	                var _ref = this;
	
	                var vector = _ref.vector;
	
	                x = this.__fixX(x);
	                y = this.__fixY(y);
	                if (this.__testPrevent(x, y, preventStep)) {
	                    return;
	                }vector.x = x;
	                vector.y = y;
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
	
	                x = Math.min(x, width - 1);
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
	
	                y = Math.min(y, height - 1);
	                y = Math.max(y, 0);
	                return y;
	            }
	        },
	        __testPrevent: {
	            /**
	             * @param {Number} x
	             * @param {Number} y
	             * @param {Function} preventFunction
	             * @returns {*}
	             * @private
	             */
	
	            value: function __testPrevent(x, y, preventFunction) {
	                var _ref = this;
	
	                var matrix = _ref.matrix;
	
	                var cell = matrix.getCellByCoordinates(x, y);
	                return preventFunction(cell);
	            }
	        }
	    });
	
	    return MatrixWalker;
	})();
	
	module.exports = MatrixWalker;

/***/ },
/* 8 */
/***/ function(module, exports) {

	
	
	/**
	 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples
	 * @see https://learn.javascript.ru/number#���������-�����-��-min-��-max
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {Number}
	 */
	"use strict";
	
	exports.randomInteger = randomInteger;
	
	/**
	 * @param {Array} array
	 * @param {Number} count
	 * @returns {Array}
	 */
	exports.randomItems = randomItems;
	
	/**
	 * @returns {undefined}
	 */
	exports.noOperation = noOperation;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	function randomInteger(min, max) {
	  return Math.floor(Math.random() * (max + 1 - min)) + min;
	}
	
	function randomItems(array, count) {
	  var stack = new Array(count);
	  var max = array.length - 1;
	  for (var index = 0; index < count; index++, max--) {
	    var randomIndex = randomInteger(0, max);
	    stack[index] = array[randomIndex];
	  }
	  return stack;
	}
	
	function noOperation() {}

/***/ },
/* 9 */
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Vector2 = _interopRequire(__webpack_require__(6));
	
	var Rectangle = (function () {
	    /**
	     * @param {Vector2} top
	     * @param {Vector2} right
	     * @param {Vector2} bottom
	     * @param {Vector2} left
	     */
	
	    function Rectangle(top, right, bottom, left) {
	        _classCallCheck(this, Rectangle);
	
	        this.top = top;
	        this.right = right;
	        this.bottom = bottom;
	        this.left = left;
	    }
	
	    _createClass(Rectangle, {
	        width: {
	            /**
	             * @returns {Number}
	             */
	
	            get: function () {
	                var _ref = this;
	
	                var right = _ref.right;
	                var left = _ref.left;
	
	                return right.x - left.x;
	            }
	        },
	        height: {
	            /**
	             * @returns {Number}
	             */
	
	            get: function () {
	                var _ref = this;
	
	                var bottom = _ref.bottom;
	                var top = _ref.top;
	
	                return bottom.y - top.y;
	            }
	        },
	        clone: {
	            /**
	             * @returns {Rectangle}
	             */
	
	            value: function clone() {
	                var _ref = this;
	
	                var top = _ref.top;
	                var right = _ref.right;
	                var bottom = _ref.bottom;
	                var left = _ref.left;
	
	                return new Rectangle(top.clone(), right.clone(), bottom.clone(), left.clone());
	            }
	        }
	    });
	
	    return Rectangle;
	})();
	
	module.exports = Rectangle;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map