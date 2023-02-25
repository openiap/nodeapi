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
var child_process_1 = require("child_process");
var fs = require("fs");
var path = require("path");
var AdmZip = require("adm-zip");
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
        var openiap, client, reply, zip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    openiap = require("openiap");
                    client = new openiap();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.DownloadFile({ id: id })];
                case 2:
                    reply = _a.sent();
                    client.Close();
                    if (path.extname(reply.filename) == ".zip") {
                        zip = new AdmZip(reply.filename);
                        zip.extractAllTo(path.join(process.cwd(), "package"), true);
                        console.log("done");
                    }
                    return [2 /*return*/];
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
function copyFolderSync(from, to) {
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(function (element) {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        }
        else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}
function npminstall(packagepath) {
    // copyFolderSync(path.join(process.cwd(), "node_modules"), path.join(packagepath, "node_modules"));
    if (fs.existsSync(path.join(packagepath, "package.json"))) {
        (0, child_process_1.execSync)("npm install --unsafe-perm", {
            stdio: [0, 1, 2],
            cwd: packagepath
        });
    }
    else {
        // console.log("* skip NPM install *")
    }
}
function runit(packagepath, command) {
    var SKIP_XVFB = process.env.SKIP_XVFB;
    var runthis = process.execPath + " " + command;
    if (SKIP_XVFB != null && SKIP_XVFB != "") {
        console.log(command);
        if (command == "npm run start") {
            runthis = "npm run start";
        }
    }
    else {
        console.log("xvfb-run " + command);
        if (command == "npm run start") {
            runthis = "/usr/bin/xvfb-run -e /tmp/xvfb.log --server-args=\"-screen 0 1920x1080x24 -ac\" ".concat(command);
        }
        else {
            runthis = "/usr/bin/xvfb-run -e /tmp/xvfb.log --server-args=\"-screen 0 1920x1080x24 -ac\" ".concat(process.execPath, " ").concat(command);
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
        var signals, packagepath, fileid, gitrepo, command;
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
                    gitrepo = process.env.gitrepo || "";
                    if (!(gitrepo != "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, GitClone(gitrepo)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!(fileid != "")) return [3 /*break*/, 4];
                    return [4 /*yield*/, getpackage(fileid)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    packagepath = getpackagepath(packagepath);
                    if (packagepath == "")
                        throw new Error("packagepath not found, is this a nodejs project?");
                    command = getscriptpath(packagepath);
                    if (command == "")
                        throw new Error("Failed locating a command to run, EXIT");
                    npminstall(packagepath);
                    runit(packagepath, command);
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=agent.js.map