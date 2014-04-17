module('Number')

    test('isNaN', function() {
        ok(Number.isNaN(NaN) === true, 'Number.isNaN(NaN) === true');
        ok(Number.isNaN(1.2) === false, 'Number.isNaN(1.2) === false');
    });

    test('isNumber', function() {
        ok(Number.isNumber("") === false, 'Number.isNumber("") === false');
        ok(Number.isNumber(0) === true, 'Number.isNumber(0) === true');
        ok(Number.isNumber(false) === false, 'Number.isNumber(false) === false');
        ok(Number.isNumber(NaN) === false, 'Number.isNumber(NaN) === false');
        ok(Number.isNumber(Infinity) === true, 'Number.isNumber(Infinity) === true');
        ok(Number.isNumber(null) === false, 'Number.isNumber(null) === false');
        ok(Number.isNumber(undefined) === false, 'Number.isNumber(undefined) === false');
        ok(Number.isNumber({}) === false, 'Number.isNumber({}) === false');
        ok(Number.isNumber([]) === false, 'Number.isNumber([]) === false');
        ok(Number.isNumber(new Date()) === false, 'Number.isNumber(new Date()) === false');
        ok(Number.isNumber(/test/) === false, 'Number.isNumber(/test/) === false');
        ok(Number.isNumber(12.301) === true, 'Number.isNumber(12.301) === true');
        ok(Number.isNumber(function(){}) === false, 'Number.isNumber(function(){}) === false');
    });

    test('isInteger', function() {
        ok(Number.isInteger(1) === true, 'Number.isInteger(1) === true');
        ok(Number.isInteger(1.2) === false, 'Number.isInteger(1.2) === false');
    });

    test('isFloat', function() {
        ok(Number.isFloat(1) === false, 'Number.isFloat(1) === false');
        ok(Number.isFloat(1.2) === true, 'Number.isFloat(1.2) === true');
    });

    test('isOdd', function() {
        ok(Number.isOdd(51) === true, 'Number.isOdd(51) === true');
        ok(Number.isOdd(64) === false, 'Number.isOdd(64) === false');
    });

    test('isEven', function() {
        ok(Number.isEven(51) === false, 'Number.isEven(51) === false');
        ok(Number.isEven(64) === true, 'Number.isEven(64) === true');
    });

// -------------------

module('Math')

    test('gcd', function() {
        ok(Math.gcd(100, 150) === 50, 'Math.gcd(100, 150) === 50');
        ok(Math.gcd(0, 21) === 21, 'Math.gcd(0, 21) === 21');
        ok(Math.gcd(2000, 440) === 40, 'Math.gcd(2000, 440) === 40');
    });

    test('lcm', function() {
        ok(Math.lcm(234, 1080) === 14040, 'Math.lcm(234, 1080) === 14040');
    });

// -------------------

