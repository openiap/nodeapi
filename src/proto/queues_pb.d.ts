// package: openiap
// file: queues.proto

import * as jspb from "google-protobuf";

export class RegisterQueueRequest extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterQueueRequest): RegisterQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterQueueRequest;
  static deserializeBinaryFromReader(message: RegisterQueueRequest, reader: jspb.BinaryReader): RegisterQueueRequest;
}

export namespace RegisterQueueRequest {
  export type AsObject = {
    queuename: string,
  }
}

export class RegisterQueueResponse extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterQueueResponse): RegisterQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterQueueResponse;
  static deserializeBinaryFromReader(message: RegisterQueueResponse, reader: jspb.BinaryReader): RegisterQueueResponse;
}

export namespace RegisterQueueResponse {
  export type AsObject = {
    queuename: string,
  }
}

export class RegisterExchangeRequest extends jspb.Message {
  getExchangename(): string;
  setExchangename(value: string): void;

  getAlgorithm(): string;
  setAlgorithm(value: string): void;

  getRoutingkey(): string;
  setRoutingkey(value: string): void;

  getAddqueue(): boolean;
  setAddqueue(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterExchangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterExchangeRequest): RegisterExchangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterExchangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterExchangeRequest;
  static deserializeBinaryFromReader(message: RegisterExchangeRequest, reader: jspb.BinaryReader): RegisterExchangeRequest;
}

export namespace RegisterExchangeRequest {
  export type AsObject = {
    exchangename: string,
    algorithm: string,
    routingkey: string,
    addqueue: boolean,
  }
}

export class RegisterExchangeResponse extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterExchangeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterExchangeResponse): RegisterExchangeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterExchangeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterExchangeResponse;
  static deserializeBinaryFromReader(message: RegisterExchangeResponse, reader: jspb.BinaryReader): RegisterExchangeResponse;
}

export namespace RegisterExchangeResponse {
  export type AsObject = {
    queuename: string,
  }
}

export class QueueMessageRequest extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  getCorrelationid(): string;
  setCorrelationid(value: string): void;

  getReplyto(): string;
  setReplyto(value: string): void;

  getRoutingkey(): string;
  setRoutingkey(value: string): void;

  getExchangename(): string;
  setExchangename(value: string): void;

  getData(): string;
  setData(value: string): void;

  getStriptoken(): boolean;
  setStriptoken(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueueMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueueMessageRequest): QueueMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueueMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueueMessageRequest;
  static deserializeBinaryFromReader(message: QueueMessageRequest, reader: jspb.BinaryReader): QueueMessageRequest;
}

export namespace QueueMessageRequest {
  export type AsObject = {
    queuename: string,
    correlationid: string,
    replyto: string,
    routingkey: string,
    exchangename: string,
    data: string,
    striptoken: boolean,
  }
}

export class QueueMessageResponse extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  getCorrelationid(): string;
  setCorrelationid(value: string): void;

  getReplyto(): string;
  setReplyto(value: string): void;

  getRoutingkey(): string;
  setRoutingkey(value: string): void;

  getExchangename(): string;
  setExchangename(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueueMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueueMessageResponse): QueueMessageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueueMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueueMessageResponse;
  static deserializeBinaryFromReader(message: QueueMessageResponse, reader: jspb.BinaryReader): QueueMessageResponse;
}

export namespace QueueMessageResponse {
  export type AsObject = {
    queuename: string,
    correlationid: string,
    replyto: string,
    routingkey: string,
    exchangename: string,
    data: string,
  }
}

export class QueueEvent extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  getCorrelationid(): string;
  setCorrelationid(value: string): void;

  getReplyto(): string;
  setReplyto(value: string): void;

  getRoutingkey(): string;
  setRoutingkey(value: string): void;

  getExchangename(): string;
  setExchangename(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueueEvent.AsObject;
  static toObject(includeInstance: boolean, msg: QueueEvent): QueueEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueueEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueueEvent;
  static deserializeBinaryFromReader(message: QueueEvent, reader: jspb.BinaryReader): QueueEvent;
}

export namespace QueueEvent {
  export type AsObject = {
    queuename: string,
    correlationid: string,
    replyto: string,
    routingkey: string,
    exchangename: string,
    data: string,
  }
}

export class UnRegisterQueueRequest extends jspb.Message {
  getQueuename(): string;
  setQueuename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnRegisterQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnRegisterQueueRequest): UnRegisterQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnRegisterQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnRegisterQueueRequest;
  static deserializeBinaryFromReader(message: UnRegisterQueueRequest, reader: jspb.BinaryReader): UnRegisterQueueRequest;
}

export namespace UnRegisterQueueRequest {
  export type AsObject = {
    queuename: string,
  }
}

export class UnRegisterQueueResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnRegisterQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnRegisterQueueResponse): UnRegisterQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnRegisterQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnRegisterQueueResponse;
  static deserializeBinaryFromReader(message: UnRegisterQueueResponse, reader: jspb.BinaryReader): UnRegisterQueueResponse;
}

export namespace UnRegisterQueueResponse {
  export type AsObject = {
  }
}

export class CreateWorkflowInstanceRequest extends jspb.Message {
  getTargetid(): string;
  setTargetid(value: string): void;

  getWorkflowid(): string;
  setWorkflowid(value: string): void;

  getName(): string;
  setName(value: string): void;

  getResultqueue(): string;
  setResultqueue(value: string): void;

  getData(): string;
  setData(value: string): void;

  getInitialrun(): boolean;
  setInitialrun(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWorkflowInstanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWorkflowInstanceRequest): CreateWorkflowInstanceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWorkflowInstanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWorkflowInstanceRequest;
  static deserializeBinaryFromReader(message: CreateWorkflowInstanceRequest, reader: jspb.BinaryReader): CreateWorkflowInstanceRequest;
}

export namespace CreateWorkflowInstanceRequest {
  export type AsObject = {
    targetid: string,
    workflowid: string,
    name: string,
    resultqueue: string,
    data: string,
    initialrun: boolean,
  }
}

export class CreateWorkflowInstanceResponse extends jspb.Message {
  getInstanceid(): string;
  setInstanceid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWorkflowInstanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWorkflowInstanceResponse): CreateWorkflowInstanceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWorkflowInstanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWorkflowInstanceResponse;
  static deserializeBinaryFromReader(message: CreateWorkflowInstanceResponse, reader: jspb.BinaryReader): CreateWorkflowInstanceResponse;
}

export namespace CreateWorkflowInstanceResponse {
  export type AsObject = {
    instanceid: string,
  }
}

