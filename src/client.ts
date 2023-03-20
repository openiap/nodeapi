// import * as net from "net";
// import * as  grpc from "@grpc/grpc-js";
// import * as  WebSocket from "ws";
import { protowrap } from "./protowrap"
import { config } from "./config";
const { info, err, warn }  = config;
import { WatchEvent } from "./proto/watch";
import { Any } from "./proto/google/protobuf/any";
import { Envelope, FlowService } from "./proto/base"
export type clientType = "socket" | "pipe" | "ws" | "grpc" | "rest";
export type clientAgent = "node" | "browser" | "nodered" | "openrpa" | "powershell" | "assistent" | "nodeagent" | "python" | "java" | "csharp" | "go" | "unknown";
export interface iclient {
  id: string;
  seq: number;
  remoteip: string;
  agent: clientAgent;
  protocol: clientType;
  version: string;
  doping: boolean;
  created: Date;
  lastheartbeat: Date;
  lastheartbeatstr: string;
  lastheartbeatsec: string;
  user: any; // User
  jwt: string;
  signedin: boolean;
  connected: boolean;
  connecting: boolean;
  queues: any[]; // amqpqueue[]
  exchanges: any[]; // amqpexchange[]
  watches: changestream[];
  url: string;
  ws: any; // WebSocket;
  stream: any; // net.Socket;
  grpc: FlowService;
  call: any;
  grpcStream: any; //  grpc.ClientDuplexStream<any, any>;
  replies: any;
  streams: any;
  Initialize(ws: any, stream: any, call: any, req: any): Promise<boolean>; // WebSocket // net.Socket; // express.Request
  onConnected(client: client): void;
  onDisconnected(client: client, error: Error): void;
  onMessage(client: client, message: any): Promise<Envelope>;
  ping(span: any): void;
  queuecount(): number;
  Watch(aggregates: object[], collectionname: string, jwt: string): Promise<string>;
  UnWatch(id: string, jwt: string): Promise<void>;
  SendWatch(watch: any, next: any, span: any): void;
  Close(): void;
}
export class client implements iclient {
  public id: string = "";
  public seq: number = 0;
  public remoteip: string = "unknown";
  public agent: clientAgent;
  public protocol: clientType;
  public version: string;
  public doping: boolean;
  public created: Date = new Date();
  public lastheartbeat: Date = new Date();
  public lastheartbeatstr: string = new Date().toISOString();
  public lastheartbeatsec: string = "0";
  public user: any; // User
  public jwt: string;
  public signedin: boolean = false;
  public connected: boolean = false;
  public connecting: boolean = false;
  public queues: any[] = []; // amqpqueue[]
  public exchanges: any[] = []; // amqpexchange[]
  public watches: changestream[] = [];
  public url: string;
  public ws: any; // WebSocket;
  public stream: any; // net.Socket;
  public grpc: FlowService;
  public call: any;
  public grpcStream: any; //  grpc.ClientDuplexStream<any, any>;
  public replies: any;
  public streams: any;

  async Initialize(ws: any, stream: any, call: any, req: any): Promise<boolean> { // WebSocket // net.Socket; // express.Request 
    try {
      this.replies = {};
      this.streams = {};
      this.doping = config.DoPing;
      if (ws != null) this.ws = ws;
      if (stream != null) this.stream = stream;
      if (call != null) this.call = call;
      if (req != null) this.remoteip = remoteip(req);
    } catch (error) {
      err(error);
    }
    return true;;
  }
  onConnected(client: client): void {
  }
  onDisconnected(client: client, error: Error): void {
    info("close " + this.id + " " + this.protocol + " " + this.remoteip + " " + this.agent);
  }
  async onMessage(client: client, message: any): Promise<Envelope> {
    return Envelope.create({"command": "noop"});
  }
  ping(span: any) {
    if(this.doping)  {
      protowrap.sendMesssag(this, {"command": "ping"}, "", true);
    } else {
      this.lastheartbeat = new Date();
      this.lastheartbeatstr = this.lastheartbeat.toISOString();
      this.lastheartbeatsec = (this.lastheartbeat.getTime() / 1000).toString();
      }
  }
  queuecount() {
    return this.queues.length;
  }
  async Watch(aggregates: object[], collectionname: string, jwt: string): Promise<string> {
    if (typeof aggregates === "string") {
      try {
        aggregates = JSON.parse(aggregates);
      } catch (error) {
      }
    }
    // const stream: clsstream = new clsstream();
    const id = Math.random().toString(36).substring(2, 11);
    const stream: any = {id, collectionname, aggregates};
    this.watches[id] = stream;
    return id;
  }
  async UnWatch(id: string, jwt: string): Promise<void> {
    if (this.watches[id]) {
        delete this.watches[id];
    }
  }
  SendWatch(watch: any, next: any, span: any) {
    try {
        info("Notify " + this.user.username + " of " + next.operationType + " " + next.fullDocument.name);

        const packdata = Any.create({type_url: "type.googleapis.com/openiap.WatchEvent", 
        "value": WatchEvent.encode(WatchEvent.create({id: watch.id, operation: next.operationType, document: JSON.stringify(next.fullDocument)})).finish()})
        protowrap.sendMesssag(this, { command: "watchevent", data: packdata }, "", true);
    } catch (error) {
        console.error(error);
    } finally {
    }
}

  Close() {
    if (this.ws != null) this.ws.close();
    if (this.stream != null) this.stream.destroy();
    if (this.call != null) {
      try {
        this.call.cancel();
      } catch (error) {
        warn(error.toString())
      }
    }
    if (this.grpcStream != null) {
      try {
        this.grpcStream.cancel();
      } catch (error) {
        warn(error.toString())
      }
    }
    info("close " + this.id + " " + this.protocol + " " + this.remoteip + " " + this.agent);
    this.connected = false;
    this.connecting = false;
    // this.onDisconnected(this, null);
  }
}
export class changestream {
  // public stream: ChangeStream;
  public stream: any;
  public id: string;
  public callback: any;
  aggregates: object[];
  collectionname: string;
}
export function remoteip(req: any) { // express.Request
  if (req == null) return "unknown";
  let remoteip: string = req.socket.remoteAddress;
  if (req.headers["X-Forwarded-For"] != null) remoteip = req.headers["X-Forwarded-For"] as string;
  if (req.headers["X-real-IP"] != null) remoteip = req.headers["X-real-IP"] as string;
  if (req.headers["x-forwarded-for"] != null) remoteip = req.headers["x-forwarded-for"] as string;
  if (req.headers["x-real-ip"] != null) remoteip = req.headers["x-real-ip"] as string;
  return remoteip;
}