module('Object')

    test('isObject', function() {
        ok(Object.isObject("") === false, 'Object.isObject("") === false');
        ok(Object.isObject(0) === false, 'Object.isObject(0) === false');
        ok(Object.isObject(false) === false, 'Object.isObject(false) === false');
        ok(Object.isObject(NaN) === false, 'Object.isObject(NaN) === false');
        ok(Object.isObject(Infinity) === false, 'Object.isObject(Infinity) === false');
        ok(Object.isObject(null) === false, 'Object.isObject(null) === false');
        ok(Object.isObject(undefined) === false, 'Object.isObject(undefined) === false');
        ok(Object.isObject({}) === true, 'Object.isObject({}) === true');
        ok(Object.isObject([]) === true, 'Object.isObject([]) === true');
        ok(Object.isObject(new Date()) === true, 'Object.isObject(new Date()) === true');
        ok(Object.isObject(/test/) === true, 'Object.isObject(/test/) === true');
        ok(Object.isObject(12.301) === false, 'Object.isObject(12.301) === false');
        ok(Object.isObject(function(){}) === true, 'Object.isObject(function(){}) === true');
    });

    test('isEqual', function() {
        ok(Object.isEqual('', ''), ' "" === "" ');
        ok(Object.isEqual(0, -0), '0 === -0');
        ok(Object.isEqual(false, false), 'false === false');
        ok(Object.isEqual(NaN, NaN), 'NaN === NaN');
        ok(Object.isEqual(Infinity, Infinity), 'Infinity === Infinity');
        ok(Object.isEqual(null, null), 'null === null');
        ok(Object.isEqual(undefined, undefined), 'undefined === undefined');
        ok(Object.isEqual({}, {}), 'Object.isEqual({}, {})');
        ok(Object.isEqual([], []), 'Object.isEqual([], [])');
        ok(Object.isEqual(new Date(), new Date()), 'Object.isEqual(new Date(), new Date())');
        ok(Object.isEqual(/test/gim, /test/mig), 'Object.isEqual(/test/gim, /test/mig)');
        ok(Object.isEqual(function(){}, function(){}), 'Object.isEqual(function(){}, function(){})');
//        ok(Object.isEqual(
//            [1, 2, 3, 'foo', true, NaN, null, undefined, new Date(), /bar/img, document.createElement],
//            [1, 2, 3, 'foo', true, NaN, null, undefined, new Date(), /bar/mig, document.createElement]
//        ), 'Object.isEqual([1, 2, 3, "foo", true, NaN, null, undefined, new Date(), /bar/img, document.createElement], ...');
//        ok(Object.isEqual(
//            { a: NaN, b: null, c: false, d: new Date(), e: /foo/igm, f: {b:2, a:1}, j: document, i: [{c:7}], k: isNaN, l: 'bar', m: undefined },
//            {m: undefined, l: 'bar', k: isNaN, i: [{c:7}], j: document, f:{a:1, b:2}, e: /foo/igm, d: new Date(), c: false, b: null, a: NaN }
//        ), '{ a: NaN, b: null, c: false, d: new Date(), e: /foo/igm, f: {b: 2, a: 1}, j: document, i: [{c: 7}], k: isNaN, l: "bar", m: undefined }');
        ok(Object.isEqual({a:1, b:2}, {a:1}) === false, 'Object.isEqual({a:1, b: 2}, {a: 1}) === false');
//        ok(Object.isEqual(document, {a:1}) === false, 'Object.isEqual(document, {a:1}) === false');
        ok(Object.isEqual([], {}) === false, 'Object.isEqual([], {}) === false');
        ok(Object.isEqual([1], []) === false, 'Object.isEqual([1], []) === false');
    });

    test('clone', function() {
        var obj1 = {
            a: 1,
            b: null,
            c: 'string',
            d: NaN,
            e: undefined,
            f: /[a-z]/gim,
            g: new Date(),
            h: {},
            i: [],
            j: function() {}
        };
        var obj2 = {
            a: obj1,
            b: [
                obj1,
                obj1
            ]
        };
        var clone1 = Object.clone(obj1);
        var clone2 = Object.clone(obj2);

        ok(JSON.stringify(clone1) === JSON.stringify(obj1), 'JSON.stringify(clone1) === JSON.stringify(obj1)');
        ok(JSON.stringify(clone2) === JSON.stringify(obj2), 'JSON.stringify(clone2) === JSON.stringify(obj2)');

        var arr1 = [1, 2, 3, obj1];
        var arr2 = [arr1, obj2];
        var clone3 = Object.clone(arr1);
        var clone4 = Object.clone(arr2);

        ok(JSON.stringify(clone3) === JSON.stringify(arr1), 'JSON.stringify(clone3) === JSON.stringify(arr1)');
        ok(JSON.stringify(clone4) === JSON.stringify(arr2), 'JSON.stringify(clone4) === JSON.stringify(arr2)');

        function Foo() {this.prop = obj1;}
        var obj3 = new Foo();
        var clone5 = Object.clone(obj3);

        ok(clone5 instanceof Foo, 'Supporting inheritance');

//        var obj4 = {};
//        Object.defineProperty(obj4, 'prop', {value: obj2, enumerable: true});
//        var clone6 = Object.clone(obj4);
//
//        ok(Object.isEqual(
//            Object.getOwnPropertyDescriptor(obj4, 'prop'),
//            Object.getOwnPropertyDescriptor(clone6, 'prop')
//        ), 'Cloning with descriptors');
    });


    test('assign', function() {
        var obj1 = {
            a: 1,
            b: null,
            c: 'string',
            d: NaN,
            e: undefined,
            f: /[a-z]/gim,
            g: new Date(),
            h: {},
            i: [],
            j: function() {}
        };
        var obj2 = Object.assign({}, obj1);
        ok(Object.isEqual(obj1, obj2), 'Object.isEqual(obj1, obj2)');
    });


    test('inherit', function() {
        function Foo() {
            var descriptor = Object.clone(Foo.descriptor);
            Object.defineProperties(this, descriptor);
        }
        Foo.descriptor = {
            prop: {
                value: 'test'
            }
        };
        function Bar() {
            Bar.super_.apply(this, arguments);
        }

        Object.inherit(Bar, Foo);

        var obj = new Bar();

        ok(Bar.super_ === Foo, 'Bar.super_ === Foo');
        ok(obj instanceof Foo, 'obj instanceof Foo');
        ok(obj.constructor === Bar, 'obj.constructor === Bar');
        ok(obj.prop === 'test', 'obj.prop === "test"');
    })


