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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ServerError = exports.protowrap = void 0;
var config_1 = require("./config");
var info = config_1.config.info, err = config_1.config.err, warn = config_1.config.warn;
var message_parser_1 = require("./message-parser");
// import { messageParser } from "./message-parser.buffer.concat";
// import { FlowService, FlowServiceClientImpl } from "./proto/base"
var iostream = require("stream");
// import * as  express from "express";
var WebSocket = require("ws");
var protobuf = require("protobufjs");
var https = require("https");
var http = require("http");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var net = require("net");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var Throttler_1 = require("./Throttler");
var client_1 = require("./client");
var any_1 = require("./proto/google/protobuf/any");
var base_1 = require("./proto/base");
var api_1 = require("@opentelemetry/api");
var protowrap = /** @class */ (function () {
    function protowrap() {
    }
    protowrap.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paths, basepath, files, i, file, packageDefinition, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = [];
                        basepath = path.join(__dirname, "proto");
                        if (!fs.existsSync(path.join(basepath, "base.proto"))) {
                            basepath = path.join(__dirname, "..", "proto");
                        }
                        if (!fs.existsSync(path.join(basepath, "base.proto"))) {
                            basepath = path.join(__dirname, "../node_modules/@openiap/proto");
                        }
                        if (!fs.existsSync(path.join(basepath, "base.proto"))) {
                            throw new Error("base.proto not found");
                        }
                        files = fs.readdirSync(basepath);
                        for (i = 0; i < files.length; i++) {
                            file = files[i];
                            if (file.endsWith(".proto")) {
                                paths.push(path.join(basepath, file));
                            }
                        }
                        return [4 /*yield*/, protoLoader.load(paths, {
                                keepCase: true,
                                longs: String,
                                enums: String,
                                defaults: true,
                                oneofs: true
                            })];
                    case 1:
                        packageDefinition = _b.sent();
                        this.openiap_proto = grpc.loadPackageDefinition(packageDefinition).openiap;
                        _a = this;
                        return [4 /*yield*/, protobuf.load(paths)];
                    case 2:
                        _a.protoRoot = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    protowrap.CommandToProto = function (command) {
        switch (command) {
            case "error":
                return "openiap.ErrorResponse";
            case "grpcservice":
                return "openiap.FlowService";
            case "pong":
                return "openiap.PingResponse";
            default:
                var searchkey = command;
                if (searchkey.endsWith("reply")) {
                    searchkey = (searchkey.substring(0, searchkey.length - 5) + "Response").toLowerCase();
                }
                else {
                    searchkey = (searchkey + "Request").toLowerCase();
                    ;
                }
                var keys = Object.keys(this.openiap_proto);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (key.toLowerCase() == searchkey || key.toLowerCase() == command.toLowerCase()) {
                        return "openiap." + key;
                    }
                }
                return "openiap." + command;
        }
    };
    protowrap.pack = function (command, payload) {
        if (payload == null)
            return null;
        var protomsg = this.protoRoot.lookupType(this.CommandToProto(command));
        if (protomsg == null)
            return null;
        if (typeof payload == "string") {
            payload = JSON.parse(payload);
        }
        var type_url = "type.googleapis.com/" + this.CommandToProto(command);
        var value = protomsg.encode(payload).finish();
        return { type_url: type_url, value: value };
    };
    protowrap.unpack = function (message) {
        var command = message.command, data = message.data;
        var rid = message.id;
        var msg = data;
        if (command != null) {
            var protomsg = this.protoRoot.lookupType(this.CommandToProto(command));
            if (typeof data == "string") {
                msg = JSON.parse(data);
            }
            else if (data != null) {
                try {
                    if (data.type_url != null) {
                        if (data.value.data) { // REST, so json parsed buffer {type: 'Buffer', data: [...]}
                            msg = protomsg.decode(data.value.data);
                        }
                        else {
                            msg = protomsg.decode(data.value);
                        }
                    }
                    else {
                        msg = protomsg.decode(data);
                    }
                }
                catch (error) {
                    msg = data.toString();
                    if (msg.startsWith("{")) {
                        msg = JSON.parse(msg);
                    }
                    else {
                        throw new Error("Failed decoding openiap." + command + " : " + error.message);
                    }
                }
            }
        }
        var reply = { command: command, rid: rid, data: null };
        return [command, msg, reply];
    };
    protowrap.RPC = function (client, payload) {
        var _a = this._RPC(client, payload), id = _a[0], promise = _a[1];
        return promise;
    };
    protowrap._RPC = function (client, payload) {
        var _this = this;
        var id = Math.random().toString(36).substring(2, 11);
        // const id = client.seq.toString();
        var promise = new Promise(function (resolve, reject) {
            var _a;
            var dt = new Date();
            var command = payload.command;
            var _payload = __assign({}, payload);
            delete _payload.id;
            var ctx = (_a = api_1.trace.getSpan(api_1.context.active())) === null || _a === void 0 ? void 0 : _a.spanContext();
            if (ctx != null) {
                if (_payload.traceid == null || _payload.traceid == "")
                    _payload.traceid = ctx.traceId;
                if (_payload.spanid == null || _payload.spanid == "")
                    _payload.spanid = ctx.spanId;
            }
            if (config_1.config.doDumpRPCTraceIds && _payload.traceid != null && _payload.traceid != "") {
                // info("RPC: " + command + " traceId: " + _payload.traceid + " spanId: " + _payload.spanid);
            }
            client.replies[id] = { resolve: resolve, reject: reject, dt: dt, command: command };
            _this.sendMesssag(client, __assign({ id: id }, _payload), id, true);
        });
        return [id, promise];
    };
    protowrap.SetStream = function (client, stream, rid) {
        client.streams[rid] = { stream: stream, chunks: 0, bytes: 0 };
        return client.streams[rid];
    };
    protowrap.CreateStream = function (client, stream, payload) {
        var _this = this;
        // const id = Math.random().toString(36).substring(2, 11);
        var id = client.seq.toString();
        return new Promise(function (resolve, reject) {
            var dt = new Date();
            var command = payload.command;
            var _payload = __assign({}, payload);
            _payload.id = id;
            client.streams[id] = { stream: stream, chunks: 0, bytes: 0 };
            client.replies[id] = { resolve: resolve, reject: reject, dt: dt, command: command };
            _this.sendMesssag(client, _payload, id, true);
        });
    };
    protowrap.DownloadFile = function (client, id, collectionname, filename, folder, highWaterMark) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var temp, name, ws, startTime, packdata, _a, rid, promise, s;
            var _this = this;
            return __generator(this, function (_b) {
                temp = false;
                if (filename == null || filename == "") {
                    temp = true;
                    filename = Math.random().toString(36).substring(2, 11) + ".tmp";
                }
                if (folder != null && folder != "") {
                    filename = path.join(folder, filename);
                }
                name = filename;
                if (!name || name == "")
                    name = path.basename(filename);
                if (fs.existsSync(filename))
                    fs.unlinkSync(filename);
                ws = fs.createWriteStream(filename, { highWaterMark: highWaterMark });
                startTime = new Date().getTime();
                packdata = any_1.Any.create({ type_url: "type.googleapis.com/openiap.DownloadRequest", value: base_1.DownloadRequest.encode(base_1.DownloadRequest.create({ id: id, filename: filename, collectionname: collectionname })).finish() });
                _a = this._RPC(client, { command: "download", data: packdata }), rid = _a[0], promise = _a[1];
                promise["catch"](function (err) {
                    reject(err);
                });
                s = this.SetStream(client, ws, rid);
                // if(config.ThrottlerMS > 0) {
                //   rs.pipe(new Throttler(config.ThrottlerMS)).pipe(ws);
                // } else {
                //   rs.pipe(ws);
                // }
                ws.on("finish", function () { return __awaiter(_this, void 0, void 0, function () {
                    var checksum, test, msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                ws.end();
                                if (!s.checksum) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.getFileChecksum(name)];
                            case 1:
                                checksum = _a.sent();
                                if (checksum != s.checksum) {
                                    return [2 /*return*/, reject(new Error("File checksum mismatch"))];
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                if (config_1.config.ChecksumCheckFiles) {
                                    warn("No checksum for file available");
                                }
                                _a.label = 3;
                            case 3: return [4 /*yield*/, promise];
                            case 4:
                                test = _a.sent();
                                msg = base_1.DownloadResponse.decode(test.data.value);
                                s.filename = msg.filename;
                                if (temp) {
                                    if (folder != null && folder != "") {
                                        fs.renameSync(filename, path.join(folder, msg.filename));
                                    }
                                    else {
                                        fs.renameSync(filename, msg.filename);
                                    }
                                }
                                s.bytes = ws.bytesWritten;
                                s.bytesWritten = ws.bytesWritten;
                                s.mb = ws.bytesWritten / (1024 * 1024);
                                s.elapsedTime = new Date().getTime() - startTime;
                                s.mbps = s.mb / (s.elapsedTime / 1000);
                                resolve(s);
                                return [2 /*return*/];
                        }
                    });
                }); });
                ws.on("error", function (err) {
                    reject(err);
                });
                return [2 /*return*/];
            });
        }); });
    };
    protowrap.sendFileContent = function (client, rid, filename, highWaterMark) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var chunks, bytes, name, stat, checksum, readStream, packdata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chunks = 0;
                        bytes = 0;
                        name = path.basename(filename);
                        stat = fs.statSync(filename);
                        checksum = "";
                        if (!config_1.config.ChecksumCheckFiles) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getFileChecksum(filename)];
                    case 1:
                        checksum = _a.sent();
                        _a.label = 2;
                    case 2:
                        readStream = fs.createReadStream(filename, { highWaterMark: highWaterMark });
                        packdata = any_1.Any.create({ type_url: "type.googleapis.com/openiap.BeginStream", value: base_1.BeginStream.encode(base_1.BeginStream.create({ checksum: checksum, stat: stat })).finish() });
                        this.sendMesssag(client, { rid: rid, command: "beginstream", data: packdata }, "", true);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, config_1.config.BeginstreamDelay); })];
                    case 3:
                        _a.sent();
                        readStream.on("open", function () {
                        });
                        readStream.on("end", function () {
                            setTimeout(function () {
                                try {
                                    _this.sendMesssag(client, { rid: rid, command: "endstream", data: undefined }, "", true);
                                    var mb = bytes / (1024 * 1024);
                                    resolve({ rid: rid, chunks: chunks, bytes: bytes, mb: mb });
                                }
                                catch (error) {
                                    try {
                                        reject(error);
                                    }
                                    catch (error) {
                                        err(error);
                                    }
                                }
                            }, config_1.config.EndstreamDelay);
                        });
                        readStream.on("error", function (error) {
                            reject(error);
                        });
                        if (config_1.config.ThrottlerMS > 0) {
                            readStream.pipe(new Throttler_1.Throttler(config_1.config.ThrottlerMS)).on("data", function (chunk) {
                                chunks++;
                                bytes += chunk.length;
                                var packdata = any_1.Any.create({ "typeUrl": "openiap.Stream", "value": base_1.Stream.encode(base_1.Stream.create({ data: chunk })).finish() });
                                _this.sendMesssag(client, { rid: rid, command: "stream", data: packdata }, "", true);
                            });
                        }
                        else {
                            readStream.on("data", function (chunk) {
                                if (client.connected) {
                                    chunks++;
                                    bytes += chunk.length;
                                    var packdata_1 = any_1.Any.create({ "typeUrl": "openiap.Stream", "value": base_1.Stream.encode(base_1.Stream.create({ data: chunk })).finish() });
                                    _this.sendMesssag(client, { rid: rid, command: "stream", data: packdata_1 }, "", true);
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    protowrap.UploadFile = function (client, filename, metadata, jwt) {
        var basename = path.basename(filename);
        var message = base_1.UploadRequest.create({ filename: basename });
        if (metadata != null) {
            message.metadata = JSON.stringify(metadata);
        }
        var packdata = any_1.Any.create({ "typeUrl": "openiap.UploadRequest", "value": base_1.UploadRequest.encode(message).finish() });
        // Send upload command, server will respond, once upload is complete
        var _a = this._RPC(client, { command: "upload", data: packdata, jwt: jwt }), rid = _a[0], promise = _a[1];
        // send file content using the ID used for upload command
        var promise2 = this.sendFileContent(client, rid, filename, config_1.config.SendFileHighWaterMark);
        // catch errors doing streaming file content
        promise2["catch"](function (e) {
            // doing checksum error, we get disconnected, but we still get the error on the main promise
            if (e && e.message && e.message == "client is not connected") {
            }
            else {
                err(e);
            }
            // promise.reject(err);
        });
        // return main promise
        return promise;
    };
    protowrap.ReceiveFileContent = function (client, rid, filename, highWaterMark) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var startTime, rs, ws, s;
            var _this = this;
            return __generator(this, function (_a) {
                startTime = new Date().getTime();
                rs = new iostream.Readable;
                rs._read = function () { };
                ws = fs.createWriteStream(filename, { highWaterMark: highWaterMark });
                s = this.SetStream(client, rs, rid);
                ws.on("finish", function () { return __awaiter(_this, void 0, void 0, function () {
                    var mb, bytes, chunks, elapsedTime, mbps, checksum;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                mb = ws.bytesWritten / (1024 * 1024);
                                bytes = ws.bytesWritten;
                                chunks = s.chunks;
                                elapsedTime = new Date().getTime() - startTime;
                                mbps = mb / (elapsedTime / 1000);
                                if (!s.checksum) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.getFileChecksum(filename)];
                            case 1:
                                checksum = _a.sent();
                                if (checksum != s.checksum) {
                                    return [2 /*return*/, reject(new Error("File checksum mismatch"))];
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                if (config_1.config.ChecksumCheckFiles) {
                                    warn("No checksum for file available");
                                }
                                _a.label = 3;
                            case 3:
                                resolve({ rid: rid, chunks: chunks, bytes: bytes, mb: mb, elapsedTime: elapsedTime, mbps: mbps });
                                return [2 /*return*/];
                        }
                    });
                }); });
                ws.on("error", function (err) {
                    reject(err);
                });
                rs.on("error", function (err) {
                    reject(err);
                });
                rs.pipe(ws);
                return [2 /*return*/];
            });
        }); });
    };
    protowrap.IsPendingReply = function (client, payload) {
        try {
            client.lastheartbeat = new Date();
            client.lastheartbeatstr = client.lastheartbeat.toISOString();
            client.lastheartbeatsec = (client.lastheartbeat.getTime() / 1000).toString();
            if (payload.command == "ping" || payload.command == "pong") {
                return true;
            }
            var rid = payload.rid;
            config_1.config.dumpmessage("RCV", payload);
            if (rid == null || rid == "")
                return false;
            if (client.replies[rid] && payload.command != "beginstream" && payload.command != "stream" && payload.command != "endstream") {
                var _a = client.replies[rid], resolve = _a.resolve, reject = _a.reject, dt = _a.dt;
                if (resolve) {
                    try {
                        // @ts-ignore // REST HACK
                        if (payload.data && payload.data.value && payload.data.value.data) {
                            // @ts-ignore
                            payload.data.value = payload.data.value.data;
                        }
                        if (payload.command == "error") {
                            var msg = base_1.ErrorResponse.decode(payload.data.value);
                            var error = new ServerError(msg.message, msg.stack);
                            reject(error);
                        }
                        else {
                            resolve(payload);
                        }
                    }
                    catch (error) {
                        err(error);
                        return reject(error);
                    }
                }
                delete client.replies[rid];
            }
            else if (client.streams[rid]) {
                var command = payload.command;
                if (command == "error") {
                    var s = client.streams[rid].stream;
                    s.emit("error", new Error(payload.data.toString()));
                }
                else if (command == "stream") {
                    var s = client.streams[rid].stream;
                    var msg_1 = base_1.Stream.decode(payload.data.value);
                    if (s.push) {
                        s.push(msg_1.data);
                    }
                    else {
                        s.write(msg_1.data);
                    }
                    client.streams[rid].chunks++;
                    s.bytes += msg_1.data.length;
                }
                else if (command == "beginstream") {
                    var msg_2 = base_1.BeginStream.decode(payload.data.value);
                    client.streams[rid].stat = {};
                    if (msg_2.stat)
                        client.streams[rid].stat = msg_2.stat;
                    if (msg_2.checksum)
                        client.streams[rid].checksum = msg_2.checksum;
                }
                else if (command == "endstream") {
                    var s = client.streams[rid].stream;
                    if (s.push) {
                        client.streams[rid].stream.push(null);
                    }
                    else {
                        client.streams[rid].stream.end();
                    }
                    // streams[rid].stream.emit("finish");
                    // streams[rid].stream.end();
                    // streams[rid].stream.emit("end");
                    // streams[rid].stream.destroy();
                    // info("Stream ended for rid: " + rid + " chunks: " + streams[rid].chunks + " bytes: " + streams[rid].bytes);
                    delete client.streams[rid];
                }
            }
            else {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    };
    protowrap.get = function (url) {
        return new Promise(function (resolve, reject) {
            var provider = http;
            if (url.startsWith("https")) {
                // @ts-ignore
                provider = https;
            }
            provider.get(url, function (resp) {
                var data = "";
                resp.on("data", function (chunk) {
                    data += chunk;
                });
                resp.on("end", function () {
                    resolve(data);
                });
            }).on("error", function (err) {
                reject(err);
            });
        });
    };
    protowrap.post = function (jwt, agent, url, body) {
        return new Promise(function (resolve, reject) {
            try {
                var provider = http;
                var u = new URL(url);
                var options = {
                    rejectUnauthorized: false,
                    agent: agent,
                    hostname: u.hostname,
                    port: u.port,
                    path: u.pathname,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.byteLength(body)
                    }
                };
                if (jwt != null && jwt != "") {
                    options.headers["Authorization"] = "Bearer " + jwt;
                }
                if (url.startsWith("https")) {
                    delete options.agent;
                    // @ts-ignore
                    provider = https;
                }
                var req = provider.request(url, options, function (res) {
                    res.setEncoding("utf8");
                    if (res.statusCode != 200) {
                        return reject(new Error("HTTP Error: " + res.statusCode + " " + res.statusMessage));
                    }
                    var body = "";
                    res.on("data", function (chunk) {
                        body += chunk;
                    });
                    res.on("end", function () {
                        var r = res;
                        resolve(body);
                    });
                });
                req.write(body);
                req.end();
            }
            catch (error) {
                reject(error);
            }
        });
    };
    protowrap.sendMesssag = function (client, payload, id, dumpmsg) {
        var _this = this;
        // var errMsg = this.Envelope.verify(payload);
        // if (errMsg) throw new Error(errMsg);
        payload.seq = client.seq;
        if (id != null && id != "") {
            payload.id = id;
        }
        else {
            if (client.seq != null) {
                // payload.id = client.seq.toString();
                payload.id = Math.random().toString(36).substring(2, 11);
            }
            else {
                payload.id = Math.random().toString(36).substring(2, 11);
            }
        }
        if (client.seq != null) {
            client.seq++;
        }
        // messages.push(payload);
        // if (!payload.id || payload.id == "") payload.id = Math.random().toString(36).substring(2, 11);
        // if (payload.data && config.ChecksumCheckPackages) payload.hash = this.getChecksum(payload.data);
        if (dumpmsg) {
            config_1.config.dumpmessage("SND", payload);
        }
        if (client.protocol == "grpc") {
            if (client.grpcStream) {
                client.grpcStream.write(payload);
            }
            else {
                throw new Error("client is not a grpc client");
            }
            return payload.seq;
        }
        if (client.protocol == "rest") {
            if (config_1.config.role == "client") {
                this.post(client.jwt, client.agent, client.url, JSON.stringify(payload)).then(function (data) {
                    try {
                        var payload = data;
                        try {
                            if (data.indexOf("{") > -1)
                                payload = JSON.parse(data);
                        }
                        catch (error) {
                        }
                        if (payload && payload.data && payload.data.type && payload.data.type.toLowerCase() == "buffer") {
                            payload.data = Buffer.from(payload.data.data);
                        }
                        _this.IsPendingReply(client, payload);
                    }
                    catch (error) {
                        err(error);
                    }
                })["catch"](function (error) {
                    err(error);
                });
            }
            else {
                // how to handle this ?
            }
            return payload.seq;
        }
        var message = base_1.Envelope.create(payload);
        var buffer = base_1.Envelope.encode(message).finish();
        var lengthbuffer = Buffer.alloc(4);
        lengthbuffer.writeUInt32LE(buffer.length, 0); // writeUInt32LE writeUInt32BE
        if (client.protocol == "ws") {
            if (!client.ws)
                throw new Error("client is not a websocket client");
            try {
                client.ws.send(lengthbuffer);
                client.ws.send(buffer);
            }
            catch (error) {
                err(error);
                client.Close();
                throw error;
            }
            return payload.seq;
        }
        var r = config_1.config.role;
        if (config_1.config.role == "server") {
            config_1.config.dumpdata(buffer);
        }
        if (client.protocol == "socket" || client.protocol == "pipe") {
            if (!client.connected) {
                throw new Error("client is not connected");
            }
            else if (!client.stream) {
                throw new Error("client is not a " + client.protocol + " client");
            }
            client.stream.write(lengthbuffer);
            client.stream.write(buffer);
            return payload.seq;
        }
        throw new Error("Unknown protocol");
    };
    protowrap.ClientCleanup = function (client, onClientDisconnected, error) {
        // @ts-ignore
        if (client.cleanup == true)
            return;
        // @ts-ignore
        client.cleanup = true;
        try {
            var keys = Object.keys(client.replies);
            // if (!error) error = new Error("Client " + client.id + "disconnected");
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var reply = client.replies[key];
                reply.reject(new Error("Client " + client.id + " disconnected"));
            }
            var keys = Object.keys(client.streams);
            // Errors should be handled by the stream itself using callback
            // for (let i = 0; i < keys.length; i++) {
            //   var key = keys[i];
            //   var stream = client.streams[key];
            //   if (error) {
            //     stream.stream.emit("error", error);
            //     stream.stream.destroy(error);
            //   }
            // }
            if (client.connected == true || client.connecting == true) {
                client.connected = false;
                client.connecting = false;
                // if(!error) error = "Client disconnected" 
                onClientDisconnected(client, error);
            }
        }
        catch (e) {
            err(e);
        }
        finally {
        }
    };
    protowrap.connect = function (apiurl, clientConstructor) {
        var _this = this;
        if (clientConstructor === void 0) { clientConstructor = client_1.client; }
        config_1.config.role = "client";
        var result = new clientConstructor();
        var url = new URL(apiurl);
        result.protocol = "ws";
        result.url = apiurl;
        if (url.protocol == "http:" || url.protocol == "https:") {
            result.protocol = "rest";
        }
        else if (url.protocol == "grpc:") {
            result.protocol = "grpc";
        }
        else if (url.protocol == "socket:") {
            result.protocol = "socket";
        }
        else if (url.protocol == "pipe:") {
            result.protocol = "socket";
        }
        result.connected = false;
        result.connecting = true;
        result.signedin = false;
        result.Initialize(null, null, null, null)["catch"](function (e) { err(e); });
        // { protocol, port, connected: false, connecting: true, agent: null, id: "", host, onMessage, onClientConnected, onClientDisconnected, cleanup: false,
        //   SendStreamCall: null, ReceiveStreamCall: null, app: null, ws: null, client: {}, stream: null, counter: 0};
        result.id = Math.random().toString(36).substring(2, 11);
        if (url.protocol == "http:" || url.protocol == "https:") {
            // @ts-ignore
            result.agent = new http.Agent({
                keepAlive: true,
                maxSockets: 1
            });
            this.post(result.jwt, result.agent, apiurl, JSON.stringify({ "command": "noop" })).then(function (data) {
                try {
                    result.connected = true;
                    result.connecting = false;
                    result.onConnected(result);
                    var payload = JSON.parse(data);
                    if (payload && payload.data && payload.data.type && payload.data.type.toLowerCase() == "buffer") {
                        payload.data = Buffer.from(payload.data.data);
                    }
                    // this.IsPendingReply(payload);
                }
                catch (error) {
                    _this.ClientCleanup(result, result.onDisconnected, error);
                }
            })["catch"](function (e) {
                _this.ClientCleanup(result, result.onDisconnected, e);
            });
            return result;
        }
        else if (url.protocol == "grpc:") {
            // https://stackoverflow.com/questions/71628043/envoy-grpc-reverse-bridge-received-rst-stream-with-code-0
            // https://github.com/stephenh/ts-proto/issues/614
            if (url.host.indexOf(":") == -1 && url.port) {
                // @ts-ignore
                result.grpc = new this.openiap_proto.FlowService(url.host + ":" + url.port, grpc.credentials.createInsecure());
                // result.grpc = new FlowServiceClientImpl(); //  grpc.Client() new FlowServiceClientImpl()
            }
            else {
                var host = url.host.split(":")[0];
                if (url.port == "443") {
                    var options = __assign(__assign({}, protowrap.grpc_server_options), { 'grpc.ssl_target_name_override': host });
                    // @ts-ignore
                    result.grpc = new this.openiap_proto.FlowService(url.host, grpc.credentials.createSsl(), options);
                }
                else {
                    // @ts-ignore
                    result.grpc = new this.openiap_proto.FlowService(url.host, grpc.credentials.createInsecure(), protowrap.grpc_server_options);
                }
                // @ts-ignore
                // result.grpc = new this.openiap_proto.FlowService(url.host, grpc.credentials.createInsecure());
                // result.grpc = new this.openiap_proto.FlowService(url.host , grpc.credentials.createInsecure());
                // info("Connecting to " + host)
                // // @ts-ignore
                // // result.grpc = new this.openiap_proto.FlowService(url.host , grpc.credentials.createSsl(),
                // // {
                // //   'grpc.ssl_target_name_override': host
                // // });
                // result.grpc = new this.openiap_proto.FlowService(url.host , grpc.credentials.createSsl(),
                // {
                //   'grpc.ssl_target_name_override': host
                // });
            }
            result.grpcStream = result.grpc.SetupStream(null);
            // result.grpcStream = result.grpc.SetupStream((error:any, response:any) => {
            //   info("ReceiveStreamCall, end ?");
            // });
            result.grpcStream.on("status", function (status) {
                info(url.protocol + " client " + status.code + " " + status.details);
            });
            result.grpcStream.on("data", function (message) { return __awaiter(_this, void 0, void 0, function () {
                var _payload, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!(message != null)) return [3 /*break*/, 2];
                            if (!!this.IsPendingReply(result, message)) return [3 /*break*/, 2];
                            return [4 /*yield*/, result.onMessage(result, message)];
                        case 1:
                            _payload = _a.sent();
                            if (_payload && _payload.command != "noop")
                                this.sendMesssag(result, _payload, "", true);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            err(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            result.grpcStream.on("end", function () {
                _this.ClientCleanup(result, result.onDisconnected, undefined);
            });
            // @ts-ignore
            result.grpcStream.on("error", function (e) {
                _this.ClientCleanup(result, result.onDisconnected, e);
            });
            setTimeout(function () {
                result.connected = true;
                result.connecting = false;
                result.onConnected(result);
            }, 100);
            return result;
        }
        else if (url.protocol == "pipe:" || url.protocol == "socket:") {
            var netconnection = function () {
                result.connecting = false;
                result.connected = true;
                result.onConnected(result);
                // @ts-ignore
                result.stream.pipe(parser).on("data", function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var _payload, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!(message != null)) return [3 /*break*/, 2];
                                if (!!this.IsPendingReply(result, message)) return [3 /*break*/, 2];
                                return [4 /*yield*/, result.onMessage(result, message)];
                            case 1:
                                _payload = _a.sent();
                                if (_payload && _payload.command != "noop")
                                    this.sendMesssag(result, _payload, "", true);
                                _a.label = 2;
                            case 2: return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                err(error_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            };
            var PIPE_PATH = "\\\\" + url.host + "\\pipe\\" + url.pathname.substring(1);
            // is running on linux
            if (process.platform == "linux") {
                PIPE_PATH = "/tmp/CoreFxPipe_" + url.pathname.substring(1);
            }
            if (url.protocol == "socket:") {
                PIPE_PATH = url.host + ":" + url.port;
                if (url.port && url.host) {
                    result.stream = net.createConnection(url.port, url.host, netconnection);
                }
                if (url.port || url.host) {
                    result.stream = net.createConnection(url.port || url.host, netconnection);
                }
            }
            else {
                result.stream = net.createConnection(PIPE_PATH, netconnection);
            }
            var parser = new message_parser_1.messageParser();
            // parser.Envelope = this.Envelope;
            parser.on("error", function (e) {
                _this.ClientCleanup(result, result.onDisconnected, e);
                result.stream.end();
            });
            result.stream.on("error", function (e) {
                _this.ClientCleanup(result, result.onDisconnected, e);
                result.stream.end();
            });
            result.stream.on("end", function () {
                _this.ClientCleanup(result, result.onDisconnected, undefined);
            });
            return result;
        }
        else if (url.protocol == "ws:" || url.protocol == "wss:") {
            result.ws = new WebSocket(apiurl, { rejectUnauthorized: false });
            result.ws.on("open", function () {
                result.connecting = false;
                result.connected = true;
                result.onConnected(result);
            });
            var parser = new message_parser_1.messageParser();
            // parser.Envelope = this.Envelope;
            // @ts-ignore
            result.ws.on("message", function (message) {
                parser.write(message);
            });
            parser.on("data", function (message) { return __awaiter(_this, void 0, void 0, function () {
                var _payload, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!(message != null)) return [3 /*break*/, 2];
                            if (!!this.IsPendingReply(result, message)) return [3 /*break*/, 2];
                            return [4 /*yield*/, result.onMessage(result, message)];
                        case 1:
                            _payload = _a.sent();
                            if (_payload && _payload.command != "noop")
                                this.sendMesssag(result, _payload, "", true);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            err(error_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            parser.on("error", function (e) {
                _this.ClientCleanup(result, result.onDisconnected, e);
                result.ws.close();
            });
            result.ws.on("error", function (e) {
                _this.ClientCleanup(result, result.onDisconnected, e);
            });
            result.ws.on("close", function (closeCode, closeMessage) {
                _this.ClientCleanup(result, result.onDisconnected, closeMessage);
                // @ts-ignore
                result.ws.close();
            });
            return result;
        }
        else {
            throw new Error("protocol not supported " + url.protocol);
        }
    };
    protowrap.serve = function (protocol, onClientConnected, port, path, wss, app, http, clientConstructor) {
        var _this = this;
        if (clientConstructor === void 0) { clientConstructor = client_1.client; }
        config_1.config.role = "server";
        var result = { protocol: protocol, port: port, id: "", connected: false, connecting: false, client: null, ws: null, pending: {}, app: app, http: http, wss: wss };
        result.id = Math.random().toString(36).substring(2, 11);
        if (protocol == "rest") {
            var listen = false;
            // if (!app) {
            //   app = express();
            //   app.use(express.json())
            //   listen = true;
            // }
            app.post(path, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var id, clientresult, token, payload, _payload, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = Math.random().toString(36).substring(2, 11);
                            clientresult = new clientConstructor();
                            clientresult.id = id;
                            clientresult.protocol = protocol;
                            clientresult.connected = true;
                            clientresult.connecting = false;
                            clientresult.signedin = false;
                            return [4 /*yield*/, clientresult.Initialize(null, null, null, req)];
                        case 1:
                            _a.sent();
                            onClientConnected(clientresult);
                            token = req.headers.authorization;
                            if (token && token.startsWith("Bearer ")) {
                                token = token.slice(7, token.length);
                                clientresult.jwt = token;
                            }
                            payload = req.body;
                            if (payload && payload.data && payload.data.type && payload.data.type.toLowerCase() == "buffer") {
                                payload.data = Buffer.from(payload.data.data);
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, 7, 8]);
                            if (!!this.IsPendingReply(clientresult, payload)) return [3 /*break*/, 4];
                            return [4 /*yield*/, clientresult.onMessage(clientresult, payload)];
                        case 3:
                            _payload = _a.sent();
                            if (!_payload.id || _payload.id == "")
                                _payload.id = Math.random().toString(36).substring(2, 11);
                            res.send(_payload);
                            return [3 /*break*/, 5];
                        case 4:
                            res.send("IsPendingReply took your payload");
                            _a.label = 5;
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            error_4 = _a.sent();
                            res.send(error_4);
                            err(error_4);
                            return [3 /*break*/, 8];
                        case 7:
                            this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
                            return [7 /*endfinally*/];
                        case 8:
                            next();
                            return [2 /*return*/];
                    }
                });
            }); });
            if (listen) {
                if (http) {
                    http.createServer(app);
                }
                else {
                    app.listen(port, function () {
                        port = port || 80;
                        result.port = port;
                    });
                }
            }
            result.app = app;
            return result;
        }
        else if (protocol == "ws") {
            if (wss != null) {
                result.wss = wss;
            }
            else {
                var server = http;
                var p = port || 80;
                if (server) {
                    p = undefined;
                }
                else {
                    result.port = p;
                }
                result.wss = new WebSocket.WebSocketServer({ server: server, port: p });
            }
            result.wss.on("connection", function (ws, req) { return __awaiter(_this, void 0, void 0, function () {
                var url, location, id, clientresult, parser;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = require("url");
                            location = url.parse(req.url, true);
                            if (location.pathname != path)
                                return [2 /*return*/];
                            id = Math.random().toString(36).substring(2, 11);
                            clientresult = new clientConstructor();
                            clientresult.id = id;
                            clientresult.protocol = protocol;
                            clientresult.ws = ws;
                            clientresult.connected = true;
                            clientresult.connecting = false;
                            clientresult.signedin = false;
                            return [4 /*yield*/, clientresult.Initialize(ws, null, null, req)];
                        case 1:
                            _a.sent();
                            onClientConnected(clientresult);
                            parser = new message_parser_1.messageParser();
                            // parser.Envelope = this.Envelope;
                            ws.on("message", function (message) {
                                parser.write(message);
                            });
                            parser.on("data", function (message) { return __awaiter(_this, void 0, void 0, function () {
                                var payload, error_5;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            if (!(message != null)) return [3 /*break*/, 2];
                                            if (!!this.IsPendingReply(clientresult, message)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, clientresult.onMessage(clientresult, message)];
                                        case 1:
                                            payload = _a.sent();
                                            if (payload && payload.command != "noop")
                                                this.sendMesssag(clientresult, payload, "", true);
                                            _a.label = 2;
                                        case 2: return [3 /*break*/, 4];
                                        case 3:
                                            error_5 = _a.sent();
                                            err(error_5);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            parser.on("error", function (e) {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
                                clientresult.ws.close();
                            });
                            ws.on("error", function (e) {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
                                clientresult.ws.close();
                            });
                            ws.on("close", function (closeCode, closeMessage) {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, closeMessage);
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return result;
        }
        else if (protocol == "grpc") {
            //const SetupStream = async (call, respond, e3) => {
            var SetupStream = function (call, respond) { return __awaiter(_this, void 0, void 0, function () {
                var clientresult, pingtimer;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clientresult = new clientConstructor();
                            clientresult.id = Math.random().toString(36).substring(2, 11);
                            clientresult.protocol = protocol;
                            clientresult.connected = true;
                            clientresult.connecting = false;
                            clientresult.signedin = false;
                            clientresult.grpcStream = call;
                            return [4 /*yield*/, clientresult.Initialize(null, null, call, null)];
                        case 1:
                            _a.sent();
                            onClientConnected(clientresult);
                            pingtimer = setInterval(function () {
                                var c = call;
                                var that = _this;
                                if (c.cancelled) {
                                    clearInterval(pingtimer);
                                    _this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
                                }
                            }, 1000);
                            call.on("data", function (payload) { return __awaiter(_this, void 0, void 0, function () {
                                var _payload, error_6;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            if (!!this.IsPendingReply(clientresult, payload)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, clientresult.onMessage(clientresult, payload)];
                                        case 1:
                                            _payload = _a.sent();
                                            if (_payload && _payload.command != "noop")
                                                this.sendMesssag(clientresult, _payload, "", true);
                                            _a.label = 2;
                                        case 2: return [3 /*break*/, 4];
                                        case 3:
                                            error_6 = _a.sent();
                                            try {
                                                this.sendMesssag(clientresult, error_6, "", true);
                                            }
                                            catch (error) {
                                            }
                                            err(error_6);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            call.on("end", function () {
                                var c = call;
                                var that = _this;
                                console.log("end");
                                if (c.cancelled) {
                                    clearInterval(pingtimer);
                                    _this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
                                }
                                // 
                            });
                            call.on("error", function (e) {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
                            });
                            return [2 /*return*/, call];
                    }
                });
            }); };
            var Signin = function (call, callback) { return __awaiter(_this, void 0, void 0, function () {
                var payload;
                return __generator(this, function (_a) {
                    try {
                        payload = {
                            "jwt": "JWTsecretTOKEN",
                            user: { name: call.request.username, username: call.request.username, _id: "1", email: "wefew", roles: [] }
                        };
                        callback(null, payload);
                    }
                    catch (error) {
                        err(error);
                        callback(error, null);
                    }
                    return [2 /*return*/];
                });
            }); };
            // @ts-ignore
            result.server = new grpc.Server(protowrap.grpc_server_options);
            // @ts-ignore
            // result.server.addService(this.openiap_proto.FlowService.service, { RPC, ReceiveStream, SendStream });
            result.server.addService(this.openiap_proto.FlowService.service, { SetupStream: SetupStream, Signin: Signin });
            // @ts-ignore
            result.server.bindAsync("0.0.0.0:" + port, grpc.ServerCredentials.createInsecure(), function () {
                // @ts-ignore
                result.server.start();
                // DeprecationWarning: Calling start() is no longer necessary. It can be safely omitted.
            });
            return result;
        }
        else if (protocol == "pipe" || protocol == "socket") {
            var PIPE_PATH = "\\\\.\\pipe\\" + path;
            // if not runnong on windows
            if (process.platform != "win32") {
                PIPE_PATH = "/tmp/CoreFxPipe_" + path;
            }
            if (protocol == "socket") {
                PIPE_PATH = port || 80;
                result.port = PIPE_PATH;
            }
            try {
                if (fs.existsSync(PIPE_PATH)) {
                    info("unlinking existing pipe " + PIPE_PATH);
                    fs.unlinkSync(PIPE_PATH);
                }
            }
            catch (error) {
                err(error);
            }
            // @ts-ignore
            result.server = net.createServer(function (stream) { return __awaiter(_this, void 0, void 0, function () {
                var id, clientresult, parser;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = Math.random().toString(36).substring(2, 11);
                            clientresult = new clientConstructor();
                            clientresult.id = id;
                            clientresult.protocol = protocol;
                            clientresult.connected = true;
                            clientresult.connecting = false;
                            clientresult.signedin = false;
                            return [4 /*yield*/, clientresult.Initialize(null, stream, null, null)];
                        case 1:
                            _a.sent();
                            onClientConnected(clientresult);
                            parser = new message_parser_1.messageParser();
                            // parser.Envelope = this.Envelope;
                            stream.pipe(parser).on("data", function (message) { return __awaiter(_this, void 0, void 0, function () {
                                var payload, error_7;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!clientresult.connected)
                                                return [2 /*return*/];
                                            if (!!this.IsPendingReply(clientresult, message)) return [3 /*break*/, 4];
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, clientresult.onMessage(clientresult, message)];
                                        case 2:
                                            payload = _a.sent();
                                            if (payload && payload.command != "noop")
                                                this.sendMesssag(clientresult, payload, "", true);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_7 = _a.sent();
                                            err(error_7);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            stream.on("error", function (e) {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
                                clientresult.stream.end();
                            });
                            parser.on("error", function (e) {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
                                clientresult.stream.end();
                            });
                            stream.on("end", function () {
                                _this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            // @ts-ignore
            result.server.on("error", function (e) {
                // ClientCleanup(clientresult, onClientDisconnected, e);
                // clientresult.stream.end();
            });
            // @ts-ignore
            result.server.listen(PIPE_PATH, function () {
            });
            return result;
        }
        else {
            throw new Error("Not supported protocol " + protocol);
        }
    };
    protowrap.getFileChecksum = function (filePath) {
        return new Promise(function (resolve, reject) {
            var hash = crypto.createHash("sha256"); // sha256, md5
            var stream = fs.createReadStream(filePath);
            stream.on("data", function (data) {
                hash.update(data);
            });
            stream.on("end", function () {
                var checksum = hash.digest("hex");
                resolve(checksum);
            });
            stream.on("error", function (error) {
                reject(error);
            });
        });
    };
    protowrap.getChecksum = function (buffer) {
        var hash = crypto.createHash("sha256");
        hash.update(buffer);
        var checksum = hash.digest("hex");
        return checksum;
    };
    /*
    // https://github.com/grpc/grpc/blob/117457a76780e49b599b393b471feee894ced4a8/examples/python/keep_alive/greeter_server.py
      grpc.keepalive_time_ms: The period (in milliseconds) after which a keepalive ping is
          sent on the transport.
      grpc.keepalive_timeout_ms: The amount of time (in milliseconds) the sender of the keepalive
          ping waits for an acknowledgement. If it does not receive an acknowledgment within
          this time, it will close the connection.
      grpc.http2.min_ping_interval_without_data_ms: Minimum allowed time (in milliseconds)
          between a server receiving successive ping frames without sending any data/header frame.
      grpc.max_connection_idle_ms: Maximum time (in milliseconds) that a channel may have no
          outstanding rpcs, after which the server will close the connection.
      grpc.max_connection_age_ms: Maximum time (in milliseconds) that a channel may exist.
      grpc.max_connection_age_grace_ms: Grace period (in milliseconds) after the channel
          reaches its max age.
      grpc.http2.max_pings_without_data: How many pings can the client send before needing to
          send a data/header frame.
      grpc.keepalive_permit_without_calls: If set to 1 (0 : false; 1 : true), allows keepalive
          pings to be sent even if there are no calls in flight.
      For more details, check: https://github.com/grpc/grpc/blob/master/doc/keepalive.md
    */
    protowrap.grpc_server_options = {
        'grpc.keepalive_time_ms': 20000 * 1000,
        'grpc.keepalive_timeout_ms': 1000,
        'grpc.http2.min_ping_interval_without_data_ms': 5000,
        'grpc.max_connection_idle_ms': 71992547,
        'grpc.max_connection_age_ms': 71992547,
        'grpc.max_connection_age_grace_ms': 71992547,
        'grpc.http2.max_pings_without_data': 71992547,
        'grpc.keepalive_permit_without_calls': 1,
        'grpc.max_receive_message_length': 1024 * 1024 * 1024,
        'grpc.max_send_message_length': 1024 * 1024 * 1024
    };
    protowrap.defaultprotocol = "pipe"; // pipe, socket, ws, grpc, rest
    return protowrap;
}());
exports.protowrap = protowrap;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message, stack) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = "ServerError";
        _this.stack = stack;
        return _this;
    }
    return ServerError;
}(Error));
exports.ServerError = ServerError;
//# sourceMappingURL=protowrap.js.map