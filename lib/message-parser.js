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
exports.messageParser = void 0;
var config_1 = require("./config");
var info = config_1.config.info, err = config_1.config.err, warn = config_1.config.warn;
var stream_1 = require("stream");
var crypto = require("crypto");
var base_1 = require("./proto/base");
function getChecksum(buffer) {
    var hash = crypto.createHash("sha256");
    hash.update(buffer);
    var checksum = hash.digest("hex");
    return checksum;
}
var messageParser = /** @class */ (function (_super) {
    __extends(messageParser, _super);
    function messageParser() {
        var _this = _super.call(this, { objectMode: true }) || this;
        // this.bufferSize = 1024 * 128;
        _this.DecreaseTimeCheck = 60;
        _this.basebufferSize = 5 * 1024 * 1024;
        _this.bufferSize = _this.basebufferSize;
        _this.buffer = Buffer.alloc(_this.bufferSize);
        _this.maxMessagesQueue = 100;
        // this.bufferIncrement = 1024 * 128;
        _this.bufferIncrement = 10 * 1024 * 1024;
        _this.seq = 0;
        _this.readPointer = 0; // read pointer to keep track of data added
        _this.writePointer = 0; // write pointer to keep track of data processed
        _this.maxWritePointer = 0;
        _this.lastDecreased = new Date();
        _this.messages = [];
        return _this;
    }
    messageParser.prototype._transform = function (buffer, encoding, callback) {
        try {
            var newsize = this.calculateMaxBufferSize();
            // let newsize = this.writePointer + buffer.length;
            if (this.writePointer + buffer.length > newsize) {
                newsize = newsize + this.bufferIncrement;
            }
            if (newsize != this.buffer.length) {
                var dir = "increased";
                if (newsize < this.buffer.length)
                    dir = "decreased";
                this.bufferSize = newsize;
                var newbuff = Buffer.alloc(this.bufferSize);
                this.buffer.copy(newbuff);
                this.buffer = newbuff;
                // show warning as either byte, kilobyte or megabyte
                if (this.bufferSize > 1024 * 1024)
                    warn("Buffer size " + dir + " to " + (this.bufferSize / 1024 / 1024).toFixed(2) + " MB");
                else if (this.bufferSize > 1024)
                    warn("Buffer size " + dir + " to " + (this.bufferSize / 1024).toFixed(2) + " KB");
                else
                    warn("Buffer size " + dir + " to " + this.bufferSize + " bytes");
            }
            // this.buffer.copy(buffer, this.bufferIndex);
            buffer.copy(this.buffer, this.writePointer);
            this.writePointer += buffer.length;
            if (this.writePointer > this.maxWritePointer) {
                this.maxWritePointer = this.writePointer;
            }
            do {
                var datalen = this.writePointer - this.readPointer;
                if (datalen < 4) {
                    break;
                }
                var size = (this.buffer[this.readPointer + 3] << 24) + (this.buffer[this.readPointer + 2] << 16) + (this.buffer[this.readPointer + 1] << 8) + this.buffer[this.readPointer];
                if (datalen < size + 4) {
                    break;
                }
                if (size == 0) {
                    warn("Received empty message !!!! removing 4 from buffer");
                    this.writePointer -= 4;
                    continue;
                }
                if (size < 0) {
                    err("Received invalid size " + size + " removing 4 from buffer");
                    return callback(new Error("Invalid size " + size));
                }
                // Decode the message 
                var start = this.readPointer + 4;
                var end = start + size;
                var messagebuffer = Buffer.allocUnsafe(size);
                this.buffer.copy(messagebuffer, 0, start, end);
                // const message = this.Envelope.decode(messagebuffer);
                var message = base_1.Envelope.decode(messagebuffer);
                // buffer = buffer.subarray(size + 4);
                this.readPointer += size + 4;
                if (this.readPointer == this.writePointer) {
                    this.readPointer = 0;
                    this.writePointer = 0;
                }
                // var s = (size + 4);
                // this.writePointer -= s;
                // this.buffer.copy(this.buffer, 0, size + 4);
                if (config_1.config.role == "client") {
                    config_1.config.dumpdata(messagebuffer);
                }
                // if (config.ChecksumCheckPackages) {
                //   const hash = (message.hash == '' ? '' : getChecksum(message.data));
                //   if (hash != message.hash) {
                //     return callback(new Error("Checksum mismatch got " + message.hash + " but expected " + hash));
                //   }
                // }
                if (this.seq > message.seq) {
                    err("sequence " + message.seq + " is lower than last received sequence number " + (this.seq - 1));
                    return callback(new Error("sequence " + message.seq + " is lower than last received sequence number " + (this.seq - 1)));
                }
                this.messages.push(message);
                // this.push(message);
            } while (true);
            this.messages.sort(function (a, b) { return a.seq - b.seq; });
            while (this.messages.length > 0 && this.messages[0].seq == this.seq) {
                var message_1 = this.messages.shift();
                this.push(message_1);
                this.seq++;
            }
            if (this.messages.length > this.maxMessagesQueue) {
                err("Too many messages in queue " + this.messages.length);
                return callback(new Error("Too many messages in queue " + this.messages.length));
            }
            return callback();
        }
        catch (error) {
            err("Error in _transform " + error);
            return callback(error);
        }
    };
    messageParser.prototype.calculateMaxBufferSize = function () {
        var now = new Date();
        // @ts-ignore
        var diff = now - this.lastDecreased;
        var result = this.buffer.length;
        if (diff > (this.DecreaseTimeCheck * 1000)) {
            this.lastDecreased = now;
            if (this.maxWritePointer > 0) {
                result = this.maxWritePointer;
                result -= this.bufferIncrement;
                if (result < this.basebufferSize)
                    result = this.basebufferSize;
                this.maxWritePointer = 0;
            }
        }
        return result;
    };
    messageParser.prototype._flush = function (callback) {
        callback();
    };
    return messageParser;
}(stream_1.Transform));
exports.messageParser = messageParser;
//# sourceMappingURL=message-parser.js.map