// -------------------

module('Boolean')

    test('isBoolean', function() {
        ok(Boolean.isBoolean("") === false, 'Boolean.isBoolean("") === false');
        ok(Boolean.isBoolean(0) === false, 'Boolean.isBoolean(0) === false');
        ok(Boolean.isBoolean(false) === true, 'Boolean.isBoolean(false) === true');
        ok(Boolean.isBoolean(NaN) === false, 'Boolean.isBoolean(NaN) === false');
        ok(Boolean.isBoolean(Infinity) === false, 'Boolean.isBoolean(Infinity) === false');
        ok(Boolean.isBoolean(null) === false, 'Boolean.isBoolean(null) === false');
        ok(Boolean.isBoolean(undefined) === false, 'Boolean.isBoolean(undefined) === false');
        ok(Boolean.isBoolean({}) === false, 'Boolean.isBoolean({}) === false');
        ok(Boolean.isBoolean([]) === false, 'Boolean.isBoolean([]) === false');
        ok(Boolean.isBoolean(new Date()) === false, 'Boolean.isBoolean(new Date()) === false');
        ok(Boolean.isBoolean(/test/) === false, 'Boolean.isBoolean(/test/) === false');
        ok(Boolean.isBoolean(12.301) === false, 'Boolean.isBoolean(12.301) === false');
        ok(Boolean.isBoolean(function(){}) === false, 'Boolean.isBoolean(function(){}) === false');
    });

// -------------------

module('String')

    test('isString', function() {
        ok(String.isString("") === true, 'String.isString("") === true');
        ok(String.isString(0) === false, 'String.isString(0) === false');
        ok(String.isString(false) === false, 'String.isString(false) === false');
        ok(String.isString(NaN) === false, 'String.isString(NaN) === false');
        ok(String.isString(Infinity) === false, 'String.isString(Infinity) === false');
        ok(String.isString(null) === false, 'String.isString(null) === false');
        ok(String.isString(undefined) === false, 'String.isString(undefined) === false');
        ok(String.isString({}) === false, 'String.isString({}) === false');
        ok(String.isString([]) === false, 'String.isString([]) === false');
        ok(String.isString(new Date()) === false, 'String.isString(new Date()) === false');
        ok(String.isString(/test/) === false, 'String.isString(/test/) === false');
        ok(String.isString(12.301) === false, 'String.isString(12.301) === false');
        ok(String.isString(function(){}) === false, 'String.isString(function(){}) === false');
    });

// -------------------

module('Function')

    test('isFunction', function() {
        ok(Function.isFunction("") === false, 'Function.isFunction("") === false');
        ok(Function.isFunction(0) === false, 'Function.isFunction(0) === false');
        ok(Function.isFunction(false) === false, 'Function.isFunction(false) === false');
        ok(Function.isFunction(NaN) === false, 'Function.isFunction(NaN) === false');
        ok(Function.isFunction(Infinity) === false, 'Function.isFunction(Infinity) === false');
        ok(Function.isFunction(null) === false, 'Function.isFunction(null) === false');
        ok(Function.isFunction(undefined) === false, 'Function.isFunction(undefined) === false');
        ok(Function.isFunction({}) === false, 'Function.isFunction({}) === false');
        ok(Function.isFunction([]) === false, 'Function.isFunction([]) === false');
        ok(Function.isFunction(new Date()) === false, 'Function.isFunction(new Date()) === false');
        ok(Function.isFunction(/test/) === false, 'Function.isFunction(/test/) === false');
        ok(Function.isFunction(12.301) === false, 'Function.isFunction(12.301) === false');
        ok(Function.isFunction(function(){}) === true, 'Function.isFunction(function(){}) === true');
    });
    
