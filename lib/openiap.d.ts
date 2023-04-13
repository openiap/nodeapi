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
     *
     * @param first Should be left out or used as true. Is used internally for controlling retry logic
     * @returns Returns the {@link User} object if login was successful, otherwise throws an error
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
    stringify(object: any): string;
    Signin(options: SigninOptions): Promise<SigninResponse>;
    ListCollections(options?: ListCollectionsOptions): Promise<any[]>;
    DropCollection(options: DropCollectionOptions): Promise<void>;
    Query<T>(options: QueryOptions): Promise<T[]>;
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
     * @param options
     * @param callback
     * @returns
     * @example
     * const watchid = await db.Watch({ collection: "users", paths: ["name", "age"] }, (operation, document) => {
     *     console.log(operation, document);
     * });
     *
     */
    Watch(options: WatchOptions, callback: (operation: string, document: any) => void): Promise<string>;
    UnWatch(options: UnWatchOptions): Promise<void>;
    GetElement(xpath: string): Promise<string>;
    DownloadFile(options: DownloadFileOptions): Promise<DownloadResponse>;
    UploadFile(options: UploadFileOptions): Promise<UploadResponse>;
    queues: any;
    defaltqueue: string;
    RegisterQueue(options: RegisterQueueOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt: string) => any): Promise<string>;
    RegisterExchange(options: RegisterExchangeOptions, callback: (msg: QueueEvent, payload: any, user: any, jwt: string) => any): Promise<string>;
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
    includefiles: boolean;
    compressed: boolean;
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
