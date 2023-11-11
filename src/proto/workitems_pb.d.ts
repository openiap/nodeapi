// package: openiap
// file: workitems.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as ace_pb from "./ace_pb";

export class Workitem extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPayload(): string;
  setPayload(value: string): void;

  getPriority(): number;
  setPriority(value: number): void;

  hasNextrun(): boolean;
  clearNextrun(): void;
  getNextrun(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setNextrun(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasLastrun(): boolean;
  clearLastrun(): void;
  getLastrun(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLastrun(value?: google_protobuf_timestamp_pb.Timestamp): void;

  clearFilesList(): void;
  getFilesList(): Array<WorkitemFile>;
  setFilesList(value: Array<WorkitemFile>): void;
  addFiles(value?: WorkitemFile, index?: number): WorkitemFile;

  getState(): string;
  setState(value: string): void;

  getWiq(): string;
  setWiq(value: string): void;

  getWiqid(): string;
  setWiqid(value: string): void;

  getRetries(): number;
  setRetries(value: number): void;

  getUsername(): string;
  setUsername(value: string): void;

  getSuccessWiqid(): string;
  setSuccessWiqid(value: string): void;

  getFailedWiqid(): string;
  setFailedWiqid(value: string): void;

  getSuccessWiq(): string;
  setSuccessWiq(value: string): void;

  getFailedWiq(): string;
  setFailedWiq(value: string): void;

  getErrormessage(): string;
  setErrormessage(value: string): void;

  getErrorsource(): string;
  setErrorsource(value: string): void;

  getErrortype(): string;
  setErrortype(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Workitem.AsObject;
  static toObject(includeInstance: boolean, msg: Workitem): Workitem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Workitem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Workitem;
  static deserializeBinaryFromReader(message: Workitem, reader: jspb.BinaryReader): Workitem;
}

export namespace Workitem {
  export type AsObject = {
    id: string,
    name: string,
    payload: string,
    priority: number,
    nextrun?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    lastrun?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    filesList: Array<WorkitemFile.AsObject>,
    state: string,
    wiq: string,
    wiqid: string,
    retries: number,
    username: string,
    successWiqid: string,
    failedWiqid: string,
    successWiq: string,
    failedWiq: string,
    errormessage: string,
    errorsource: string,
    errortype: string,
  }
}

export class WorkitemFile extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  getId(): string;
  setId(value: string): void;

  getCompressed(): boolean;
  setCompressed(value: boolean): void;

  getFile(): Uint8Array | string;
  getFile_asU8(): Uint8Array;
  getFile_asB64(): string;
  setFile(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WorkitemFile.AsObject;
  static toObject(includeInstance: boolean, msg: WorkitemFile): WorkitemFile.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WorkitemFile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WorkitemFile;
  static deserializeBinaryFromReader(message: WorkitemFile, reader: jspb.BinaryReader): WorkitemFile;
}

export namespace WorkitemFile {
  export type AsObject = {
    filename: string,
    id: string,
    compressed: boolean,
    file: Uint8Array | string,
  }
}

export class PushWorkitemRequest extends jspb.Message {
  getWiq(): string;
  setWiq(value: string): void;

  getWiqid(): string;
  setWiqid(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPayload(): string;
  setPayload(value: string): void;

  hasNextrun(): boolean;
  clearNextrun(): void;
  getNextrun(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setNextrun(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getSuccessWiqid(): string;
  setSuccessWiqid(value: string): void;

  getFailedWiqid(): string;
  setFailedWiqid(value: string): void;

  getSuccessWiq(): string;
  setSuccessWiq(value: string): void;

  getFailedWiq(): string;
  setFailedWiq(value: string): void;

  getPriority(): number;
  setPriority(value: number): void;

  clearFilesList(): void;
  getFilesList(): Array<WorkitemFile>;
  setFilesList(value: Array<WorkitemFile>): void;
  addFiles(value?: WorkitemFile, index?: number): WorkitemFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PushWorkitemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PushWorkitemRequest): PushWorkitemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PushWorkitemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PushWorkitemRequest;
  static deserializeBinaryFromReader(message: PushWorkitemRequest, reader: jspb.BinaryReader): PushWorkitemRequest;
}

export namespace PushWorkitemRequest {
  export type AsObject = {
    wiq: string,
    wiqid: string,
    name: string,
    payload: string,
    nextrun?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    successWiqid: string,
    failedWiqid: string,
    successWiq: string,
    failedWiq: string,
    priority: number,
    filesList: Array<WorkitemFile.AsObject>,
  }
}

export class PushWorkitemResponse extends jspb.Message {
  hasWorkitem(): boolean;
  clearWorkitem(): void;
  getWorkitem(): Workitem | undefined;
  setWorkitem(value?: Workitem): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PushWorkitemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PushWorkitemResponse): PushWorkitemResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PushWorkitemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PushWorkitemResponse;
  static deserializeBinaryFromReader(message: PushWorkitemResponse, reader: jspb.BinaryReader): PushWorkitemResponse;
}

export namespace PushWorkitemResponse {
  export type AsObject = {
    workitem?: Workitem.AsObject,
  }
}

export class PushWorkitemsRequest extends jspb.Message {
  getWiq(): string;
  setWiq(value: string): void;

  getWiqid(): string;
  setWiqid(value: string): void;

  hasNextrun(): boolean;
  clearNextrun(): void;
  getNextrun(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setNextrun(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getSuccessWiqid(): string;
  setSuccessWiqid(value: string): void;

  getFailedWiqid(): string;
  setFailedWiqid(value: string): void;

  getSuccessWiq(): string;
  setSuccessWiq(value: string): void;

  getFailedWiq(): string;
  setFailedWiq(value: string): void;

  getPriority(): number;
  setPriority(value: number): void;

  clearItemsList(): void;
  getItemsList(): Array<Workitem>;
  setItemsList(value: Array<Workitem>): void;
  addItems(value?: Workitem, index?: number): Workitem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PushWorkitemsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PushWorkitemsRequest): PushWorkitemsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PushWorkitemsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PushWorkitemsRequest;
  static deserializeBinaryFromReader(message: PushWorkitemsRequest, reader: jspb.BinaryReader): PushWorkitemsRequest;
}

export namespace PushWorkitemsRequest {
  export type AsObject = {
    wiq: string,
    wiqid: string,
    nextrun?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    successWiqid: string,
    failedWiqid: string,
    successWiq: string,
    failedWiq: string,
    priority: number,
    itemsList: Array<Workitem.AsObject>,
  }
}

export class PushWorkitemsResponse extends jspb.Message {
  clearWorkitemsList(): void;
  getWorkitemsList(): Array<Workitem>;
  setWorkitemsList(value: Array<Workitem>): void;
  addWorkitems(value?: Workitem, index?: number): Workitem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PushWorkitemsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PushWorkitemsResponse): PushWorkitemsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PushWorkitemsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PushWorkitemsResponse;
  static deserializeBinaryFromReader(message: PushWorkitemsResponse, reader: jspb.BinaryReader): PushWorkitemsResponse;
}

export namespace PushWorkitemsResponse {
  export type AsObject = {
    workitemsList: Array<Workitem.AsObject>,
  }
}

export class UpdateWorkitemRequest extends jspb.Message {
  hasWorkitem(): boolean;
  clearWorkitem(): void;
  getWorkitem(): Workitem | undefined;
  setWorkitem(value?: Workitem): void;

  getIgnoremaxretries(): boolean;
  setIgnoremaxretries(value: boolean): void;

  clearFilesList(): void;
  getFilesList(): Array<WorkitemFile>;
  setFilesList(value: Array<WorkitemFile>): void;
  addFiles(value?: WorkitemFile, index?: number): WorkitemFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateWorkitemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateWorkitemRequest): UpdateWorkitemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateWorkitemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateWorkitemRequest;
  static deserializeBinaryFromReader(message: UpdateWorkitemRequest, reader: jspb.BinaryReader): UpdateWorkitemRequest;
}

export namespace UpdateWorkitemRequest {
  export type AsObject = {
    workitem?: Workitem.AsObject,
    ignoremaxretries: boolean,
    filesList: Array<WorkitemFile.AsObject>,
  }
}

export class UpdateWorkitemResponse extends jspb.Message {
  hasWorkitem(): boolean;
  clearWorkitem(): void;
  getWorkitem(): Workitem | undefined;
  setWorkitem(value?: Workitem): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateWorkitemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateWorkitemResponse): UpdateWorkitemResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateWorkitemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateWorkitemResponse;
  static deserializeBinaryFromReader(message: UpdateWorkitemResponse, reader: jspb.BinaryReader): UpdateWorkitemResponse;
}

export namespace UpdateWorkitemResponse {
  export type AsObject = {
    workitem?: Workitem.AsObject,
  }
}

export class PopWorkitemRequest extends jspb.Message {
  getWiq(): string;
  setWiq(value: string): void;

  getWiqid(): string;
  setWiqid(value: string): void;

  getIncludefiles(): boolean;
  setIncludefiles(value: boolean): void;

  getCompressed(): boolean;
  setCompressed(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PopWorkitemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PopWorkitemRequest): PopWorkitemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PopWorkitemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PopWorkitemRequest;
  static deserializeBinaryFromReader(message: PopWorkitemRequest, reader: jspb.BinaryReader): PopWorkitemRequest;
}

export namespace PopWorkitemRequest {
  export type AsObject = {
    wiq: string,
    wiqid: string,
    includefiles: boolean,
    compressed: boolean,
  }
}

export class PopWorkitemResponse extends jspb.Message {
  hasWorkitem(): boolean;
  clearWorkitem(): void;
  getWorkitem(): Workitem | undefined;
  setWorkitem(value?: Workitem): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PopWorkitemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PopWorkitemResponse): PopWorkitemResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PopWorkitemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PopWorkitemResponse;
  static deserializeBinaryFromReader(message: PopWorkitemResponse, reader: jspb.BinaryReader): PopWorkitemResponse;
}

export namespace PopWorkitemResponse {
  export type AsObject = {
    workitem?: Workitem.AsObject,
  }
}

export class DeleteWorkitemRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteWorkitemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteWorkitemRequest): DeleteWorkitemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteWorkitemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteWorkitemRequest;
  static deserializeBinaryFromReader(message: DeleteWorkitemRequest, reader: jspb.BinaryReader): DeleteWorkitemRequest;
}

