"use strict";
exports.__esModule = true;
exports.Ace = void 0;
var Ace = /** @class */ (function () {
    function Ace() {
        this.deny = false;
        this.rights = 65535;
    }
    Ace.resetfullcontrol = function (item) {
        if (typeof item.rights === "number") {
            // for (var i = 0; i < item.ace_right_bits; i++) {
            //     Ace.setBit(item, i + 1);
            // }
            item.rights = 65535;
        }
        else {
            item.rights = "//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8=";
        }
    };
    Ace.resetnone = function (item) {
        if (typeof item.rights === "number") {
            item.rights = 0;
        }
        else {
            item.rights = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA=";
        }
    };
    Ace._base64ToArrayBuffer = function (base64) {
        var binarystring = null;
        try {
            binarystring = Buffer.from(base64, 'base64').toString('binary');
        }
        catch (error) {
            console.log(base64);
            throw error;
        }
        var len = binarystring.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            var ascii = binarystring.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes.buffer;
    };
    Ace._arrayBufferToBase64 = function (arraybuffer) {
        var binary = '';
        var bytes = new Uint8Array(arraybuffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return Buffer.from(binary, 'binary').toString('base64');
        return window.btoa(binary);
    };
    Ace.isBitSet = function (item, bit) {
        bit--;
        // if rights is number
        var currentValue = item.rights;
        var mask = 1 << bit;
        if (bit == -2) {
            if (item.rights == Ace.full_control || item.rights == "//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8=") {
                return true;
            }
            for (var i = 0; i < Ace.ace_right_bits; i++) {
                if (!Ace.isBitSet(item, i)) {
                    return false;
                }
            }
        }
        if (typeof currentValue === "number") {
        }
        else {
            var rights = item.rights;
            // if (typeof rights === "string" || typeof rights === "object") {
            if (typeof rights === "object") {
                rights = JSON.stringify(item.rights);
            }
            else if (Array.isArray(rights)) {
                rights = JSON.stringify(item.rights);
            }
            var buf = Ace._base64ToArrayBuffer(rights);
            var view = new Uint8Array(buf);
            var octet = Math.floor(bit / 8);
            currentValue = view[octet];
            var _bit = (bit % 8);
            mask = Math.pow(2, _bit);
            // tslint:disable-next-line: no-bitwise
        }
        return (currentValue & mask) !== 0;
    };
    Ace.setBit = function (item, bit) {
        bit--;
        var currentValue = item.rights;
        var mask = 1 << bit;
        if (typeof currentValue === "number") {
            // @ts-ignore
            item.rights |= mask;
        }
        else {
            var rights = item.rights;
            if (typeof rights === "object") {
                rights = JSON.stringify(item.rights);
            }
            else if (Array.isArray(rights)) {
                rights = JSON.stringify(item.rights);
            }
            var buf = Ace._base64ToArrayBuffer(rights);
            var view = new Uint8Array(buf);
            var octet = Math.floor(bit / 8);
            currentValue = view[octet];
            var _bit = (bit % 8);
            mask = Math.pow(2, _bit);
            // tslint:disable-next-line: no-bitwise
            var newValue = currentValue | mask;
            view[octet] = newValue;
            item.rights = Ace._arrayBufferToBase64(view);
        }
        return item.rights;
    };
    Ace.unsetBit = function (item, bit) {
        bit--;
        var currentValue = item.rights;
        var mask = 1 << bit;
        if (typeof currentValue === "number") {
            // @ts-ignore
            item.rights = currentValue &= ~mask;
        }
        else {
            var rights = item.rights;
            if (typeof rights === "object") {
                rights = JSON.stringify(item.rights);
            }
            var buf = Ace._base64ToArrayBuffer(rights);
            var view = new Uint8Array(buf);
            var octet = Math.floor(bit / 8);
            currentValue = view[octet];
            var _bit = (bit % 8);
            mask = Math.pow(2, _bit);
            // tslint:disable-next-line: no-bitwise
            var newValue = currentValue &= ~mask;
            view[octet] = newValue;
            item.rights = Ace._arrayBufferToBase64(view);
        }
        return item.rights;
    };
    Ace.toogleBit = function (item, bit) {
        if (Ace.isBitSet(item, bit)) {
            Ace.unsetBit(item, bit);
        }
        else {
            Ace.setBit(item, bit);
        }
    };
    Ace.ace_right_bits = 16;
    Ace.full_control = 65535;
    return Ace;
}());
exports.Ace = Ace;
//# sourceMappingURL=Ace.js.map