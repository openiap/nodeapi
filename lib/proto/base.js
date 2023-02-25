"use strict";
exports.__esModule = true;
exports.FlowServiceClientImpl = exports.User = exports.Role = exports.RefreshToken = exports.SigninResponse = exports.SigninRequest = exports.CustomCommandResponse = exports.CustomCommandRequest = exports.Stat = exports.EndStream = exports.Stream = exports.BeginStream = exports.UploadResponse = exports.UploadRequest = exports.DownloadResponse = exports.DownloadRequest = exports.GetElementResponse = exports.GetElementRequest = exports.ErrorResponse = exports.PingResponse = exports.PingRequest = exports.Envelope = exports.protobufPackage = void 0;
/* eslint-disable */
var _m0 = require("protobufjs/minimal");
var operators_1 = require("rxjs/operators");
var any_1 = require("./google/protobuf/any");
var timestamp_1 = require("./google/protobuf/timestamp");
var querys_1 = require("./querys");
var queues_1 = require("./queues");
var watch_1 = require("./watch");
var workitems_1 = require("./workitems");
exports.protobufPackage = "openiap";
function createBaseEnvelope() {
    return { command: "", priority: 0, seq: 0, id: "", rid: "", data: undefined, jwt: "", traceid: "", spanid: "" };
}
exports.Envelope = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.command !== "") {
            writer.uint32(10).string(message.command);
        }
        if (message.priority !== 0) {
            writer.uint32(16).int32(message.priority);
        }
        if (message.seq !== 0) {
            writer.uint32(24).int32(message.seq);
        }
        if (message.id !== "") {
            writer.uint32(34).string(message.id);
        }
        if (message.rid !== "") {
            writer.uint32(42).string(message.rid);
        }
        if (message.data !== undefined) {
            any_1.Any.encode(message.data, writer.uint32(50).fork()).ldelim();
        }
        if (message.jwt !== "") {
            writer.uint32(58).string(message.jwt);
        }
        if (message.traceid !== "") {
            writer.uint32(66).string(message.traceid);
        }
        if (message.spanid !== "") {
            writer.uint32(74).string(message.spanid);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseEnvelope();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.command = reader.string();
                    break;
                case 2:
                    message.priority = reader.int32();
                    break;
                case 3:
                    message.seq = reader.int32();
                    break;
                case 4:
                    message.id = reader.string();
                    break;
                case 5:
                    message.rid = reader.string();
                    break;
                case 6:
                    message.data = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.jwt = reader.string();
                    break;
                case 8:
                    message.traceid = reader.string();
                    break;
                case 9:
                    message.spanid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            command: isSet(object.command) ? String(object.command) : "",
            priority: isSet(object.priority) ? Number(object.priority) : 0,
            seq: isSet(object.seq) ? Number(object.seq) : 0,
            id: isSet(object.id) ? String(object.id) : "",
            rid: isSet(object.rid) ? String(object.rid) : "",
            data: isSet(object.data) ? any_1.Any.fromJSON(object.data) : undefined,
            jwt: isSet(object.jwt) ? String(object.jwt) : "",
            traceid: isSet(object.traceid) ? String(object.traceid) : "",
            spanid: isSet(object.spanid) ? String(object.spanid) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.command !== undefined && (obj.command = message.command);
        message.priority !== undefined && (obj.priority = Math.round(message.priority));
        message.seq !== undefined && (obj.seq = Math.round(message.seq));
        message.id !== undefined && (obj.id = message.id);
        message.rid !== undefined && (obj.rid = message.rid);
        message.data !== undefined && (obj.data = message.data ? any_1.Any.toJSON(message.data) : undefined);
        message.jwt !== undefined && (obj.jwt = message.jwt);
        message.traceid !== undefined && (obj.traceid = message.traceid);
        message.spanid !== undefined && (obj.spanid = message.spanid);
        return obj;
    },
    create: function (base) {
        return exports.Envelope.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var message = createBaseEnvelope();
        message.command = (_a = object.command) !== null && _a !== void 0 ? _a : "";
        message.priority = (_b = object.priority) !== null && _b !== void 0 ? _b : 0;
        message.seq = (_c = object.seq) !== null && _c !== void 0 ? _c : 0;
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : "";
        message.rid = (_e = object.rid) !== null && _e !== void 0 ? _e : "";
        message.data = (object.data !== undefined && object.data !== null) ? any_1.Any.fromPartial(object.data) : undefined;
        message.jwt = (_f = object.jwt) !== null && _f !== void 0 ? _f : "";
        message.traceid = (_g = object.traceid) !== null && _g !== void 0 ? _g : "";
        message.spanid = (_h = object.spanid) !== null && _h !== void 0 ? _h : "";
        return message;
    }
};
function createBasePingRequest() {
    return {};
}
exports.PingRequest = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBasePingRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    create: function (base) {
        return exports.PingRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (_) {
        var message = createBasePingRequest();
        return message;
    }
};
function createBasePingResponse() {
    return {};
}
exports.PingResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBasePingResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    create: function (base) {
        return exports.PingResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (_) {
        var message = createBasePingResponse();
        return message;
    }
};
function createBaseErrorResponse() {
    return { message: "", code: 0, stack: "" };
}
exports.ErrorResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        if (message.code !== 0) {
            writer.uint32(16).int32(message.code);
        }
        if (message.stack !== "") {
            writer.uint32(26).string(message.stack);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseErrorResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.stack = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            message: isSet(object.message) ? String(object.message) : "",
            code: isSet(object.code) ? Number(object.code) : 0,
            stack: isSet(object.stack) ? String(object.stack) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.message !== undefined && (obj.message = message.message);
        message.code !== undefined && (obj.code = Math.round(message.code));
        message.stack !== undefined && (obj.stack = message.stack);
        return obj;
    },
    create: function (base) {
        return exports.ErrorResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseErrorResponse();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        message.code = (_b = object.code) !== null && _b !== void 0 ? _b : 0;
        message.stack = (_c = object.stack) !== null && _c !== void 0 ? _c : "";
        return message;
    }
};
function createBaseGetElementRequest() {
    return { xpath: "" };
}
exports.GetElementRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.xpath !== "") {
            writer.uint32(10).string(message.xpath);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseGetElementRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.xpath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { xpath: isSet(object.xpath) ? String(object.xpath) : "" };
    },
    toJSON: function (message) {
        var obj = {};
        message.xpath !== undefined && (obj.xpath = message.xpath);
        return obj;
    },
    create: function (base) {
        return exports.GetElementRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseGetElementRequest();
        message.xpath = (_a = object.xpath) !== null && _a !== void 0 ? _a : "";
        return message;
    }
};
function createBaseGetElementResponse() {
    return { xpath: "" };
}
exports.GetElementResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.xpath !== "") {
            writer.uint32(10).string(message.xpath);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseGetElementResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.xpath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { xpath: isSet(object.xpath) ? String(object.xpath) : "" };
    },
    toJSON: function (message) {
        var obj = {};
        message.xpath !== undefined && (obj.xpath = message.xpath);
        return obj;
    },
    create: function (base) {
        return exports.GetElementResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseGetElementResponse();
        message.xpath = (_a = object.xpath) !== null && _a !== void 0 ? _a : "";
        return message;
    }
};
function createBaseDownloadRequest() {
    return { id: "", filename: "" };
}
exports.DownloadRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.filename !== "") {
            writer.uint32(18).string(message.filename);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseDownloadRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.filename = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            filename: isSet(object.filename) ? String(object.filename) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.filename !== undefined && (obj.filename = message.filename);
        return obj;
    },
    create: function (base) {
        return exports.DownloadRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseDownloadRequest();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.filename = (_b = object.filename) !== null && _b !== void 0 ? _b : "";
        return message;
    }
};
function createBaseDownloadResponse() {
    return { id: "", filename: "", mimetype: "" };
}
exports.DownloadResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.filename !== "") {
            writer.uint32(18).string(message.filename);
        }
        if (message.mimetype !== "") {
            writer.uint32(26).string(message.mimetype);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseDownloadResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.filename = reader.string();
                    break;
                case 3:
                    message.mimetype = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            filename: isSet(object.filename) ? String(object.filename) : "",
            mimetype: isSet(object.mimetype) ? String(object.mimetype) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.filename !== undefined && (obj.filename = message.filename);
        message.mimetype !== undefined && (obj.mimetype = message.mimetype);
        return obj;
    },
    create: function (base) {
        return exports.DownloadResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseDownloadResponse();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.filename = (_b = object.filename) !== null && _b !== void 0 ? _b : "";
        message.mimetype = (_c = object.mimetype) !== null && _c !== void 0 ? _c : "";
        return message;
    }
};
function createBaseUploadRequest() {
    return { filename: "", mimetype: "" };
}
exports.UploadRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.filename !== "") {
            writer.uint32(10).string(message.filename);
        }
        if (message.mimetype !== "") {
            writer.uint32(18).string(message.mimetype);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseUploadRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filename = reader.string();
                    break;
                case 2:
                    message.mimetype = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            filename: isSet(object.filename) ? String(object.filename) : "",
            mimetype: isSet(object.mimetype) ? String(object.mimetype) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.filename !== undefined && (obj.filename = message.filename);
        message.mimetype !== undefined && (obj.mimetype = message.mimetype);
        return obj;
    },
    create: function (base) {
        return exports.UploadRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseUploadRequest();
        message.filename = (_a = object.filename) !== null && _a !== void 0 ? _a : "";
        message.mimetype = (_b = object.mimetype) !== null && _b !== void 0 ? _b : "";
        return message;
    }
};
function createBaseUploadResponse() {
    return { id: "", filename: "", bytes: 0, chunks: 0, mb: 0, elapsedTime: 0, mbps: 0 };
}
exports.UploadResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.filename !== "") {
            writer.uint32(18).string(message.filename);
        }
        if (message.bytes !== 0) {
            writer.uint32(24).int32(message.bytes);
        }
        if (message.chunks !== 0) {
            writer.uint32(32).int32(message.chunks);
        }
        if (message.mb !== 0) {
            writer.uint32(45).float(message.mb);
        }
        if (message.elapsedTime !== 0) {
            writer.uint32(48).int32(message.elapsedTime);
        }
        if (message.mbps !== 0) {
            writer.uint32(61).float(message.mbps);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseUploadResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.filename = reader.string();
                    break;
                case 3:
                    message.bytes = reader.int32();
                    break;
                case 4:
                    message.chunks = reader.int32();
                    break;
                case 5:
                    message.mb = reader.float();
                    break;
                case 6:
                    message.elapsedTime = reader.int32();
                    break;
                case 7:
                    message.mbps = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            filename: isSet(object.filename) ? String(object.filename) : "",
            bytes: isSet(object.bytes) ? Number(object.bytes) : 0,
            chunks: isSet(object.chunks) ? Number(object.chunks) : 0,
            mb: isSet(object.mb) ? Number(object.mb) : 0,
            elapsedTime: isSet(object.elapsedTime) ? Number(object.elapsedTime) : 0,
            mbps: isSet(object.mbps) ? Number(object.mbps) : 0
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.filename !== undefined && (obj.filename = message.filename);
        message.bytes !== undefined && (obj.bytes = Math.round(message.bytes));
        message.chunks !== undefined && (obj.chunks = Math.round(message.chunks));
        message.mb !== undefined && (obj.mb = message.mb);
        message.elapsedTime !== undefined && (obj.elapsedTime = Math.round(message.elapsedTime));
        message.mbps !== undefined && (obj.mbps = message.mbps);
        return obj;
    },
    create: function (base) {
        return exports.UploadResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f, _g;
        var message = createBaseUploadResponse();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.filename = (_b = object.filename) !== null && _b !== void 0 ? _b : "";
        message.bytes = (_c = object.bytes) !== null && _c !== void 0 ? _c : 0;
        message.chunks = (_d = object.chunks) !== null && _d !== void 0 ? _d : 0;
        message.mb = (_e = object.mb) !== null && _e !== void 0 ? _e : 0;
        message.elapsedTime = (_f = object.elapsedTime) !== null && _f !== void 0 ? _f : 0;
        message.mbps = (_g = object.mbps) !== null && _g !== void 0 ? _g : 0;
        return message;
    }
};
function createBaseBeginStream() {
    return { checksum: "", stat: undefined };
}
exports.BeginStream = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.checksum !== "") {
            writer.uint32(10).string(message.checksum);
        }
        if (message.stat !== undefined) {
            exports.Stat.encode(message.stat, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseBeginStream();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.checksum = reader.string();
                    break;
                case 2:
                    message.stat = exports.Stat.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            checksum: isSet(object.checksum) ? String(object.checksum) : "",
            stat: isSet(object.stat) ? exports.Stat.fromJSON(object.stat) : undefined
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.checksum !== undefined && (obj.checksum = message.checksum);
        message.stat !== undefined && (obj.stat = message.stat ? exports.Stat.toJSON(message.stat) : undefined);
        return obj;
    },
    create: function (base) {
        return exports.BeginStream.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseBeginStream();
        message.checksum = (_a = object.checksum) !== null && _a !== void 0 ? _a : "";
        message.stat = (object.stat !== undefined && object.stat !== null) ? exports.Stat.fromPartial(object.stat) : undefined;
        return message;
    }
};
function createBaseStream() {
    return { data: new Uint8Array() };
}
exports.Stream = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseStream();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array() };
    },
    toJSON: function (message) {
        var obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create: function (base) {
        return exports.Stream.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseStream();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    }
};
function createBaseEndStream() {
    return {};
}
exports.EndStream = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseEndStream();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    create: function (base) {
        return exports.EndStream.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (_) {
        var message = createBaseEndStream();
        return message;
    }
};
function createBaseStat() {
    return {
        birthtimeMs: 0,
        blksize: 0,
        blocks: 0,
        ctime: undefined,
        ctimeMs: 0,
        dev: 0,
        gid: 0,
        ino: 0,
        mode: 0,
        mtime: undefined,
        mtimeMs: 0,
        nlink: 0,
        rdev: 0,
        size: 0,
        uid: 0
    };
}
exports.Stat = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.birthtimeMs !== 0) {
            writer.uint32(13).float(message.birthtimeMs);
        }
        if (message.blksize !== 0) {
            writer.uint32(16).int32(message.blksize);
        }
        if (message.blocks !== 0) {
            writer.uint32(24).int32(message.blocks);
        }
        if (message.ctime !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.ctime), writer.uint32(34).fork()).ldelim();
        }
        if (message.ctimeMs !== 0) {
            writer.uint32(45).float(message.ctimeMs);
        }
        if (message.dev !== 0) {
            writer.uint32(48).int32(message.dev);
        }
        if (message.gid !== 0) {
            writer.uint32(56).int32(message.gid);
        }
        if (message.ino !== 0) {
            writer.uint32(64).int32(message.ino);
        }
        if (message.mode !== 0) {
            writer.uint32(72).int32(message.mode);
        }
        if (message.mtime !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.mtime), writer.uint32(82).fork()).ldelim();
        }
        if (message.mtimeMs !== 0) {
            writer.uint32(93).float(message.mtimeMs);
        }
        if (message.nlink !== 0) {
            writer.uint32(96).int32(message.nlink);
        }
        if (message.rdev !== 0) {
            writer.uint32(104).int32(message.rdev);
        }
        if (message.size !== 0) {
            writer.uint32(112).int32(message.size);
        }
        if (message.uid !== 0) {
            writer.uint32(120).int32(message.uid);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseStat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.birthtimeMs = reader.float();
                    break;
                case 2:
                    message.blksize = reader.int32();
                    break;
                case 3:
                    message.blocks = reader.int32();
                    break;
                case 4:
                    message.ctime = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.ctimeMs = reader.float();
                    break;
                case 6:
                    message.dev = reader.int32();
                    break;
                case 7:
                    message.gid = reader.int32();
                    break;
                case 8:
                    message.ino = reader.int32();
                    break;
                case 9:
                    message.mode = reader.int32();
                    break;
                case 10:
                    message.mtime = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 11:
                    message.mtimeMs = reader.float();
                    break;
                case 12:
                    message.nlink = reader.int32();
                    break;
                case 13:
                    message.rdev = reader.int32();
                    break;
                case 14:
                    message.size = reader.int32();
                    break;
                case 15:
                    message.uid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            birthtimeMs: isSet(object.birthtimeMs) ? Number(object.birthtimeMs) : 0,
            blksize: isSet(object.blksize) ? Number(object.blksize) : 0,
            blocks: isSet(object.blocks) ? Number(object.blocks) : 0,
            ctime: isSet(object.ctime) ? fromJsonTimestamp(object.ctime) : undefined,
            ctimeMs: isSet(object.ctimeMs) ? Number(object.ctimeMs) : 0,
            dev: isSet(object.dev) ? Number(object.dev) : 0,
            gid: isSet(object.gid) ? Number(object.gid) : 0,
            ino: isSet(object.ino) ? Number(object.ino) : 0,
            mode: isSet(object.mode) ? Number(object.mode) : 0,
            mtime: isSet(object.mtime) ? fromJsonTimestamp(object.mtime) : undefined,
            mtimeMs: isSet(object.mtimeMs) ? Number(object.mtimeMs) : 0,
            nlink: isSet(object.nlink) ? Number(object.nlink) : 0,
            rdev: isSet(object.rdev) ? Number(object.rdev) : 0,
            size: isSet(object.size) ? Number(object.size) : 0,
            uid: isSet(object.uid) ? Number(object.uid) : 0
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.birthtimeMs !== undefined && (obj.birthtimeMs = message.birthtimeMs);
        message.blksize !== undefined && (obj.blksize = Math.round(message.blksize));
        message.blocks !== undefined && (obj.blocks = Math.round(message.blocks));
        message.ctime !== undefined && (obj.ctime = message.ctime.toISOString());
        message.ctimeMs !== undefined && (obj.ctimeMs = message.ctimeMs);
        message.dev !== undefined && (obj.dev = Math.round(message.dev));
        message.gid !== undefined && (obj.gid = Math.round(message.gid));
        message.ino !== undefined && (obj.ino = Math.round(message.ino));
        message.mode !== undefined && (obj.mode = Math.round(message.mode));
        message.mtime !== undefined && (obj.mtime = message.mtime.toISOString());
        message.mtimeMs !== undefined && (obj.mtimeMs = message.mtimeMs);
        message.nlink !== undefined && (obj.nlink = Math.round(message.nlink));
        message.rdev !== undefined && (obj.rdev = Math.round(message.rdev));
        message.size !== undefined && (obj.size = Math.round(message.size));
        message.uid !== undefined && (obj.uid = Math.round(message.uid));
        return obj;
    },
    create: function (base) {
        return exports.Stat.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var message = createBaseStat();
        message.birthtimeMs = (_a = object.birthtimeMs) !== null && _a !== void 0 ? _a : 0;
        message.blksize = (_b = object.blksize) !== null && _b !== void 0 ? _b : 0;
        message.blocks = (_c = object.blocks) !== null && _c !== void 0 ? _c : 0;
        message.ctime = (_d = object.ctime) !== null && _d !== void 0 ? _d : undefined;
        message.ctimeMs = (_e = object.ctimeMs) !== null && _e !== void 0 ? _e : 0;
        message.dev = (_f = object.dev) !== null && _f !== void 0 ? _f : 0;
        message.gid = (_g = object.gid) !== null && _g !== void 0 ? _g : 0;
        message.ino = (_h = object.ino) !== null && _h !== void 0 ? _h : 0;
        message.mode = (_j = object.mode) !== null && _j !== void 0 ? _j : 0;
        message.mtime = (_k = object.mtime) !== null && _k !== void 0 ? _k : undefined;
        message.mtimeMs = (_l = object.mtimeMs) !== null && _l !== void 0 ? _l : 0;
        message.nlink = (_m = object.nlink) !== null && _m !== void 0 ? _m : 0;
        message.rdev = (_o = object.rdev) !== null && _o !== void 0 ? _o : 0;
        message.size = (_p = object.size) !== null && _p !== void 0 ? _p : 0;
        message.uid = (_q = object.uid) !== null && _q !== void 0 ? _q : 0;
        return message;
    }
};
function createBaseCustomCommandRequest() {
    return { command: "", id: "", name: "", data: "" };
}
exports.CustomCommandRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.command !== "") {
            writer.uint32(10).string(message.command);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.data !== "") {
            writer.uint32(34).string(message.data);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseCustomCommandRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.command = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            command: isSet(object.command) ? String(object.command) : "",
            id: isSet(object.id) ? String(object.id) : "",
            name: isSet(object.name) ? String(object.name) : "",
            data: isSet(object.data) ? String(object.data) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.command !== undefined && (obj.command = message.command);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.data !== undefined && (obj.data = message.data);
        return obj;
    },
    create: function (base) {
        return exports.CustomCommandRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseCustomCommandRequest();
        message.command = (_a = object.command) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.name = (_c = object.name) !== null && _c !== void 0 ? _c : "";
        message.data = (_d = object.data) !== null && _d !== void 0 ? _d : "";
        return message;
    }
};
function createBaseCustomCommandResponse() {
    return { result: "" };
}
exports.CustomCommandResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.result !== "") {
            writer.uint32(10).string(message.result);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseCustomCommandResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { result: isSet(object.result) ? String(object.result) : "" };
    },
    toJSON: function (message) {
        var obj = {};
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    create: function (base) {
        return exports.CustomCommandResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseCustomCommandResponse();
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : "";
        return message;
    }
};
function createBaseSigninRequest() {
    return {
        username: "",
        password: "",
        jwt: "",
        ping: false,
        validateonly: false,
        agent: "",
        version: "",
        longtoken: false
    };
}
exports.SigninRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.username !== "") {
            writer.uint32(10).string(message.username);
        }
        if (message.password !== "") {
            writer.uint32(18).string(message.password);
        }
        if (message.jwt !== "") {
            writer.uint32(26).string(message.jwt);
        }
        if (message.ping === true) {
            writer.uint32(32).bool(message.ping);
        }
        if (message.validateonly === true) {
            writer.uint32(40).bool(message.validateonly);
        }
        if (message.agent !== "") {
            writer.uint32(50).string(message.agent);
        }
        if (message.version !== "") {
            writer.uint32(58).string(message.version);
        }
        if (message.longtoken === true) {
            writer.uint32(64).bool(message.longtoken);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseSigninRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.username = reader.string();
                    break;
                case 2:
                    message.password = reader.string();
                    break;
                case 3:
                    message.jwt = reader.string();
                    break;
                case 4:
                    message.ping = reader.bool();
                    break;
                case 5:
                    message.validateonly = reader.bool();
                    break;
                case 6:
                    message.agent = reader.string();
                    break;
                case 7:
                    message.version = reader.string();
                    break;
                case 8:
                    message.longtoken = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            username: isSet(object.username) ? String(object.username) : "",
            password: isSet(object.password) ? String(object.password) : "",
            jwt: isSet(object.jwt) ? String(object.jwt) : "",
            ping: isSet(object.ping) ? Boolean(object.ping) : false,
            validateonly: isSet(object.validateonly) ? Boolean(object.validateonly) : false,
            agent: isSet(object.agent) ? String(object.agent) : "",
            version: isSet(object.version) ? String(object.version) : "",
            longtoken: isSet(object.longtoken) ? Boolean(object.longtoken) : false
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.username !== undefined && (obj.username = message.username);
        message.password !== undefined && (obj.password = message.password);
        message.jwt !== undefined && (obj.jwt = message.jwt);
        message.ping !== undefined && (obj.ping = message.ping);
        message.validateonly !== undefined && (obj.validateonly = message.validateonly);
        message.agent !== undefined && (obj.agent = message.agent);
        message.version !== undefined && (obj.version = message.version);
        message.longtoken !== undefined && (obj.longtoken = message.longtoken);
        return obj;
    },
    create: function (base) {
        return exports.SigninRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var message = createBaseSigninRequest();
        message.username = (_a = object.username) !== null && _a !== void 0 ? _a : "";
        message.password = (_b = object.password) !== null && _b !== void 0 ? _b : "";
        message.jwt = (_c = object.jwt) !== null && _c !== void 0 ? _c : "";
        message.ping = (_d = object.ping) !== null && _d !== void 0 ? _d : false;
        message.validateonly = (_e = object.validateonly) !== null && _e !== void 0 ? _e : false;
        message.agent = (_f = object.agent) !== null && _f !== void 0 ? _f : "";
        message.version = (_g = object.version) !== null && _g !== void 0 ? _g : "";
        message.longtoken = (_h = object.longtoken) !== null && _h !== void 0 ? _h : false;
        return message;
    }
};
function createBaseSigninResponse() {
    return { jwt: "", user: undefined };
}
exports.SigninResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.jwt !== "") {
            writer.uint32(10).string(message.jwt);
        }
        if (message.user !== undefined) {
            exports.User.encode(message.user, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseSigninResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.jwt = reader.string();
                    break;
                case 2:
                    message.user = exports.User.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            jwt: isSet(object.jwt) ? String(object.jwt) : "",
            user: isSet(object.user) ? exports.User.fromJSON(object.user) : undefined
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.jwt !== undefined && (obj.jwt = message.jwt);
        message.user !== undefined && (obj.user = message.user ? exports.User.toJSON(message.user) : undefined);
        return obj;
    },
    create: function (base) {
        return exports.SigninResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseSigninResponse();
        message.jwt = (_a = object.jwt) !== null && _a !== void 0 ? _a : "";
        message.user = (object.user !== undefined && object.user !== null) ? exports.User.fromPartial(object.user) : undefined;
        return message;
    }
};
function createBaseRefreshToken() {
    return { username: "", jwt: "", user: undefined };
}
exports.RefreshToken = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.username !== "") {
            writer.uint32(10).string(message.username);
        }
        if (message.jwt !== "") {
            writer.uint32(18).string(message.jwt);
        }
        if (message.user !== undefined) {
            exports.User.encode(message.user, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseRefreshToken();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.username = reader.string();
                    break;
                case 2:
                    message.jwt = reader.string();
                    break;
                case 3:
                    message.user = exports.User.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            username: isSet(object.username) ? String(object.username) : "",
            jwt: isSet(object.jwt) ? String(object.jwt) : "",
            user: isSet(object.user) ? exports.User.fromJSON(object.user) : undefined
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.username !== undefined && (obj.username = message.username);
        message.jwt !== undefined && (obj.jwt = message.jwt);
        message.user !== undefined && (obj.user = message.user ? exports.User.toJSON(message.user) : undefined);
        return obj;
    },
    create: function (base) {
        return exports.RefreshToken.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseRefreshToken();
        message.username = (_a = object.username) !== null && _a !== void 0 ? _a : "";
        message.jwt = (_b = object.jwt) !== null && _b !== void 0 ? _b : "";
        message.user = (object.user !== undefined && object.user !== null) ? exports.User.fromPartial(object.user) : undefined;
        return message;
    }
};
function createBaseRole() {
    return { _id: "", name: "" };
}
exports.Role = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message._id !== "") {
            writer.uint32(10).string(message._id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseRole();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message._id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { _id: isSet(object._id) ? String(object._id) : "", name: isSet(object.name) ? String(object.name) : "" };
    },
    toJSON: function (message) {
        var obj = {};
        message._id !== undefined && (obj._id = message._id);
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    create: function (base) {
        return exports.Role.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseRole();
        message._id = (_a = object._id) !== null && _a !== void 0 ? _a : "";
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        return message;
    }
};
function createBaseUser() {
    return { _id: "", name: "", username: "", email: "", roles: [] };
}
exports.User = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message._id !== "") {
            writer.uint32(10).string(message._id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.username !== "") {
            writer.uint32(26).string(message.username);
        }
        if (message.email !== "") {
            writer.uint32(34).string(message.email);
        }
        for (var _i = 0, _a = message.roles; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.Role.encode(v, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseUser();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message._id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.username = reader.string();
                    break;
                case 4:
                    message.email = reader.string();
                    break;
                case 5:
                    message.roles.push(exports.Role.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            _id: isSet(object._id) ? String(object._id) : "",
            name: isSet(object.name) ? String(object.name) : "",
            username: isSet(object.username) ? String(object.username) : "",
            email: isSet(object.email) ? String(object.email) : "",
            roles: Array.isArray(object === null || object === void 0 ? void 0 : object.roles) ? object.roles.map(function (e) { return exports.Role.fromJSON(e); }) : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message._id !== undefined && (obj._id = message._id);
        message.name !== undefined && (obj.name = message.name);
        message.username !== undefined && (obj.username = message.username);
        message.email !== undefined && (obj.email = message.email);
        if (message.roles) {
            obj.roles = message.roles.map(function (e) { return e ? exports.Role.toJSON(e) : undefined; });
        }
        else {
            obj.roles = [];
        }
        return obj;
    },
    create: function (base) {
        return exports.User.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e;
        var message = createBaseUser();
        message._id = (_a = object._id) !== null && _a !== void 0 ? _a : "";
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        message.username = (_c = object.username) !== null && _c !== void 0 ? _c : "";
        message.email = (_d = object.email) !== null && _d !== void 0 ? _d : "";
        message.roles = ((_e = object.roles) === null || _e === void 0 ? void 0 : _e.map(function (e) { return exports.Role.fromPartial(e); })) || [];
        return message;
    }
};
var FlowServiceClientImpl = /** @class */ (function () {
    function FlowServiceClientImpl(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "openiap.FlowService";
        this.rpc = rpc;
        this.SetupStream = this.SetupStream.bind(this);
        this.Signin = this.Signin.bind(this);
        this.Download = this.Download.bind(this);
        this.Upload = this.Upload.bind(this);
        this.CustomCommand = this.CustomCommand.bind(this);
        this.ListCollections = this.ListCollections.bind(this);
        this.DropCollection = this.DropCollection.bind(this);
        this.Query = this.Query.bind(this);
        this.GetDocumentVersion = this.GetDocumentVersion.bind(this);
        this.Aggregate = this.Aggregate.bind(this);
        this.Count = this.Count.bind(this);
        this.InsertOne = this.InsertOne.bind(this);
        this.InsertMany = this.InsertMany.bind(this);
        this.UpdateOne = this.UpdateOne.bind(this);
        this.UpdateDocument = this.UpdateDocument.bind(this);
        this.InsertOrUpdateOne = this.InsertOrUpdateOne.bind(this);
        this.InsertOrUpdateMany = this.InsertOrUpdateMany.bind(this);
        this.DeleteOne = this.DeleteOne.bind(this);
        this.DeleteMany = this.DeleteMany.bind(this);
        this.RegisterQueue = this.RegisterQueue.bind(this);
        this.RegisterExchange = this.RegisterExchange.bind(this);
        this.QueueMessage = this.QueueMessage.bind(this);
        this.UnRegisterQueue = this.UnRegisterQueue.bind(this);
        this.Watch = this.Watch.bind(this);
        this.UnWatch = this.UnWatch.bind(this);
        this.PushWorkitem = this.PushWorkitem.bind(this);
        this.PushWorkitems = this.PushWorkitems.bind(this);
        this.UpdateWorkitem = this.UpdateWorkitem.bind(this);
        this.PopWorkitem = this.PopWorkitem.bind(this);
        this.DeleteWorkitem = this.DeleteWorkitem.bind(this);
        this.AddWorkItemQueue = this.AddWorkItemQueue.bind(this);
    }
    FlowServiceClientImpl.prototype.SetupStream = function (request) {
        var data = request.pipe((0, operators_1.map)(function (request) { return exports.Envelope.encode(request).finish(); }));
        var result = this.rpc.bidirectionalStreamingRequest(this.service, "SetupStream", data);
        return result.pipe((0, operators_1.map)(function (data) { return exports.Envelope.decode(new _m0.Reader(data)); }));
    };
    FlowServiceClientImpl.prototype.Signin = function (request) {
        var data = exports.SigninRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Signin", data);
        return promise.then(function (data) { return exports.SigninResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.Download = function (request) {
        var data = exports.DownloadRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Download", data);
        return promise.then(function (data) { return exports.DownloadResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.Upload = function (request) {
        var data = exports.UploadRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Upload", data);
        return promise.then(function (data) { return exports.UploadResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.CustomCommand = function (request) {
        var data = exports.CustomCommandRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "CustomCommand", data);
        return promise.then(function (data) { return exports.CustomCommandResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.ListCollections = function (request) {
        var data = querys_1.ListCollectionsRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "ListCollections", data);
        return promise.then(function (data) { return querys_1.ListCollectionsResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.DropCollection = function (request) {
        var data = querys_1.DropCollectionRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "DropCollection", data);
        return promise.then(function (data) { return querys_1.DropCollectionResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.Query = function (request) {
        var data = querys_1.QueryRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Query", data);
        return promise.then(function (data) { return querys_1.QueryResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.GetDocumentVersion = function (request) {
        var data = querys_1.GetDocumentVersionRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "GetDocumentVersion", data);
        return promise.then(function (data) { return querys_1.GetDocumentVersionResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.Aggregate = function (request) {
        var data = querys_1.AggregateRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Aggregate", data);
        return promise.then(function (data) { return querys_1.AggregateResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.Count = function (request) {
        var data = querys_1.CountRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Count", data);
        return promise.then(function (data) { return querys_1.CountResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.InsertOne = function (request) {
        var data = querys_1.InsertOneRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "InsertOne", data);
        return promise.then(function (data) { return querys_1.InsertOneResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.InsertMany = function (request) {
        var data = querys_1.InsertManyRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "InsertMany", data);
        return promise.then(function (data) { return querys_1.InsertManyResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.UpdateOne = function (request) {
        var data = querys_1.UpdateOneRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "UpdateOne", data);
        return promise.then(function (data) { return querys_1.UpdateOneResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.UpdateDocument = function (request) {
        var data = querys_1.UpdateDocumentRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "UpdateDocument", data);
        return promise.then(function (data) { return querys_1.UpdateDocumentResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.InsertOrUpdateOne = function (request) {
        var data = querys_1.InsertOrUpdateOneRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "InsertOrUpdateOne", data);
        return promise.then(function (data) { return querys_1.InsertOrUpdateOneResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.InsertOrUpdateMany = function (request) {
        var data = querys_1.InsertOrUpdateManyRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "InsertOrUpdateMany", data);
        return promise.then(function (data) { return querys_1.InsertOrUpdateManyResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.DeleteOne = function (request) {
        var data = querys_1.DeleteOneRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "DeleteOne", data);
        return promise.then(function (data) { return querys_1.DeleteOneResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.DeleteMany = function (request) {
        var data = querys_1.DeleteManyRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "DeleteMany", data);
        return promise.then(function (data) { return querys_1.DeleteManyResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.RegisterQueue = function (request) {
        var data = queues_1.RegisterQueueRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "RegisterQueue", data);
        return promise.then(function (data) { return queues_1.RegisterQueueResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.RegisterExchange = function (request) {
        var data = queues_1.RegisterExchangeRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "RegisterExchange", data);
        return promise.then(function (data) { return queues_1.RegisterExchangeResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.QueueMessage = function (request) {
        var data = queues_1.QueueMessageRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "QueueMessage", data);
        return promise.then(function (data) { return queues_1.QueueMessageResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.UnRegisterQueue = function (request) {
        var data = queues_1.UnRegisterQueueRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "UnRegisterQueue", data);
        return promise.then(function (data) { return queues_1.UnRegisterQueueResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.Watch = function (request) {
        var data = watch_1.WatchRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Watch", data);
        return promise.then(function (data) { return watch_1.WatchResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.UnWatch = function (request) {
        var data = watch_1.UnWatchRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "UnWatch", data);
        return promise.then(function (data) { return watch_1.UnWatchResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.PushWorkitem = function (request) {
        var data = workitems_1.PushWorkitemRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "PushWorkitem", data);
        return promise.then(function (data) { return workitems_1.PushWorkitemResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.PushWorkitems = function (request) {
        var data = workitems_1.PushWorkitemsRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "PushWorkitems", data);
        return promise.then(function (data) { return workitems_1.PushWorkitemsResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.UpdateWorkitem = function (request) {
        var data = workitems_1.UpdateWorkitemRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "UpdateWorkitem", data);
        return promise.then(function (data) { return workitems_1.UpdateWorkitemResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.PopWorkitem = function (request) {
        var data = workitems_1.PopWorkitemRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "PopWorkitem", data);
        return promise.then(function (data) { return workitems_1.PopWorkitemResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.DeleteWorkitem = function (request) {
        var data = workitems_1.DeleteWorkitemRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "DeleteWorkitem", data);
        return promise.then(function (data) { return workitems_1.DeleteWorkitemResponse.decode(new _m0.Reader(data)); });
    };
    FlowServiceClientImpl.prototype.AddWorkItemQueue = function (request) {
        var data = workitems_1.AddWorkItemQueueRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "AddWorkItemQueue", data);
        return promise.then(function (data) { return workitems_1.AddWorkItemQueueResponse.decode(new _m0.Reader(data)); });
    };
    return FlowServiceClientImpl;
}());
exports.FlowServiceClientImpl = FlowServiceClientImpl;
var tsProtoGlobalThis = (function () {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        var bin = tsProtoGlobalThis.atob(b64);
        var arr = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        var bin_1 = [];
        arr.forEach(function (byte) {
            bin_1.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin_1.join(""));
    }
}
function toTimestamp(date) {
    var seconds = date.getTime() / 1000;
    var nanos = (date.getTime() % 1000) * 1000000;
    return { seconds: seconds, nanos: nanos };
}
function fromTimestamp(t) {
    var millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=base.js.map