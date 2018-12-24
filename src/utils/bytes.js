/**
 * intToHexArray
 *
 * @param {number} int - the number to be converted to hex
 * @param {number)} size - the desired width of the hex value. will pad.
 *
 * @returns {string[]}
 */
export var intToHexArray = function (int, size) {
    var hex = [];
    var hexRep = [];
    var hexVal = int.toString(16);
    // TODO: this really needs to be refactored.
    for (var i = 0; i < hexVal.length; i++) {
        hexRep[i] = hexVal[i].toString();
    }
    for (var i = 0; i < size - hexVal.length; i++) {
        hex.push('0');
    }
    for (var i = 0; i < hexVal.length; i++) {
        hex.push(hexRep[i]);
    }
    return hex;
};
/**
 * intToByteArray
 *
 * Converts a number to Uint8Array
 *
 * @param {number} num
 * @param {number} size
 *
 * @returns {Uint8Array}
 */
export var intToByteArray = function (num, size) {
    var x = num;
    var res = [];
    while (x > 0) {
        res.push(x & 255);
        x = x >> 8;
    }
    var pad = size - res.length;
    for (var i = 0; i < pad; i++) {
        res.unshift(0);
    }
    return Uint8Array.from(res);
};
/**
 * hexToByteArray
 *
 * Convers a hex string to a Uint8Array
 *
 * @param {string} hex
 * @returns {Uint8Array}
 */
export var hexToByteArray = function (hex) {
    var res = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) {
        res[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return res;
};
/**
 * hexToIntArray
 *
 * @param {string} hex
 * @returns {number[]}
 */
export var hexToIntArray = function (hex) {
    if (!hex || !isHex(hex)) {
        return [];
    }
    var res = [];
    for (var i = 0; i < hex.length; i++) {
        var c = hex.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        hi ? res.push(hi, lo) : res.push(lo);
    }
    return res;
};
/**
 * compareBytes
 *
 * A constant time HMAC comparison function.
 *
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export var isEqual = function (a, b) {
    var bzA = hexToIntArray(a);
    var bzB = hexToIntArray(b);
    if (bzA.length !== bzB.length) {
        return false;
    }
    var result = 0;
    for (var i = 0; i < bzA.length; i++) {
        result |= bzA[i] ^ bzB[i];
    }
    return result === 0;
};
/**
 * isHex
 *
 * @param {string} str - string to be tested
 * @returns {boolean}
 */
export var isHex = function (str) {
    var plain = str.replace('0x', '');
    return /[0-9a-f]*$/i.test(plain);
};
//# sourceMappingURL=bytes.js.map