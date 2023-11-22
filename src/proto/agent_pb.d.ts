// package: openiap
// file: agent.proto

import * as jspb from "google-protobuf";

export class StartAgentRequest extends jspb.Message {
  getAgentid(): string;
  setAgentid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartAgentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartAgentRequest): StartAgentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartAgentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartAgentRequest;
  static deserializeBinaryFromReader(message: StartAgentRequest, reader: jspb.BinaryReader): StartAgentRequest;
}

export namespace StartAgentRequest {
  export type AsObject = {
    agentid: string,
  }
}

export class StartAgentResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartAgentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartAgentResponse): StartAgentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartAgentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartAgentResponse;
  static deserializeBinaryFromReader(message: StartAgentResponse, reader: jspb.BinaryReader): StartAgentResponse;
}

export namespace StartAgentResponse {
  export type AsObject = {
  }
}

export class StopAgentRequest extends jspb.Message {
  getAgentid(): string;
  setAgentid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopAgentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopAgentRequest): StopAgentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopAgentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopAgentRequest;
  static deserializeBinaryFromReader(message: StopAgentRequest, reader: jspb.BinaryReader): StopAgentRequest;
}

export namespace StopAgentRequest {
  export type AsObject = {
    agentid: string,
  }
}

export class StopAgentResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopAgentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StopAgentResponse): StopAgentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopAgentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopAgentResponse;
  static deserializeBinaryFromReader(message: StopAgentResponse, reader: jspb.BinaryReader): StopAgentResponse;
}

export namespace StopAgentResponse {
  export type AsObject = {
  }
}

export class GetAgentLogRequest extends jspb.Message {
  getAgentid(): string;
  setAgentid(value: string): void;

  getPodname(): string;
  setPodname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAgentLogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAgentLogRequest): GetAgentLogRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAgentLogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAgentLogRequest;
  static deserializeBinaryFromReader(message: GetAgentLogRequest, reader: jspb.BinaryReader): GetAgentLogRequest;
}

export namespace GetAgentLogRequest {
  export type AsObject = {
    agentid: string,
    podname: string,
  }
}

export class GetAgentLogResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAgentLogResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAgentLogResponse): GetAgentLogResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAgentLogResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAgentLogResponse;
  static deserializeBinaryFromReader(message: GetAgentLogResponse, reader: jspb.BinaryReader): GetAgentLogResponse;
}

export namespace GetAgentLogResponse {
  export type AsObject = {
    result: string,
  }
}

export class GetAgentPodsRequest extends jspb.Message {
  getAgentid(): string;
  setAgentid(value: string): void;

  getStats(): boolean;
  setStats(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAgentPodsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAgentPodsRequest): GetAgentPodsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAgentPodsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAgentPodsRequest;
  static deserializeBinaryFromReader(message: GetAgentPodsRequest, reader: jspb.BinaryReader): GetAgentPodsRequest;
}

export namespace GetAgentPodsRequest {
  export type AsObject = {
    agentid: string,
    stats: boolean,
  }
}

export class GetAgentPodsResponse extends jspb.Message {
  getResults(): string;
  setResults(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAgentPodsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAgentPodsResponse): GetAgentPodsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAgentPodsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAgentPodsResponse;
  static deserializeBinaryFromReader(message: GetAgentPodsResponse, reader: jspb.BinaryReader): GetAgentPodsResponse;
}

export namespace GetAgentPodsResponse {
  export type AsObject = {
    results: string,
  }
}

export class DeleteAgentPodRequest extends jspb.Message {
  getAgentid(): string;
  setAgentid(value: string): void;

  getPodname(): string;
  setPodname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAgentPodRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAgentPodRequest): DeleteAgentPodRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAgentPodRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAgentPodRequest;
  static deserializeBinaryFromReader(message: DeleteAgentPodRequest, reader: jspb.BinaryReader): DeleteAgentPodRequest;
}

export namespace DeleteAgentPodRequest {
  export type AsObject = {
    agentid: string,
    podname: string,
  }
}

export class DeleteAgentPodResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAgentPodResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAgentPodResponse): DeleteAgentPodResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAgentPodResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAgentPodResponse;
  static deserializeBinaryFromReader(message: DeleteAgentPodResponse, reader: jspb.BinaryReader): DeleteAgentPodResponse;
}

export namespace DeleteAgentPodResponse {
  export type AsObject = {
  }
}

export class DeleteAgentRequest extends jspb.Message {
  getAgentid(): string;
  setAgentid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAgentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAgentRequest): DeleteAgentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAgentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAgentRequest;
  static deserializeBinaryFromReader(message: DeleteAgentRequest, reader: jspb.BinaryReader): DeleteAgentRequest;
}

export namespace DeleteAgentRequest {
  export type AsObject = {
    agentid: string,
  }
}

export class DeleteAgentResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAgentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAgentResponse): DeleteAgentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAgentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAgentResponse;
  static deserializeBinaryFromReader(message: DeleteAgentResponse, reader: jspb.BinaryReader): DeleteAgentResponse;
}

export namespace DeleteAgentResponse {
  export type AsObject = {
  }
}

