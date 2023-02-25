"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Throttler = void 0;
var stream_1 = require("stream");
var Throttler = /** @class */ (function (_super) {
    __extends(Throttler, _super);
    function Throttler(delay) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.delay = delay;
        return _this;
    }
    Throttler.prototype._transform = function (chunk, encoding, callback) {
        this.push(chunk);
        if (this.delay > 0) {
            setTimeout(callback, this.delay);
        }
        else {
            callback();
        }
    };
    return Throttler;
}(stream_1.Transform));
exports.Throttler = Throttler;
//# sourceMappingURL=Throttler.js.map