/// <reference types="node" />
import { client, clientAgent } from "./client";
import { EventEmitter } from "events";
import { DownloadResponse, SigninResponse, UploadResponse, User } from "./proto/base";
import { QueueEvent, UpdateResult, Workitem } from ".";
/**
 * OpenIAP
 */
export declare class openiap extends EventEmitter {
    url: string;
    jwt: string;
    client: client;
    agent: clientAgent;
    version: string;
    connected: boolean;
    connecting: boolean;
    signedin: boolean;
    reconnectms: number;
    pingerhandle: any;
    /**
     * @param url By default we read from environment variable apiurl, grpcapiurl or wscapiurl but can be overriden here
     * @param jwt By default we read from environment variable jwt but can be overriden here
     */
    constructor(url?: string, jwt?: string);
    loginresolve: any;
    loginreject: any;
    allowconnectgiveup: boolean;
    /**
     * @param first Should be left out or used as true. Is used internally for controlling retry logic
     * @returns Returns the {@link User} object if login was successful, otherwise throws an error
     * @example
     * ```typescript
     * var client = new openiap();
     * client.connect().then((user) => {
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
     * Using EventMitter is also possible .on("connected", (client) => {})
     * @param client
     */
    onConnected(client: openiap): Promise<void>;
    private cliOnConnected;
    /**
     * Override this function to add logic executed when the client has disconnected from the server.
     * Using EventMitter is also possible .on("disconnected", (client, error) => {})
     * @param client Return client instance that disconnected
     * @param error If the disconnect was caused by an error, this will contain the error object
     */
    onDisconnected(client: openiap, error: Error): void;
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
    onMessage(client: openiap, command: string, message: any): Promise<any>;
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
     * @param options
     * @returns
     */
    Signin(options: SigninOptions): Promise<SigninResponse>;
    /**
     * Returns a list of all known collections. By default filtering out history collectins.
     * @param options
     * @returns
     */
    ListCollections(options?: ListCollectionsOptions): Promise<any[]>;
    /**
     * Drop a collection removing all data from the collection. Only users with admin rights can drop collections.
     * @param options
     */
    DropCollection(options: DropCollectionOptions): Promise<void>;
    /**
     * Query a collection for data
     * @param options
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
    Query<T>(options: QueryOptions): Promise<T[]>;
    /**
     * Query a collection for data and return the first document
     * @param options
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
    FindOne<T>(options: FindOneOptions): Promise<T>;
    GetDocumentVersion<T>(options: GetDocumentVersionOptions): Promise<T[]>;
    Count(options: CountOptions): Promise<number>;
    Aggregate<T>(options: AggregateOptions): Promise<T[]>;
    InsertOne<T>(options: InsertOneOptions): Promise<T>;
    InsertMany<T>(options: InsertManyOptions): Promise<T[]>;
    UpdateOne<T>(options: UpdateOneOptions): Promise<T>;
    UpdateDocument(options: UpdateDocumentOptions): Promise<UpdateResult>;
    InsertOrUpdateOne<T>(options: InsertOrUpdateOneOptions): Promise<T>;
    InsertOrUpdateMany<T>(options: InsertOrUpdateManyOptions): Promise<T[]>;
    DeleteOne(options: DeleteOneOptions): Promise<number>;
    DeleteMany(options: DeleteManyOptions): Promise<number>;
    watchids: any;
    /**
     * Register a change stream ( watch ) on a collection. Use paths to narrow the scope of the watch.
     * This uses streams to notify client about changes, and is therefore not supported using REST interface.
     * @param options
     * @param callback
     * @returns server id assigned to the watch. Used with {@link UnWatch} to stop receiving notifications from the watch.
     * @example
     * const watchid = await db.Watch({ collectionname: "entities", paths: ["$.[?(@._type == 'test')]"] }, (operation, document) => {
     *     console.log(operation, document);
     * });
     *
     */
    Watch(options: WatchOptions, callback: (operation: string, document: any) => void): Promise<string>;
    /**
     * Unregister a change stream ( watch ) created with {@link Watch } to stop receiving notifications from the watch.
     * @param options
     */
    UnWatch(options: UnWatchOptions): Promise<void>;
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
     * @returns
     */
    UploadFile(options: UploadFileOptions): Promise<UploadResponse>;
    queues: any;
    defaltqueue: string;
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
     * const queuename = await db.RegisterQueue({ queuename: "myqueue" }, (msg, payload, user, jwt) => {
     *   console.log(JSON.stringify(payload, null, 2));
     *   if(payload == null) payload = {}
     *   payload.result = true
     *   // If returning a onject, it will be sent back to the sender of the message, if caller requested a response using rpc = true.
     *   return payload;
     * });
     * console.log("registered queue " + queuename);
     * ```
     */
    RegisterQueue(options: RegisterQueueOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt: string) => any): Promise<string>;
    /**
     * Register an exchange and a message queue and consume it. Exchange's are registered in the mq collection.
     * This uses streams to notify client about messages, and is therefore not supported using REST interface.
     * @param options
     * @param callback
     * @returns Returns the queue name, used to consume the exchange. Use this when unregistering the exchange with {@link UnRegisterQueue }
     */
    RegisterExchange(options: RegisterExchangeOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt: string) => any): Promise<string>;
    /**
     * Tell server to close queue and stop receving message from the queue ( or queue consuming an exchange )
     * @param options
     */
    UnRegisterQueue(options: UnRegisterQueueOptions): Promise<void>;
    queuecallbacks: any;
    QueueMessage(options: QueueMessageOptions, rpc?: boolean): Promise<any>;
    PushWorkitem(options: PushWorkitemOptions): Promise<Workitem>;
    PushWorkitems(options: PushWorkitemsOptions): Promise<Workitem[]>;
    PopWorkitem(options: PopWorkitemOptions): Promise<Workitem | undefined>;
    UpdateWorkitem(options: UpdateWorkitemOptions): Promise<Workitem>;
    DeleteWorkitem(options: DeleteWorkitemOptions): Promise<void>;
    CustomCommand<T>(options: CustomCommandOptions): Promise<string>;
    CreateWorkflowInstance(options: CreateWorkflowInstanceOptions): Promise<string>;
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
    workitem: Workitem;
    ignoremaxretries?: boolean;
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
