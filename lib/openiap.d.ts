/// <reference types="node" />
import { client, clientAgent } from "./client";
import { EventEmitter } from "events";
import { Customer, DownloadResponse, EnsureCustomerResponse, SigninResponse, UploadResponse, User } from "./proto/base";
import { QueueEvent, UpdateResult, WorkItemQueue, Workitem } from ".";
import { StripeCustomer } from "./proto/stripe";
/**
 * OpenIAP
 */
export declare class openiap extends EventEmitter {
    /**
     * The internal client object
     */
    client: client;
    private loginresolve;
    private loginreject;
    private reconnectms;
    private pingerhandle;
    private queuecallbacks;
    private watchids;
    private queues;
    private defaltqueue;
    flowconfig: any;
    /**
     * Define client type when authenticating toward the server
     */
    agent: clientAgent;
    /**
     * If false, the client will never give up trying to connect to the server, if true, will give up after 17 seconds
     */
    allowconnectgiveup: boolean;
    /**
     * Define the version of the client sent to the server
     */
    version: string;
    /**
     * Define if connected to server
     */
    connected: boolean;
    /**
     * Define if we are trying to (re)connect
     */
    connecting: boolean;
    /**
     * If connected, are we also signed in or is server waiting on use to authenticate
     */
    signedin: boolean;
    /**
     * The URL used when connecting to the server
     */
    url: string;
    /**
     * The JWT used when authenticating to the server
     */
    jwt: string;
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
    constructor(url?: string, jwt?: string);
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
    connect(first?: boolean): Promise<User>;
    __server_pinger(): void;
    /**
     * Close connection to server. Use this to ensure the client will not reconnect to the server
     */
    Close(): void;
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
    onConnected(client: openiap): Promise<void>;
    private cliOnConnected;
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
    onDisconnected(client: openiap, error: Error): void;
    onConnectGaveUp(client: openiap): void;
    private cliOnDisconnected;
    /**
     * Used to generate a unique identifier, used for example when creating new packages.
     * @returns A unique identifier
     */
    static GetUniqueIdentifier(): string;
    /**
     * Override this function to get notified when the client receives a message from the server.
     * This will only be called for messages that are not handled by the client it self.
     * Using EventMitter is also possible .on("message", (client, command, message) => {})
     * @param client Return client instance that received the message
     * @param command The command of the message that was received
     * @param message The message that was received
     */
    private cliOnMessage;
    /**
     * Used internally to send a ping message to server, to keep the connection alive.
     * Only used if server require pings, or if the client is configured to send pings using {@link config.DoPing}
     */
    Ping(): Promise<void>;
    /**
     * Wrapper around JSON.stringify to allow serialiszing object with regular expressions
     * @param object Object to serialize
     * @returns
     */
    stringify(object: any): string;
    /**
     * By default we use crendetials from the connection string or from jwt environment variable.
     * But you can also call Signin to login with a username and password or with a jwt token.
     * This function can also be used to validate credentials without changing the current credentials by setting
     * {@link SigninOptions.validateonly} to true.
     * @param options {@link SigninOptions}
     * @returns
     */
    Signin(options: SigninOptions): Promise<SigninResponse>;
    /**
     * Returns a list of all known collections. By default filtering out history collectins.
     * @param options {@link ListCollectionsOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns
     */
    ListCollections(options?: ListCollectionsOptions, priority?: number): Promise<any[]>;
    /**
     * Drop a collection removing all data from the collection. Only users with admin rights can drop collections.
     * @param options {@link DropCollectionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    DropCollection(options: DropCollectionOptions, priority?: number): Promise<void>;
    /**
     * Create a collection removing all data from the collection. Only users with admin rights can Create collections.
     * @param options {@link CreateCollectionOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    CreateCollection(options: CreateCollectionOptions, priority?: number): Promise<void>;
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
    Query<T>(options: QueryOptions, priority?: number): Promise<T[]>;
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
    FindOne<T>(options: FindOneOptions, priority?: number): Promise<T>;
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
    GetDocumentVersion<T>(options: GetDocumentVersionOptions, priority?: number): Promise<T[]>;
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
    Count(options: CountOptions, priority?: number): Promise<number>;
    /**
 * Finds the distinct values for a specified field across a single collection
 * @param options {@link DistinctOptions}
 * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
 * @returns returns the results in an array
 * @example
 * Get the distinct name of all documents with type "test"
 * ```typescript
 * const result = await client.Distinct({ collectionname: "entities", field: "name", query: { "_type": "test" } });
 * ```
 * @example
 * Get the distinct types in the entities collection
 * ```typescript
 * const result = await client.Distinct({ collectionname: "entities", field: "_type" });
 * ```
 */
    Distinct(options: DistinctOptions, priority?: number): Promise<string[]>;
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
    Aggregate<T>(options: AggregateOptions, priority?: number): Promise<T[]>;
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
    InsertOne<T>(options: InsertOneOptions, priority?: number): Promise<T>;
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
    InsertMany<T>(options: InsertManyOptions, priority?: number): Promise<T[]>;
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
    UpdateOne<T>(options: UpdateOneOptions, priority?: number): Promise<T>;
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
    UpdateDocument(options: UpdateDocumentOptions, priority?: number): Promise<UpdateResult>;
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
    InsertOrUpdateOne<T>(options: InsertOrUpdateOneOptions, priority?: number): Promise<T>;
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
    InsertOrUpdateMany<T>(options: InsertOrUpdateManyOptions, priority?: number): Promise<T[]>;
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
    DeleteOne(options: DeleteOneOptions, priority?: number): Promise<number>;
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
    DeleteMany(options: DeleteManyOptions, priority?: number): Promise<number>;
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
    Watch(options: WatchOptions, callback: (operation: string, document: any) => void, priority?: number): Promise<string>;
    /**
     * Unregister a change stream ( watch ) created with {@link Watch } to stop receiving notifications from the watch.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    UnWatch(options: UnWatchOptions, priority?: number): Promise<void>;
    /**
     * Dummy function used to test the connection to the server.
     * @param xpath
     * @returns xpath with added text
     */
    GetElement(xpath: string): Promise<string>;
    /**
     * Download a file from OpenIAP flow database, using the file id or file name.
     * This uses streams to download file content, and is therefore not supported using REST interface.
     * @param options
     * @returns
     */
    DownloadFile(options: DownloadFileOptions): Promise<DownloadResponse>;
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
    UploadFile(options: UploadFileOptions): Promise<UploadResponse>;
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
    RegisterQueue(options: RegisterQueueOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt: string) => any, priority?: number): Promise<string>;
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
    RegisterExchange(options: RegisterExchangeOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt: string) => any, priority?: number): Promise<string>;
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
    UnRegisterQueue(options: UnRegisterQueueOptions, priority?: number): Promise<void>;
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
    QueueMessage(options: QueueMessageOptions, rpc?: boolean, priority?: number): Promise<any>;
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
    PushWorkitem(options: PushWorkitemOptions, priority?: number): Promise<Workitem>;
    /**
     * Push multiple workitems to a workqueue. Workitems can be processed by a worker after calling {@link PopWorkitem}
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns an array of workitems that was pushed, including the workitem id's
     */
    PushWorkitems(options: PushWorkitemsOptions, priority?: number): Promise<Workitem[]>;
    /**
     * Pop an item of a workitem queue. An items aviailable in the queue will be determined by it's status, retry time and runat time steamp.
     * If multiple items are available, the items will be fatched based on each wrkitem's priority field.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns If no workitem is available, this will return null.
     */
    PopWorkitem(options: PopWorkitemOptions, priority?: number): Promise<Workitem | undefined>;
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
    UpdateWorkitem(options: UpdateWorkitemOptions, priority?: number): Promise<Workitem>;
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
    DeleteWorkitem(options: DeleteWorkitemOptions, priority?: number): Promise<void>;
    /**
    * Create a new workitem queue. Workitem queues are registered in the wiq collection.
    * @param options {@link AddWorkItemQueueOptions}
    * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
    */
    AddWorkItemQueue(options: AddWorkItemQueueOptions, priority?: number): Promise<WorkItemQueue>;
    /**
    * Create a new workitem queue. Workitem queues are registered in the wiq collection. To delete all items from qyueue, set purge to true.
    * @param options {@link UpdateWorkItemQueueOptions}
    * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
    */
    UpdateWorkItemQueue(options: UpdateWorkItemQueueOptions, priority?: number): Promise<WorkItemQueue>;
    /**
    * Delete a workitem queue. Workitem queues are registered in the wiq collection. If queue has workitems in it, the request will fail, unless purge is set to true.
    * @param options {@link DeleteWorkItemQueueOptions}
    * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
    */
    DeleteWorkItemQueue(options: DeleteWorkItemQueueOptions, priority?: number): Promise<void>;
    /**
     * Run custom commands not defined in the protocol yet.
     * This is how new functioanlly is added and tested, before it is finally added to the offical proto3 protocol.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns If command has a result, this will be returned as a string. This will most likely need to be parser as JSON
     */
    CustomCommand<T>(options: CustomCommandOptions, priority?: number): Promise<string>;
    /**
     * Old command used by nodered "Workflow in" and "assign" nodes for creating a new workflow instance.
     * @param options
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns
     */
    CreateWorkflowInstance(options: CreateWorkflowInstanceOptions, priority?: number): Promise<string>;
    /**
     * Create a collection removing all data from the collection. Only users with admin rights can Create collections.
     * @param options {@link EnsureCustomerOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     */
    EnsureCustomer(options: EnsureCustomerOptions, priority?: number): Promise<EnsureCustomerResponse>;
    /**
     * Invoke an OpenRPA workflow on a robot or a role with multiple robots in.
     * At writing, this command is only supprted using OpenAPI endpoint
     * @param options {@link InvokeOpenRPAOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns null if rpc is false, else the result of the workflow if workflow has any inout/out parameters
     */
    InvokeOpenRPA<T>(options: InvokeOpenRPAOptions, priority?: number): Promise<T>;
    /**
     * Start an agent inside Docker or Kubernetes
     * Requires invoke permission on agent
     * @param options {@link StartAgentOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns void
    */
    StartAgent(options: StartAgentOptions, priority?: number): Promise<void>;
    /**
     * Stop an agent running inside Docker or Kubernetes
     * Requires invoke permission on agent
     * @param options {@link StopAgentOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns void
    */
    StopAgent(options: StopAgentOptions, priority?: number): Promise<void>;
    /**
     * Return the console output of an running agent, can be in docker, kubernetes or running remote.
     * Requires invoke permission on agent
     * @param options {@link GetAgentLogOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Return pods console output
    */
    GetAgentLog(options: GetAgentLogOptions, priority?: number): Promise<string>;
    /**
     * Return a list of pods for an running agent. Docker and Kubernetes only.
     * Requires invoke permission on agent
     * @param options {@link GetAgentPodsOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Array of pods
    */
    GetAgentPods(options: GetAgentPodsOptions, priority?: number): Promise<any[]>;
    /**
     * Remove an agent pod, found with GetAgentPods. Docker and Kubernetes only.
     * Requires invoke permission on agent
     * @param options {@link DeleteAgentPodOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns void
    */
    DeleteAgentPod(options: DeleteAgentPodOptions, priority?: number): Promise<void>;
    /**
     * Remove an agent if running. Docker and Kubernetes only.
     * Removes instance on docker, remove deployment, ingress and other resources on Kubernetes
     * Requires delete permission on agent
     * @param options {@link DeleteAgentOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns void
    */
    DeleteAgent(options: DeleteAgentOptions, priority?: number): Promise<void>;
    GetIndexes(options: GetIndexesOptions, priority?: number): Promise<any[]>;
    /**
     * Return the console output of an running agent, can be in docker, kubernetes or running remote.
     * Requires invoke permission on agent
     * @param options {@link CreateIndexOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns Returns the index name
    */
    CreateIndex(options: CreateIndexOptions, priority?: number): Promise<string>;
    /**
     * Drop a MongoDB index from a collection.
     * Requires admins permission
     * @param options {@link DropIndexOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns void
    */
    DropIndex(options: DropIndexOptions, priority?: number): Promise<void>;
    /**
     * Delete an agent Package.
     * Removes the associated file and then delete te package from the agents collection.
     * Requires delete permission on the Package
     * @param options {@link DeletePackageOptions}
     * @param priority Message priority, the higher the number the higher the priority. Default is 2, 3 or higher requeires updates to server configuration
     * @returns void
    */
    DeletePackage(options: DeletePackageOptions, priority?: number): Promise<void>;
}
export type SigninOptions = {
    username?: string;
    password?: string;
    jwt?: string;
    ping?: boolean;
    validateonly?: boolean;
    agent?: string;
    version?: string;
    longtoken?: boolean;
};
export type ListCollectionsOptions = {
    includehist?: boolean;
    jwt?: string;
};
export type DropCollectionOptions = {
    collectionname: string;
    jwt?: string;
};
export type col_timeseries_granularity = "seconds" | "minutes" | "hours";
export type col_validationLevel = "off" | "strict" | "moderate";
export type col_validationAction = "error" | "warn";
export type col_collation = {
    locale?: string;
    caseLevel?: boolean;
    caseFirst?: string;
    strength?: number;
    numericOrdering?: boolean;
    alternate?: string;
    maxVariable?: string;
    backwards?: boolean;
};
export type col_timeseries = {
    timeField: string;
    metaField?: string;
    granularity?: col_timeseries_granularity;
};
export type CreateCollectionOptions = {
    jwt?: string;
    collectionname: string;
    timeseries?: col_timeseries;
    expireAfterSeconds?: number;
    changeStreamPreAndPostImages?: boolean;
    size?: number;
    max?: number;
    validator?: object;
    validationLevel?: col_validationLevel;
    validationAction?: col_validationAction;
    collation?: col_collation;
    capped?: boolean;
};
export type FindOneOptions = {
    collectionname?: string;
    query?: object;
    projection?: Object;
    orderby?: Object | string;
    queryas?: string;
    jwt?: string;
};
export type QueryOptions = {
    collectionname?: string;
    query?: object;
    projection?: Object;
    top?: number;
    skip?: number;
    orderby?: Object | string;
    queryas?: string;
    jwt?: string;
};
export type GetDocumentVersionOptions = {
    collectionname?: string;
    id: string;
    version?: number;
    decrypt?: boolean;
    jwt?: string;
};
export type CountOptions = {
    collectionname?: string;
    query?: object;
    projection?: Object;
    orderby?: Object | string;
    queryas?: string;
    jwt?: string;
};
export type DistinctOptions = {
    collectionname?: string;
    field: string;
    query?: object;
    queryas?: string;
    options?: object;
    jwt?: string;
};
export type AggregateOptions = {
    collectionname?: string;
    aggregates?: object[];
    queryas?: string;
    jwt?: string;
};
export type InsertOneOptions = {
    collectionname?: string;
    item: object;
    w?: number;
    j?: boolean;
    jwt?: string;
};
export type InsertManyOptions = {
    collectionname?: string;
    items: object[];
    w?: number;
    j?: boolean;
    skipresults?: boolean;
    jwt?: string;
};
export type UpdateOneOptions = {
    collectionname?: string;
    item: object;
    w?: number;
    j?: boolean;
    jwt?: string;
};
export type UpdateDocumentOptions = {
    collectionname?: string;
    query: object;
    document: object;
    w?: number;
    j?: boolean;
    jwt?: string;
};
export type InsertOrUpdateOneOptions = {
    collectionname?: string;
    item: object;
    uniqeness?: string;
    w?: number;
    j?: boolean;
    jwt?: string;
};
export type InsertOrUpdateManyOptions = {
    collectionname?: string;
    items: object[];
    uniqeness?: string;
    w?: number;
    j?: boolean;
    skipresults?: boolean;
    jwt?: string;
};
export type DeleteOneOptions = {
    collectionname?: string;
    id: string;
    recursive?: boolean;
    jwt?: string;
};
export type DeleteManyOptions = {
    collectionname?: string;
    query: object;
    recursive?: boolean;
    jwt?: string;
};
export type WatchOptions = {
    collectionname?: string;
    paths: string[];
    jwt?: string;
};
export type UnWatchOptions = {
    id: string;
};
export type DownloadFileOptions = {
    id?: string;
    filename?: string;
    folder?: string;
    jwt?: string;
};
export type UploadFileOptions = {
    filename: string;
    jwt?: string;
};
export type RegisterQueueOptions = {
    queuename: string;
    jwt?: string;
};
export type RegisterExchangeOptions = {
    exchangename: string;
    algorithm?: string;
    routingkey?: string;
    addqueue?: boolean;
    jwt?: string;
};
export type UnRegisterQueueOptions = {
    queuename: string;
    jwt?: string;
};
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
};
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
};
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
};
export type PopWorkitemOptions = {
    wiq?: string;
    wiqid?: string;
    includefiles?: boolean;
    compressed?: boolean;
    jwt?: string;
};
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
};
export type DeleteWorkitemOptions = {
    _id: string;
    jwt?: string;
};
export type CustomCommandOptions = {
    command: string;
    id?: string;
    name?: string;
    data?: string;
    jwt?: string;
};
export type CreateWorkflowInstanceOptions = {
    targetid: string;
    workflowid: string;
    name: string;
    resultqueue: string;
    data: any;
    initialrun: boolean;
    jwt?: string;
};
export type EnsureCustomerOptions = {
    customer: Customer;
    stripe?: StripeCustomer;
    ensureas?: string;
    jwt?: string;
};
export type AddWorkItemQueueOptions = {
    workitemqueue: WorkItemQueue;
    skiprole?: boolean;
    jwt?: string;
};
export type UpdateWorkItemQueueOptions = {
    workitemqueue: WorkItemQueue;
    skiprole?: boolean;
    purge?: boolean;
    jwt?: string;
};
export type DeleteWorkItemQueueOptions = {
    wiq?: string;
    wiqid?: string;
    jwt?: string;
};
export type InvokeOpenRPAOptions = {
    robotid: string;
    workflowid: string;
    rpc?: boolean;
    payload?: object;
    jwt?: string;
};
export type StartAgentOptions = {
    agentid: string;
    jwt?: string;
};
export type StopAgentOptions = {
    agentid: string;
    jwt?: string;
};
export type GetAgentLogOptions = {
    agentid: string;
    podname: string;
    jwt?: string;
};
export type GetAgentPodsOptions = {
    agentid?: string;
    stats?: boolean;
    jwt?: string;
};
export type DeleteAgentPodOptions = {
    agentid: string;
    podname: string;
    jwt?: string;
};
export type DeleteAgentOptions = {
    agentid: string;
    jwt?: string;
};
export type CreateIndexOptions = {
    collectionname: string;
    index: object;
    options?: object;
    name?: string;
    jwt?: string;
};
export type DropIndexOptions = {
    collectionname: string;
    name: string;
    jwt?: string;
};
export type DeletePackageOptions = {
    packageid: string;
    jwt?: string;
};
export type GetIndexesOptions = {
    collectionname: string;
    jwt?: string;
};
