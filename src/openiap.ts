import { client, clientAgent } from "./client";
import { protowrap } from "./protowrap";
import { config } from "./config";
const { info, err, warn }  = config;
import { Any } from "./proto/google/protobuf/any";
// import events = require("events");
import { EventEmitter } from "events";
import { CustomCommandRequest, CustomCommandResponse, Customer, DownloadResponse, EnsureCustomerRequest, Envelope, GetElementRequest, GetElementResponse, PingRequest, RefreshToken, SigninRequest, SigninResponse, UploadResponse, User } from "./proto/base";
import { AggregateRequest, AggregateResponse, CountRequest, CountResponse, DeleteManyRequest, DeleteManyResponse, DeleteOneRequest, DeleteOneResponse, DeleteWorkitemRequest, DeleteWorkitemResponse, DropCollectionRequest, GetDocumentVersionRequest, GetDocumentVersionResponse, InsertManyRequest, InsertManyResponse, InsertOneRequest, InsertOneResponse, InsertOrUpdateManyRequest, InsertOrUpdateManyResponse, InsertOrUpdateOneRequest, InsertOrUpdateOneResponse, ListCollectionsRequest, ListCollectionsResponse, PopWorkitemRequest, PopWorkitemResponse, PushWorkitemRequest, PushWorkitemResponse, PushWorkitemsRequest, PushWorkitemsResponse, QueryRequest, QueryResponse, QueueEvent, QueueMessageRequest, RegisterExchangeRequest, RegisterExchangeResponse, RegisterQueueRequest, RegisterQueueResponse, UnRegisterQueueRequest, UnWatchRequest, UpdateDocumentRequest, UpdateDocumentResponse, UpdateOneRequest, UpdateOneResponse, UpdateResult, UpdateWorkitemRequest, UpdateWorkitemResponse, WatchEvent, WatchRequest, WatchResponse, Workitem } from ".";
import { CreateWorkflowInstanceRequest, CreateWorkflowInstanceResponse } from "./proto/queues";
import { CreateCollectionRequest } from "./proto/querys";
import { StripeCustomer } from "./proto/stripe";
import { apiinstrumentation } from "./apiinstrumentation";
import { context } from "@opentelemetry/api";

/**
 * OpenIAP
 */
