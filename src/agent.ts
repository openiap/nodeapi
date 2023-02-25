import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"
import * as AdmZip from "adm-zip"

async function GitClone(gitrepo: string): Promise<void> {
  if (!fs.existsSync("package")) {
    execSync("git clone " + gitrepo + " package", {
      stdio: [0, 1, 2],
      cwd: path.resolve(process.cwd(), ""),
    })
  }
}
async function getpackage(id: string): Promise<void> {
  const openiap = require("openiap");
  var client = new openiap();
  await client.connect();
  const reply = await client.DownloadFile({ id });
  client.Close();
  if (path.extname(reply.filename) == ".zip") {
    var zip = new AdmZip(reply.filename);
    zip.extractAllTo(path.join(process.cwd(), "package"), true);
    console.log("done")
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
}
function getpackagepath(packagepath, first = true) {
  if (fs.existsSync(path.join(packagepath, "package.json"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "agent.js"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "main.js"))) return packagepath;
  if (fs.existsSync(path.join(packagepath, "index.js"))) return packagepath;
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
function copyFolderSync(from, to) {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach(element => {
      if (fs.lstatSync(path.join(from, element)).isFile()) {
          fs.copyFileSync(path.join(from, element), path.join(to, element));
      } else {
          copyFolderSync(path.join(from, element), path.join(to, element));
      }
  });
}

function npminstall(packagepath) {
  // copyFolderSync(path.join(process.cwd(), "node_modules"), path.join(packagepath, "node_modules"));
  if (fs.existsSync(path.join(packagepath, "package.json"))) {
    execSync("npm install --unsafe-perm", {
      stdio: [0, 1, 2],
      cwd: packagepath,
    })
  } else {
    // console.log("* skip NPM install *")
  }
}
function runit(packagepath, command) {
  var SKIP_XVFB = process.env.SKIP_XVFB;
  var runthis  = process.execPath + " " + command;
  if(SKIP_XVFB != null && SKIP_XVFB != "") {
    console.log(command)
    if (command == "npm run start") {
      runthis = "npm run start"
    }
  } else {
    console.log("xvfb-run " + command)
    if (command == "npm run start") {
      runthis = `/usr/bin/xvfb-run -e /tmp/xvfb.log --server-args="-screen 0 1920x1080x24 -ac" ${command}`
    } else {
      runthis = `/usr/bin/xvfb-run -e /tmp/xvfb.log --server-args="-screen 0 1920x1080x24 -ac" ${process.execPath} ${command}`
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
  const gitrepo = process.env.gitrepo || "";
  if (gitrepo != "") {
    await GitClone(gitrepo);
  } else if (fileid != "") {
    await getpackage(fileid);
  }
  packagepath = getpackagepath(packagepath)
  if (packagepath == "") throw new Error("packagepath not found, is this a nodejs project?")
  let command = getscriptpath(packagepath)
  if(command == "") throw new Error("Failed locating a command to run, EXIT")
  npminstall(packagepath)
  runit(packagepath, command)
}
main()
