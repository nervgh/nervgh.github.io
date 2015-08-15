'use strict';


/**
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples
 * @see https://learn.javascript.ru/number#случайное-целое-от-min-до-max
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
/**
 * @param {Array} array
 * @param {Number} count
 * @returns {Array}
 */
export function randomItems(array, count) {
    let stack = new Array(count);
    let max = array.length - 1;
    for(let index = 0; index < count; index++, max--) {
        let randomIndex = randomInteger(0, max);
        stack[index] = array[randomIndex];
    }
    return stack;
}
/**
 * @returns {undefined}
 */
export function noOperation() {
}