export class openiap extends EventEmitter {
    /**
     * The internal client object
     */
    client: client;
    private loginresolve: any;
    private loginreject: any;
    private reconnectms: number = 100;
    private pingerhandle: any;
    private queuecallbacks: any = {};
    private watchids: any = {};
    private queues: any = {};
    private defaltqueue: string = "";
    /**
     * Define client type when authenticating toward the server
     */
    agent: clientAgent = "node";
    /**
     * If false, the client will never give up trying to connect to the server, if true, will give up after 17 seconds
     */
    allowconnectgiveup: boolean = true;
    /**
     * Define the version of the client sent to the server
     */
    version: string = "0.0.14"
    /**
     * Define if connected to server
     */
    connected: boolean = false;
    /**
     * Define if we are trying to (re)connect
     */
    connecting: boolean = false;
    /**
     * If connected, are we also signed in or is server waiting on use to authenticate
     */
    signedin: boolean = false;
    /**
     * The URL used when connecting to the server
     */
    url: string = "";
    /**
     * The JWT used when authenticating to the server
     */
    jwt: string = "";
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
    constructor(url: string = "", jwt: string = "") {
        super()
        this.version = require("../package.json").version;
        this.agent = "node";
        if(url != null && url != "") this.url = url;
        if(jwt != null && jwt != "") this.jwt = jwt;
        if(this.url == null || this.url == "") this.url = process.env.apiurl
        if(this.url == null || this.url == "") this.url = process.env.grpcapiurl
        if(this.url == null || this.url == "") this.url = process.env.wscapiurl
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
    async connect(first: boolean = true): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            if(process.env.log_with_colors == "false" || process.env.log_with_colors == "False") {
                var keys = Object.keys(config.color);
                for(var i = 0; i < keys.length; i++) {
                    config.color[keys[i]] = "";
                }
            }
            var u = new URL(this.url);
            if(u.protocol == "grpc:") {
                await protowrap.init()
            }
            if (this.loginresolve == null && first == true) {
                this.loginresolve = resolve;
                this.loginreject = reject;
            }
            // await protowrap.init()
            this.connected = false;
            this.connecting = true;
            if(this.pingerhandle != null) clearInterval(this.pingerhandle);
            this.pingerhandle = setInterval(this.__server_pinger.bind(this), 30000)
            setTimeout(() => {
                try {
                    this.client = protowrap.connect(this.url)
                    this.client.onConnected = this.cliOnConnected.bind(this);
                    this.client.onDisconnected = this.cliOnDisconnected.bind(this);
                    this.client.onMessage = this.cliOnMessage.bind(this);
                } catch (error) {
                    this.cliOnDisconnected(this.client, error);
                }
            }, this.reconnectms);
        });
    }
    __server_pinger() {
        if(this.connected) {
            this.client.ping(null);
        }
    }
    /**
     * Close connection to server. Use this to ensure the client will not reconnect to the server
     */
    Close() {
        this.signedin = false;
        if(this.pingerhandle != null) clearInterval(this.pingerhandle);
        // if (this.client && this.client.destroy) this.client.destroy();
        // if (this.client && this.client.close) this.client.close();
        // if (this.client && this.client.terminate) this.client.terminate();
        if (this.client && this.client.Close) this.client.Close();
    }
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
    async onConnected(client:openiap) {
    }
    private async cliOnConnected(client:client) {
        try {
            this.connected = true;
            this.connecting = false;
            var u = new URL(this.url);
            info("Connected to server " + u.host);
            var _jwt = process.env.jwt
            var _username = decodeURIComponent(u.username);
            var _password = decodeURIComponent(u.password);
            if(_jwt == null) _jwt = this.jwt
            if(_jwt == null) _jwt = client.jwt;
            if(_username == null) _username = "";
            if(_password == null) _password = "";

            if (_username != "" && _password != "") {
                const reply = await this.Signin({ username: _username, password: _password, ping: config.DoPing })
                if (this.loginresolve != null) {
                    this.loginresolve(reply.user);
                    this.loginresolve = null;
                }
            } else if (_jwt != "") {
                const reply = await this.Signin({ jwt: _jwt, ping: config.DoPing })
                if (this.loginresolve != null) {
                    this.loginresolve(reply.user);
                    this.loginresolve = null;
                }
            } else if (this.loginresolve != null) {
                this.loginresolve(null);
                this.loginresolve = null;
            }
            try {
                this.reconnectms = 100;
                await this.onConnected(this);
            } catch (error) {
                err(error)
            }
            this.emit("connected", this)
        } catch (error) {
            this.loginresolve = null;
            if(this.loginreject != null) this.loginreject(error);
        }
    }
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
    public onDisconnected(client:openiap, error: Error) {
    }
    private cliOnDisconnected(client:client, error: Error) {
        this.connected = false;
        this.connecting = false;
        this.signedin = false;
        if(this.pingerhandle != null) clearInterval(this.pingerhandle);    
        this.reconnectms += 100;
        if(this.reconnectms > 1800 && this.allowconnectgiveup == true) {
            this.reconnectms = 200;
            if(this.loginreject != null) {
                this.loginreject(new Error("Giving up, not responding"));
                this.loginresolve = null;
                this.loginreject = null;
            } else {
                err(new Error("Giving up, not responding"));
            }
            return;
        } else if(this.reconnectms > 2500) {
            this.reconnectms = 2500
        }
        var msg: string = "";
        if (error) {
            var message: string = (error.message || error as any);
            try {
                if (message && !message.startsWith("Disconnected from server")) {
                    // err(new Error("Disconnected from server " + message));
                    err("Disconnected from server " + message);
                }
            } catch (_error) {
                err(error);
            }
        } else {
            info("Disconnected from server");
        }
        try {
            this.onDisconnected(this, error);
        } catch (error) {
            err(error)
        }
        this.emit("disconnected", this, error)
        try {
            this.connect(false);
        } catch (error) {            
        }
    }
    /**
     * Used to generate a unique identifier, used for example when creating new packages.
     * @returns A unique identifier
     */
    public static GetUniqueIdentifier(): string {
        return Math.random().toString(36).substring(2, 11);
    }
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
    private async cliOnMessage(client: client, message: Envelope): Promise<any> {
        if (message.command == "refreshtoken") {
            let rt: RefreshToken = RefreshToken.decode(message.data.value);
            this.client.jwt = rt.jwt;
            this.client.user = rt.user;
        } else if (message.command == "watchevent") {
            let we: WatchEvent = WatchEvent.decode(message.data.value)
            if (this.watchids[we.id]) {
                var document = we.document;
                if(typeof document === "string") document = JSON.parse(document)
                await this.watchids[we.id](we.operation, document);
            } else {
                warn("Got watchevent for unknown id " + we.id);
            }
        } else if (message.command == "queueevent") {
            let we: QueueEvent = QueueEvent.decode(message.data.value)
            var data = JSON.parse(we.data)
            delete data.spanId;
            delete data.traceId;
            const user = data.__user;
            const jwt = data.__jwt;
            delete data.__user;
            delete data.__jwt;
            we.data = JSON.stringify(data);
            if(this.queuecallbacks[we.correlationId] && (we.replyto == "" || we.replyto == null)) {
                await apiinstrumentation.With("queueevent", message.traceid, message.spanid, undefined, async (span)=> {
                    if (config.doDumpRPCTraceIds) {
                        let ctx = span?.spanContext();
                        if (ctx != null) {
                            // info("cliOnMessage: " + message.command + " traceId: " + ctx.traceId + " spanId: " + ctx.spanId);
                        }
                    }
                    await this.queuecallbacks[we.correlationId](data, user);
                    delete this.queuecallbacks[we.correlationId];
                });
            } else if (this.queues[we.queuename]) {
                try {
                    var reply2 = await this.queues[we.queuename](we, data, user, jwt);
                    if(reply2 != null && we.replyto != null && we.replyto != "") {
                        await this.QueueMessage({ correlationId: we.correlationId, queuename: we.replyto, data: reply2, striptoken: true}, false);
                    }
                } catch (error) {
                    err(error);
                }
            } else {
                warn("Got queueevent for unknown queue " + we.queuename);
            }
        } else {
            this.emit("message", message)
        }
    }
    /**
     * Used internally to send a ping message to server, to keep the connection alive.
     * Only used if server require pings, or if the client is configured to send pings using {@link config.DoPing}
     */
    async Ping(): Promise<void> {
        if(!this.connected || !this.signedin) return;
        let message = PingRequest.create();
        const data = Any.create({type_url : "type.googleapis.com/openiap.PingRequest", value: PingRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "ping", data });
        payload.priority = 0;
        const result = await protowrap.RPC(this.client, payload);
    }
    /**
     * Wrapper around JSON.stringify to allow serialiszing object with regular expressions
     * @param object Object to serialize
     * @returns 
     */
    stringify(object: any) {
        return JSON.stringify(object, (key, value) => {
            if (value == null) return value;
            const t = typeof value;
            if (value instanceof RegExp) return '__REGEXP ' + value.toString();
            else if (t === 'object') {
                if (value.constructor != null && value.constructor.name === 'RegExp') {
                    return '__REGEXP ' + value.toString();
                }
                return value;
            } else return value;
        });
    }
    /**
     * By default we use crendetials from the connection string or from jwt environment variable.
     * But you can also call Signin to login with a username and password or with a jwt token.
     * This function can also be used to validate credentials without changing the current credentials by setting 
     * {@link SigninOptions.validateonly} to true.
     * @param options {@link SigninOptions}
     * @returns 
     */    
    async Signin(options: SigninOptions): Promise<SigninResponse> {
        if(!this.connected) throw new Error("Not connected to server");
        const opt: SigninOptions = Object.assign(new SigninDefaults(), options)
        if(opt.agent == null || opt.agent == "") opt.agent = this.agent;
        if(opt.version == null || opt.version == "") opt.version = this.version;
        let message = SigninRequest.create(opt as any);
        // let message = SigninRequest.create({ agent: opt.agent, version: opt.version, username: opt.username, password: opt.password, ping: opt.ping, longtoken: opt.longtoken })
        // if (opt.jwt != null && opt.jwt != "") {
        //     message = SigninRequest.create({ jwt: opt.jwt, ping: opt.ping })
        // }
        const data = Any.create({type_url: "type.googleapis.com/openiap.SigninRequest", value: SigninRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "signin", data, jwt: opt.jwt });
        payload.priority = 2;
        const d = (await protowrap.RPC(this.client, payload))
        const result = SigninResponse.decode(d.data.value);
        if(result.user == null) {
            throw new Error("Login seem to have failed, nu user object returned");            
        }
        if(options.validateonly) {
            // info("Validated " + result.user.name);
            return result;
        }
        info("Signed in as " +result.user.name);
        this.signedin = true;
        this.client.jwt = result.jwt;
        this.client.user = result.user;
        this.emit("signedin", this, result.user)
        return result;
    }
    /**
     * Returns a list of all known collections. By default filtering out history collectins.
     * @param options {@link ListCollectionsOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns 
     */
    async ListCollections(options: ListCollectionsOptions = {}, priority: number = 2): Promise<any[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: ListCollectionsOptions = Object.assign(new ListCollectionsDefaults(), options)
        let message = ListCollectionsRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.ListCollectionsRequest", "value": ListCollectionsRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "listcollections", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = ListCollectionsResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.results);
    }
    /**
     * Drop a collection removing all data from the collection. Only users with admin rights can drop collections.
     * @param options {@link DropCollectionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    async DropCollection(options: DropCollectionOptions, priority: number = 2): Promise<void> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: DropCollectionOptions = Object.assign(new DropCollectionDefaults(), options)
        let message = DropCollectionRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.DropCollectionRequest", "value": DropCollectionRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "dropcollection", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = await protowrap.RPC(this.client, payload);
    }
    /**
     * Create a collection removing all data from the collection. Only users with admin rights can Create collections.
     * @param options {@link CreateCollectionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    async CreateCollection(options: CreateCollectionOptions, priority: number = 2): Promise<void> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: CreateCollectionOptions = Object.assign(new CreateCollectionDefaults(), options)
        let message = CreateCollectionRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.CreateCollectionRequest", "value": CreateCollectionRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "createcollection", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = await protowrap.RPC(this.client, payload);
    }
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
    async Query<T>(options: QueryOptions, priority: number = 2): Promise<T[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: QueryOptions = Object.assign(new QueryDefaults(), options)
        let message = QueryRequest.create(opt as any);
        if (typeof message.query == "object") message.query = this.stringify(message.query);
        if (typeof message.orderby == "object") message.orderby = this.stringify(message.orderby);
        if (typeof message.projection == "object") message.projection = this.stringify(message.projection);
        const data = Any.create({type_url: "type.googleapis.com/openiap.QueryRequest", "value": QueryRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "query",data });
        payload.priority = priority;
        const result = QueryResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.results);
    }
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
    async FindOne<T>(options: FindOneOptions, priority: number = 2): Promise<T> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: FindOneOptions = Object.assign(new FindOneDefaults(), options)
        let message = QueryRequest.create(opt as any);
        message.top = 1;
        if (typeof message.query == "object") message.query = this.stringify(message.query);
        if (typeof message.orderby == "object") message.orderby = this.stringify(message.orderby);
        if (typeof message.projection == "object") message.projection = this.stringify(message.projection);
        const data = Any.create({type_url: "type.googleapis.com/openiap.QueryRequest", "value": QueryRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "query",data });
        payload.priority = priority;
        const result = QueryResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if(result.results == null || result.results == "") return null;
        var array = JSON.parse(result.results);
        if(!Array.isArray(array)) return null;
        if(array.length == 0) return null;
        return array[0];
    }
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
    async GetDocumentVersion<T>(options: GetDocumentVersionOptions, priority: number = 2): Promise<T[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: GetDocumentVersionOptions = Object.assign(new GetDocumentVersionDefaults(), options)
        let message = GetDocumentVersionRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.GetDocumentVersionRequest", "value": GetDocumentVersionRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "getdocumentversion", data});
        payload.priority = priority;
        const result = GetDocumentVersionResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.result);
    }
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
    async Count(options: CountOptions, priority: number = 2): Promise<number> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: CountOptions = Object.assign(new CountDefaults(), options)
        let message = CountRequest.create(opt as any);
        if (typeof message.query == "object") message.query = this.stringify(message.query);
        const data = Any.create({type_url: "type.googleapis.com/openiap.CountRequest", "value": CountRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "count", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = CountResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.result;
    }
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
    async Aggregate<T>(options: AggregateOptions, priority: number = 2): Promise<T[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: AggregateOptions = Object.assign(new AggregateDefaults(), options)
        let message = AggregateRequest.create(opt as any);
        if (typeof message.aggregates == "object") message.aggregates = this.stringify(message.aggregates);
        const data = Any.create({type_url: "type.googleapis.com/openiap.AggregateRequest", "value": AggregateRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "aggregate", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = AggregateResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.results);
    }
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
    async InsertOne<T>(options: InsertOneOptions, priority: number = 2): Promise<T> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: InsertOneOptions = Object.assign(new InsertOneDefaults(), options)
        let message = InsertOneRequest.create(opt as any);
        if (typeof message.item == "object") message.item = JSON.stringify(message.item);
        const data = Any.create({type_url: "type.googleapis.com/openiap.InsertOneRequest", "value": InsertOneRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "insertone", data});
        payload.priority = priority;
        const result = InsertOneResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.result);
    }
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
    async InsertMany<T>(options: InsertManyOptions, priority: number = 2): Promise<T[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: InsertManyOptions = Object.assign(new InsertManyDefaults(), options)
        let message = InsertManyRequest.create(opt as any);
        if (typeof message.items == "object") message.items = JSON.stringify(message.items);
        const data = Any.create({type_url: "type.googleapis.com/openiap.InsertManyRequest", "value": InsertManyRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "insertmany", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = InsertManyResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.results);
    }
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
    async UpdateOne<T>(options: UpdateOneOptions, priority: number = 2): Promise<T> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: UpdateOneOptions = Object.assign(new UpdateOneDefaults(), options)
        let message = UpdateOneRequest.create(opt as any);
        if (typeof message.item == "object") message.item = JSON.stringify(message.item);
        const data = Any.create({type_url: "type.googleapis.com/openiap.UpdateOneRequest", "value": UpdateOneRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "updateone", data});
        payload.priority = priority;
        const result = UpdateOneResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.result);
    }
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
    async UpdateDocument(options: UpdateDocumentOptions, priority: number = 2): Promise<UpdateResult> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: UpdateDocumentOptions = Object.assign(new UpdateDocumentDefaults(), options)
        let message = UpdateDocumentRequest.create(opt as any);
        if (typeof message.document == "object") message.document = this.stringify(message.document);
        if (typeof message.query == "object") message.query = this.stringify(message.query);
        const data = Any.create({type_url: "type.googleapis.com/openiap.UpdateDocumentRequest", "value": UpdateDocumentRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "updatedocument", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = UpdateDocumentResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.opresult;
    }
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
    async InsertOrUpdateOne<T>(options: InsertOrUpdateOneOptions, priority: number = 2): Promise<T> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: InsertOrUpdateOneOptions = Object.assign(new InsertOrUpdateOneDefaults(), options)
        let message = InsertOrUpdateOneRequest.create(opt as any);
        if (typeof message.item == "object") message.item = JSON.stringify(message.item);
        const data = Any.create({type_url: "type.googleapis.com/openiap.InsertOrUpdateOneRequest", "value": InsertOrUpdateOneRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "insertorupdateone", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = InsertOrUpdateOneResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.result);
    }
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
    async InsertOrUpdateMany<T>(options: InsertOrUpdateManyOptions, priority: number = 2): Promise<T[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: InsertOrUpdateManyOptions = Object.assign(new InsertOrUpdateManyDefaults(), options)
        let message = InsertOrUpdateManyRequest.create(opt as any);
        if (typeof message.items == "object") message.items = JSON.stringify(message.items);
        const data = Any.create({type_url: "type.googleapis.com/openiap.InsertOrUpdateManyRequest", "value": InsertOrUpdateManyRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "insertorupdatemany", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = InsertOrUpdateManyResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return JSON.parse(result.results);
    }
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
    async DeleteOne(options: DeleteOneOptions, priority: number = 2): Promise<number> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: DeleteOneOptions = Object.assign(new DeleteOneDefaults(), options)
        let message = DeleteOneRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.DeleteOneRequest", "value": DeleteOneRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "deleteone", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = DeleteOneResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.affectedrows;
    }
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
    async DeleteMany(options: DeleteManyOptions, priority: number = 2): Promise<number> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: DeleteManyOptions = Object.assign(new DeleteManyDefaults(), options)
        let message = DeleteManyRequest.create(opt as any);
        if (typeof message.query == "object") message.query = this.stringify(message.query);
        const data = Any.create({type_url: "type.googleapis.com/openiap.DeleteManyRequest", "value": DeleteManyRequest.encode(message).finish()})
        const payload = Envelope.create({command: "deletemany",data });
        payload.priority = priority;
        const result = DeleteManyResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.affectedrows;
    }
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
    async Watch(options: WatchOptions, callback: (operation: string, document: any)=> void, priority: number = 2): Promise<string> {
        if (!callback) return "";
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: WatchOptions = Object.assign(new WatchDefaults(), options)
        if(opt.paths) {
            if(Array.isArray(opt.paths)) {
                for (let i = 0; i < opt.paths.length; i++) {
                    const element = opt.paths[i];
                    if(element != null && typeof element !== "string") opt.paths[i] = JSON.stringify(element);
                }
            }
        }
        let message = WatchRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.WatchRequest", "value": WatchRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "watch", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = WatchResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if (result.id && result.id != "") {
            this.watchids[result.id] = callback;
        }
        return result.id;
    }
    /**
     * Unregister a change stream ( watch ) created with {@link Watch } to stop receiving notifications from the watch.
     * @param options 
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    async UnWatch(options: UnWatchOptions, priority: number = 2): Promise<void> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: UnWatchOptions = Object.assign(new UnWatchDefaults(), options)
        delete this.watchids[opt.id];
        let message = UnWatchRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.UnWatchRequest", "value": UnWatchRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "unwatch", data });
        payload.priority = priority;
        const result = await protowrap.RPC(this.client, payload);
    }
    /**
     * Dummy function used to test the connection to the server.
     * @param xpath 
     * @returns xpath with added text
     */
    async GetElement(xpath: string) {
        var message = GetElementRequest.create({ xpath })
        const data = Any.create({type_url: "type.googleapis.com/openiap.GetElementRequest", "value": GetElementRequest.encode(message).finish()})
        var payload = Envelope.create({ command: "getelement", data });
        const result = GetElementResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.xpath;
    }
    /**
     * Download a file from OpenIAP flow database, using the file id or file name. 
     * This uses streams to download file content, and is therefore not supported using REST interface.
     * @param options 
     * @returns 
     */
    async DownloadFile(options: DownloadFileOptions): Promise<DownloadResponse> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: DownloadFileOptions = Object.assign(new DownloadFileDefaults(), options)
        return await protowrap.DownloadFile(this.client, opt.id, opt.filename, opt.folder, config.SendFileHighWaterMark);
    }
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
    async UploadFile(options: UploadFileOptions): Promise<UploadResponse> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: UploadFileOptions = Object.assign(new UploadFileDefaults(), options)
        const result:Envelope = await protowrap.UploadFile(this.client, opt.filename, opt.jwt) as any;
        var res = UploadResponse.decode(result.data.value);
        return res;
    }
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
    async RegisterQueue(options: RegisterQueueOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt:string)=> any, priority: number = 2 ): Promise<string> {
        if (!callback) return "";
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: RegisterQueueOptions = Object.assign(new RegisterQueueDefaults(), options)
        let message = RegisterQueueRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.RegisterQueueRequest", "value": RegisterQueueRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "registerqueue", data, jwt: opt.jwt });
        if(opt.queuename && opt.queuename != "") this.queues[opt.queuename] = callback;
        payload.priority = priority;
        const result = RegisterQueueResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if(this.defaltqueue == "" && (opt.queuename == ""|| opt.queuename == null)) this.defaltqueue = result.queuename;
        if (result.queuename != null && result.queuename != "" && result.queuename != opt.queuename) {
            this.queues[result.queuename] = callback;
            delete this.queues[opt.queuename];
        }
        return result.queuename;
    }
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
    async RegisterExchange(options: RegisterExchangeOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt:string)=> any, priority: number = 2): Promise<string> {
        if (!callback) return "";
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: RegisterExchangeOptions = Object.assign(new RegisterExchangeDefaults(), options)
        let message = RegisterExchangeRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.RegisterExchangeRequest", "value": RegisterExchangeRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "registerexchange", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = RegisterExchangeResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if (result.queuename && result.queuename != "" && opt.addqueue) {
            this.queues[result.queuename] = callback;
        }
        return result.queuename;
    }
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
    async UnRegisterQueue(options: UnRegisterQueueOptions, priority: number = 2): Promise<void> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: UnRegisterQueueOptions = Object.assign(new UnRegisterQueueDefaults(), options)
        let message = UnRegisterQueueRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.UnRegisterQueueRequest", "value": UnRegisterQueueRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "unregisterqueue", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = await protowrap.RPC(this.client, payload);
        if(this.defaltqueue == opt.queuename) this.defaltqueue = "";
        delete this.queues[opt.queuename];
    }
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
    async QueueMessage(options: QueueMessageOptions, rpc: boolean = false, priority: number = 2) {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        return new Promise<any>(async (resolve, reject)=> {
            try {
                const opt: QueueMessageOptions = Object.assign(new QueueMessageDefaults(), options)
                if(typeof opt.data !== 'string') opt.data = JSON.stringify(opt.data) as any;
                if(rpc) {
                    if(this.defaltqueue == "") {
                        this.defaltqueue = await this.RegisterQueue({queuename: ""}, (msg, payload, user, jwt)=>{
                            if(msg && msg.correlationId) {
                                warn("temp queue received message for unknown receiver with correlationId " + msg.correlationId)
                            } else {
                                warn("temp queue received message for unknown receiver")
                            }
                        });
                        info("Auto registered reply queue " + this.defaltqueue)
                    }
                    opt.correlationId = openiap.GetUniqueIdentifier();
                    opt.replyto = this.defaltqueue;
                    this.queuecallbacks[opt.correlationId] = (message, user)=> {
                        resolve(message);
                    };
                    // info(`Send message with correlationId ${opt.correlationId} to ${opt.queuename}`)
                }
                let message = QueueMessageRequest.create(opt as any);
                const data = Any.create({type_url: "type.googleapis.com/openiap.QueueMessageRequest", "value": QueueMessageRequest.encode(message).finish()})
                const payload = Envelope.create({ command: "queuemessage", data, jwt: opt.jwt });
                payload.priority = priority;
                const result = await protowrap.RPC(this.client, payload);
                if(!rpc) resolve(null);
            } catch (error) {
                reject(error);
            }
        });

    }
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
    async PushWorkitem(options: PushWorkitemOptions, priority: number = 2): Promise<Workitem> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: PushWorkitemOptions = Object.assign(new PushWorkitemDefaults(), options)
        if(typeof opt.payload !== 'string') opt.payload = JSON.stringify(opt.payload);
        let message = PushWorkitemRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.PushWorkitemRequest", "value": PushWorkitemRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "pushworkitem", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = PushWorkitemResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if(result && result.workitem && result.workitem.payload) {
            if(typeof result.workitem.payload == "string") {
                try {
                    result.workitem.payload = JSON.parse(result.workitem.payload)
                } catch (error) {
                }
            }
        }
        return result.workitem
    }
    /**
     * Push multiple workitems to a workqueue. Workitems can be processed by a worker after calling {@link PopWorkitem}
     * @param options 
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns an array of workitems that was pushed, including the workitem id's
     */
    async PushWorkitems(options: PushWorkitemsOptions, priority: number = 2): Promise<Workitem[]> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: PushWorkitemsOptions = Object.assign(new PushWorkitemsDefaults(), options)
        opt.items.forEach(wi => {
            if(typeof wi.payload !== 'string') wi.payload = JSON.stringify(wi.payload);
        });
        let message = PushWorkitemsRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.PushWorkitemsRequest", "value": PushWorkitemsRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "pushworkitems", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = PushWorkitemsResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if(result.workitems) {
            for(var i = 0; i < result.workitems.length; i++) {
                const wi = result.workitems[i];
                if(wi && wi.payload) {
                    if(typeof wi.payload == "string") {
                        try {
                            wi.payload = JSON.parse(wi.payload)
                        } catch (error) {
                        }
                    }
                }
        
            }
        }
        return result.workitems
    }
    /**
     * Pop an item of a workitem queue. An items aviailable in the queue will be determined by it's status, retry time and runat time steamp.
     * If multiple items are available, the items will be fatched based on each wrkitem's priority field.
     * @param options 
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns If no workitem is available, this will return null. 
     */
    async PopWorkitem(options: PopWorkitemOptions, priority: number = 2): Promise<Workitem | undefined> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: PopWorkitemOptions = Object.assign(new PopWorkitemDefaults(), options)
        let message = PopWorkitemRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.PopWorkitemRequest", "value": PopWorkitemRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "popworkitem", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = PopWorkitemResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if(result && result.workitem && result.workitem.payload) {
            if(typeof result.workitem.payload == "string") {
                try {
                    result.workitem.payload = JSON.parse(result.workitem.payload)
                } catch (error) {
                }
            }
        }
        return result.workitem
    }
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
    async UpdateWorkitem(options: UpdateWorkitemOptions, priority: number = 2): Promise<Workitem> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: UpdateWorkitemOptions = Object.assign(new UpdateWorkitemDefaults(), options)
        if(typeof opt.workitem.payload !== 'string') opt.workitem.payload = JSON.stringify(opt.workitem.payload);
        let message = UpdateWorkitemRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.UpdateWorkitemRequest", "value": UpdateWorkitemRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "updateworkitem", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = UpdateWorkitemResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        if(result && result.workitem && result.workitem.payload) {
            if(typeof result.workitem.payload == "string") {
                try {
                    result.workitem.payload = JSON.parse(result.workitem.payload)
                } catch (error) {
                }
            }
        }
        return result.workitem
    }
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
    async DeleteWorkitem(options: DeleteWorkitemOptions, priority: number = 2): Promise<void> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: DeleteWorkitemOptions = Object.assign(new DeleteWorkitemDefaults(), options)
        let message = DeleteWorkitemRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.DeleteWorkitemRequest", "value": DeleteWorkitemRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "deleteworkitem", data, jwt: opt.jwt });
        payload.priority = priority;
        await protowrap.RPC(this.client, payload);
    }
    /**
     * Run custom commands not defined in the protocol yet.
     * This is how new functioanlly is added and tested, before it is finally added to the offical proto3 protocol.
     * @param options 
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns If command has a result, this will be returned as a string. This will most likely need to be parser as JSON
     */
    async CustomCommand<T>(options: CustomCommandOptions, priority: number = 2): Promise<string> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: CustomCommandOptions = Object.assign(new CustomCommandDefaults(), options)
        if(opt.data != null && typeof opt.data !== "string") opt.data = JSON.stringify(opt.data)
        let message = CustomCommandRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.CustomCommand", "value": CustomCommandRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "customcommand", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = CustomCommandResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.result
    }
    /**
     * Old command used by nodered "Workflow in" and "assign" nodes for creating a new workflow instance.
     * @param options 
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns 
     */
    async CreateWorkflowInstance(options: CreateWorkflowInstanceOptions, priority: number = 2): Promise<string> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: CreateWorkflowInstanceOptions = Object.assign(new CreateWorkflowInstanceDefaults(), options)
        if(opt.data != null && typeof opt.data !== "string") opt.data = JSON.stringify(opt.data)
        let message = CreateWorkflowInstanceRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.CreateWorkflowInstance", "value": CreateWorkflowInstanceRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "createworkflowinstance", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = CreateWorkflowInstanceResponse.decode((await protowrap.RPC(this.client, payload)).data.value);
        return result.instanceid;
    }
    /**
     * Create a collection removing all data from the collection. Only users with admin rights can Create collections.
     * @param options {@link EnsureCustomerOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    async EnsureCustomer(options: EnsureCustomerOptions, priority: number = 2): Promise<void> {
        if(!this.connected) throw new Error("Not connected to server");
        if(!this.signedin) throw new Error("Not signed in to server");
        const opt: EnsureCustomerOptions = Object.assign(new EnsureCustomerDefaults(), options)
        let message = EnsureCustomerRequest.create(opt as any);
        const data = Any.create({type_url: "type.googleapis.com/openiap.EnsureCustomerRequest", "value": EnsureCustomerRequest.encode(message).finish()})
        const payload = Envelope.create({ command: "ensurecustomer", data, jwt: opt.jwt });
        payload.priority = priority;
        const result = await protowrap.RPC(this.client, payload);
    }
}
export type SigninOptions = {
    username?: string;
    password?: string;
    jwt?: string;
    ping?: boolean;
    validateonly?: boolean;
    agent?:string;
    version?:string;
    longtoken?:boolean;
}
class SigninDefaults {
    ping: boolean = true;
    validateonly: boolean = false;
    longtoken:boolean = false;
}
export type ListCollectionsOptions = {
    includehist?: boolean;
    jwt?: string;
}
class ListCollectionsDefaults {
    includehist: boolean = false;
}
export type DropCollectionOptions = {
    collectionname: string;
    jwt?: string;
}
class DropCollectionDefaults {
}
export type col_timeseries_granularity = "seconds" | "minutes" | "hours"; //  | "days" | "weeks" | "months" | "years";
export type col_validationLevel = "off" | "strict" | "moderate";
export type col_validationAction = "error" | "warn";
export type col_collation = {
   locale?: string,
   caseLevel?: boolean,
   caseFirst?: string,
   strength?: number,
   numericOrdering?: boolean,
   alternate?: string,
   maxVariable?: string,
   backwards?: boolean
};
export type col_timeseries = {
    timeField: string,
    metaField?: string,
    granularity?: col_timeseries_granularity,
};
export type CreateCollectionOptions = {
    jwt?: string;
    collectionname: string,
    timeseries?: col_timeseries;
  
    expireAfterSeconds?: number,
    changeStreamPreAndPostImages?: boolean,
    size?: number, // Optional. Specify a maximum size in bytes for a capped collection.
    max?: number, // Optional. The maximum number of documents allowed in the capped collection. 
    validator?: object, // Optional. Specify validation rules for documents in a collection.
    validationLevel?: col_validationLevel, // Optional. Specify how strictly MongoDB applies the validation rules to existing documents during an update.
    validationAction?: col_validationAction, // Optional. Specify whether to error on invalid documents or just warn about the violations but allow invalid documents to be inserted.
    collation?: col_collation,
    capped?: boolean,
}
class CreateCollectionDefaults {
}

export type FindOneOptions = {
    collectionname?: string;
    query?: object;
    projection?: Object;
    orderby?: Object | string;
    queryas?: string;
    jwt?: string;
}
class FindOneDefaults {
    collectionname: string = "entities";
    query: object = {};
}
export type QueryOptions = {
    collectionname?: string;
    query?: object;
    projection?: Object;
    top?: number;
    skip?: number;
    orderby?: Object | string;
    queryas?: string;
    jwt?: string;
}
class QueryDefaults {
    collectionname: string = "entities";
    query: object = {};
    top: number = 100;
    skip: number = 0;
}
export type GetDocumentVersionOptions = {
    collectionname?: string;
    id: string;
    version?: number;
    decrypt?: boolean;
    jwt?: string;
}
class GetDocumentVersionDefaults {
    collectionname: string = "entities";
    version: number = 0; // latest
    decrypt: boolean = true;
}
export type CountOptions = {
    collectionname?: string;
    query?: object;
    projection?: Object;
    orderby?: Object | string;
    queryas?: string;
    jwt?: string;
}
class CountDefaults {
    collectionname: string = "entities";
    query: object = {};
}
export type AggregateOptions = {
    collectionname?: string;
    aggregates?: object[];
    queryas?: string;
    jwt?: string;
}
class AggregateDefaults {
    collectionname: string = "entities";
    aggregates: object[] = [];
}
export type InsertOneOptions = {
    collectionname?: string;
    item: object;
    w?: number;
    j?: boolean;
    jwt?: string;
}
class InsertOneDefaults {
    collectionname: string = "entities";
}
export type InsertManyOptions = {
    collectionname?: string;
    items: object[];
    w?: number;
    j?: boolean;
    skipresults?: boolean;
    jwt?: string;
}
class InsertManyDefaults {
    collectionname: string = "entities";
}
export type UpdateOneOptions = {
    collectionname?: string;
    item: object;
    w?: number;
    j?: boolean;
    jwt?: string;
}
class UpdateOneDefaults {
    collectionname: string = "entities";
}
export type UpdateDocumentOptions = {
    collectionname?: string;
    query: object;
    document: object;
    w?: number;
    j?: boolean;
    jwt?: string;
}
class UpdateDocumentDefaults {
    collectionname: string = "entities";
}
export type InsertOrUpdateOneOptions = {
    collectionname?: string;
    item: object;
    uniqeness?: string;
    w?: number;
    j?: boolean;
    jwt?: string;
}
class InsertOrUpdateOneDefaults {
    collectionname: string = "entities";
}
export type InsertOrUpdateManyOptions = {
    collectionname?: string;
    items: object[];
    uniqeness?: string;
    w?: number;
    j?: boolean;
    skipresults?:boolean;
    jwt?: string;
}
class InsertOrUpdateManyDefaults {
    collectionname: string = "entities";
    skipresults: boolean = true;
}
export type DeleteOneOptions = {
    collectionname?: string;
    id: string;
    recursive?: boolean;
    jwt?: string;
}
class DeleteOneDefaults {
    collectionname: string = "entities";
}
export type DeleteManyOptions = {
    collectionname?: string;
    query: object;
    recursive?: boolean;
    jwt?: string;
}
class DeleteManyDefaults {
    collectionname: string = "entities";
}
export type WatchOptions = {
    collectionname?: string;
    paths: string[];
    jwt?: string;
}
class WatchDefaults {
    collectionname: string = "entities";
}
export type UnWatchOptions = {
    id: string;
}
class UnWatchDefaults {
}
export type DownloadFileOptions = {
    id?: string;
    filename?: string;
    folder?: string;
    jwt?: string;
}
class DownloadFileDefaults {
}
export type UploadFileOptions = {
    filename: string;
    jwt?: string;
}
class UploadFileDefaults {
}

export type RegisterQueueOptions = {
    queuename: string;
    jwt?: string;
}
class RegisterQueueDefaults {
}
export type RegisterExchangeOptions = {
    exchangename:string;
    algorithm?:string;
    routingkey?:string;
    addqueue?:boolean;
    jwt?: string;
}
class RegisterExchangeDefaults {
    algorithm: string = "fanout"
    routingkey:string = "";
    addqueue: boolean = true;
}
export type UnRegisterQueueOptions = {
    queuename: string;
    jwt?: string;
}
class UnRegisterQueueDefaults {
}
export type QueueMessageOptions = {
    queuename: string;
    correlationId?: string;
    replyto?: string;
    routingkey?: string;
    exchangename?: string;
    data: object;
    striptoken?: boolean;
    expiration?: number;
    jwt?: string;
  }
class QueueMessageDefaults {
    striptoken: boolean = false;
}
export type PushWorkitemOptions = {
    wiq?: string;
    wiqid?: string;
    name?: string;
    payload: any;
    nextrun?: Date;
    success_wiqid?: string;
    failed_wiqid?: string;
    success_wiq?: string;
    failed_wiq?: string;
    priority?: number;
    files?: any[];
    jwt?: string;
}
class PushWorkitemDefaults {
    priority: number = 2;
}
export type PushWorkitemsOptions = {
    wiq?: string;
    wiqid?: string;
    nextrun?: Date;
    success_wiqid?: string;
    failed_wiqid?: string;
    success_wiq?: string;
    failed_wiq?: string;
    priority?: number;
    items: Workitem[];
    jwt?: string;
}
class PushWorkitemsDefaults {
    priority: number = 2;
}
export type PopWorkitemOptions = {
    wiq?: string;
    wiqid?: string;
    includefiles?: boolean;
    compressed?: boolean;
    jwt?: string;
}
class PopWorkitemDefaults {
    includefiles: boolean = true;
    compressed: boolean = true;
}
export type UpdateWorkitemOptions = {
    /**
     * Workitem to update
     */
    workitem: Workitem;
    /**
     * If workitem has reached the max number of retryes and this is set to true, the workitem will be updated it to retry anyway
     */
    ignoremaxretries?: boolean;
    /**
     * Override who the request should run as, using a customer jwt
     */
    jwt?: string;
  }
class UpdateWorkitemDefaults {
    ignoremaxretries: boolean = false;
}
export type DeleteWorkitemOptions = {
    _id: string;
    jwt?: string;
  }
class DeleteWorkitemDefaults {
}
export type CustomCommandOptions = {
    command: string;
    id?: string;
    name?: string;
    data?: string;
    jwt?: string;
  }
class CustomCommandDefaults {
}
export type CreateWorkflowInstanceOptions = {
    targetid: string;
    workflowid: string;
    name: string;
    resultqueue: string;
    data: any;
    initialrun: boolean;
    jwt?: string;
  }
class CreateWorkflowInstanceDefaults {
    initialrun: boolean = false;
}

export type EnsureCustomerOptions = {
    customer: Customer;
    stripe?: StripeCustomer;
    ensureas?: string;
    jwt?: string;
}
class EnsureCustomerDefaults {
}

