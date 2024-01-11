import { config } from "./config";
const { info, err, warn } = config;

import { messageParser } from "./message-parser";
// import { messageParser } from "./message-parser.buffer.concat";

// import { FlowService, FlowServiceClientImpl } from "./proto/base"

import * as  iostream from "stream";
// import * as  express from "express";
import * as  WebSocket from "ws";

import * as  protobuf from "protobufjs";
import * as  https from "https";
import * as  http from "http";
import * as  grpc from "@grpc/grpc-js";
import * as  protoLoader from "@grpc/proto-loader";
import * as  net from "net";
import * as  fs from "fs";
import * as  path from "path";
import * as  crypto from "crypto";
import { Throttler } from "./Throttler";
import { client, clientType, iclient } from "./client";
import { Any } from "./proto/google/protobuf/any";
import { Envelope, ErrorResponse, DownloadRequest, DownloadResponse, UploadRequest, UploadResponse, BeginStream, Stream } from "./proto/base";

import opentelemetry, { ROOT_CONTEXT, trace, context } from '@opentelemetry/api';

export class protowrap {
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
  static grpc_server_options: grpc.ChannelOptions = {
    'grpc.keepalive_time_ms': 20000 * 1000,
    'grpc.keepalive_timeout_ms': 1000,
    'grpc.http2.min_ping_interval_without_data_ms': 5000,
    'grpc.max_connection_idle_ms': 71992547,
    'grpc.max_connection_age_ms': 71992547,
    'grpc.max_connection_age_grace_ms': 71992547,
    'grpc.http2.max_pings_without_data': 71992547,
    'grpc.keepalive_permit_without_calls': 1,
    'grpc.max_receive_message_length': 1024 * 1024 * 1024,
    'grpc.max_send_message_length': 1024 * 1024 * 1024,
  }

  static defaultprotocol: clientType = "pipe" // pipe, socket, ws, grpc, rest
  // static packageDefinition: protoLoader.PackageDefinition;
  static openiap_proto: grpc.GrpcObject | grpc.ServiceClientConstructor | grpc.ProtobufTypeDefinition;
  // static Envelope: any; // = new protobuf.Type("envelope");
  static protoRoot: any;
  static async init() {
    var paths: string[] = [];
    var basepath = path.join(__dirname, "proto");
    if(!fs.existsSync(path.join(basepath, "base.proto"))) {
      basepath = path.join(__dirname, "..", "proto");
    }
    if(!fs.existsSync(path.join(basepath, "base.proto"))) {
      basepath = path.join(__dirname, "../node_modules/@openiap/proto")
    }
    if(!fs.existsSync(path.join(basepath, "base.proto"))) {
      throw new Error("base.proto not found");
    }
    var files = fs.readdirSync(basepath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.endsWith(".proto")) {
        paths.push(path.join(basepath, file));
      }
    }

