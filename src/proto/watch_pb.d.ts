// package: openiap
// file: watch.proto

import * as jspb from "google-protobuf";

export class WatchRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  clearPathsList(): void;
  getPathsList(): Array<string>;
  setPathsList(value: Array<string>): void;
  addPaths(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WatchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WatchRequest): WatchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WatchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WatchRequest;
  static deserializeBinaryFromReader(message: WatchRequest, reader: jspb.BinaryReader): WatchRequest;
}

export namespace WatchRequest {
  export type AsObject = {
    collectionname: string,
    pathsList: Array<string>,
  }
}

export class WatchResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WatchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WatchResponse): WatchResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WatchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WatchResponse;
  static deserializeBinaryFromReader(message: WatchResponse, reader: jspb.BinaryReader): WatchResponse;
}

export namespace WatchResponse {
  export type AsObject = {
    id: string,
  }
}

export class WatchEvent extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getOperation(): string;
  setOperation(value: string): void;

  getDocument(): string;
  setDocument(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WatchEvent.AsObject;
  static toObject(includeInstance: boolean, msg: WatchEvent): WatchEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WatchEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WatchEvent;
  static deserializeBinaryFromReader(message: WatchEvent, reader: jspb.BinaryReader): WatchEvent;
}

export namespace WatchEvent {
  export type AsObject = {
    id: string,
    operation: string,
    document: string,
  }
}

export class UnWatchRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnWatchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnWatchRequest): UnWatchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnWatchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnWatchRequest;
  static deserializeBinaryFromReader(message: UnWatchRequest, reader: jspb.BinaryReader): UnWatchRequest;
}

export namespace UnWatchRequest {
  export type AsObject = {
    id: string,
  }
}

export class UnWatchResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnWatchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnWatchResponse): UnWatchResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnWatchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnWatchResponse;
  static deserializeBinaryFromReader(message: UnWatchResponse, reader: jspb.BinaryReader): UnWatchResponse;
}

export namespace UnWatchResponse {
  export type AsObject = {
  }
}

