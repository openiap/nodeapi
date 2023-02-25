"use strict";
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
exports.remoteip = exports.changestream = exports.client = void 0;
// import * as net from "net";
// import * as  grpc from "@grpc/grpc-js";
// import * as  WebSocket from "ws";
var protowrap_1 = require("./protowrap");
var config_1 = require("./config");
var info = config_1.config.info, err = config_1.config.err, warn = config_1.config.warn;
var watch_1 = require("./proto/watch");
var any_1 = require("./proto/google/protobuf/any");
var base_1 = require("./proto/base");
var client = /** @class */ (function () {
    function client() {
        this.id = "";
        this.seq = 0;
        this.remoteip = "unknown";
        this.created = new Date();
        this.lastheartbeat = new Date();
        this.lastheartbeatstr = new Date().toISOString();
        this.lastheartbeatsec = "0";
        this.signedin = false;
        this.connected = false;
        this.connecting = false;
        this.queues = []; // amqpqueue[]
        this.exchanges = []; // amqpexchange[]
        this.watches = [];
    }
    client.prototype.Initialize = function (ws, stream, call, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.replies = {};
                    this.streams = {};
                    this.doping = config_1.config.DoPing;
                    if (ws != null)
                        this.ws = ws;
                    if (stream != null)
                        this.stream = stream;
                    if (call != null)
                        this.call = call;
                    if (req != null)
                        this.remoteip = remoteip(req);
                }
                catch (error) {
                    err(error);
                }
                return [2 /*return*/, true];
            });
        });
    };
    client.prototype.onConnected = function (client) {
    };
    client.prototype.onDisconnected = function (client, error) {
        info("close " + this.id + " " + this.protocol + " " + this.remoteip + " " + this.agent);
    };
    client.prototype.onMessage = function (client, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, base_1.Envelope.create({ "command": "noop" })];
            });
        });
    };
    client.prototype.ping = function (span) {
        if (this.doping) {
            protowrap_1.protowrap.sendMesssag(this, { "command": "ping" }, "", true);
        }
        else {
            this.lastheartbeat = new Date();
            this.lastheartbeatstr = this.lastheartbeat.toISOString();
            this.lastheartbeatsec = (this.lastheartbeat.getTime() / 1000).toString();
        }
    };
    client.prototype.queuecount = function () {
        return this.queues.length;
    };
    client.prototype.Watch = function (aggregates, collectionname, jwt) {
        return __awaiter(this, void 0, void 0, function () {
            var id, stream;
            return __generator(this, function (_a) {
                if (typeof aggregates === "string") {
                    try {
                        aggregates = JSON.parse(aggregates);
                    }
                    catch (error) {
                    }
                }
                id = Math.random().toString(36).substring(2, 11);
                stream = { id: id, collectionname: collectionname, aggregates: aggregates };
                this.watches[id] = stream;
                return [2 /*return*/, id];
            });
        });
    };
    client.prototype.UnWatch = function (id, jwt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.watches[id]) {
                    delete this.watches[id];
                }
                return [2 /*return*/];
            });
        });
    };
    client.prototype.SendWatch = function (watch, next, span) {
        try {
            info("Notify " + this.user.username + " of " + next.operationType + " " + next.fullDocument.name);
            var packdata = any_1.Any.create({ type_url: "type.googleapis.com/openiap.WatchEvent",
                "value": watch_1.WatchEvent.encode(watch_1.WatchEvent.create({ id: watch.id, operation: next.operationType, document: JSON.stringify(next.fullDocument) })).finish() });
            protowrap_1.protowrap.sendMesssag(this, { command: "watchevent", data: packdata }, "", true);
        }
        catch (error) {
            console.error(error);
        }
        finally {
        }
    };
    client.prototype.Close = function () {
        if (this.ws != null)
            this.ws.close();
        if (this.stream != null)
            this.stream.destroy();
        if (this.call != null) {
            try {
                this.call.cancel();
            }
            catch (error) {
                warn(error.toString());
            }
        }
        if (this.grpcStream != null) {
            try {
                this.grpcStream.cancel();
            }
            catch (error) {
                warn(error.toString());
            }
        }
        info("close " + this.id + " " + this.protocol + " " + this.remoteip + " " + this.agent);
        this.connected = false;
        this.connecting = false;
        // this.onDisconnected(this, null);
    };
    return client;
}());
exports.client = client;
var changestream = /** @class */ (function () {
    function changestream() {
    }
    return changestream;
}());
exports.changestream = changestream;
function remoteip(req) {
    if (req == null)
        return "unknown";
    var remoteip = req.socket.remoteAddress;
    if (req.headers["X-Forwarded-For"] != null)
        remoteip = req.headers["X-Forwarded-For"];
    if (req.headers["X-real-IP"] != null)
        remoteip = req.headers["X-real-IP"];
    if (req.headers["x-forwarded-for"] != null)
        remoteip = req.headers["x-forwarded-for"];
    if (req.headers["x-real-ip"] != null)
        remoteip = req.headers["x-real-ip"];
    return remoteip;
}
exports.remoteip = remoteip;
//# sourceMappingURL=client.js.map