    var packageDefinition = await protoLoader.load(
      paths,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      });
    this.openiap_proto = grpc.loadPackageDefinition(packageDefinition).openiap;
    this.protoRoot = await protobuf.load(paths);
    // this.Envelope = this.protoRoot.lookupType("openiap.envelope");
  }
  static CommandToProto(command:string) {
    switch (command) {
      case "error":
        return "openiap.ErrorResponse";
      case "grpcservice":
        return "openiap.FlowService";
      case "pong":
        return "openiap.PingResponse";
      default:
        let searchkey = command;
        if(searchkey.endsWith("reply")) {
          searchkey = (searchkey.substring(0, searchkey.length - 5) + "Response").toLowerCase();
        } else {
          searchkey = (searchkey + "Request").toLowerCase();;
        }
        var keys = Object.keys(this.openiap_proto);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(key.toLowerCase() == searchkey || key.toLowerCase() == command.toLowerCase()) {
            return "openiap." + key;
          }
        }
        return "openiap." + command;
    }
  }
  static pack(command, payload) {
    if (payload == null) return null;
    const protomsg = this.protoRoot.lookupType(this.CommandToProto(command));
    if (protomsg == null) return null;
    if (typeof payload == "string") {
      payload = JSON.parse(payload);
    }
    var type_url = "type.googleapis.com/" + this.CommandToProto(command);
    var value = protomsg.encode(payload).finish()
    return { type_url, value }
  }
  static unpack(message: any) {
    const { command, data } = message;
    const rid = message.id;
    let msg = data;
    if (command != null) {
      const protomsg = this.protoRoot.lookupType(this.CommandToProto(command));
      if (typeof data == "string") {
        msg = JSON.parse(data);
      } else if (data != null) {
        try {
          if (data.type_url != null) {
            if (data.value.data) { // REST, so json parsed buffer {type: 'Buffer', data: [...]}
              msg = protomsg.decode(data.value.data)
            } else {
              msg = protomsg.decode(data.value)
            }

          } else {
            msg = protomsg.decode(data)
          }

        } catch (error) {
          msg = data.toString();
          if (msg.startsWith("{")) {
            msg = JSON.parse(msg);
          } else {
            throw new Error("Failed decoding openiap." + command + " : " + error.message);
          }
        }
      }
    }
    const reply = { command, rid, data: null };
    return [command, msg, reply];
  }
  static RPC(client: client, payload: any): Promise<Envelope> {
    const [id, promise] = this._RPC(client, payload);
    return promise;
  }
  static _RPC(client: client, payload: any): [string, Promise<any>] {
    const id = Math.random().toString(36).substring(2, 11);
    // const id = client.seq.toString();
    const promise = new Promise<any>((resolve, reject) => {
      const dt = new Date();
      const command = payload.command;
      var _payload = { ...payload };
      delete _payload.id;
      let ctx = trace.getSpan(context.active())?.spanContext();
      if (ctx != null) {
        if (_payload.traceid == null || _payload.traceid == "") _payload.traceid = ctx.traceId;
        if (_payload.spanid == null || _payload.spanid == "") _payload.spanid = ctx.spanId;
      }
      if (config.doDumpRPCTraceIds && _payload.traceid != null && _payload.traceid != "") {
        // info("RPC: " + command + " traceId: " + _payload.traceid + " spanId: " + _payload.spanid);
      }
      client.replies[id] = { resolve, reject, dt, command };
      this.sendMesssag(client, { id, ..._payload }, id, true);
    });
    return [id, promise];
  }
  static SetStream(client: client, stream, rid: string) {
    client.streams[rid] = { stream, chunks: 0, bytes: 0 };
    return client.streams[rid];
  }
  static CreateStream(client: client, stream, payload) {
    // const id = Math.random().toString(36).substring(2, 11);
    const id = client.seq.toString();
    return new Promise((resolve, reject) => {
      const dt = new Date();
      const command = payload.command;
      var _payload = { ...payload };
      _payload.id = id;
      client.streams[id] = { stream, chunks: 0, bytes: 0 };
      client.replies[id] = { resolve, reject, dt, command };
      this.sendMesssag(client, _payload, id, true);
    });
  }
  static DownloadFile(client: client, id: string, filename: string, folder: string, highWaterMark: number | undefined): Promise<DownloadResponse> {
    return new Promise<any>(async (resolve, reject) => {
      let temp: boolean = false
      if (filename == null || filename == "") {
        temp = true
        filename = Math.random().toString(36).substring(2, 11) + ".tmp";
      }
      if (folder != null && folder != "") {
        filename = path.join(folder, filename);
      }
      var name = filename;
      if (!name || name == "") name = path.basename(filename);
      if (fs.existsSync(filename)) fs.unlinkSync(filename);

      const ws = fs.createWriteStream(filename, { highWaterMark });
      const startTime = new Date().getTime();
      const packdata = Any.create({ type_url: "type.googleapis.com/openiap.DownloadRequest", value: DownloadRequest.encode(DownloadRequest.create({ id, filename })).finish() })
      const [rid, promise] = this._RPC(client, { command: "download", data: packdata });
      promise.catch((err) => {
        reject(err);
      });
      const s = this.SetStream(client, ws, rid);
      // if(config.ThrottlerMS > 0) {
      //   rs.pipe(new Throttler(config.ThrottlerMS)).pipe(ws);
      // } else {
      //   rs.pipe(ws);
      // }
      ws.on("finish", async () => {
        ws.end();
        if (s.checksum) {
          const checksum = await this.getFileChecksum(name);
          if (checksum != s.checksum) {
            return reject(new Error("File checksum mismatch"));
          }
        } else if (config.ChecksumCheckFiles) {
          warn("No checksum for file available");
        }
        var test = await promise;
        var msg = DownloadResponse.decode(test.data.value);
        s.filename = msg.filename
        if (temp) {
          if (folder != null && folder != "") {
            fs.renameSync(filename, path.join(folder, msg.filename))
          } else {
            fs.renameSync(filename, msg.filename)
          }
        }
        s.bytes = ws.bytesWritten;
        s.bytesWritten = ws.bytesWritten;
        s.mb = ws.bytesWritten / (1024 * 1024);
        s.elapsedTime = new Date().getTime() - startTime;
        s.mbps = s.mb / (s.elapsedTime / 1000)
        resolve(s);
      });
      ws.on("error", (err) => {
        reject(err);
      });
      // rs.on("error", (err) => {
      //   reject(err);
      // });
    });
  }
  static sendFileContent(client: client, rid, filename, highWaterMark) {
    return new Promise(async (resolve, reject) => {
      var chunks = 0;
      var bytes = 0;
      var name = path.basename(filename);
      var stat = fs.statSync(filename) as any;
      var checksum: string = "";
      if (config.ChecksumCheckFiles) {
        checksum = await this.getFileChecksum(filename);
      }
      var readStream = fs.createReadStream(filename, { highWaterMark })
      const packdata = Any.create({ type_url: "type.googleapis.com/openiap.BeginStream", value: BeginStream.encode(BeginStream.create({ checksum, stat })).finish() })
      this.sendMesssag(client, { rid, command: "beginstream", data: packdata }, "", true);
      await new Promise((resolve) => setTimeout(resolve, config.BeginstreamDelay));
      readStream.on("open", () => {
      });
      readStream.on("end", () => {
        setTimeout(() => {
          try {
            this.sendMesssag(client, { rid, command: "endstream", data: undefined }, "", true);
            var mb = bytes / (1024 * 1024);
            resolve({ rid, chunks, bytes, mb });
          } catch (error) {
            try {
              reject(error);
            } catch (error) {
              err(error);
            }

          }
        }, config.EndstreamDelay);
      });
      readStream.on("error", (error) => {
        reject(error);
      });
      if (config.ThrottlerMS > 0) {
        readStream.pipe(new Throttler(config.ThrottlerMS)).on("data", (chunk) => {
          chunks++;
          bytes += chunk.length;
          const packdata = Any.create<any>({ "typeUrl": "openiap.Stream", "value": Stream.encode(Stream.create({ data: chunk })).finish() })
          this.sendMesssag(client, { rid, command: "stream", data: packdata }, "", true);
        });
      } else {
        readStream.on("data", (chunk: any) => {
          if (client.connected) {
            chunks++;
            bytes += chunk.length;
            const packdata = Any.create<any>({ "typeUrl": "openiap.Stream", "value": Stream.encode(Stream.create({ data: chunk })).finish() })
            this.sendMesssag(client, { rid, command: "stream", data: packdata }, "", true);
          }
        });
      }
    });
  }
  static UploadFile(client: client, filename: string, jwt: string): Promise<UploadResponse> {
    var basename = path.basename(filename)
    const packdata = Any.create<any>({ "typeUrl": "openiap.UploadRequest", "value": UploadRequest.encode(UploadRequest.create({ filename: basename })).finish() })
    // Send upload command, server will respond, once upload is complete
    const [rid, promise] = this._RPC(client, { command: "upload", data: packdata, jwt });
    // send file content using the ID used for upload command
    var promise2 = this.sendFileContent(client, rid, filename, config.SendFileHighWaterMark);
    // catch errors doing streaming file content
    promise2.catch((e) => {
      // doing checksum error, we get disconnected, but we still get the error on the main promise
      if (e && e.message && e.message == "client is not connected") {
      } else {
        err(e);
      }
      // promise.reject(err);
    });
    // return main promise
    return promise;
  }
  static ReceiveFileContent(client: client, rid: string, filename: string, highWaterMark: number) {
    return new Promise(async (resolve, reject) => {
      const startTime = new Date().getTime();
      const rs = new iostream.Readable;
      rs._read = () => { };
      var ws = fs.createWriteStream(filename, { highWaterMark });
      const s = this.SetStream(client, rs, rid)
      ws.on("finish", async () => {
        var mb = ws.bytesWritten / (1024 * 1024);
        var bytes = ws.bytesWritten;
        var chunks = s.chunks;
        const elapsedTime = new Date().getTime() - startTime;
        const mbps = mb / (elapsedTime / 1000)
        if (s.checksum) {
          const checksum = await this.getFileChecksum(filename);
          if (checksum != s.checksum) {
            return reject(new Error("File checksum mismatch"));
          }
        } else if (config.ChecksumCheckFiles) {
          warn("No checksum for file available");
        }
        resolve({ rid, chunks, bytes, mb, elapsedTime, mbps });
      });
      ws.on("error", (err) => {
        reject(err);
      });
      rs.on("error", (err) => {
        reject(err);
      });
      rs.pipe(ws);
    });
  }
  static IsPendingReply(client: client, payload: Envelope) {
    try {
      client.lastheartbeat = new Date();
      client.lastheartbeatstr = client.lastheartbeat.toISOString();
      client.lastheartbeatsec = (client.lastheartbeat.getTime() / 1000).toString();
      if (payload.command == "ping" || payload.command == "pong") {
        return true
      }
      const rid = payload.rid;
      config.dumpmessage("RCV", payload);
      if (rid == null || rid == "") return false;
      if (client.replies[rid] && payload.command != "beginstream" && payload.command != "stream" && payload.command != "endstream") {
        const { resolve, reject, dt } = client.replies[rid];
        if (resolve) {
          try {
            // @ts-ignore // REST HACK
            if (payload.data && payload.data.value && payload.data.value.data) {
              // @ts-ignore
              payload.data.value = payload.data.value.data;
            }
            if (payload.command == "error") {
              var msg = ErrorResponse.decode(payload.data.value);
              var error = new ServerError(msg.message, msg.stack);
              reject(error);
            } else {
              resolve(payload);
            }
          } catch (error) {
            err(error);
            return reject(error);
          }
        }
        delete client.replies[rid];
      } else if (client.streams[rid]) {
        const { command } = payload;
        if (command == "error") {
          const s = client.streams[rid].stream;
          s.emit("error", new Error(payload.data.toString()));
        } else if (command == "stream") {
          const s = client.streams[rid].stream;
          const msg = Stream.decode(payload.data.value);
          if (s.push) {
            s.push(msg.data)
          } else {
            s.write(msg.data)
          }
          client.streams[rid].chunks++;
          s.bytes += msg.data.length;
        } else if (command == "beginstream") {
          const msg = BeginStream.decode(payload.data.value);
          client.streams[rid].stat = {}
          if (msg.stat) client.streams[rid].stat = msg.stat;
          if (msg.checksum) client.streams[rid].checksum = msg.checksum;
        } else if (command == "endstream") {
          const s = client.streams[rid].stream;
          if (s.push) {
            client.streams[rid].stream.push(null);
          } else {
            client.streams[rid].stream.end();
          }
          // streams[rid].stream.emit("finish");
          // streams[rid].stream.end();
          // streams[rid].stream.emit("end");
          // streams[rid].stream.destroy();
          // info("Stream ended for rid: " + rid + " chunks: " + streams[rid].chunks + " bytes: " + streams[rid].bytes);
          delete client.streams[rid];
        }
      } else {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  static get(url) {
    return new Promise((resolve, reject) => {
      var provider = http;
      if (url.startsWith("https")) {
        // @ts-ignore
        provider = https;
      }
      provider.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          resolve(data);
        });
      }).on("error", (err) => {
        reject(err);
      });
    })
  }
  static post(jwt, agent, url, body) {
    return new Promise((resolve, reject) => {
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
        var req = provider.request(url, options, (res) => {
          res.setEncoding("utf8");
          if (res.statusCode != 200) {
            return reject(new Error("HTTP Error: " + res.statusCode + " " + res.statusMessage));
          }
          var body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            var r = res;
            resolve(body);
          });
        }
        );
        req.write(body);
        req.end();

      } catch (error) {
        reject(error);
      }
    })
  }
  static sendMesssag(client: client, payload: any, id: string, dumpmsg: boolean): number {
    // var errMsg = this.Envelope.verify(payload);
    // if (errMsg) throw new Error(errMsg);
    payload.seq = client.seq;
    if (id != null && id != "") {
      payload.id = id;
    } else {
      if (client.seq != null) {
        // payload.id = client.seq.toString();
        payload.id = Math.random().toString(36).substring(2, 11);
      } else {
        payload.id = Math.random().toString(36).substring(2, 11);
      }
    }
    if (client.seq != null) { client.seq++; }
    // messages.push(payload);
    // if (!payload.id || payload.id == "") payload.id = Math.random().toString(36).substring(2, 11);
    // if (payload.data && config.ChecksumCheckPackages) payload.hash = this.getChecksum(payload.data);
    if (dumpmsg) {
      config.dumpmessage("SND", payload);
    }

    if (client.protocol == "grpc") {
      if (client.grpcStream) {
        client.grpcStream.write(payload);
      } else {
        throw new Error("client is not a grpc client");
      }
      return payload.seq;
    }
    if (client.protocol == "rest") {
      if (config.role == "client") {
        this.post(client.jwt, client.agent, client.url, JSON.stringify(payload)).then((data: any) => {
          try {
            var payload = data;
            try {
              if (data.indexOf("{") > -1) payload = JSON.parse(data);
            } catch (error) {
            }
            if (payload && payload.data && payload.data.type && payload.data.type.toLowerCase() == "buffer") {
              payload.data = Buffer.from(payload.data.data);
            }
            this.IsPendingReply(client, payload);
          } catch (error) {
            err(error);
          }
        }).catch((error) => {
          err(error);
        });
      } else {
        // how to handle this ?
      }
      return payload.seq;
    }
    var message = Envelope.create(payload);
    var buffer = Envelope.encode(message).finish();
    var lengthbuffer = Buffer.alloc(4);
    lengthbuffer.writeUInt32LE(buffer.length, 0); // writeUInt32LE writeUInt32BE
    if (client.protocol == "ws") {
      if (!client.ws) throw new Error("client is not a websocket client");
      try {
        client.ws.send(lengthbuffer);
        client.ws.send(buffer);
      } catch (error) {
        err(error);
        client.Close();
        throw error
      }
      return payload.seq;
    }
    var r = config.role;
    if (config.role == "server") {
      config.dumpdata(buffer);
    }
    if (client.protocol == "socket" || client.protocol == "pipe") {
      if (!client.connected) {
        throw new Error("client is not connected");
      } else if (!client.stream) {
        throw new Error("client is not a " + client.protocol + " client");
      }
      client.stream.write(lengthbuffer);
      client.stream.write(buffer);
      return payload.seq;
    }
    throw new Error("Unknown protocol");
  }
  static ClientCleanup(client: client, onClientDisconnected: any, error: Error | string | undefined) {
    // @ts-ignore
    if (client.cleanup == true) return;
    // @ts-ignore
    client.cleanup = true;
    try {
      var keys = Object.keys(client.replies);
      // if (!error) error = new Error("Client " + client.id + "disconnected");
      for (let i = 0; i < keys.length; i++) {
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
    } catch (e) {
      err(e);
    }
    finally {
    }
  }
  static connect(apiurl: string, clientConstructor: new () => iclient = client) {
    config.role = "client";
    const result: client = new clientConstructor();
    const url = new URL(apiurl);
    result.protocol = "ws";
    result.url = apiurl;
    if (url.protocol == "http:" || url.protocol == "https:") {
      result.protocol = "rest";
    } else if (url.protocol == "grpc:") {
      result.protocol = "grpc";
    } else if (url.protocol == "socket:") {
      result.protocol = "socket";
    } else if (url.protocol == "pipe:") {
      result.protocol = "socket";
    }
    result.connected = false; result.connecting = true; result.signedin = false;
    result.Initialize(null, null, null, null).catch((e) => { err(e); });

    // { protocol, port, connected: false, connecting: true, agent: null, id: "", host, onMessage, onClientConnected, onClientDisconnected, cleanup: false,
    //   SendStreamCall: null, ReceiveStreamCall: null, app: null, ws: null, client: {}, stream: null, counter: 0};
    result.id = Math.random().toString(36).substring(2, 11);
    if (url.protocol == "http:" || url.protocol == "https:") {
      // @ts-ignore
      result.agent = new http.Agent({
        keepAlive: true,
        maxSockets: 1
      });
      this.post(result.jwt, result.agent, apiurl, JSON.stringify({ "command": "noop" })).then((data: any) => {
        try {
          result.connected = true;
          result.connecting = false;
          result.onConnected(result);
          var payload = JSON.parse(data);
          if (payload && payload.data && payload.data.type && payload.data.type.toLowerCase() == "buffer") {
            payload.data = Buffer.from(payload.data.data);
          }
          // this.IsPendingReply(payload);
        } catch (error) {
          this.ClientCleanup(result, result.onDisconnected, error);
        }
      }).catch((e) => {
        this.ClientCleanup(result, result.onDisconnected, e);
      });
      return result;
    } else if (url.protocol == "grpc:") {

      // https://stackoverflow.com/questions/71628043/envoy-grpc-reverse-bridge-received-rst-stream-with-code-0

      // https://github.com/stephenh/ts-proto/issues/614
      if (url.host.indexOf(":") == -1 && url.port) {
        // @ts-ignore
        result.grpc = new this.openiap_proto.FlowService(url.host + ":" + url.port, grpc.credentials.createInsecure());
        // result.grpc = new FlowServiceClientImpl(); //  grpc.Client() new FlowServiceClientImpl()
      } else {
        let host = url.host.split(":")[0];

        if (url.port == "443") {
          var options = { ...protowrap.grpc_server_options, 'grpc.ssl_target_name_override': host };
          // @ts-ignore
          result.grpc = new this.openiap_proto.FlowService(url.host, grpc.credentials.createSsl(), options);
        } else {
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
      result.grpcStream.on("status", (status) => {
        info(url.protocol + " client " + status.code + " " + status.details);
      });
      result.grpcStream.on("data", async (message) => {
        try {
          if (message != null) {
            if (!this.IsPendingReply(result, message)) {
              var _payload = await result.onMessage(result, message);
              if (_payload && _payload.command != "noop") this.sendMesssag(result, _payload, "", true);
            }
          }
        } catch (error) {
          err(error);
        }
      });

      result.grpcStream.on("end", () => {
        this.ClientCleanup(result, result.onDisconnected, undefined);
      });
      // @ts-ignore
      result.grpcStream.on("error", (e) => {
        this.ClientCleanup(result, result.onDisconnected, e);
      });
      setTimeout(() => {
        result.connected = true;
        result.connecting = false;
        result.onConnected(result);
      }, 100)
      return result;
    } else if (url.protocol == "pipe:" || url.protocol == "socket:") {
      const netconnection = () => {
        result.connecting = false;
        result.connected = true;
        result.onConnected(result);
        // @ts-ignore
        result.stream.pipe(parser).on("data", async (message) => {
          try {
            if (message != null) {
              if (!this.IsPendingReply(result, message)) {
                var _payload = await result.onMessage(result, message);
                if (_payload && _payload.command != "noop") this.sendMesssag(result, _payload, "", true);
              }
            }
          } catch (error) {
            err(error);
          }
        });
      };
      var PIPE_PATH = "\\\\" + url.host + "\\pipe\\" + url.pathname.substring(1);
      // is running on linux
      if (process.platform == "linux") {
        PIPE_PATH = "/tmp/CoreFxPipe_" + url.pathname.substring(1);
      }
      if (url.protocol == "socket:") {
        PIPE_PATH = url.host + ":" + url.port;
        if (url.port && url.host) {
          result.stream = net.createConnection(url.port as any, url.host, netconnection);
        } if (url.port || url.host) {
          result.stream = net.createConnection(url.port || url.host, netconnection);
        }
      } else {
        result.stream = net.createConnection(PIPE_PATH, netconnection);
      }
      var parser = new messageParser();
      // parser.Envelope = this.Envelope;
      parser.on("error", (e) => {
        this.ClientCleanup(result, result.onDisconnected, e);
        result.stream.end();
      });
      result.stream.on("error", (e) => {
        this.ClientCleanup(result, result.onDisconnected, e);
        result.stream.end();
      });
      result.stream.on("end", () => {
        this.ClientCleanup(result, result.onDisconnected, undefined);
      });
      return result;
    } else if (url.protocol == "ws:" || url.protocol == "wss:") {
      result.ws = new WebSocket(apiurl, { rejectUnauthorized: false });
      result.ws.on("open", () => {
        result.connecting = false;
        result.connected = true;
        result.onConnected(result);
      }
      );
      var parser = new messageParser();
      // parser.Envelope = this.Envelope;
      // @ts-ignore
      result.ws.on("message", (message) => {
        parser.write(message);
      });
      parser.on("data", async (message) => {
        try {
          if (message != null) {
            if (!this.IsPendingReply(result, message)) {
              var _payload = await result.onMessage(result, message);
              if (_payload && _payload.command != "noop") this.sendMesssag(result, _payload, "", true);
            }
          }
        } catch (error) {
          err(error);
        }
      });
      parser.on("error", (e) => {
        this.ClientCleanup(result, result.onDisconnected, e);
        result.ws.close();
      });
      result.ws.on("error", (e) => {
        this.ClientCleanup(result, result.onDisconnected, e);
      });
      result.ws.on("close", (closeCode, closeMessage) => {
        this.ClientCleanup(result, result.onDisconnected, closeMessage);
        // @ts-ignore
        result.ws.close();
      }
      );
      return result;
    } else {
      throw new Error("protocol not supported " + url.protocol);
    }
  }
  static serve(protocol: clientType, onClientConnected, port, path, wss, app, http, clientConstructor: new () => iclient = client) {
    config.role = "server";
    var result = { protocol, port, id: "", connected: false, connecting: false, client: null, ws: null, pending: {}, app, http, wss };
    result.id = Math.random().toString(36).substring(2, 11);
    if (protocol == "rest") {
      var listen = false;
      // if (!app) {
      //   app = express();
      //   app.use(express.json())
      //   listen = true;
      // }
      app.post(path, async (req, res, next) => {
        const id = Math.random().toString(36).substring(2, 11);
        var clientresult: client = new clientConstructor();
        clientresult.id = id; clientresult.protocol = protocol;
        clientresult.connected = true; clientresult.connecting = false; clientresult.signedin = false;
        await clientresult.Initialize(null, null, null, req);
        onClientConnected(clientresult);
        // extract Bearer token from authorization header
        var token = req.headers.authorization;
        if (token && token.startsWith("Bearer ")) {
          token = token.slice(7, token.length);
          clientresult.jwt = token;
        }

        var payload = req.body;
        if (payload && payload.data && payload.data.type && payload.data.type.toLowerCase() == "buffer") {
          payload.data = Buffer.from(payload.data.data);
        }
        try {
          if (!this.IsPendingReply(clientresult, payload)) {
            var _payload = await clientresult.onMessage(clientresult, payload);
            if (!_payload.id || _payload.id == "") _payload.id = Math.random().toString(36).substring(2, 11);
            res.send(_payload);
          } else {
            res.send("IsPendingReply took your payload");
          }
        } catch (error) {
          res.send(error);
          err(error);
        } finally {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
        }
        next();
      });
      if (listen) {
        if (http) {
          http.createServer(app);
        } else {
          app.listen(port, () => {
            port = port || 80;
            result.port = port;
          });
        }
      }
      result.app = app;
      return result;
    } else if (protocol == "ws") {
      if (wss != null) {
        result.wss = wss;
      } else {
        var server = http;
        var p = port || 80;
        if (server) {
          p = undefined;
        } else {
          result.port = p;
        }
        result.wss = new WebSocket.WebSocketServer({ server, port: p });
      }
      result.wss.on("connection", async (ws, req) => {
        const url = require("url");
        const location = url.parse(req.url, true);
        if (location.pathname != path) return;

        const id = Math.random().toString(36).substring(2, 11);
        var clientresult: client = new clientConstructor();
        clientresult.id = id; clientresult.protocol = protocol;
        clientresult.ws = ws; clientresult.connected = true; clientresult.connecting = false; clientresult.signedin = false;
        await clientresult.Initialize(ws, null, null, req);
        onClientConnected(clientresult);
        var parser = new messageParser();
        // parser.Envelope = this.Envelope;
        ws.on("message", (message) => {
          parser.write(message);
        });
        parser.on("data", async (message) => {
          try {
            if (message != null) {
              if (!this.IsPendingReply(clientresult, message)) {
                var payload = await clientresult.onMessage(clientresult, message);
                if (payload && payload.command != "noop") this.sendMesssag(clientresult, payload, "", true);
              }
            }
          } catch (error) {
            err(error);
          }
        });
        parser.on("error", (e) => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
          clientresult.ws.close();
        });
        ws.on("error", (e) => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
          clientresult.ws.close();
        });
        ws.on("close", (closeCode, closeMessage) => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, closeMessage);
        });
      });
      return result;
    } else if (protocol == "grpc") {
      //const SetupStream = async (call, respond, e3) => {
      const SetupStream = async (call: any, respond: any) => {
        // info("New streaming grpc client connected");
        var clientresult: client = new clientConstructor();
        clientresult.id = Math.random().toString(36).substring(2, 11);
        clientresult.protocol = protocol; clientresult.connected = true;
        clientresult.connecting = false; clientresult.signedin = false;
        clientresult.grpcStream = call;
        await clientresult.Initialize(null, null, call, null);
        onClientConnected(clientresult);
        const pingtimer = setInterval(() => {
          var c = call;
          var that = this;
          if (c.cancelled) {
            clearInterval(pingtimer);
            this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
          }
        }, 1000);
        call.on("data", async (payload) => {
          try {
            if (!this.IsPendingReply(clientresult, payload)) {
              var _payload = await clientresult.onMessage(clientresult, payload)
              if (_payload && _payload.command != "noop") this.sendMesssag(clientresult, _payload, "", true);
            }
          } catch (error) {
            try {
              this.sendMesssag(clientresult, error, "", true);
            } catch (error) {

            }
            err(error);
          }
        });
        call.on("end", () => {
          var c = call;
          var that = this;
          console.log("end");
          if (c.cancelled) {
            clearInterval(pingtimer);
            this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
          }
          // 
        });
        call.on("error", (e) => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
        });
        return call;
      };
      const Signin = async (call, callback) => {
        try {
          var payload = {
            "jwt": "JWTsecretTOKEN",
            user: { name: call.request.username, username: call.request.username, _id: "1", email: "wefew", roles: [] }
          }
          callback(null, payload);
        } catch (error) {
          err(error);
          callback(error, null);
        }
      }

      // @ts-ignore
      result.server = new grpc.Server(protowrap.grpc_server_options);

      // @ts-ignore
      // result.server.addService(this.openiap_proto.FlowService.service, { RPC, ReceiveStream, SendStream });
      result.server.addService(this.openiap_proto.FlowService.service, { SetupStream, Signin });
      // @ts-ignore
      result.server.bindAsync("0.0.0.0:" + port, grpc.ServerCredentials.createInsecure(), () => {
        // @ts-ignore
        result.server.start();
      });
      return result;
    } else if (protocol == "pipe" || protocol == "socket") {
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
      } catch (error) {
        err(error);
      }
      // @ts-ignore
      result.server = net.createServer(async (stream) => {
        const id = Math.random().toString(36).substring(2, 11);
        var clientresult: client = new clientConstructor();
        clientresult.id = id; clientresult.protocol = protocol;
        clientresult.connected = true; clientresult.connecting = false; clientresult.signedin = false;
        await clientresult.Initialize(null, stream, null, null);
        onClientConnected(clientresult);
        var parser = new messageParser();
        // parser.Envelope = this.Envelope;
        stream.pipe(parser).on("data", async (message) => {
          if (!clientresult.connected) return;
          if (!this.IsPendingReply(clientresult, message)) {
            try {
              var payload = await clientresult.onMessage(clientresult, message)
              if (payload && payload.command != "noop") this.sendMesssag(clientresult, payload, "", true);
            } catch (error) {
              err(error);
            }
          }
        });
        stream.on("error", (e) => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
          clientresult.stream.end();
        });
        parser.on("error", (e) => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, e);
          clientresult.stream.end();
        });
        stream.on("end", () => {
          this.ClientCleanup(clientresult, clientresult.onDisconnected, undefined);
        });
      });
      // @ts-ignore
      result.server.on("error", (e) => {
        // ClientCleanup(clientresult, onClientDisconnected, e);
        // clientresult.stream.end();
      });
      // @ts-ignore
      result.server.listen(PIPE_PATH, () => {
      })
      return result;
    } else {
      throw new Error("Not supported protocol " + protocol);
    }
  }
  static getFileChecksum(filePath) {
    return new Promise<string>((resolve, reject) => {
      const hash = crypto.createHash("sha256"); // sha256, md5
      const stream = fs.createReadStream(filePath);
      stream.on("data", data => {
        hash.update(data);
      });
      stream.on("end", () => {
        const checksum = hash.digest("hex");
        resolve(checksum);
      });
      stream.on("error", error => {
        reject(error);
      });
    });
  }
  static getChecksum(buffer) {
    const hash = crypto.createHash("sha256");
    hash.update(buffer);
    const checksum = hash.digest("hex");
    return checksum;
  }
}
export class ServerError extends Error {
  constructor(message, stack) {
    super(message);
    this.message = message;
    this.name = "ServerError";
    this.stack = stack;
  }
}