// -------------------

module('Date')

    test('isDate', function() {
        ok(Date.isDate("") === false, 'Date.isDate("") === false');
        ok(Date.isDate(0) === false, 'Date.isDate(0) === false');
        ok(Date.isDate(false) === false, 'Date.isDate(false) === false');
        ok(Date.isDate(NaN) === false, 'Date.isDate(NaN) === false');
        ok(Date.isDate(Infinity) === false, 'Date.isDate(Infinity) === false');
        ok(Date.isDate(null) === false, 'Date.isDate(null) === false');
        ok(Date.isDate(undefined) === false, 'Date.isDate(undefined) === false');
        ok(Date.isDate({}) === false, 'Date.isDate({}) === false');
        ok(Date.isDate([]) === false, 'Date.isDate([]) === false');
        ok(Date.isDate(new Date()) === true, 'Date.isDate(new Date()) === true');
        ok(Date.isDate(/test/) === false, 'Date.isDate(/test/) === false');
        ok(Date.isDate(12.301) === false, 'Date.isDate(12.301) === false');
        ok(Date.isDate(function(){}) === false, 'Date.isDate(function(){}) === false');
    });

// -------------------

module('RegExp')
    
    test('isRegExp', function() {
        ok(RegExp.isRegExp("") === false, 'RegExp.isRegExp("") === false');
        ok(RegExp.isRegExp(0) === false, 'RegExp.isRegExp(0) === false');
        ok(RegExp.isRegExp(false) === false, 'RegExp.isRegExp(false) === false');
        ok(RegExp.isRegExp(NaN) === false, 'RegExp.isRegExp(NaN) === false');
        ok(RegExp.isRegExp(Infinity) === false, 'RegExp.isRegExp(Infinity) === false');
        ok(RegExp.isRegExp(null) === false, 'RegExp.isRegExp(null) === false');
        ok(RegExp.isRegExp(undefined) === false, 'RegExp.isRegExp(undefined) === false');
        ok(RegExp.isRegExp({}) === false, 'RegExp.isRegExp({}) === false');
        ok(RegExp.isRegExp([]) === false, 'RegExp.isRegExp([]) === false');
        ok(RegExp.isRegExp(new Date()) === false, 'RegExp.isRegExp(new Date()) === false');
        ok(RegExp.isRegExp(/test/) === true, 'RegExp.isRegExp(/test/) === true');
        ok(RegExp.isRegExp(12.301) === false, 'RegExp.isRegExp(12.301) === false');
        ok(RegExp.isRegExp(function(){}) === false, 'RegExp.isRegExp(function(){}) === false');
    });

// -------------------

module('Array')

    test('isArray', function() {
        ok(Array.isArray("") === false, 'Array.isArray("") === false');
        ok(Array.isArray(0) === false, 'Array.isArray(0) === false');
        ok(Array.isArray(false) === false, 'Array.isArray(false) === false');
        ok(Array.isArray(NaN) === false, 'Array.isArray(NaN) === false');
        ok(Array.isArray(Infinity) === false, 'Array.isArray(Infinity) === false');
        ok(Array.isArray(null) === false, 'Array.isArray(null) === false');
        ok(Array.isArray(undefined) === false, 'Array.isArray(undefined) === false');
        ok(Array.isArray({}) === false, 'Array.isArray({}) === false');
        ok(Array.isArray([]) === true, 'Array.isArray([]) === true');
        ok(Array.isArray(new Date()) === false, 'Array.isArray(new Date()) === false');
        ok(Array.isArray(/test/) === false, 'Array.isArray(/test/) === false');
        ok(Array.isArray(12.301) === false, 'Array.isArray(12.301) === false');
        ok(Array.isArray(function(){}) === false, 'Array.isArray(function(){}) === false');
    });

