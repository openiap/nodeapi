const { openiap } = require("./openiap");
import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"
import * as AdmZip from "adm-zip"
var tar = require('tar');
function findInPath(exec) {
  try {
  let command;
  switch (process.platform) {
    case 'linux':
    case 'darwin':
      command = 'which ' + exec;
      break;
    case 'win32':
      command = 'where ' + exec;
      break;
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }
  const stdout = execSync(command, { stdio: 'pipe' }).toString();
  return stdout.trim() || null;
} catch (error) {
  return null;
  // throw error;
}
}
function findPythonPath() {
  var result = findInPath("python")
  if(result == null || result == "") result = findInPath("python3")
  return result
}
function findDotnetPath() {
  return findInPath("dotnet")
}
function findXvfbPath() {
  return findInPath("xvfb-run")
}

async function GitClone(gitrepo: string): Promise<void> {
  if (!fs.existsSync("package")) {
    execSync("git clone " + gitrepo + " package", {
      stdio: [0, 1, 2],
      cwd: path.resolve(process.cwd(), ""),
    })
  }
}
async function getpackage(id: string): Promise<void> {
  var client = new openiap();
  await client.connect();
  const reply = await client.DownloadFile({ id });
  client.Close();
  if (path.extname(reply.filename) == ".zip") {
    var zip = new AdmZip(reply.filename);
    zip.extractAllTo(path.join(process.cwd(), "package"), true);
    console.log("done")
  } else if(path.extname(reply.filename) == ".tar.gz" || path.extname(reply.filename) == ".tgz") {
    var dest = path.join(process.cwd(), "package");
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    try {
      await tar.x({
        file: reply.filename,
        C: path.join(process.cwd(), "package"),
      })
    } catch (error) {
      console.error(error)
      throw error;
    }
  }    
}
async function getpackagefrom(id: string): Promise<void> {
  var client = new openiap();
  await client.connect();
  const pack = await client.Query({ query: {"_id": id, "_type": "package"}, collectionname: "agents"})
  if(pack == null) throw new Error("Unknown package id: " + id)
  if(pack.length == 0) throw new Error("Unknown package id: " + id)
  if(pack[0].fileid == null || pack[0].fileid == "") throw new Error("Package id " + id + " is missing a fileid")
  const reply = await client.DownloadFile({ id: pack[0].fileid });
  client.Close();
  if (path.extname(reply.filename) == ".zip") {
    var zip = new AdmZip(reply.filename);
    zip.extractAllTo(path.join(process.cwd(), "package"), true);
    console.log("done")
  } else if(path.extname(reply.filename) == ".tar.gz" || path.extname(reply.filename) == ".tgz") {
    var dest = path.join(process.cwd(), "package");
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    try {
      await tar.x({
        file: reply.filename,
        C: path.join(process.cwd(), "package"),
      })
    } catch (error) {
      console.error(error)
      throw error;
    }
  }    
}

function getscriptpath(packagepath) {
  if (fs.existsSync(path.join(packagepath, "package.json"))) {
    var project = require(path.join(packagepath, "package.json"))
    if(project.scripts && project.scripts.start) {
      return "npm run start"
    }
    var _main = path.join(packagepath, project.main);
    if (fs.existsSync(_main)) {
      return _main
    }
  }
  if (fs.existsSync(path.join(packagepath, "agent.js"))) return path.join(packagepath, "agent.js");
  if (fs.existsSync(path.join(packagepath, "main.js"))) return path.join(packagepath, "main.js");
  if (fs.existsSync(path.join(packagepath, "index.js"))) return path.join(packagepath, "index.js");
  if (fs.existsSync(path.join(packagepath, "agent.py"))) return path.join(packagepath, "agent.py");
  if (fs.existsSync(path.join(packagepath, "main.py"))) return path.join(packagepath, "main.py");
  if (fs.existsSync(path.join(packagepath, "index.py"))) return path.join(packagepath, "index.py");
}
function getpackagepath(packagepath, first = true) {
  if (fs.existsSync(path.join(packagepath, "package.json"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "agent.js"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "main.js"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "index.js"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "agent.py"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "main.py"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "index.py"))) return packagepath;
  if (!first) return ""
  if (!fs.existsSync(packagepath)) return ""
  var files = fs.readdirSync(packagepath)
  for (var i = 0; i < files.length; i++) {
    const filepath = path.join(packagepath, files[i])
    if (fs.lstatSync(filepath).isDirectory()) {
      var test = getpackagepath(filepath, false)
      if (test != "") return test;
    }
  }
  return ""
}
function npminstall(packagepath) {
  if (fs.existsSync(path.join(packagepath, "package.json"))) {
    console.log("run npm install")
    execSync("npm install", {
      stdio: [0, 1, 2],
      cwd: packagepath,
    })
  } else {
    // console.log("* skip NPM install *")
  }
}
async function pipinstall(packagepath, pythonpath) {
  if (fs.existsSync(path.join(packagepath, "requirements.txt.done"))) return;
  if (fs.existsSync(path.join(packagepath, "requirements.txt"))) {
    console.log("Running pip install");
    execSync(pythonpath + " -m pip install -r " + path.join(packagepath, "requirements.txt"), {
      stdio: [0, 1, 2],
      cwd: packagepath,
    })
  }
}
function runit(packagepath, command, processor) {
  var xvfb = findXvfbPath()

  var runthis  = processor + " " + command;
  if(xvfb == null || xvfb == "") {
    console.log(command)
    if (command == "npm run start") {
      runthis = "npm run start"
    }
  } else {
    console.log("xvfb-run " + command)
    if (command == "npm run start") {
      runthis = xvfb + ` -e /tmp/xvfb.log --server-args="-screen 0 1920x1080x24 -ac" ${command}`
    } else {
      runthis = xvfb + ` -e /tmp/xvfb.log --server-args="-screen 0 1920x1080x24 -ac" ${processor} ${command}`
    }
  }
  execSync(runthis, {
    stdio: [0, 1, 2],
    cwd: packagepath,
  })
}
async function handle(signal, value) {
  console.log(`process received a ${signal} signal with value ${value}`, null);
  process.exit(128 + value);
}
async function main() {
  var signals = {
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGTERM': 15
  };
  Object.keys(signals).forEach((signal) => process.on(signal, handle));

  let packagepath = path.join(process.cwd(), "package")
  const fileid = process.env.fileid || "";
  const packageid = process.env.packageid || "";  
  const gitrepo = process.env.gitrepo || "";
  if (gitrepo != "") {
    await GitClone(gitrepo);
  } else if (packageid != "") {
    await getpackagefrom(packageid);
  } else if (fileid != "") {
    await getpackage(fileid);
  }
  packagepath = getpackagepath(packagepath)
  if (packagepath == "") throw new Error("packagepath not found, is this a nodejs project?")
  let command = getscriptpath(packagepath)
  if(command == "") throw new Error("Failed locating a command to run, EXIT")
  if(command.endsWith(".py")) {
    var python = findPythonPath();
    await pipinstall(packagepath, python);
    runit(packagepath, command, python)
  } else if(command.endsWith(".js") || command == "npm run start") {
    var node = process.execPath
    npminstall(packagepath)
    runit(packagepath, command, node)
  } else {
    var dotnet = findDotnetPath();
    runit(packagepath, "run", dotnet)
  }
}
main()
