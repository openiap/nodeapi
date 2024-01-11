import * as grpc from "@grpc/grpc-js";
import { client, clientType, iclient } from "./client";
import { Envelope, DownloadResponse, UploadResponse } from "./proto/base";
export declare class protowrap {
    static grpc_server_options: grpc.ChannelOptions;
    static defaultprotocol: clientType;
    static openiap_proto: grpc.GrpcObject | grpc.ServiceClientConstructor | grpc.ProtobufTypeDefinition;
    static protoRoot: any;
    static init(): Promise<void>;
    static CommandToProto(command: string): string;
    static pack(command: any, payload: any): {
        type_url: string;
        value: any;
    };
    static unpack(message: any): any[];
    static RPC(client: client, payload: any): Promise<Envelope>;
    static _RPC(client: client, payload: any): [string, Promise<any>];
    static SetStream(client: client, stream: any, rid: string): any;
    static CreateStream(client: client, stream: any, payload: any): Promise<unknown>;
    static DownloadFile(client: client, id: string, filename: string, folder: string, highWaterMark: number | undefined): Promise<DownloadResponse>;
    static sendFileContent(client: client, rid: any, filename: any, highWaterMark: any): Promise<unknown>;
    static UploadFile(client: client, filename: string, jwt: string): Promise<UploadResponse>;
    static ReceiveFileContent(client: client, rid: string, filename: string, highWaterMark: number): Promise<unknown>;
    static IsPendingReply(client: client, payload: Envelope): any;
    static get(url: any): Promise<unknown>;
    static post(jwt: any, agent: any, url: any, body: any): Promise<unknown>;
    static sendMesssag(client: client, payload: any, id: string, dumpmsg: boolean): number;
    static ClientCleanup(client: client, onClientDisconnected: any, error: Error | string | undefined): void;
    static connect(apiurl: string, clientConstructor?: new () => iclient): client;
    static serve(protocol: clientType, onClientConnected: any, port: any, path: any, wss: any, app: any, http: any, clientConstructor?: new () => iclient): {
        protocol: clientType;
        port: any;
        id: string;
        connected: boolean;
        connecting: boolean;
        client: any;
        ws: any;
        pending: {};
        app: any;
        http: any;
        wss: any;
    };
    static getFileChecksum(filePath: any): Promise<string>;
    static getChecksum(buffer: any): string;
}
export declare class ServerError extends Error {
    constructor(message: any, stack: any);
}
