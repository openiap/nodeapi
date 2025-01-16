console.log("BEGIN CLI")
import { config } from "./config";
const { info, err, warn }  = config;
const fs = require("fs");
const path = require('path');
const { protowrap } = require('./protowrap');
const readline = require('readline');
const { stdin: input, stdout: output } = require("process");
const { clientType } = require("./client");
const rl = readline.createInterface({ input, output });
import * as pako from 'pako';
import { openiap } from "./openiap";
import { Customer, Envelope, PingRequest, Stream } from "./proto/base";
import { Any } from "./proto/google/protobuf/any";
import { WatchEvent } from "./proto/watch";
import { WorkItemQueue, Workitem } from "./proto/workitems";

// kill $(ps aux | grep 'client.js' | awk '{print $2}')
let url: string = process.argv[2] as any || process.env.apiurl;
if(url == "" || url == null) url = process.env.grpcapiurl
if(url == "" || url == null) url = process.env.wscapiurl

var lastfilename = "";
const files = [
  // "/home/allan/Documents/virtio-win-0.1.225.iso",              // 532MB
  // "/home/allan/Documents/SafeNetAuthenticationClient-x64.msi", // 21MB
  // "/home/allan/Documents/DR_PCE-AC58BT_Win10_Linux.zip",       // 160MB
  "/home/allan/Pictures/ml-creator-1.png", // 1.5MB
  "/home/allan/Pictures/ml-creator-2.png",  // 0.24MB
  "/home/allan/Pictures/ml-creator-3.png", // 1.8MB
];
function cleanup() {
  for (var i = 0; i < files.length; i++) {
    const filename = files[i];
    const name = path.basename(filename);
    if (fs.existsSync(name)) fs.unlinkSync(name);
  }
  if (fs.existsSync("upload.png")) fs.unlinkSync("upload.png");
  if (fs.existsSync("download.png")) fs.unlinkSync("download.png");
  if (fs.existsSync("client.hex")) fs.unlinkSync("client.hex");
  if (fs.existsSync("server.hex")) fs.unlinkSync("server.hex");
}
function nextfilename() {
  let filename = "";
  const idx = files.indexOf(lastfilename);
  if (idx == -1) { filename = files[0]; }
  else if (idx == files.length - 1) { filename = files[0]; }
  else { filename = files[idx + 1]; }
  lastfilename = filename;
  return filename;
}
async function onMessage(stream, message) {
  if (message.command == "ping") {
    return Envelope.create({ command: "pong", rid:message.id, data: PingRequest.create() });
  } else if (message.command == "watchevent") {
    const msg = WatchEvent.decode(message.data);
    var doc = JSON.parse(msg.document)
    info("Watch event: " + msg.operation + " " + doc._type + " " + doc.name);
  }
  return null;
}

async function readln(q) {
  return new Promise<string>((resolve, reject) => {
    rl.question(q, (answer) => {
      resolve(answer);
    });
  });
}