// -------------------

module('Functions')

    test('isNull', function() {
        ok(isNull("") === false, 'isNull("") === false');
        ok(isNull(0) === false, 'isNull(0) === false');
        ok(isNull(false) === false, 'isNull(false) === false');
        ok(isNull(NaN) === false, 'isNull(NaN) === false');
        ok(isNull(Infinity) === false, 'isNull(Infinity) === false');
        ok(isNull(null) === true, 'isNull(null) === true');
        ok(isNull(undefined) === false, 'isNull(undefined) === false');
        ok(isNull({}) === false, 'isNull({}) === false');
        ok(isNull([]) === false, 'isNull([]) === false');
        ok(isNull(new Date()) === false, 'isNull(new Date()) === false');
        ok(isNull(/test/) === false, 'isNull(/test/) === false');
        ok(isNull(12.301) === false, 'isNull(12.301) === false');
        ok(isNull(function(){}) === false, 'isNull(function(){}) === false');
    });

    test('isUndefined', function() {
        ok(isUndefined("") === false, 'isUndefined("") === false');
        ok(isUndefined(0) === false, 'isUndefined(0) === false');
        ok(isUndefined(false) === false, 'isUndefined(false) === false');
        ok(isUndefined(NaN) === false, 'isUndefined(NaN) === false');
        ok(isUndefined(Infinity) === false, 'isUndefined(Infinity) === false');
        ok(isUndefined(null) === false, 'isUndefined(null) === false');
        ok(isUndefined(undefined) === true, 'isUndefined(undefined) === true');
        ok(isUndefined({}) === false, 'isUndefined({}) === false');
        ok(isUndefined([]) === false, 'isUndefined([]) === false');
        ok(isUndefined(new Date()) === false, 'isUndefined(new Date()) === false');
        ok(isUndefined(/test/) === false, 'isUndefined(/test/) === false');
        ok(isUndefined(12.301) === false, 'isUndefined(12.301) === false');
        ok(isUndefined(function(){}) === false, 'isUndefined(function(){}) === false');
    });

    test('isPrimitive', function() {
        ok(isPrimitive("") === true, 'isPrimitive("") === true');
        ok(isPrimitive(0) === true, 'isPrimitive(0) === true');
        ok(isPrimitive(12.301) === true, 'isPrimitive(12.301) === true');
        ok(isPrimitive(false) === true, 'isPrimitive(false) === true');
        ok(isPrimitive(NaN) === true, 'isPrimitive(NaN) === true');
        ok(isPrimitive(Infinity) === true, 'isPrimitive(Infinity) === true');
        ok(isPrimitive(null) === true, 'isPrimitive(null) === true');
        ok(isPrimitive(undefined) === true, 'isPrimitive(undefined) === true');
        ok(isPrimitive({}) === false, 'isPrimitive({}) === false');
        ok(isPrimitive([]) === false, 'isPrimitive([]) === false');
        ok(isPrimitive(new Date()) === false, 'isPrimitive(new Date()) === false');
        ok(isPrimitive(/test/) === false, 'isPrimitive(/test/) === false');
        ok(isPrimitive(function(){}) === false, 'isPrimitive(function(){}) === false');
    });

    test('isElement', function() {
        ok(isElement("") === false, 'isElement("") === false');
        ok(isElement(0) === false, 'isElement(0) === false');
        ok(isElement(12.301) === false, 'isElement(12.301) === false');
        ok(isElement(false) === false, 'isElement(false) === false');
        ok(isElement(NaN) === false, 'isElement(NaN) === false');
        ok(isElement(Infinity) === false, 'isElement(Infinity) === false');
        ok(isElement(null) === false, 'isElement(null) === false');
        ok(isElement(undefined) === false, 'isElement(undefined) === false');
        ok(isElement({}) === false, 'isElement({}) === false');
        ok(isElement([]) === false, 'isElement([]) === false');
        ok(isElement(new Date()) === false, 'isElement(new Date()) === false');
        ok(isElement(/test/) === false, 'isElement(/test/) === false');
        ok(isElement(function(){}) === false, 'isElement(function(){}) === false');
        ok(isElement(document), 'isElement(document)');
        ok(isElement(document.body), 'isElement(document.body)');
    });