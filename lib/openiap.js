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
exports.openiap = void 0;
var protowrap_1 = require("./protowrap");
var config_1 = require("./config");
var info = config_1.config.info, err = config_1.config.err, warn = config_1.config.warn;
var any_1 = require("./proto/google/protobuf/any");
// import events = require("events");
var events_1 = require("events");
var base_1 = require("./proto/base");
var _1 = require(".");
var queues_1 = require("./proto/queues");
var querys_1 = require("./proto/querys");
var apiinstrumentation_1 = require("./apiinstrumentation");
/**
 * OpenIAP
 */
var openiap = /** @class */ (function (_super) {
    __extends(openiap, _super);
    /**
     * Create a client for connecting to an OpenIAP flow instace.
     * By default it loads the apiurl from environment variable apiurl, grpcapiurl or wscapiurl
     * You can supply username and password in the URL ( remember this needs to e URL encoded ) or you
     * can supply a JWT token in the jwt environment variable or as the second parameter to the constructor.
     *
     * You can connect using one of these protocols
     * - Using google RPC by using grpc:// as protocol. This require you also supply a port number. Example: `grpc://host.name:port`
     * For docker or kubernetes deployments this is usually the main domain prefixed with grpc.
     * for instance if your main domain is `app.openiap.io` then the grpc url would be `grpc://groc.app.openiap.io:443`
     * For developer installations, the grpc url would be `grpc://localhost:50051`
     * - Using WebSocket by using ws:// or wss:// as protocol. wss when using certificates. ws when unsecured
     * For example `wss://app.openiap.io` or `ws://localhost.openiap.io`
     * - Using named pipes by using pipe:// as protocol. For example `pipe://localhost/testpipe`
     * - Using TCP sockets by using tcp:// as protocol. For example `tcp://localhost.openiap.io:8080`
     * - Using HTTP/REST by using http:// or https:// as protocol. https when using certificates. http when unsecured
     * For example `https://app.openiap.io/api/v2` or `http://localhost.openiap.io/api/v2`
     *
     * @param url By default we read from environment variable apiurl, grpcapiurl or wscapiurl but can be overriden here
     * @param jwt By default we read from environment variable jwt but can be overriden here
     * @example
     * Connect to OpenIAP flow instance
     * ```typescript
     * const { openiap } = require("@openiap/nodeapi");
     * client.connect().then(async client=> {
     *  console.log("Connected")
     *  const result = await client.Query({ query: { "_type": "test" } });
     *  console.log(result);
     *  client.Close();
     * }).catch(err => {
     * console.log("Failed to connect: " + err)
     * }
     * ```
     * @example
     * Connect to OpenIAP using a connection string.
     * ```typescript
     * const { openiap } = require("@openiap/nodeapi");
     * async function main() {
     *   const client = new openiap("grpc://grpc.app.openiap.io:443");
     *   await client.connect();
     *   const user = client.Signin({username: "henrik", password: "SuperSecret"});
     * }
     * main();
     * ```
     * @example
     * Alternatively we can supply credentials in the connection string, then we do not need to call Signin
     * ```typescript
     * const { openiap } = require("@openiap/nodeapi");
     * async function main() {
     *   const client = new openiap("grpc://henrik:SuperSecret@grpc.app.openiap.io:443");
     *   await client.connect();
     * }
     * main();
     * ```
     */
    function openiap(url, jwt) {
        if (url === void 0) { url = ""; }
        if (jwt === void 0) { jwt = ""; }
        var _this = _super.call(this) || this;
        _this.reconnectms = 100;
        _this.queuecallbacks = {};
        _this.watchids = {};
        _this.queues = {};
        _this.defaltqueue = "";
        /**
         * Define client type when authenticating toward the server
         */
        _this.agent = "node";
        /**
         * If false, the client will never give up trying to connect to the server, if true, will give up after 17 seconds
         */
        _this.allowconnectgiveup = true;
        /**
         * Define the version of the client sent to the server
         */
        _this.version = "0.0.14";
        /**
         * Define if connected to server
         */
        _this.connected = false;
        /**
         * Define if we are trying to (re)connect
         */
        _this.connecting = false;
        /**
         * If connected, are we also signed in or is server waiting on use to authenticate
         */
        _this.signedin = false;
        /**
         * The URL used when connecting to the server
         */
        _this.url = "";
        /**
         * The JWT used when authenticating to the server
         */
        _this.jwt = "";
        _this.version = require("../package.json").version;
        _this.agent = "node";
        if (url != null && url != "")
            _this.url = url;
        if (jwt != null && jwt != "")
            _this.jwt = jwt;
        if (_this.url == null || _this.url == "")
            _this.url = process.env.apiurl;
        if (_this.url == null || _this.url == "")
            _this.url = process.env.grpcapiurl;
        if (_this.url == null || _this.url == "")
            _this.url = process.env.wscapiurl;
        return _this;
    }
    /**
     * @param first Should be left out or used as true. Is used internally for controlling retry logic
     * @returns Returns the {@link User} object if login was successful, otherwise throws an error
     * @example
     * ```typescript
     * var client = new openiap();
     * client.connect().then(async (user) => {
     *    console.log("Logged in as " + user.username);
     * }).catch((err) => {
     *   console.log("Failed to login: " + err);
     * });
     */
    openiap.prototype.connect = function (first) {
        if (first === void 0) { first = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var keys, i, u;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (process.env.log_with_colors == "false" || process.env.log_with_colors == "False") {
                                        keys = Object.keys(config_1.config.color);
                                        for (i = 0; i < keys.length; i++) {
                                            config_1.config.color[keys[i]] = "";
                                        }
                                    }
                                    u = new URL(this.url);
                                    if (!(u.protocol == "grpc:")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, protowrap_1.protowrap.init()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (this.loginresolve == null && first == true) {
                                        this.loginresolve = resolve;
                                        this.loginreject = reject;
                                    }
                                    // await protowrap.init()
                                    this.connected = false;
                                    this.connecting = true;
                                    if (this.pingerhandle != null)
                                        clearInterval(this.pingerhandle);
                                    this.pingerhandle = setInterval(this.__server_pinger.bind(this), 30000);
                                    setTimeout(function () {
                                        try {
                                            _this.client = protowrap_1.protowrap.connect(_this.url);
                                            _this.client.onConnected = _this.cliOnConnected.bind(_this);
                                            _this.client.onDisconnected = _this.cliOnDisconnected.bind(_this);
                                            _this.client.onMessage = _this.cliOnMessage.bind(_this);
                                        }
                                        catch (error) {
                                            _this.cliOnDisconnected(_this.client, error);
                                        }
                                    }, this.reconnectms);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    openiap.prototype.__server_pinger = function () {
        if (this.connected) {
            this.client.ping(null);
        }
    };
    /**
     * Close connection to server. Use this to ensure the client will not reconnect to the server
     */
    openiap.prototype.Close = function () {
        this.signedin = false;
        if (this.pingerhandle != null)
            clearInterval(this.pingerhandle);
        // if (this.client && this.client.destroy) this.client.destroy();
        // if (this.client && this.client.close) this.client.close();
        // if (this.client && this.client.terminate) this.client.terminate();
        if (this.client && this.client.Close)
            this.client.Close();
    };
    /**
     * Override this function to add logic executed when the client has connected to the server.
     * If credentails has been set, the client will automatically login before calling this function
     * Using EventMitter is also possible using client.on("connected", (client) => {})
     * @param client
     * @example
     * using onConnected override
     * ```typescript
     * var client = new openiap();
     * client.onConnected = (client) => {
     *   console.log("Connected to server");
     * }
     * client.connect();
     * ```
     * @example
     * using EventEmitter. Remember to remove the listener when done to avoid memory leaks
     * ```typescript
     * var client = new openiap();
     * client.on("connected", (client) => {
     *  console.log("Connected to server");
     * });
     * client.connect();
     * ```
     */
    openiap.prototype.onConnected = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    openiap.prototype.cliOnConnected = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var u, _jwt, _username, _password, reply, reply, error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        this.connected = true;
                        this.connecting = false;
                        u = new URL(this.url);
                        info("Connected to server " + u.host);
                        _jwt = process.env.jwt;
                        _username = decodeURIComponent(u.username);
                        _password = decodeURIComponent(u.password);
                        if (_jwt == null)
                            _jwt = this.jwt;
                        if (_jwt == null)
                            _jwt = client.jwt;
                        if (_username == null)
                            _username = "";
                        if (_password == null)
                            _password = "";
                        if (!(_username != "" && _password != "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Signin({ username: _username, password: _password, ping: config_1.config.DoPing })];
                    case 1:
                        reply = _a.sent();
                        if (this.loginresolve != null) {
                            this.loginresolve(reply.user);
                            this.loginresolve = null;
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(_jwt != "")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.Signin({ jwt: _jwt, ping: config_1.config.DoPing })];
                    case 3:
                        reply = _a.sent();
                        if (this.loginresolve != null) {
                            this.loginresolve(reply.user);
                            this.loginresolve = null;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.loginresolve != null) {
                            this.loginresolve(null);
                            this.loginresolve = null;
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        this.reconnectms = 100;
                        return [4 /*yield*/, this.onConnected(this)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        err(error_1);
                        return [3 /*break*/, 8];
                    case 8:
                        this.emit("connected", this);
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        this.loginresolve = null;
                        this.loginreject(error_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Override this function to add logic executed when the client has disconnected from the server.
     * Using EventMitter is also possible .on("disconnected", (client, error) => {})
     * @param client Return client instance that disconnected
     * @param error If the disconnect was caused by an error, this will contain the error object
     * @example
     * using onConnected override
     * ```typescript
     * var client = new openiap();
     * client.onDisconnected = (client, err) => {
     *   console.log("Disconnected from server");
     * }
     * client.connect();
     * ```
     * @example
     * using EventEmitter. Remember to remove the listener when done to avoid memory leaks
     * ```typescript
     * var client = new openiap();
     * client.on("disconnected", (client, err) => {
     *  console.log("Disconnected from server");
     * });
     * client.connect();
     * ```
     */
    openiap.prototype.onDisconnected = function (client, error) {
    };
    openiap.prototype.cliOnDisconnected = function (client, error) {
        this.connected = false;
        this.connecting = false;
        this.signedin = false;
        if (this.pingerhandle != null)
            clearInterval(this.pingerhandle);
        this.reconnectms += 100;
        if (this.reconnectms > 1800 && this.allowconnectgiveup == true) {
            this.reconnectms = 200;
            if (this.loginreject != null) {
                this.loginreject(new Error("Giving up, not responding"));
                this.loginresolve = null;
                this.loginreject = null;
            }
            else {
                err(new Error("Giving up, not responding"));
            }
            return;
        }
        else if (this.reconnectms > 2500) {
            this.reconnectms = 2500;
        }
        var msg = "";
        if (error) {
            var message = (error.message || error);
            try {
                if (message && !message.startsWith("Disconnected from server")) {
                    // err(new Error("Disconnected from server " + message));
                    err("Disconnected from server " + message);
                }
            }
            catch (_error) {
                err(error);
            }
        }
        else {
            info("Disconnected from server");
        }
        try {
            this.onDisconnected(this, error);
        }
        catch (error) {
            err(error);
        }
        this.emit("disconnected", this, error);
        try {
            this.connect(false);
        }
        catch (error) {
        }
    };
    /**
     * Used to generate a unique identifier, used for example when creating new packages.
     * @returns A unique identifier
     */
    openiap.GetUniqueIdentifier = function () {
        return Math.random().toString(36).substring(2, 11);
    };
    /**
     * Override this function to get notified when the client receives a message from the server.
     * This will only be called for messages that are not handled by the client it self.
     * Using EventMitter is also possible .on("message", (client, command, message) => {})
     * @param client Return client instance that received the message
     * @param command The command of the message that was received
     * @param message The message that was received
     */
    // async onMessage(client:openiap, command:string, message: any): Promise<any> {
    //     info("Received " + command + " message from server");
    // }
    openiap.prototype.cliOnMessage = function (client, message) {
        return __awaiter(this, void 0, void 0, function () {
            var rt, we, document, we_1, data, user_1, jwt, reply2, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(message.command == "refreshtoken")) return [3 /*break*/, 1];
                        rt = base_1.RefreshToken.decode(message.data.value);
                        this.client.jwt = rt.jwt;
                        this.client.user = rt.user;
                        return [3 /*break*/, 17];
                    case 1:
                        if (!(message.command == "watchevent")) return [3 /*break*/, 5];
                        we = _1.WatchEvent.decode(message.data.value);
                        if (!this.watchids[we.id]) return [3 /*break*/, 3];
                        document = we.document;
                        if (typeof document === "string")
                            document = JSON.parse(document);
                        return [4 /*yield*/, this.watchids[we.id](we.operation, document)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        warn("Got watchevent for unknown id " + we.id);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 17];
                    case 5:
                        if (!(message.command == "queueevent")) return [3 /*break*/, 16];
                        we_1 = _1.QueueEvent.decode(message.data.value);
                        data = JSON.parse(we_1.data);
                        delete data.spanId;
                        delete data.traceId;
                        user_1 = data.__user;
                        jwt = data.__jwt;
                        delete data.__user;
                        delete data.__jwt;
                        we_1.data = JSON.stringify(data);
                        if (!(this.queuecallbacks[we_1.correlationId] && (we_1.replyto == "" || we_1.replyto == null))) return [3 /*break*/, 7];
                        return [4 /*yield*/, apiinstrumentation_1.apiinstrumentation.With("queueevent", message.traceid, message.spanid, undefined, function (span) { return __awaiter(_this, void 0, void 0, function () {
                                var ctx;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (config_1.config.doDumpRPCTraceIds) {
                                                ctx = span === null || span === void 0 ? void 0 : span.spanContext();
                                                if (ctx != null) {
                                                    // info("cliOnMessage: " + message.command + " traceId: " + ctx.traceId + " spanId: " + ctx.spanId);
                                                }
                                            }
                                            return [4 /*yield*/, this.queuecallbacks[we_1.correlationId](data, user_1)];
                                        case 1:
                                            _a.sent();
                                            delete this.queuecallbacks[we_1.correlationId];
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 7:
                        if (!this.queues[we_1.queuename]) return [3 /*break*/, 14];
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 12, , 13]);
                        return [4 /*yield*/, this.queues[we_1.queuename](we_1, data, user_1, jwt)];
                    case 9:
                        reply2 = _a.sent();
                        if (!(reply2 != null && we_1.replyto != null && we_1.replyto != "")) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.QueueMessage({ correlationId: we_1.correlationId, queuename: we_1.replyto, data: reply2, striptoken: true }, false)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_3 = _a.sent();
                        err(error_3);
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        warn("Got queueevent for unknown queue " + we_1.queuename);
                        _a.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        this.emit("message", message);
                        _a.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Used internally to send a ping message to server, to keep the connection alive.
     * Only used if server require pings, or if the client is configured to send pings using {@link config.DoPing}
     */
    openiap.prototype.Ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            var message, data, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected || !this.signedin)
                            return [2 /*return*/];
                        message = base_1.PingRequest.create();
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.PingRequest", value: base_1.PingRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "ping", data: data });
                        payload.priority = 0;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Wrapper around JSON.stringify to allow serialiszing object with regular expressions
     * @param object Object to serialize
     * @returns
     */
    openiap.prototype.stringify = function (object) {
        return JSON.stringify(object, function (key, value) {
            if (value == null)
                return value;
            var t = typeof value;
            if (value instanceof RegExp)
                return '__REGEXP ' + value.toString();
            else if (t === 'object') {
                if (value.constructor != null && value.constructor.name === 'RegExp') {
                    return '__REGEXP ' + value.toString();
                }
                return value;
            }
            else
                return value;
        });
    };
    /**
     * By default we use crendetials from the connection string or from jwt environment variable.
     * But you can also call Signin to login with a username and password or with a jwt token.
     * This function can also be used to validate credentials without changing the current credentials by setting
     * {@link SigninOptions.validateonly} to true.
     * @param options {@link SigninOptions}
     * @returns
     */
    openiap.prototype.Signin = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, d, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        opt = Object.assign(new SigninDefaults(), options);
                        if (opt.agent == null || opt.agent == "")
                            opt.agent = this.agent;
                        if (opt.version == null || opt.version == "")
                            opt.version = this.version;
                        message = base_1.SigninRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.SigninRequest", value: base_1.SigninRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "signin", data: data, jwt: opt.jwt });
                        payload.priority = 2;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        d = (_a.sent());
                        result = base_1.SigninResponse.decode(d.data.value);
                        if (result.user == null) {
                            throw new Error("Login seem to have failed, nu user object returned");
                        }
                        if (options.validateonly) {
                            // info("Validated " + result.user.name);
                            return [2 /*return*/, result];
                        }
                        info("Signed in as " + result.user.name);
                        this.signedin = true;
                        this.client.jwt = result.jwt;
                        this.client.user = result.user;
                        this.emit("signedin", this, result.user);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Returns a list of all known collections. By default filtering out history collectins.
     * @param options {@link ListCollectionsOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns
     */
    openiap.prototype.ListCollections = function (options, priority) {
        if (options === void 0) { options = {}; }
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new ListCollectionsDefaults(), options);
                        message = _1.ListCollectionsRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.ListCollectionsRequest", "value": _1.ListCollectionsRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "listcollections", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.ListCollectionsResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.results)];
                }
            });
        });
    };
    /**
     * Drop a collection removing all data from the collection. Only users with admin rights can drop collections.
     * @param options {@link DropCollectionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    openiap.prototype.DropCollection = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new DropCollectionDefaults(), options);
                        message = _1.DropCollectionRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.DropCollectionRequest", "value": _1.DropCollectionRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "dropcollection", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a collection removing all data from the collection. Only users with admin rights can Create collections.
     * @param options {@link CreateCollectionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    openiap.prototype.CreateCollection = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new CreateCollectionDefaults(), options);
                        message = querys_1.CreateCollectionRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.CreateCollectionRequest", "value": querys_1.CreateCollectionRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "createcollection", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Query a collection for data
     * @param options {@link QueryOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns an array of documents matching the query
     * @example
     * Get all documents with type "test" from entities collection
     * ```typescript
     * const result = await client.Query({ query: { "_type": "test" } });
     * ```
     * @example
     * Get all documents with type "test" from entities collection and only return the name field
     * ```typescript
     * const result = await client.Query({ collectionname: "entities", query: { "_type": "test" }, projection: { "name": 1 } });
     * ```
     * @example
     * Get all documents with type "test" from entities collection and only return the name field and order by name
     * ```typescript
     * const result = await client.Query({ collectionname: "entities", query: { "_type": "test" }, projection: { "name": 1 }, orderby: { "name": 1 } });
     * ```
     */
    openiap.prototype.Query = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new QueryDefaults(), options);
                        message = _1.QueryRequest.create(opt);
                        if (typeof message.query == "object")
                            message.query = this.stringify(message.query);
                        if (typeof message.orderby == "object")
                            message.orderby = this.stringify(message.orderby);
                        if (typeof message.projection == "object")
                            message.projection = this.stringify(message.projection);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.QueryRequest", "value": _1.QueryRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "query", data: data });
                        payload.priority = priority;
                        _b = (_a = _1.QueryResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.results)];
                }
            });
        });
    };
    /**
     * Query a collection for data and return the first document
     * @param options {@link FindOneOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns a document matching the query
     * @example
     * Get the first document with type "test" from entities collection
     * ```typescript
     * const result = await client.FindOne({ query: { "_type": "test" } });
     * ```
     * @example
     * Get the first document with type "test" from entities collection and only return the name field
     * ```typescript
     * const result = await client.FindOne({ collectionname: "entities", query: { "_type": "test" }, projection: { "name": 1 } });
     * ```
     * @example
     * Get the first document with type "test" from entities collection and only return the name field and order by name
     * ```typescript
     * const result = await client.FindOne({ collectionname: "entities", query: { "_type": "test" }, projection: { "name": 1 }, orderby: { "name": 1 } });
     * ```
     */
    openiap.prototype.FindOne = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b, array;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new FindOneDefaults(), options);
                        message = _1.QueryRequest.create(opt);
                        message.top = 1;
                        if (typeof message.query == "object")
                            message.query = this.stringify(message.query);
                        if (typeof message.orderby == "object")
                            message.orderby = this.stringify(message.orderby);
                        if (typeof message.projection == "object")
                            message.projection = this.stringify(message.projection);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.QueryRequest", "value": _1.QueryRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "query", data: data });
                        payload.priority = priority;
                        _b = (_a = _1.QueryResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result.results == null || result.results == "")
                            return [2 /*return*/, null];
                        array = JSON.parse(result.results);
                        if (!Array.isArray(array))
                            return [2 /*return*/, null];
                        if (array.length == 0)
                            return [2 /*return*/, null];
                        return [2 /*return*/, array[0]];
                }
            });
        });
    };
    /**
     * By default OpenIAP will keep history information about all data in the database.
     * This function will try and reconstruct the document at it was at a given version.
     * This can be used to restore data to a previous state or even restore deleted data.
     * @param options {@link GetDocumentVersionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns The reconstructed document
     * @example
     * Get the document with id "643917fb153b7c2c1466fb21" from entities collection at version 1
     * ```typescript
     * const result = await client.GetDocumentVersion({ id: "643917fb153b7c2c1466fb21", version: 1 });
     * ```
     */
    openiap.prototype.GetDocumentVersion = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new GetDocumentVersionDefaults(), options);
                        message = _1.GetDocumentVersionRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.GetDocumentVersionRequest", "value": _1.GetDocumentVersionRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "getdocumentversion", data: data });
                        payload.priority = priority;
                        _b = (_a = _1.GetDocumentVersionResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.result)];
                }
            });
        });
    };
    /**
     * Getting the count of documents in a collection can be done using this function.
     * Leave query empty to get the total count of documents in the collection.
     * @param options {@link CountOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns The number of documents matching the query
     * @example
     * Get the count of documents with type "test" from entities collection
     * ```typescript
     * const result = await client.Count({ collectionname: "entities", query: { "_type": "test" } });
     * ```
     * @example
     * Get the total number of documents in the entities collection
     * ```typescript
     * const result = await client.Count({ collectionname: "entities" });
     * ```
     */
    openiap.prototype.Count = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new CountDefaults(), options);
                        message = _1.CountRequest.create(opt);
                        if (typeof message.query == "object")
                            message.query = this.stringify(message.query);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.CountRequest", "value": _1.CountRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "count", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.CountResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.result];
                }
            });
        });
    };
    /**
     * Run an mongodb aggregation pipeline toward the OpenIAP flow database.
     * See https://docs.mongodb.com/manual/aggregation/ for more information
     * @param options {@link AggregateOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns An array of documents matching the aggregation pipeline
     * @see https://docs.mongodb.com/manual/aggregation/
     * @example
     * Get the count of all documents with type "test" from entities collection
     * ```typescript
     * const result = await client.Aggregate({ collectionname: "entities", aggregates: [{ "$match": { "_type": "test" } }, { "$count": "count" }] });
     * ```
     */
    openiap.prototype.Aggregate = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new AggregateDefaults(), options);
                        message = _1.AggregateRequest.create(opt);
                        if (typeof message.aggregates == "object")
                            message.aggregates = this.stringify(message.aggregates);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.AggregateRequest", "value": _1.AggregateRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "aggregate", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.AggregateResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.results)];
                }
            });
        });
    };
    /**
     * Insert a document into a collection
     * @param options {@link InsertOneOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns The object that was created, including the _id field
     * @example
     * Insert a document with type "test" into entities collection
     * ```typescript
     * const result = await client.InsertOne({ collectionname: "entities", item: { "_type": "test", name: "find me" } });
     * ```
     */
    openiap.prototype.InsertOne = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new InsertOneDefaults(), options);
                        message = _1.InsertOneRequest.create(opt);
                        if (typeof message.item == "object")
                            message.item = JSON.stringify(message.item);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.InsertOneRequest", "value": _1.InsertOneRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "insertone", data: data });
                        payload.priority = priority;
                        _b = (_a = _1.InsertOneResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.result)];
                }
            });
        });
    };
    /**
     * Bulk insert multiple documents into a collection, this is faster than using InsertOne multiple times.
     * @param options {@link InsertManyOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns When skipresults is false, will return an array of the documents that was created, including the _id field
     * @example
     * Insert multiple documents with type "test" into entities collection
     * ```typescript
     * const result = await client.InsertMany({ collectionname: "entities", items: [{ "_type": "test", name: "find me" }, { "_type": "test", name: "find me too" }] });
     * ```
     */
    openiap.prototype.InsertMany = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new InsertManyDefaults(), options);
                        message = _1.InsertManyRequest.create(opt);
                        if (typeof message.items == "object")
                            message.items = JSON.stringify(message.items);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.InsertManyRequest", "value": _1.InsertManyRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "insertmany", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.InsertManyResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.results)];
                }
            });
        });
    };
    /**
     * Update ( replace ) an existing document in a collection.
     * Any fields that starts with underscoore will be preserved. This is to prevent the system from overwriting fields that are used by the system.
     * So if you update a document but leave out any of the existing _ fields, they will be added back to the document.
     * @param options {@link UpdateOneOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Returns the document that was updated
     * @example
     * Update a document with type "test" in entities collection
     * ```typescript
     * const result = await client.InsertOne({ item: { "_type": "test", name: "find me" } });
     * console.log("Inserted document with id: " + result._id + " and name: " + result.name);
     * result.name = "Can you still find me?"
     * const updated = await client.UpdateOne({ item: result });
     * console.log("Updated document with id: " + updated._id + " and name: " + updated.name);
     * ```
     */
    openiap.prototype.UpdateOne = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new UpdateOneDefaults(), options);
                        message = _1.UpdateOneRequest.create(opt);
                        if (typeof message.item == "object")
                            message.item = JSON.stringify(message.item);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.UpdateOneRequest", "value": _1.UpdateOneRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "updateone", data: data });
                        payload.priority = priority;
                        _b = (_a = _1.UpdateOneResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.result)];
                }
            });
        });
    };
    /**
     * Run an update command on a collection, to update one or more documents matching a query.
     * See https://docs.mongodb.com/manual/reference/operator/update/ for more information on the update operators.
     * @param options {@link UpdateDocumentOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns An object with update statistics see {@link UpdateResult}
     * @see https://docs.mongodb.com/manual/reference/operator/update/
     * @example
     * Update all documents with type "test" in entities collection
     * ```typescript
     * const result = await client.UpdateDocument({ collectionname: "entities", query: { "_type": "test" }, document: { "$set": { "name": "find me" } } });
     * console.log("Updated " + result.matchedCount + " documents");
     * ```
     */
    openiap.prototype.UpdateDocument = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new UpdateDocumentDefaults(), options);
                        message = _1.UpdateDocumentRequest.create(opt);
                        if (typeof message.document == "object")
                            message.document = this.stringify(message.document);
                        if (typeof message.query == "object")
                            message.query = this.stringify(message.query);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.UpdateDocumentRequest", "value": _1.UpdateDocumentRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "updatedocument", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.UpdateDocumentResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.opresult];
                }
            });
        });
    };
    /**
     * Will match a document in a collection on the uniqeness parameters ( _id if left out ) and update it if it exists, or insert it if it does not exist.
     * Will trhow an error if more than one document exists that matches the uniqeness parameters.
     * @param options {@link InsertOrUpdateOneOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns The updated or inserted document including the _id field
     * @example
     * Insert or update a document with invoiceid "1234" in entities collection
     * ```typescript
     * const result = await client.InsertOrUpdateOne({ item: { "_type": "invoice", invoiceid: "1234", name: "find me" }, uniqeness: ["invoiceid"] });
     * console.log("Inserted document with id: " + result._id + " and name: " + result.name);
     *
     * const same_invoice = { "_type": "invoice", invoiceid: "1234", name: "Can you still find me?"}
     * const updated = await client.InsertOrUpdateOne({ item: same_invoice, uniqeness: ["invoiceid"] });
     * console.log("Updated document with id: " + updated._id + " and new name: " + updated.name);
     * ```
     */
    openiap.prototype.InsertOrUpdateOne = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new InsertOrUpdateOneDefaults(), options);
                        message = _1.InsertOrUpdateOneRequest.create(opt);
                        if (typeof message.item == "object")
                            message.item = JSON.stringify(message.item);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.InsertOrUpdateOneRequest", "value": _1.InsertOrUpdateOneRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "insertorupdateone", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.InsertOrUpdateOneResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.result)];
                }
            });
        });
    };
    /**
     * Will match all documents toward a collection using the uniqeness parameters ( _id if left out ) and update it if it exists, or insert it if it does not exist.
     * Will trhow an error if more than one document exists that matches the uniqeness parameters.
     * This will use bulk operations to speed up the process.
     * @param options {@link InsertOrUpdateManyOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns  The updated or inserted documents including the _id field
     * @example
     * Insert or update multiple invoice documents in entities collection
     * ```typescript
     * const invoices = [{ "_type": "invoice", invoiceid: "1234", name: "find me" }, { "_type": "invoice", invoiceid: "1235", name: "find me too" }]
     * const result = await client.InsertOrUpdateMany({ items: invoices, uniqeness: ["invoiceid"] });
     * console.log("Inserted document with id: " + result[0]._id + " and name: " + result[0].name);
     * console.log("Inserted document with id: " + result[1]._id + " and name: " + result[1].name);
     *
     * const same_invoice = [{ "_type": "invoice", invoiceid: "1234", name: "Can you still find me?"}, { "_type": "invoice", invoiceid: "1235", name: "Can you still find me too?"}]
     * const updated = await client.InsertOrUpdateMany({ items: same_invoice, uniqeness: ["invoiceid"] });
     * console.log("Updated document with id: " + updated[0]._id + " and new name: " + updated[0].name);
     * console.log("Updated document with id: " + updated[1]._id + " and new name: " + updated[1].name);
     * ```
     */
    openiap.prototype.InsertOrUpdateMany = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new InsertOrUpdateManyDefaults(), options);
                        message = _1.InsertOrUpdateManyRequest.create(opt);
                        if (typeof message.items == "object")
                            message.items = JSON.stringify(message.items);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.InsertOrUpdateManyRequest", "value": _1.InsertOrUpdateManyRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "insertorupdatemany", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.InsertOrUpdateManyResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, JSON.parse(result.results)];
                }
            });
        });
    };
    /**
     * Delete one document from a collection.
     * Will throw an error if document does not exist or you don't have the right permissions.
     * if recursive is set to true, all asssoicated documents will be deleted as well.
     * Currently only user and customer objects in the "users" collection are supported for recursive deletion.
     * @param options {@link DeleteOneOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Number of deleted documents (will always be 1)
     * @example
     * Delete a document with id "643917fb153b7c2c1466fb21" in entities collection
     * ```typescript
     * const result = await client.DeleteOne({ id: "643917fb153b7c2c1466fb21" } });
     * console.log("Deleted " + result + " documents");
     * ```
     */
    openiap.prototype.DeleteOne = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new DeleteOneDefaults(), options);
                        message = _1.DeleteOneRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.DeleteOneRequest", "value": _1.DeleteOneRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "deleteone", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.DeleteOneResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.affectedrows];
                }
            });
        });
    };
    /**
     * Delete many documents from a collection based on a query.
     * Will return 0 if no documents are deleted.
     * @param options {@link DeleteManyOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns The number of deleted documents
     * @example
     * Delete all documents with name "find me" in entities collection
     * ```typescript
     * const result = await client.DeleteMany({ query: { name: "find me" } });
     * console.log("Deleted " + result + " documents");
     * ```
     * Delete all documents with type "invoice" in entities collection
     * ```typescript
     * const result = await client.DeleteMany({ query: { _type: "invoice" } });
     * console.log("Deleted " + result + " documents");
     * ```
     */
    openiap.prototype.DeleteMany = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new DeleteManyDefaults(), options);
                        message = _1.DeleteManyRequest.create(opt);
                        if (typeof message.query == "object")
                            message.query = this.stringify(message.query);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.DeleteManyRequest", "value": _1.DeleteManyRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "deletemany", data: data });
                        payload.priority = priority;
                        _b = (_a = _1.DeleteManyResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.affectedrows];
                }
            });
        });
    };
    /**
     * Register a change stream ( watch ) on a collection. Use paths to narrow the scope of the watch.
     * The callback will be called for each document that matches the paths when ever it is inserted, updated or deleted from the database
     * This uses streams to notify client about changes, and is therefore not supported using REST interface.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @param callback
     * @returns server id assigned to the watch. Used with {@link UnWatch} to stop receiving notifications from the watch.
     * @example
     * const watchid = await db.Watch({ collectionname: "entities", paths: ["$.[?(@._type == 'test')]"] }, (operation, document) => {
     *     console.log(operation + " on " + document.name);
     * });
     */
    openiap.prototype.Watch = function (options, callback, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, i, element, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!callback)
                            return [2 /*return*/, ""];
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new WatchDefaults(), options);
                        if (opt.paths) {
                            if (Array.isArray(opt.paths)) {
                                for (i = 0; i < opt.paths.length; i++) {
                                    element = opt.paths[i];
                                    if (element != null && typeof element !== "string")
                                        opt.paths[i] = JSON.stringify(element);
                                }
                            }
                        }
                        message = _1.WatchRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.WatchRequest", "value": _1.WatchRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "watch", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.WatchResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result.id && result.id != "") {
                            this.watchids[result.id] = callback;
                        }
                        return [2 /*return*/, result.id];
                }
            });
        });
    };
    /**
     * Unregister a change stream ( watch ) created with {@link Watch } to stop receiving notifications from the watch.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    openiap.prototype.UnWatch = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new UnWatchDefaults(), options);
                        delete this.watchids[opt.id];
                        message = _1.UnWatchRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.UnWatchRequest", "value": _1.UnWatchRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "unwatch", data: data });
                        payload.priority = priority;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dummy function used to test the connection to the server.
     * @param xpath
     * @returns xpath with added text
     */
    openiap.prototype.GetElement = function (xpath) {
        return __awaiter(this, void 0, void 0, function () {
            var message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        message = base_1.GetElementRequest.create({ xpath: xpath });
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.GetElementRequest", "value": base_1.GetElementRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "getelement", data: data });
                        _b = (_a = base_1.GetElementResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.xpath];
                }
            });
        });
    };
    /**
     * Download a file from OpenIAP flow database, using the file id or file name.
     * This uses streams to download file content, and is therefore not supported using REST interface.
     * @param options
     * @returns
     */
    openiap.prototype.DownloadFile = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var opt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new DownloadFileDefaults(), options);
                        return [4 /*yield*/, protowrap_1.protowrap.DownloadFile(this.client, opt.id, opt.filename, opt.folder, config_1.config.SendFileHighWaterMark)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Upload a file to OpenIAP flow database.
     * This uses streams to download file content, and is therefore not supported using REST interface.
     * @param options
     * @returns Server response, including the file id
     * @see {@link UploadResponse}
     * @see {@link UploadFileOptions}
     * @example
     * Upload test.txt from current folder to OpenIAP flow database
     * ```typescript
     * const res = await client.UploadFile({ filename: "test.txt" });
     * console.log("file upladed with id " + res.id);
     * ```
     */
    openiap.prototype.UploadFile = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var opt, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new UploadFileDefaults(), options);
                        return [4 /*yield*/, protowrap_1.protowrap.UploadFile(this.client, opt.filename, opt.jwt)];
                    case 1:
                        result = _a.sent();
                        res = base_1.UploadResponse.decode(result.data.value);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Register and consume a Message Queue. Queues are registered in the mq collection.
     * If no queue name is provided, a random queue name is generated.
     * This uses streams to notify client about messages, and is therefore not supported using REST interface.
     * @param options
     * @param callback
     * @returns Returns the queue name. Use this name to send messages to the queue. Also use this to unregister the queue with {@link UnRegisterQueue }
     * @see {@link QueueMessage}
     * @see {@link UnRegisterQueue}
     * @example
     * ```typescript
     * const queuename = await client.RegisterQueue({ queuename: "myqueue" }, (msg, payload, user, jwt) => {
     *   console.log(JSON.stringify(payload, null, 2));
     *   if(payload == null) payload = {}
     *   payload.result = true
     *   // If returning a onject, it will be sent back to the sender of the message, if caller requested a response using rpc = true.
     *   return payload;
     * });
     * console.log("registered queue " + queuename);
     * ```
     */
    openiap.prototype.RegisterQueue = function (options, callback, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!callback)
                            return [2 /*return*/, ""];
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new RegisterQueueDefaults(), options);
                        message = _1.RegisterQueueRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.RegisterQueueRequest", "value": _1.RegisterQueueRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "registerqueue", data: data, jwt: opt.jwt });
                        if (opt.queuename && opt.queuename != "")
                            this.queues[opt.queuename] = callback;
                        payload.priority = priority;
                        _b = (_a = _1.RegisterQueueResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (this.defaltqueue == "" && (opt.queuename == "" || opt.queuename == null))
                            this.defaltqueue = result.queuename;
                        if (result.queuename != null && result.queuename != "" && result.queuename != opt.queuename) {
                            this.queues[result.queuename] = callback;
                            delete this.queues[opt.queuename];
                        }
                        return [2 /*return*/, result.queuename];
                }
            });
        });
    };
    /**
     * Register an exchange and a message queue and consume it. Exchange's are registered in the mq collection.
     * This uses streams to notify client about messages, and is therefore not supported using REST interface.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @param callback
     * @returns Returns the queue name, used to consume the exchange. Use this when unregistering the exchange with {@link UnRegisterQueue }
     * @see {@link QueueMessage}
     * @see {@link UnRegisterQueue}
     * @example
     * ```typescript
     * const queuename = await client.RegisterExchange({ exchange: "myexchange" }, (msg, payload, user, jwt) => {
     *   console.log(JSON.stringify(payload, null, 2));
     * });
     * console.log("registered exchange myexchange and is consuming it using queue " + queuename);
     * ```
     */
    openiap.prototype.RegisterExchange = function (options, callback, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!callback)
                            return [2 /*return*/, ""];
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new RegisterExchangeDefaults(), options);
                        message = _1.RegisterExchangeRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.RegisterExchangeRequest", "value": _1.RegisterExchangeRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "registerexchange", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.RegisterExchangeResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result.queuename && result.queuename != "" && opt.addqueue) {
                            this.queues[result.queuename] = callback;
                        }
                        return [2 /*return*/, result.queuename];
                }
            });
        });
    };
    /**
     * Tell server to close queue and stop receving message from the queue ( or queue consuming an exchange )
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @see {@link RegisterQueue}
     * @see {@link RegisterExchange}
     * @example
     * ```typescript
     * const queuename = await client.RegisterExchange({ exchange: "myexchange" }, async (msg, payload, user, jwt) => {
     *   console.log(JSON.stringify(payload, null, 2));
     *   await client.UnRegisterQueue({ queuename: queuename });
     *   console.log("unregistered queue " + queuename);
     * });
     * console.log("registered exchange myexchange and is consuming it using queue " + queuename);
     * ```
     */
    openiap.prototype.UnRegisterQueue = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new UnRegisterQueueDefaults(), options);
                        message = _1.UnRegisterQueueRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.UnRegisterQueueRequest", "value": _1.UnRegisterQueueRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "unregisterqueue", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _a.sent();
                        if (this.defaltqueue == opt.queuename)
                            this.defaltqueue = "";
                        delete this.queues[opt.queuename];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send message to queue or exchange. If recevied sends a reply back, set rpc = true to recevied response as return value.
     * Be aware, right now there is no timeout on the wait, so if recevier never sends a reply it will hang for ever
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @param rpc
     * @returns If rpc is trye, will return the reply from the queue. If rpc is false, will return null when server has received the message
     * @see {@link RegisterQueue}
     * @see {@link RegisterExchange}
     * @example
     * Send message to myqueue and wait for reply, then dump the result to console
     * ```typescript
     * const result = await client.QueueMessage({ queuename: "myqueue", data: { "hello": "world" } }, true);
     * console.log("result from queue " + JSON.stringify(result, null, 2));
     * ```
     * @example
     * Send message to myexchange
     * ```typescript
     * await client.QueueMessage({ exchangename: "myexchange", data: { "hello": "world" } }, false);
     * ```
     */
    openiap.prototype.QueueMessage = function (options, rpc, priority) {
        if (rpc === void 0) { rpc = false; }
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.connected)
                    throw new Error("Not connected to server");
                if (!this.signedin)
                    throw new Error("Not signed in to server");
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var opt, _a, message, data, payload, result, error_4;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 5, , 6]);
                                    opt = Object.assign(new QueueMessageDefaults(), options);
                                    if (typeof opt.data !== 'string')
                                        opt.data = JSON.stringify(opt.data);
                                    if (!rpc) return [3 /*break*/, 3];
                                    if (!(this.defaltqueue == "")) return [3 /*break*/, 2];
                                    _a = this;
                                    return [4 /*yield*/, this.RegisterQueue({ queuename: "" }, function (msg, payload, user, jwt) {
                                            if (msg && msg.correlationId) {
                                                warn("temp queue received message for unknown receiver with correlationId " + msg.correlationId);
                                            }
                                            else {
                                                warn("temp queue received message for unknown receiver");
                                            }
                                        })];
                                case 1:
                                    _a.defaltqueue = _b.sent();
                                    info("Auto registered reply queue " + this.defaltqueue);
                                    _b.label = 2;
                                case 2:
                                    opt.correlationId = openiap.GetUniqueIdentifier();
                                    opt.replyto = this.defaltqueue;
                                    this.queuecallbacks[opt.correlationId] = function (message, user) {
                                        resolve(message);
                                    };
                                    _b.label = 3;
                                case 3:
                                    message = _1.QueueMessageRequest.create(opt);
                                    data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.QueueMessageRequest", "value": _1.QueueMessageRequest.encode(message).finish() });
                                    payload = base_1.Envelope.create({ command: "queuemessage", data: data, jwt: opt.jwt });
                                    payload.priority = priority;
                                    return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                                case 4:
                                    result = _b.sent();
                                    if (!rpc)
                                        resolve(null);
                                    return [3 /*break*/, 6];
                                case 5:
                                    error_4 = _b.sent();
                                    reject(error_4);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Push a workitem to a workqueue. Workitem can be processed by a worker after calling {@link PopWorkitem}
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Returns the workitem that was pushed, including the workitem id
     * @see {@link PopWorkitem}
     * @see {@link PushWorkitems}
     * @example
     * Push a workitem to myworkqueue
     * ```typescript
     * const workitem = await client.PushWorkitem({ wiq: "myworkqueue", payload: { "hello": "world" } });
     * console.log("Pushed workitem with id " + workitem._id);
     * ```
     * @example
     * Push a workitem with a file to myworkqueue
     * ```typescript
     * import * as path  from 'path';
     * import * as fs  from "fs";
     * import * as pako from 'pako';
     * // ....
     * const filepath = "/path/data.csv";
     * const filename = path.basename(filepath);
     * const workitem = await client.PushWorkitem({
     *  payload: {"name": "test " + filename}, wiq: "q2", name: "file test " + filename,
     *   files: [{ _id:"", filename, compressed: true, file: pako.deflate(fs.readFileSync(filepath, null)) }]});
     * console.log("Pushed workitem with id " + workitem._id);
     */
    openiap.prototype.PushWorkitem = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new PushWorkitemDefaults(), options);
                        if (typeof opt.payload !== 'string')
                            opt.payload = JSON.stringify(opt.payload);
                        message = _1.PushWorkitemRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.PushWorkitemRequest", "value": _1.PushWorkitemRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "pushworkitem", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.PushWorkitemResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result && result.workitem && result.workitem.payload) {
                            if (typeof result.workitem.payload == "string") {
                                try {
                                    result.workitem.payload = JSON.parse(result.workitem.payload);
                                }
                                catch (error) {
                                }
                            }
                        }
                        return [2 /*return*/, result.workitem];
                }
            });
        });
    };
    /**
     * Push multiple workitems to a workqueue. Workitems can be processed by a worker after calling {@link PopWorkitem}
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns an array of workitems that was pushed, including the workitem id's
     */
    openiap.prototype.PushWorkitems = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b, i, wi;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new PushWorkitemsDefaults(), options);
                        opt.items.forEach(function (wi) {
                            if (typeof wi.payload !== 'string')
                                wi.payload = JSON.stringify(wi.payload);
                        });
                        message = _1.PushWorkitemsRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.PushWorkitemsRequest", "value": _1.PushWorkitemsRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "pushworkitems", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.PushWorkitemsResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result.workitems) {
                            for (i = 0; i < result.workitems.length; i++) {
                                wi = result.workitems[i];
                                if (wi && wi.payload) {
                                    if (typeof wi.payload == "string") {
                                        try {
                                            wi.payload = JSON.parse(wi.payload);
                                        }
                                        catch (error) {
                                        }
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, result.workitems];
                }
            });
        });
    };
    /**
     * Pop an item of a workitem queue. An items aviailable in the queue will be determined by it's status, retry time and runat time steamp.
     * If multiple items are available, the items will be fatched based on each wrkitem's priority field.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns If no workitem is available, this will return null.
     */
    openiap.prototype.PopWorkitem = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new PopWorkitemDefaults(), options);
                        message = _1.PopWorkitemRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.PopWorkitemRequest", "value": _1.PopWorkitemRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "popworkitem", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.PopWorkitemResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result && result.workitem && result.workitem.payload) {
                            if (typeof result.workitem.payload == "string") {
                                try {
                                    result.workitem.payload = JSON.parse(result.workitem.payload);
                                }
                                catch (error) {
                                }
                            }
                        }
                        return [2 /*return*/, result.workitem];
                }
            });
        });
    };
    /**
     * Update an existing workitem. Workitem can be fetched using {@link PopWorkitem}. Use this to update the status of a workitem.
     * You can also update the payload, and update or add files to the workitem.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Returns the updated workitem
     * @see {@link PopWorkitem}
     * @example
     * Update a workitem
     * ```typescript
     * const workitem = await client.PopWorkitem({ wiq: "purchase_orders" }); // Will update the workitem state to processing
     * if(workitem == null) return;
     * await new Promise(resolve => setTimeout(resolve, 1000)); // simulate processing
     * if(workitem.payload == null) workitem.payload = {}
     * workitem.payload.transaction = "ID45434" // update payload
     * workitem.status = "successful" // must be successful, processing or retry
     * await client.UpdateWorkitem({ workitem }); // update workitem
     * console.log("Updated workitem with id " + workitem._id);
     * ```
     */
    openiap.prototype.UpdateWorkitem = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new UpdateWorkitemDefaults(), options);
                        if (typeof opt.workitem.payload !== 'string')
                            opt.workitem.payload = JSON.stringify(opt.workitem.payload);
                        message = _1.UpdateWorkitemRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.UpdateWorkitemRequest", "value": _1.UpdateWorkitemRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "updateworkitem", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = _1.UpdateWorkitemResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        if (result && result.workitem && result.workitem.payload) {
                            if (typeof result.workitem.payload == "string") {
                                try {
                                    result.workitem.payload = JSON.parse(result.workitem.payload);
                                }
                                catch (error) {
                                }
                            }
                        }
                        return [2 /*return*/, result.workitem];
                }
            });
        });
    };
    /**
     * Delete one workitem and all associated files from a workitem queue.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @example
     * Delete a workitem
     * ```typescript
     * client.DeleteWorkitem({ id: "64366f12cffb7419a89d5e10" });
     * ```
     */
    openiap.prototype.DeleteWorkitem = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new DeleteWorkitemDefaults(), options);
                        message = _1.DeleteWorkitemRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.DeleteWorkitemRequest", "value": _1.DeleteWorkitemRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "deleteworkitem", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Run custom commands not defined in the protocol yet.
     * This is how new functioanlly is added and tested, before it is finally added to the offical proto3 protocol.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns If command has a result, this will be returned as a string. This will most likely need to be parser as JSON
     */
    openiap.prototype.CustomCommand = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new CustomCommandDefaults(), options);
                        if (opt.data != null && typeof opt.data !== "string")
                            opt.data = JSON.stringify(opt.data);
                        message = base_1.CustomCommandRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.CustomCommand", "value": base_1.CustomCommandRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "customcommand", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = base_1.CustomCommandResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.result];
                }
            });
        });
    };
    /**
     * Old command used by nodered "Workflow in" and "assign" nodes for creating a new workflow instance.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns
     */
    openiap.prototype.CreateWorkflowInstance = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new CreateWorkflowInstanceDefaults(), options);
                        if (opt.data != null && typeof opt.data !== "string")
                            opt.data = JSON.stringify(opt.data);
                        message = queues_1.CreateWorkflowInstanceRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.CreateWorkflowInstance", "value": queues_1.CreateWorkflowInstanceRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "createworkflowinstance", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        _b = (_a = queues_1.CreateWorkflowInstanceResponse).decode;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data.value]);
                        return [2 /*return*/, result.instanceid];
                }
            });
        });
    };
    /**
     * Create a collection removing all data from the collection. Only users with admin rights can Create collections.
     * @param options {@link EnsureCustomerOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    openiap.prototype.EnsureCustomer = function (options, priority) {
        if (priority === void 0) { priority = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var opt, message, data, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Not connected to server");
                        if (!this.signedin)
                            throw new Error("Not signed in to server");
                        opt = Object.assign(new EnsureCustomerDefaults(), options);
                        message = base_1.EnsureCustomerRequest.create(opt);
                        data = any_1.Any.create({ type_url: "type.googleapis.com/openiap.EnsureCustomerRequest", "value": base_1.EnsureCustomerRequest.encode(message).finish() });
                        payload = base_1.Envelope.create({ command: "ensurecustomer", data: data, jwt: opt.jwt });
                        payload.priority = priority;
                        return [4 /*yield*/, protowrap_1.protowrap.RPC(this.client, payload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return openiap;
}(events_1.EventEmitter));
exports.openiap = openiap;
var SigninDefaults = /** @class */ (function () {
    function SigninDefaults() {
        this.ping = true;
        this.validateonly = false;
        this.longtoken = false;
    }
    return SigninDefaults;
}());
var ListCollectionsDefaults = /** @class */ (function () {
    function ListCollectionsDefaults() {
        this.includehist = false;
    }
    return ListCollectionsDefaults;
}());
var DropCollectionDefaults = /** @class */ (function () {
    function DropCollectionDefaults() {
    }
    return DropCollectionDefaults;
}());
var CreateCollectionDefaults = /** @class */ (function () {
    function CreateCollectionDefaults() {
    }
    return CreateCollectionDefaults;
}());
var FindOneDefaults = /** @class */ (function () {
    function FindOneDefaults() {
        this.collectionname = "entities";
        this.query = {};
    }
    return FindOneDefaults;
}());
var QueryDefaults = /** @class */ (function () {
    function QueryDefaults() {
        this.collectionname = "entities";
        this.query = {};
        this.top = 100;
        this.skip = 0;
    }
    return QueryDefaults;
}());
var GetDocumentVersionDefaults = /** @class */ (function () {
    function GetDocumentVersionDefaults() {
        this.collectionname = "entities";
        this.version = 0; // latest
        this.decrypt = true;
    }
    return GetDocumentVersionDefaults;
}());
var CountDefaults = /** @class */ (function () {
    function CountDefaults() {
        this.collectionname = "entities";
        this.query = {};
    }
    return CountDefaults;
}());
var AggregateDefaults = /** @class */ (function () {
    function AggregateDefaults() {
        this.collectionname = "entities";
        this.aggregates = [];
    }
    return AggregateDefaults;
}());
var InsertOneDefaults = /** @class */ (function () {
    function InsertOneDefaults() {
        this.collectionname = "entities";
    }
    return InsertOneDefaults;
}());
var InsertManyDefaults = /** @class */ (function () {
    function InsertManyDefaults() {
        this.collectionname = "entities";
    }
    return InsertManyDefaults;
}());
var UpdateOneDefaults = /** @class */ (function () {
    function UpdateOneDefaults() {
        this.collectionname = "entities";
    }
    return UpdateOneDefaults;
}());
var UpdateDocumentDefaults = /** @class */ (function () {
    function UpdateDocumentDefaults() {
        this.collectionname = "entities";
    }
    return UpdateDocumentDefaults;
}());
var InsertOrUpdateOneDefaults = /** @class */ (function () {
    function InsertOrUpdateOneDefaults() {
        this.collectionname = "entities";
    }
    return InsertOrUpdateOneDefaults;
}());
var InsertOrUpdateManyDefaults = /** @class */ (function () {
    function InsertOrUpdateManyDefaults() {
        this.collectionname = "entities";
        this.skipresults = true;
    }
    return InsertOrUpdateManyDefaults;
}());
var DeleteOneDefaults = /** @class */ (function () {
    function DeleteOneDefaults() {
        this.collectionname = "entities";
    }
    return DeleteOneDefaults;
}());
var DeleteManyDefaults = /** @class */ (function () {
    function DeleteManyDefaults() {
        this.collectionname = "entities";
    }
    return DeleteManyDefaults;
}());
var WatchDefaults = /** @class */ (function () {
    function WatchDefaults() {
        this.collectionname = "entities";
    }
    return WatchDefaults;
}());
var UnWatchDefaults = /** @class */ (function () {
    function UnWatchDefaults() {
    }
    return UnWatchDefaults;
}());
var DownloadFileDefaults = /** @class */ (function () {
    function DownloadFileDefaults() {
    }
    return DownloadFileDefaults;
}());
var UploadFileDefaults = /** @class */ (function () {
    function UploadFileDefaults() {
    }
    return UploadFileDefaults;
}());
var RegisterQueueDefaults = /** @class */ (function () {
    function RegisterQueueDefaults() {
    }
    return RegisterQueueDefaults;
}());
var RegisterExchangeDefaults = /** @class */ (function () {
    function RegisterExchangeDefaults() {
        this.algorithm = "fanout";
        this.routingkey = "";
        this.addqueue = true;
    }
    return RegisterExchangeDefaults;
}());
var UnRegisterQueueDefaults = /** @class */ (function () {
    function UnRegisterQueueDefaults() {
    }
    return UnRegisterQueueDefaults;
}());
var QueueMessageDefaults = /** @class */ (function () {
    function QueueMessageDefaults() {
        this.striptoken = false;
    }
    return QueueMessageDefaults;
}());
var PushWorkitemDefaults = /** @class */ (function () {
    function PushWorkitemDefaults() {
        this.priority = 2;
    }
    return PushWorkitemDefaults;
}());
var PushWorkitemsDefaults = /** @class */ (function () {
    function PushWorkitemsDefaults() {
        this.priority = 2;
    }
    return PushWorkitemsDefaults;
}());
var PopWorkitemDefaults = /** @class */ (function () {
    function PopWorkitemDefaults() {
        this.includefiles = true;
        this.compressed = true;
    }
    return PopWorkitemDefaults;
}());
var UpdateWorkitemDefaults = /** @class */ (function () {
    function UpdateWorkitemDefaults() {
        this.ignoremaxretries = false;
    }
    return UpdateWorkitemDefaults;
}());
var DeleteWorkitemDefaults = /** @class */ (function () {
    function DeleteWorkitemDefaults() {
    }
    return DeleteWorkitemDefaults;
}());
var CustomCommandDefaults = /** @class */ (function () {
    function CustomCommandDefaults() {
    }
    return CustomCommandDefaults;
}());
var CreateWorkflowInstanceDefaults = /** @class */ (function () {
    function CreateWorkflowInstanceDefaults() {
        this.initialrun = false;
    }
    return CreateWorkflowInstanceDefaults;
}());
var EnsureCustomerDefaults = /** @class */ (function () {
    function EnsureCustomerDefaults() {
    }
    return EnsureCustomerDefaults;
}());
//# sourceMappingURL=openiap.js.map