export namespace DeleteWorkitemRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteWorkitemResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteWorkitemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteWorkitemResponse): DeleteWorkitemResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteWorkitemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteWorkitemResponse;
  static deserializeBinaryFromReader(message: DeleteWorkitemResponse, reader: jspb.BinaryReader): DeleteWorkitemResponse;
}

export namespace DeleteWorkitemResponse {
  export type AsObject = {
  }
}

export class WorkItemQueue extends jspb.Message {
  getWorkflowid(): string;
  setWorkflowid(value: string): void;

  getRobotqueue(): string;
  setRobotqueue(value: string): void;

  getAmqpqueue(): string;
  setAmqpqueue(value: string): void;

  getProjectid(): string;
  setProjectid(value: string): void;

  getUsersrole(): string;
  setUsersrole(value: string): void;

  getMaxretries(): number;
  setMaxretries(value: number): void;

  getRetrydelay(): number;
  setRetrydelay(value: number): void;

  getInitialdelay(): number;
  setInitialdelay(value: number): void;

  getSuccessWiqid(): string;
  setSuccessWiqid(value: string): void;

  getFailedWiqid(): string;
  setFailedWiqid(value: string): void;

  getSuccessWiq(): string;
  setSuccessWiq(value: string): void;

  getFailedWiq(): string;
  setFailedWiq(value: string): void;

