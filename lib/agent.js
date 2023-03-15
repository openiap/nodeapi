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
var openiap = require("./openiap").openiap;
var child_process_1 = require("child_process");
var fs = require("fs");
var path = require("path");
var AdmZip = require("adm-zip");
var tar = require('tar');
function findInPath(exec) {
    try {
        var command = void 0;
        switch (process.platform) {
            case 'linux':
            case 'darwin':
                command = 'which ' + exec;
                break;
            case 'win32':
                command = 'where ' + exec;
                break;
            default:
                throw new Error("Unsupported platform: ".concat(process.platform));
        }
        var stdout = (0, child_process_1.execSync)(command, { stdio: 'pipe' }).toString();
        return stdout.trim() || null;
    }
    catch (error) {
        return null;
        // throw error;
    }
}
function findPythonPath() {
    var result = findInPath("python");
    if (result == null || result == "")
        result = findInPath("python3");
    return result;
}
function findDotnetPath() {
    return findInPath("dotnet");
}
function findXvfbPath() {
    return findInPath("xvfb-run");
}
function GitClone(gitrepo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!fs.existsSync("package")) {
                (0, child_process_1.execSync)("git clone " + gitrepo + " package", {
                    stdio: [0, 1, 2],
                    cwd: path.resolve(process.cwd(), "")
                });
            }
            return [2 /*return*/];
        });
    });
}
function getpackage(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, reply, zip, dest, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new openiap();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.DownloadFile({ id: id })];
                case 2:
                    reply = _a.sent();
                    client.Close();
                    if (!(path.extname(reply.filename) == ".zip")) return [3 /*break*/, 3];
                    zip = new AdmZip(reply.filename);
                    zip.extractAllTo(path.join(process.cwd(), "package"), true);
                    console.log("done");
                    return [3 /*break*/, 7];
                case 3:
                    if (!(path.extname(reply.filename) == ".tar.gz" || path.extname(reply.filename) == ".tgz")) return [3 /*break*/, 7];
                    dest = path.join(process.cwd(), "package");
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest);
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, tar.x({
                            file: reply.filename,
                            C: path.join(process.cwd(), "package")
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error(error_1);
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getpackagefrom(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, pack, reply, zip, dest, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new openiap();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.Query({ query: { "_id": id, "_type": "package" }, collectionname: "agents" })];
                case 2:
                    pack = _a.sent();
                    if (pack == null)
                        throw new Error("Unknown package id: " + id);
                    if (pack.length == 0)
                        throw new Error("Unknown package id: " + id);
                    if (pack[0].fileid == null || pack[0].fileid == "")
                        throw new Error("Package id " + id + " is missing a fileid");
                    return [4 /*yield*/, client.DownloadFile({ id: pack[0].fileid })];
                case 3:
                    reply = _a.sent();
                    client.Close();
                    if (!(path.extname(reply.filename) == ".zip")) return [3 /*break*/, 4];
                    zip = new AdmZip(reply.filename);
                    zip.extractAllTo(path.join(process.cwd(), "package"), true);
                    console.log("done");
                    return [3 /*break*/, 8];
                case 4:
                    if (!(path.extname(reply.filename) == ".tar.gz" || path.extname(reply.filename) == ".tgz")) return [3 /*break*/, 8];
                    dest = path.join(process.cwd(), "package");
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest);
                    }
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, tar.x({
                            file: reply.filename,
                            C: path.join(process.cwd(), "package")
                        })];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error(error_2);
                    throw error_2;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getscriptpath(packagepath) {
    if (fs.existsSync(path.join(packagepath, "package.json"))) {
        var project = require(path.join(packagepath, "package.json"));
        if (project.scripts && project.scripts.start) {
            return "npm run start";
        }
        var _main = path.join(packagepath, project.main);
        if (fs.existsSync(_main)) {
            return _main;
        }
    }
    if (fs.existsSync(path.join(packagepath, "agent.js")))
        return path.join(packagepath, "agent.js");
    if (fs.existsSync(path.join(packagepath, "main.js")))
        return path.join(packagepath, "main.js");
    if (fs.existsSync(path.join(packagepath, "index.js")))
        return path.join(packagepath, "index.js");
    if (fs.existsSync(path.join(packagepath, "agent.py")))
        return path.join(packagepath, "agent.py");
    if (fs.existsSync(path.join(packagepath, "main.py")))
        return path.join(packagepath, "main.py");
    if (fs.existsSync(path.join(packagepath, "index.py")))
        return path.join(packagepath, "index.py");
}
function getpackagepath(packagepath, first) {
    if (first === void 0) { first = true; }
    if (fs.existsSync(path.join(packagepath, "package.json")))
        return packagepath;
    if (fs.existsSync(path.join(packagepath, "agent.js")))
        return packagepath;
    if (fs.existsSync(path.join(packagepath, "main.js")))
        return packagepath;
    if (fs.existsSync(path.join(packagepath, "index.js")))
        return packagepath;
    if (fs.existsSync(path.join(packagepath, "agent.py")))
        return packagepath;
    if (fs.existsSync(path.join(packagepath, "main.py")))
        return packagepath;
    if (fs.existsSync(path.join(packagepath, "index.py")))
        return packagepath;
    if (!first)
        return "";
    if (!fs.existsSync(packagepath))
        return "";
    var files = fs.readdirSync(packagepath);
    for (var i = 0; i < files.length; i++) {
        var filepath = path.join(packagepath, files[i]);
        if (fs.lstatSync(filepath).isDirectory()) {
            var test = getpackagepath(filepath, false);
            if (test != "")
                return test;
        }
    }
    return "";
}
function npminstall(packagepath) {
    if (fs.existsSync(path.join(packagepath, "package.json"))) {
        console.log("run npm install");
        (0, child_process_1.execSync)("npm install", {
            stdio: [0, 1, 2],
            cwd: packagepath
        });
    }
    else {
        // console.log("* skip NPM install *")
    }
}
function pipinstall(packagepath, pythonpath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fs.existsSync(path.join(packagepath, "requirements.txt.done")))
                return [2 /*return*/];
            if (fs.existsSync(path.join(packagepath, "requirements.txt"))) {
                console.log("Running pip install");
                (0, child_process_1.execSync)(pythonpath + " -m pip install -r " + path.join(packagepath, "requirements.txt"), {
                    stdio: [0, 1, 2],
                    cwd: packagepath
                });
            }
            return [2 /*return*/];
        });
    });
}
function runit(packagepath, command, processor) {
    var xvfb = findXvfbPath();
    var runthis = processor + " " + command;
    if (xvfb == null || xvfb == "") {
        console.log(command);
        if (command == "npm run start") {
            runthis = "npm run start";
        }
    }
    else {
        console.log("xvfb-run " + command);
        if (command == "npm run start") {
            runthis = xvfb + " -e /tmp/xvfb.log --server-args=\"-screen 0 1920x1080x24 -ac\" ".concat(command);
        }
        else {
            runthis = xvfb + " -e /tmp/xvfb.log --server-args=\"-screen 0 1920x1080x24 -ac\" ".concat(processor, " ").concat(command);
        }
    }
    (0, child_process_1.execSync)(runthis, {
        stdio: [0, 1, 2],
        cwd: packagepath
    });
}
function handle(signal, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("process received a ".concat(signal, " signal with value ").concat(value), null);
            process.exit(128 + value);
            return [2 /*return*/];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var signals, packagepath, fileid, packageid, gitrepo, command, python, node, dotnet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signals = {
                        'SIGHUP': 1,
                        'SIGINT': 2,
                        'SIGTERM': 15
                    };
                    Object.keys(signals).forEach(function (signal) { return process.on(signal, handle); });
                    packagepath = path.join(process.cwd(), "package");
                    fileid = process.env.fileid || "";
                    packageid = process.env.packageid || "";
                    gitrepo = process.env.gitrepo || "";
                    if (!(gitrepo != "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, GitClone(gitrepo)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!(packageid != "")) return [3 /*break*/, 4];
                    return [4 /*yield*/, getpackagefrom(packageid)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    if (!(fileid != "")) return [3 /*break*/, 6];
                    return [4 /*yield*/, getpackage(fileid)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    packagepath = getpackagepath(packagepath);
                    if (packagepath == "")
                        throw new Error("packagepath not found, is this a nodejs project?");
                    command = getscriptpath(packagepath);
                    if (command == "")
                        throw new Error("Failed locating a command to run, EXIT");
                    if (!command.endsWith(".py")) return [3 /*break*/, 8];
                    python = findPythonPath();
                    return [4 /*yield*/, pipinstall(packagepath, python)];
                case 7:
                    _a.sent();
                    runit(packagepath, command, python);
                    return [3 /*break*/, 9];
                case 8:
                    if (command.endsWith(".js") || command == "npm run start") {
                        node = process.execPath;
                        npminstall(packagepath);
                        runit(packagepath, command, node);
                    }
                    else {
                        dotnet = findDotnetPath();
                        runit(packagepath, "run", dotnet);
                    }
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=agent.js.map