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
console.log("BEGIN CLI");
var config_1 = require("./config");
var info = config_1.config.info, err = config_1.config.err, warn = config_1.config.warn;
var fs = require("fs");
var path = require("path");
var protowrap_1 = require("./protowrap");
var readline = require("readline");
var process_1 = require("process");
var rl = readline.createInterface({ input: process_1.stdin, output: process_1.stdout });
var pako = require("pako");
var openiap_1 = require("./openiap");
var base_1 = require("./proto/base");
var any_1 = require("./proto/google/protobuf/any");
var watch_1 = require("./proto/watch");
var workitems_1 = require("./proto/workitems");
// kill $(ps aux | grep 'client.js' | awk '{print $2}')
var url = process.argv[2] || process.env.apiurl;
if (url == "" || url == null)
    url = process.env.grpcapiurl;
if (url == "" || url == null)
    url = process.env.wscapiurl;
var lastfilename = "";
var files = [
    // "/home/allan/Documents/virtio-win-0.1.225.iso",              // 532MB
    // "/home/allan/Documents/SafeNetAuthenticationClient-x64.msi", // 21MB
    // "/home/allan/Documents/DR_PCE-AC58BT_Win10_Linux.zip",       // 160MB
    "/home/allan/Pictures/allan3.png",
    "/home/allan/Pictures/allan.png",
    "/home/allan/Pictures/allan2.png", // 1.8MB
];
function cleanup() {
    for (var i = 0; i < files.length; i++) {
        var filename = files[i];
        var name_1 = path.basename(filename);
        if (fs.existsSync(name_1))
            fs.unlinkSync(name_1);
    }
    if (fs.existsSync("upload.png"))
        fs.unlinkSync("upload.png");
    if (fs.existsSync("download.png"))
        fs.unlinkSync("download.png");
    if (fs.existsSync("client.hex"))
        fs.unlinkSync("client.hex");
    if (fs.existsSync("server.hex"))
        fs.unlinkSync("server.hex");
}
function nextfilename() {
    var filename = "";
    var idx = files.indexOf(lastfilename);
    if (idx == -1) {
        filename = files[0];
    }
    else if (idx == files.length - 1) {
        filename = files[0];
    }
    else {
        filename = files[idx + 1];
    }
    lastfilename = filename;
    return filename;
}
function onMessage(stream, message) {
    return __awaiter(this, void 0, void 0, function () {
        var msg, doc;
        return __generator(this, function (_a) {
            if (message.command == "ping") {
                return [2 /*return*/, base_1.Envelope.create({ command: "pong", rid: message.id, data: base_1.PingRequest.create() })];
            }
            else if (message.command == "watchevent") {
                msg = watch_1.WatchEvent.decode(message.data);
                doc = JSON.parse(msg.document);
                info("Watch event: " + msg.operation + " " + doc._type + " " + doc.name);
            }
            return [2 /*return*/, null];
        });
    });
}
function readln(q) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    rl.question(q, function (answer) {
                        resolve(answer);
                    });
                })];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var c, _loop_1, payload, str, data2, data, data2, u, items, items, count, result, old, Readable, rs, filename, constresult, filepath, filename, items, wi1, filepath, filename, wi2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config_1.config.DoPing = false;
                    config_1.config.doDumpMesssages = true;
                    c = new openiap_1.openiap(url);
                    // c.onMessage = onMessage;
                    return [4 /*yield*/, c.connect()];
                case 1:
                    // c.onMessage = onMessage;
                    _a.sent();
                    cleanup();
                    _loop_1 = function () {
                        var result_1, result_2, i_1, mainStartTime, skipresults, results, mainElapsedTime, u_1, result_3, result_4, i_2, mainStartTime, skipresults, results, mainElapsedTime, u_2, result_5, result_6, results, i, results, i, results, i, i, rid_1, startTime, result_7, filepath_1, filename_1, _b, _c, error_1;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 52, 53, 54]);
                                    payload = { command: "getelement", data: null };
                                    return [4 /*yield*/, readln('')];
                                case 1:
                                    str = _d.sent();
                                    if (str == "q" || str == "x") {
                                        process.exit();
                                    }
                                    else if (c == null || !c.connected) {
                                        err(new Error("Client not connected!"));
                                        return [2 /*return*/, "continue"];
                                    }
                                    if (!(str == "nnn")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, c.RegisterQueue({ queuename: "ExampleQueue" }, function (msg, payload) { return __awaiter(_this, void 0, void 0, function () {
                                            var workitem;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        info("RECEIVED QueueMessage replyto=" + msg.replyto + "");
                                                        payload.name = "blah blah";
                                                        return [4 /*yield*/, c.PopWorkitem({ wiq: "ExampleQueue", includefiles: true, compressed: false })];
                                                    case 1:
                                                        workitem = _a.sent();
                                                        if (!(workitem != null)) return [3 /*break*/, 3];
                                                        console.log("poped item " + workitem._id + " " + workitem.name);
                                                        workitem.state = "successful";
                                                        return [4 /*yield*/, c.UpdateWorkitem({ workitem: workitem })];
                                                    case 2:
                                                        _a.sent();
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        console.log("no more workitems");
                                                        _a.label = 4;
                                                    case 4: return [2 /*return*/, payload];
                                                }
                                            });
                                        }); })];
                                case 2:
                                    data2 = _d.sent();
                                    return [4 /*yield*/, c.PushWorkitem({ wiq: "ExampleQueue", payload: { name: "test", state: "new" } })];
                                case 3:
                                    _d.sent();
                                    console.log(data2);
                                    return [3 /*break*/, 51];
                                case 4:
                                    if (!(str == "n")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, c.QueueMessage({ queuename: "findme555", data: { "text": "Hej smukke" }, striptoken: true }, true)];
                                case 5:
                                    data = _d.sent();
                                    console.log("QueueMessage REPLY", data);
                                    return [3 /*break*/, 51];
                                case 6:
                                    if (!(str == "nn")) return [3 /*break*/, 8];
                                    return [4 /*yield*/, c.RegisterQueue({ queuename: "findme555" }, function (msg, payload, user, jwt) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                console.log("findme555 RECEIVE", msg);
                                                console.log("findme555 RECEIVE", payload);
                                                payload.name = "Hi there";
                                                return [2 /*return*/, payload];
                                            });
                                        }); })];
                                case 7:
                                    data2 = _d.sent();
                                    console.log("RegisterQueue", data2);
                                    return [3 /*break*/, 51];
                                case 8:
                                    if (!(str == "un")) return [3 /*break*/, 10];
                                    return [4 /*yield*/, c.UnRegisterQueue({ queuename: "findme555" })];
                                case 9:
                                    _d.sent();
                                    return [3 /*break*/, 51];
                                case 10:
                                    if (!(str == "s")) return [3 /*break*/, 12];
                                    return [4 /*yield*/, c.Signin({ username: "username", password: "supersecret", ping: config_1.config.DoPing })];
                                case 11:
                                    u = _d.sent();
                                    console.log(data);
                                    return [3 /*break*/, 51];
                                case 12:
                                    if (!(!str || str == '' || str == "null")) return [3 /*break*/, 13];
                                    c.GetElement("");
                                    return [3 /*break*/, 51];
                                case 13:
                                    if (!(str == "cmd")) return [3 /*break*/, 15];
                                    return [4 /*yield*/, c.CustomCommand({ "command": "getagentpods", "id": "63d70276b353f010a48ef9c4" })];
                                case 14:
                                    result_1 = _d.sent();
                                    info(result_1);
                                    return [3 /*break*/, 51];
                                case 15:
                                    if (!(str == "iu")) return [3 /*break*/, 17];
                                    return [4 /*yield*/, c.InsertOrUpdateOne({ uniqeness: "name,_type", item: { "name": "Find me", "_type": "test", "dt": new Date().toISOString() }, collectionname: "entities" })];
                                case 16:
                                    result_2 = _d.sent();
                                    info(result_2._id);
                                    return [3 /*break*/, 51];
                                case 17:
                                    if (!(str == "iuu")) return [3 /*break*/, 19];
                                    items = [];
                                    i_1 = 0;
                                    for (i_1 = 0; i_1 < 200; i_1++) {
                                        items.push({ "name": "Find me " + i_1, "_type": "test", "text": "forhelvede det lugter godt" });
                                    }
                                    mainStartTime = new Date().getTime();
                                    skipresults = false;
                                    return [4 /*yield*/, c.InsertOrUpdateMany({ items: items, skipresults: skipresults })];
                                case 18:
                                    results = _d.sent();
                                    mainElapsedTime = new Date().getTime() - mainStartTime;
                                    u_1 = 0;
                                    for (u_1 = 0; u_1 < results.length; u_1++) {
                                        info(results[u_1]._id + " " + results[u_1].name);
                                    }
                                    info("added ".concat((i_1), " items in ").concat((mainElapsedTime / 1000).toFixed(2), " seconds"));
                                    return [3 /*break*/, 51];
                                case 19:
                                    if (!(str == "i")) return [3 /*break*/, 21];
                                    return [4 /*yield*/, c.InsertOne({ item: { "name": "Find me", "_type": "test" } })];
                                case 20:
                                    result_3 = _d.sent();
                                    info(result_3._id);
                                    return [3 /*break*/, 51];
                                case 21:
                                    if (!(str == "w")) return [3 /*break*/, 23];
                                    return [4 /*yield*/, c.Watch({ paths: ["$.[?(@._type == 'test')]"] }, function (operation, document) {
                                            info(operation + " " + document.name);
                                        })];
                                case 22:
                                    result_4 = _d.sent();
                                    info(result_4);
                                    return [3 /*break*/, 51];
                                case 23:
                                    if (!(str == "ii")) return [3 /*break*/, 25];
                                    items = [];
                                    i_2 = 0;
                                    for (i_2 = 0; i_2 < 200; i_2++) {
                                        items.push({ "name": "Find me " + i_2, "_type": "test" });
                                    }
                                    mainStartTime = new Date().getTime();
                                    skipresults = false;
                                    return [4 /*yield*/, c.InsertMany({ items: items, skipresults: skipresults })];
                                case 24:
                                    results = _d.sent();
                                    mainElapsedTime = new Date().getTime() - mainStartTime;
                                    u_2 = 0;
                                    for (u_2 = 0; u_2 < results.length; u_2++) {
                                        info(results[u_2]._id + " " + results[u_2].name);
                                    }
                                    info("added ".concat((i_2), " items in ").concat((mainElapsedTime / 1000).toFixed(2), " seconds"));
                                    return [3 /*break*/, 51];
                                case 25:
                                    if (!(str == "dd")) return [3 /*break*/, 27];
                                    return [4 /*yield*/, c.DeleteMany({ query: { "_type": "test" } })];
                                case 26:
                                    result_5 = _d.sent();
                                    info(result_5.toString() + " rows deleted");
                                    return [3 /*break*/, 51];
                                case 27:
                                    if (!(str == "cc")) return [3 /*break*/, 29];
                                    return [4 /*yield*/, c.Count({ query: { "_type": "user" }, collectionname: "users" })];
                                case 28:
                                    result_6 = _d.sent();
                                    info(result_6.toString() + " users");
                                    return [3 /*break*/, 51];
                                case 29:
                                    if (!(str == "qq")) return [3 /*break*/, 31];
                                    return [4 /*yield*/, c.Query({ query: { "_type": "user" }, collectionname: "users" })];
                                case 30:
                                    results = _d.sent();
                                    for (i = 0; i < results.length; i++) {
                                        info(results[i].name);
                                    }
                                    if (results.length == 0) {
                                        warn("No users found");
                                    }
                                    return [3 /*break*/, 51];
                                case 31:
                                    if (!(str == "aa")) return [3 /*break*/, 33];
                                    return [4 /*yield*/, c.Aggregate({ aggregates: [{ "$match": { "_type": "user" } }, { "$project": { "name": 1 } }], collectionname: "users" })];
                                case 32:
                                    results = _d.sent();
                                    for (i = 0; i < results.length; i++) {
                                        info(results[i].name);
                                    }
                                    if (results.length == 0) {
                                        warn("No users found");
                                    }
                                    return [3 /*break*/, 51];
                                case 33:
                                    if (!(str == "ll")) return [3 /*break*/, 35];
                                    return [4 /*yield*/, c.ListCollections()];
                                case 34:
                                    results = _d.sent();
                                    for (i = 0; i < results.length; i++) {
                                        info(results[i].name);
                                    }
                                    if (results.length == 0) {
                                        warn("No users found");
                                    }
                                    return [3 /*break*/, 51];
                                case 35:
                                    if (!(str == "undefined")) return [3 /*break*/, 36];
                                    c.GetElement("");
                                    return [3 /*break*/, 51];
                                case 36:
                                    if (!str.startsWith("spam")) return [3 /*break*/, 37];
                                    count = parseInt(str.substring(4));
                                    for (i = 0; i < count; i++) {
                                        c.GetElement("test" + (i + 1))["catch"](function (error) { return err(error); });
                                    }
                                    return [3 /*break*/, 51];
                                case 37:
                                    if (!(str == "cc")) return [3 /*break*/, 39];
                                    payload.command = "clientconsole";
                                    return [4 /*yield*/, protowrap_1.protowrap.RPC(c.client, payload)];
                                case 38:
                                    result = _d.sent();
                                    old = process.stdout.write;
                                    rid_1 = result.rid;
                                    // @ts-ignore
                                    process.stdout.write = (function (write) {
                                        return function (string, encoding, fd) {
                                            try {
                                                write.apply(process.stdout, arguments);
                                                if (string && string != "\r\n" && string.length > 4) {
                                                    var packdata = any_1.Any.create({ type_url: "type.googleapis.com/openiap.Stream", "value": base_1.Stream.encode(base_1.Stream.create({ data: Buffer.from(string) })).finish() });
                                                    protowrap_1.protowrap.sendMesssag(c.client, { rid: rid_1, command: "stream", data: packdata }, "", true);
                                                }
                                            }
                                            catch (error) {
                                                process.stdout.write = old;
                                                err(error);
                                            }
                                        };
                                    })(process.stdout.write);
                                    return [3 /*break*/, 51];
                                case 39:
                                    if (!(str == "c")) return [3 /*break*/, 41];
                                    payload.command = "console";
                                    Readable = require('stream').Readable;
                                    rs = new Readable;
                                    rs._read = function () { };
                                    return [4 /*yield*/, protowrap_1.protowrap.CreateStream(c.client, rs, payload)];
                                case 40:
                                    _d.sent();
                                    rs.pipe(process.stdout); // pipe the read stream to
                                    return [3 /*break*/, 51];
                                case 41:
                                    if (!(str == "u")) return [3 /*break*/, 43];
                                    filename = nextfilename();
                                    return [4 /*yield*/, c.UploadFile({ filename: filename })];
                                case 42:
                                    constresult = _d.sent();
                                    console.log("Uploaded with id " + constresult.id);
                                    return [3 /*break*/, 51];
                                case 43:
                                    if (!(str == "f")) return [3 /*break*/, 45];
                                    cleanup();
                                    // filename = nextfilename();
                                    // let name = path.basename(filename);
                                    filename = "download.png";
                                    startTime = new Date().getTime();
                                    return [4 /*yield*/, protowrap_1.protowrap.DownloadFile(c.client, "63cd46fcd97779605c3e8c6a", filename, config_1.config.SendFileHighWaterMark)];
                                case 44:
                                    result_7 = _d.sent();
                                    return [3 /*break*/, 51];
                                case 45:
                                    if (!(str == "pp")) return [3 /*break*/, 47];
                                    filepath = nextfilename();
                                    filename = path.basename(filepath);
                                    items = [];
                                    wi1 = workitems_1.Workitem.create({ payload: JSON.stringify({ "name": "test " + filename }), wiq: "q2", name: "file test " + filename,
                                        files: [{ _id: "", filename: filename, compressed: true, file: pako.deflate(fs.readFileSync(filepath, null)) }] });
                                    filepath = nextfilename();
                                    filename = path.basename(filepath);
                                    wi2 = workitems_1.Workitem.create({ payload: JSON.stringify({ "name": "test2 " + filename }), wiq: "q2", name: "file2 test " + filename,
                                        files: [{ _id: "", filename: filename, compressed: true, file: pako.deflate(fs.readFileSync(filepath, null)) }] });
                                    items.push(wi1);
                                    items.push(wi2);
                                    return [4 /*yield*/, c.PushWorkitems({ items: items, wiq: "q2" })];
                                case 46:
                                    _d.sent();
                                    return [3 /*break*/, 51];
                                case 47:
                                    if (!(str == "push")) return [3 /*break*/, 49];
                                    filepath_1 = nextfilename();
                                    filename_1 = path.basename(filepath_1);
                                    return [4 /*yield*/, c.PushWorkitem({ payload: { "name": "test " + filename_1 }, wiq: "q2", name: "file test " + filename_1,
                                            files: [{ filename: filename_1, compressed: true, file: pako.deflate(fs.readFileSync(filepath_1, null)) }] })];
                                case 48:
                                    _d.sent();
                                    return [3 /*break*/, 51];
                                case 49:
                                    _c = (_b = console).log;
                                    return [4 /*yield*/, c.GetElement(str)];
                                case 50:
                                    _c.apply(_b, [_d.sent()]);
                                    _d.label = 51;
                                case 51: return [3 /*break*/, 54];
                                case 52:
                                    error_1 = _d.sent();
                                    err(error_1);
                                    return [3 /*break*/, 54];
                                case 53: return [7 /*endfinally*/];
                                case 54: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=cli.js.map