  getId(): string;
  setId(value: string): void;

  clearAclList(): void;
  getAclList(): Array<ace_pb.Ace>;
  setAclList(value: Array<ace_pb.Ace>): void;
  addAcl(value?: ace_pb.Ace, index?: number): ace_pb.Ace;

  getName(): string;
  setName(value: string): void;

  getCreatedbyid(): string;
  setCreatedbyid(value: string): void;

  getCreatedby(): string;
  setCreatedby(value: string): void;

  hasCreated(): boolean;
  clearCreated(): void;
  getCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreated(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getModifiedbyid(): string;
  setModifiedbyid(value: string): void;

  getModifiedby(): string;
  setModifiedby(value: string): void;

  hasModified(): boolean;
  clearModified(): void;
  getModified(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setModified(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getVersion(): number;
  setVersion(value: number): void;

  getPackageid(): string;
  setPackageid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WorkItemQueue.AsObject;
  static toObject(includeInstance: boolean, msg: WorkItemQueue): WorkItemQueue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WorkItemQueue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WorkItemQueue;
  static deserializeBinaryFromReader(message: WorkItemQueue, reader: jspb.BinaryReader): WorkItemQueue;
}

export namespace WorkItemQueue {
  export type AsObject = {
    workflowid: string,
    robotqueue: string,
    amqpqueue: string,
    projectid: string,
    usersrole: string,
    maxretries: number,
    retrydelay: number,
    initialdelay: number,
    successWiqid: string,
    failedWiqid: string,
    successWiq: string,
    failedWiq: string,
    id: string,
    aclList: Array<ace_pb.Ace.AsObject>,
    name: string,
    createdbyid: string,
    createdby: string,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    modifiedbyid: string,
    modifiedby: string,
    modified?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    version: number,
    packageid: string,
  }
}

export class AddWorkItemQueueRequest extends jspb.Message {
  hasWorkitemqueue(): boolean;
  clearWorkitemqueue(): void;
  getWorkitemqueue(): WorkItemQueue | undefined;
  setWorkitemqueue(value?: WorkItemQueue): void;

  getSkiprole(): boolean;
  setSkiprole(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddWorkItemQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddWorkItemQueueRequest): AddWorkItemQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddWorkItemQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddWorkItemQueueRequest;
  static deserializeBinaryFromReader(message: AddWorkItemQueueRequest, reader: jspb.BinaryReader): AddWorkItemQueueRequest;
}

export namespace AddWorkItemQueueRequest {
  export type AsObject = {
    workitemqueue?: WorkItemQueue.AsObject,
    skiprole: boolean,
  }
}

export class AddWorkItemQueueResponse extends jspb.Message {
  hasWorkitemqueue(): boolean;
  clearWorkitemqueue(): void;
  getWorkitemqueue(): WorkItemQueue | undefined;
  setWorkitemqueue(value?: WorkItemQueue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddWorkItemQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddWorkItemQueueResponse): AddWorkItemQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddWorkItemQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddWorkItemQueueResponse;
  static deserializeBinaryFromReader(message: AddWorkItemQueueResponse, reader: jspb.BinaryReader): AddWorkItemQueueResponse;
}

export namespace AddWorkItemQueueResponse {
  export type AsObject = {
    workitemqueue?: WorkItemQueue.AsObject,
  }
}

export class UpdateWorkItemQueueRequest extends jspb.Message {
  hasWorkitemqueue(): boolean;
  clearWorkitemqueue(): void;
  getWorkitemqueue(): WorkItemQueue | undefined;
  setWorkitemqueue(value?: WorkItemQueue): void;

  getSkiprole(): boolean;
  setSkiprole(value: boolean): void;

  getPurge(): boolean;
  setPurge(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateWorkItemQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateWorkItemQueueRequest): UpdateWorkItemQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateWorkItemQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateWorkItemQueueRequest;
  static deserializeBinaryFromReader(message: UpdateWorkItemQueueRequest, reader: jspb.BinaryReader): UpdateWorkItemQueueRequest;
}

export namespace UpdateWorkItemQueueRequest {
  export type AsObject = {
    workitemqueue?: WorkItemQueue.AsObject,
    skiprole: boolean,
    purge: boolean,
  }
}

export class UpdateWorkItemQueueResponse extends jspb.Message {
  hasWorkitemqueue(): boolean;
  clearWorkitemqueue(): void;
  getWorkitemqueue(): WorkItemQueue | undefined;
  setWorkitemqueue(value?: WorkItemQueue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateWorkItemQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateWorkItemQueueResponse): UpdateWorkItemQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateWorkItemQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateWorkItemQueueResponse;
  static deserializeBinaryFromReader(message: UpdateWorkItemQueueResponse, reader: jspb.BinaryReader): UpdateWorkItemQueueResponse;
}

export namespace UpdateWorkItemQueueResponse {
  export type AsObject = {
    workitemqueue?: WorkItemQueue.AsObject,
  }
}

export class DeleteWorkItemQueueRequest extends jspb.Message {
  getWiq(): string;
  setWiq(value: string): void;

  getWiqid(): string;
  setWiqid(value: string): void;

  getPurge(): boolean;
  setPurge(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteWorkItemQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteWorkItemQueueRequest): DeleteWorkItemQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteWorkItemQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteWorkItemQueueRequest;
  static deserializeBinaryFromReader(message: DeleteWorkItemQueueRequest, reader: jspb.BinaryReader): DeleteWorkItemQueueRequest;
}

export namespace DeleteWorkItemQueueRequest {
  export type AsObject = {
    wiq: string,
    wiqid: string,
    purge: boolean,
  }
}

export class DeleteWorkItemQueueResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteWorkItemQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteWorkItemQueueResponse): DeleteWorkItemQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteWorkItemQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteWorkItemQueueResponse;
  static deserializeBinaryFromReader(message: DeleteWorkItemQueueResponse, reader: jspb.BinaryReader): DeleteWorkItemQueueResponse;
}

export namespace DeleteWorkItemQueueResponse {
  export type AsObject = {
  }
}

