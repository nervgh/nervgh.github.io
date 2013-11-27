/**
 * THE EXPANSION OF GLOBAL CONSTRUCTORS
 * @version: 2013-11-28
 * @author: nerv
 */



/**
 * NUMBER CONSTRUCTOR EXTENSIONS
 */

/**
 * Returns "true" if a value is number
 * @param {*} v A value
 * @return {Boolean}
 */
Number.isNumber = function(v) {
    return typeof v === 'number' && !isNaN(v);
};

/**
 * Returns "true" if a number is integer
 * @param {Number} n A number
 * @return {Boolean}
 */
Number.isInteger = function(n) {
    return (n | 0) === n;
};

/**
 * Returns "true" if a number is float
 * @param {Number} n A number
 * @return {Boolean}
 */
Number.isFloat = function(n) {
    return (n | 0) !== n;
};

/**
 * Returns "true" if a number is odd
 * @param {Number} n A integer number
 * @return {Boolean}
 */
Number.isOdd = function(n) {
    return (n & 1) === 1;
};

/**
 * Returns "true" if a number is even
 * @param {Number} n A integer number
 * @return {Boolean}
 */
Number.isEven = function(n) {
    return (n & 1) === 0;
};

/**
 * Returns "true" if remainder of the division is 0
 * @param {Number} n A dividend
 * @param {Number} d A divisor
 * @return {Boolean}
 */
Number.isDivided = function(n,d) {
    return (n % d) === 0;
};



/**
 * MATH CONSTRUCTOR EXTENSIONS
 */

/**
 * Returns Greatest Common Divisor / Highest Common Factor
 * @param {Number} u A positive integer number
 * @param {Number} v A positive integer number
 * @return {Number}
 */
Math.gcd = Math.hcf = function(u, v) {
    var shift = 0, diff = 0;

    if (u === 0 || v === 0) {
        return u | v;
    }

    for(; ((u | v) & 1) === 0; u >>= 1, v >>= 1, shift++);

    for(; (u & 1) === 0; u >>= 1);

    do {
        for(; (v & 1) === 0; v >>= 1);

        if (u < v) {
            v -= u;
        } else {
            diff = u - v;
            u = v;
            v = diff;
        }

    } while (v !== 0);

    return u << shift;
};

/**
 * Returns Least Common Multiple
 * @param {Number} u A positive integer number
 * @param {Number} v A positive integer number
 * @return {Number}
 */
Math.lcm = function(u, v) {
    return u * v / Math.gcd(u, v);
};