async function main() {
  config.DoPing = false; 
  config.doDumpMesssages = true;
  config.DoDumpToConsole = true;
  var c = new openiap(url);
  try {
    // c.onMessage = onMessage;
    c.onConnectGaveUp = async () => {
      info("Connection gave up");
      process.exit();
    };
    await c.connect();

    cleanup()
  } catch (error) {
    err(error);
    process.exit();
  }
  while (true) {
    try {
      var payload = { command: "getelement", data: null };
      var str:string = await readln('');
      if (str == "q" || str == "x") {
        process.exit();
      } else if (c == null || !c.connected) {
        err(new Error("Client not connected!"));
        continue;
      }
      if (str == "nnn") {
        var data2 = await c.RegisterQueue({queuename: "ExampleQueue"}, async (msg, payload, user, jwt)=> {
          info("RECEIVED QueueMessage replyto=" + msg.replyto + "");
          payload.name = "blah blah"

          var workitem = await c.PopWorkitem({wiq: "ExampleQueue", includefiles: true, compressed: false});
          if(workitem!=null) {
            console.log("poped item " + workitem._id + " " + workitem.name);
            workitem.state = "successful";
            await c.UpdateWorkitem({workitem})
          } else {
            console.log("no more workitems");
          }
          return payload
        });
        await c.PushWorkitem({wiq: "ExampleQueue", payload: {name: "test", state: "new"}});
        console.log(data2);
      } else if (str == "n") {
        var data = await c.QueueMessage({ expiration: 10, queuename: "findme555", data: {"text": "Hej smukke"}, striptoken: true}, true);
        console.log("QueueMessage REPLY", data);
      } else if (str == "nn") {
        var data2 = await c.RegisterQueue({queuename: "findme555"}, async (msg, payload, user, jwt)=> {
          console.log("findme555 RECEIVE", msg);
          console.log("findme555 RECEIVE", payload);
          payload.name = "Hi there"
          return payload;
        });
        console.log("RegisterQueue", data2);
      } else if (str == "ex") {
        var data2 = await c.RegisterExchange({ exchangename: "65995de51759d08cc55cbe3e", addqueue: false}, async (msg, payload, user, jwt)=> {
          console.log("65995de51759d08cc55cbe3e", payload);
          return payload;
        });
        var data2 = await c.RegisterExchange({ exchangename: "659aa659058158e309b321a1", addqueue: false}, async (msg, payload, user, jwt)=> {
          console.log("659aa659058158e309b321a1", payload);
          return payload;
        });
        var data2 = await c.RegisterExchange({ exchangename: "659bd8b3058158e309b32900", addqueue: false}, async (msg, payload, user, jwt)=> {
          console.log("659bd8b3058158e309b32900", payload);
          return payload;
        });
        console.log("RegisterQueue", data2);
      } else if (str == "un") {
        await c.UnRegisterQueue({ queuename: "findme555"});
      } else if (str == "s") {
        var u = await c.Signin({username:"username", password: "supersecret", ping: config.DoPing});
        console.log(data);
      } else if (!str || str == '' || str == "null") {
        c.GetElement("")
      } else if (str == "cmd") {
        const result = await c.CustomCommand({"command": "getagentpods", "id": "63d70276b353f010a48ef9c4"})
        info(result);
      } else if (str == "iu") {
        const result = await c.InsertOrUpdateOne<any>({ uniqeness: "name,_type", item: {"name": "Find me", "_type": "test", "dt": new Date().toISOString() }, collectionname: "entities" })
        info(result._id);
      } else if (str == "iuu") {
        var items = []
        let i = 0;
        for(i = 0; i < 200; i ++) {
          items.push({"name": "Find me " + i , "_type": "test", "text": "forhelvede det lugter godt"});
        }
        const mainStartTime = new Date().getTime();

        const skipresults = false;
        const results = await c.InsertOrUpdateMany<any>({ items, skipresults})
        const mainElapsedTime = new Date().getTime() - mainStartTime;
        let u = 0;
        for(u = 0; u < results.length; u++) {
          info(results[u]._id + " " + results[u].name);
        }
        info(`added ${(i )} items in ${(mainElapsedTime / 1000).toFixed(2)} seconds`);
      } else if (str == "i") {
        const result = await c.InsertOne<any>({ item: {"name": "Find me", "_type": "test"} })
        info(result._id);
      } else if (str == "w") {
        const result = await c.Watch({ paths: ["$.[?(@._type == 'test')]"] }, (operation, document)=> { 
          info(operation + " " + document.name) 
        })
        info(result);
      } else if (str == "ii") {
        var items = []
        let i = 0;
        for(i = 0; i < 200; i ++) {
          items.push({"name": "Find me " + i , "_type": "test"});
        }
        const mainStartTime = new Date().getTime();
        const skipresults = false;
        const results = await c.InsertMany<any>({items, skipresults })
        const mainElapsedTime = new Date().getTime() - mainStartTime;
        let u = 0;
        for(u = 0; u < results.length; u++) {
          info(results[u]._id + " " + results[u].name);
        }
        info(`added ${(i )} items in ${(mainElapsedTime / 1000).toFixed(2)} seconds`);
      } else if (str == "dd") {
        const result = await c.DeleteMany({query: {"_type": "test"}})
        info(result.toString() + " rows deleted");
      } else if (str == "cc") {
        const result = await c.Count({query: {"_type": "user"}, collectionname: "users"})
        info(result.toString() + " users");
      } else if (str == "ccc") {
        const result = await c.CustomCommand({command: "createindex", data: JSON.stringify(
          { "collectionname": "azureperf", index: {"metadata.id": 1, "metadata.name": 1, timestamp: -1} }
          )})
        info("Index created as " + result);
      } else if (str == "qq") {
        const results = await c.Query<any>({query: {"_type": "user"}, collectionname: "users"})
        for(var i = 0; i < results.length; i++) {
          info(results[i].name);
        }
        if(results.length == 0) {
          warn("No users found");
        }
      } else if (str == "d") {
        const results = await c.Distinct({query: {"_type": "user"}, field: "username", queryas: "62319c029881888eabe510e4", collectionname: "users"})
        for(var i = 0; i < results.length; i++) {
          info(results[i]);
        }
        const results2 = await c.Distinct({query: {"username": "testuser"}, field: "username", collectionname: "users"})
        for(var i = 0; i < results2.length; i++) {
          info(results2[i]);
        }
        const results3 = await c.Distinct({field: "username", collectionname: "users"})
        for(var i = 0; i < results3.length; i++) {
          info(results3[i]);
        }
        if(results.length == 0) {
          warn("None found");
        }
      } else if (str == "aa") {
        const results = await c.Aggregate<any>({  aggregates: [{"$match": {"_type": "user"}}, {"$project": {"name": 1}}], collectionname: "users"})
        for(var i = 0; i < results.length; i++) {
          info(results[i].name);
        }
        if(results.length == 0) {
          warn("No users found");
        }
      } else if (str == "ll") {
        let results = await c.ListCollections();
        for(var i = 0; i < results.length; i++) {
          var col = results[i];
          info(col.name);
        }
        if(results.length == 0) {
          warn("No users found");
        }
      } else if (str == "undefined") {
        c.GetElement("")
      } else if (str.startsWith("spam")) {
        var count = parseInt(str.substring(4));
        for (var i = 0; i < count; i++) {
          c.GetElement("test" + (i + 1)).catch(error=> err(error));
        }
      } else if (str == "cc") {
        payload.command = "clientconsole";
        var result = await protowrap.RPC(c.client, payload);
        var old = process.stdout.write;
        const rid = result.rid;
        // @ts-ignore
        process.stdout.write = (function(write) {
          return function(string, encoding, fd) {
            try {
              write.apply(process.stdout, arguments)
              if(string && string != "\r\n" && string.length > 4) {
                const packdata = Any.create({type_url: "type.googleapis.com/openiap.Stream", "value": Stream.encode(Stream.create({data: Buffer.from(string)})).finish()})
                protowrap.sendMesssag(c.client, { rid, command: "stream", data: packdata }, "", true);
              }
            } catch (error) {
              process.stdout.write = old;
              err(error);
            }
          }
        })(process.stdout.write);
      } else if (str == "dc") {
        try {
          await c.DropCollection({collectionname: "testcollection"});
        } catch (error) {
        }
        await c.CreateCollection({ collectionname: "testcollection", expireAfterSeconds:20, timeseries: { timeField: "_created", metaField: "metadata" } } )

        var indexname = await c.CreateIndex({collectionname: "testcollection", index: {"name": 1} })
        console.log("Created index " + indexname);
        var indexes = await c.GetIndexes({ collectionname: "testcollection"} )
        console.log(indexes);

        await c.DropIndex({collectionname: "testcollection", name: indexname })
        console.log("Dropped index " + indexname);

      } else if (str == "gi") {
        var indexes = await c.GetIndexes({ collectionname: "entities"} )
        console.log(indexes);
        var indexes = await c.GetIndexes({ collectionname: "testcollection"} )
        console.log(indexes);
      } else if (str == "ec") {
        // var ensureresult = await c.EnsureCustomer({ customer: Customer.create({ name: "testcustomer" }), ensureas: "641f36c88ecd2bbbbd3a52b3" })
        var ensureresult = await c.EnsureCustomer({ customer: Customer.create({ name: "testcustomer2" })})
        console.log(ensureresult);  
      } else if (str == "awq") {
        var wiqresult = await c.AddWorkItemQueue({ workitemqueue: WorkItemQueue.create({ name: "testq1" })})
        console.log(wiqresult);  
      } else if (str == "uwq") {
        var wiqresult = await c.UpdateWorkItemQueue({ workitemqueue: WorkItemQueue.create({ name: "testq1", maxretries: 5 })})
        console.log(wiqresult);  
      } else if (str == "dwq") {
        await c.DeleteWorkItemQueue({ wiq: "testq1" })
        console.log("testq1 deleted");
      } else if (str == "rpa") {
        await c.InvokeOpenRPA({ robotid: "6242d68a73057b27d277be88", workflowid: "5e0b52194f910e30ce9e3e49" })
      } else if (str == "agent") {
        var pods = await c.GetAgentPods({ agentid: "655caa844c02cc4b45915091" })
        if(pods.length > 0) {
          console.log("Get logs for pod " + pods[0].metadata.name);
          var logs = await c.GetAgentLog({ agentid: "655caa844c02cc4b45915091", podname: pods[0].metadata.name })
          console.log(logs.replace(/\\n/g, '\n'));
          await c.DeleteAgentPod({ agentid: "655caa844c02cc4b45915091", podname: pods[0].metadata.name })
        }
      } else if (str == "agent2") {
        var pods = await c.GetAgentPods({  })
        console.log("found " + pods.length + " pods");
        for(let i = 0; i < pods.length; i++) {
          console.log(pods[i].metadata.name);
        }
        // await c.DeleteAgent({ agentid: "655ded49f9d43e7dc72dfadf" })
      } else if (str == "ci") {
        var idx1 = await c.CreateIndex({collectionname: "entities", index: {"id": 1} })
        console.log(idx1);
        var idx2 = await c.CreateIndex({collectionname: "entities", index: {"slug": 1}, options: {unique: true} })
        console.log(idx2);
        // await c.DeleteAgent({ agentid: "655ded49f9d43e7dc72dfadf" })
      } else if (str == "c") {
        payload.command = "console";
        var Readable = require('stream').Readable;
        var rs = new Readable;
        rs._read = function () { };
        await protowrap.CreateStream(c.client, rs, payload);
        rs.pipe(process.stdout); // pipe the read stream to
      } else if (str == "u") {
        
        var filename = nextfilename();
        var constresult = await c.UploadFile({ filename })
        console.log("Uploaded with id " + constresult.id)
      } else if (str == "f") {
        cleanup()
        // filename = nextfilename();
        // let name = path.basename(filename);
        filename = "download.png";
        const startTime = new Date().getTime();
        const result = await protowrap.DownloadFile(c.client, "63cd46fcd97779605c3e8c6a", "fs.files", filename, "", config.SendFileHighWaterMark);
        // info(`downloaded ${filename} (${(result.mb).toFixed(2)} Mb) in ${(result.elapsedTime / 1000).toFixed(2)} seconds in ${result.chunks} chunks (${result.mbps.toFixed(2)} Mb/s)`);
      } else if (str == "f2") {
        cleanup()
        // filename = nextfilename();
        // let name = path.basename(filename);
        filename = "download.png";
        const startTime = new Date().getTime();
        const result = await protowrap.DownloadFile(c.client, "6608157a60ad2717a5be980e", "mail.files", filename, "", config.SendFileHighWaterMark);
        // info(`downloaded ${filename} (${(result.mb).toFixed(2)} Mb) in ${(result.elapsedTime / 1000).toFixed(2)} seconds in ${result.chunks} chunks (${result.mbps.toFixed(2)} Mb/s)`);
      } else if (str == "f3") {
        cleanup()
        // filename = nextfilename();
        // let name = path.basename(filename);
        filename = "download.png";
        const startTime = new Date().getTime();
        const result = await protowrap.DownloadFile(c.client, "", "mail.files", "message 18e8f93e40000067ac", "", config.SendFileHighWaterMark);
        // info(`downloaded ${filename} (${(result.mb).toFixed(2)} Mb) in ${(result.elapsedTime / 1000).toFixed(2)} seconds in ${result.chunks} chunks (${result.mbps.toFixed(2)} Mb/s)`);
        
      } else if (str == "pp") {
        var filepath = nextfilename();
        var filename:string = path.basename(filepath);

        var items: any[] = [];
        var wi1 = Workitem.create({payload: JSON.stringify({"name": "test " + filename}), wiq: "q2", name: "file test " + filename,
        files: [{ _id:"", filename, compressed: true, file: pako.deflate(fs.readFileSync(filepath, null)) }]});
        var filepath = nextfilename();
        var filename:string = path.basename(filepath);
        var wi2 = Workitem.create({payload: JSON.stringify({"name": "test2 " + filename}), wiq: "q2", name: "file2 test " + filename,
        files: [{ _id:"", filename, compressed: true, file: pako.deflate(fs.readFileSync(filepath, null)) }]});
        items.push(wi1)
        items.push(wi2)
        var results = await c.PushWorkitems({ items, wiq: "q2"})
        console.log(results);
      } else if (str == "push") {
        let filepath = nextfilename();
        let filename = path.basename(filepath);

        await c.PushWorkitem({payload: {"name": "test " + filename}, wiq: "q2", name: "file test " + filename,
        files: [{ filename, compressed: true, file: pako.deflate(fs.readFileSync(filepath, null)) }]})
      } else {
        console.log(await c.GetElement(str))        
      }
    } catch (error) {
      err(error);
    } finally {
    }

  }
}
main();

