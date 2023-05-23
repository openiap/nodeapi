// package: openiap
// file: base.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as querys_pb from "./querys_pb";
import * as queues_pb from "./queues_pb";
import * as watch_pb from "./watch_pb";
import * as workitems_pb from "./workitems_pb";
import * as stripe_pb from "./stripe_pb";

export class Envelope extends jspb.Message {
  getCommand(): string;
  setCommand(value: string): void;

  getPriority(): number;
  setPriority(value: number): void;

  getSeq(): number;
  setSeq(value: number): void;

  getId(): string;
  setId(value: string): void;

  getRid(): string;
  setRid(value: string): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): void;

  getJwt(): string;
  setJwt(value: string): void;

  getTraceid(): string;
  setTraceid(value: string): void;

  getSpanid(): string;
  setSpanid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Envelope.AsObject;
  static toObject(includeInstance: boolean, msg: Envelope): Envelope.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Envelope, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Envelope;
  static deserializeBinaryFromReader(message: Envelope, reader: jspb.BinaryReader): Envelope;
}

export namespace Envelope {
  export type AsObject = {
    command: string,
    priority: number,
    seq: number,
    id: string,
    rid: string,
    data?: google_protobuf_any_pb.Any.AsObject,
    jwt: string,
    traceid: string,
    spanid: string,
  }
}

export class PingRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
  }
}

export class PingResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingResponse;
  static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
  export type AsObject = {
  }
}

export class Noop extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Noop.AsObject;
  static toObject(includeInstance: boolean, msg: Noop): Noop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Noop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Noop;
  static deserializeBinaryFromReader(message: Noop, reader: jspb.BinaryReader): Noop;
}

export namespace Noop {
  export type AsObject = {
  }
}

export class ErrorResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getCode(): number;
  setCode(value: number): void;

  getStack(): string;
  setStack(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorResponse;
  static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
  export type AsObject = {
    message: string,
    code: number,
    stack: string,
  }
}

export class GetElementRequest extends jspb.Message {
  getXpath(): string;
  setXpath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetElementRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetElementRequest): GetElementRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetElementRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetElementRequest;
  static deserializeBinaryFromReader(message: GetElementRequest, reader: jspb.BinaryReader): GetElementRequest;
}

export namespace GetElementRequest {
  export type AsObject = {
    xpath: string,
  }
}

export class GetElementResponse extends jspb.Message {
  getXpath(): string;
  setXpath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetElementResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetElementResponse): GetElementResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetElementResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetElementResponse;
  static deserializeBinaryFromReader(message: GetElementResponse, reader: jspb.BinaryReader): GetElementResponse;
}

export namespace GetElementResponse {
  export type AsObject = {
    xpath: string,
  }
}

export class DownloadRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadRequest): DownloadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadRequest;
  static deserializeBinaryFromReader(message: DownloadRequest, reader: jspb.BinaryReader): DownloadRequest;
}

export namespace DownloadRequest {
  export type AsObject = {
    id: string,
    filename: string,
  }
}

export class DownloadResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  getMimetype(): string;
  setMimetype(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadResponse): DownloadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadResponse;
  static deserializeBinaryFromReader(message: DownloadResponse, reader: jspb.BinaryReader): DownloadResponse;
}

export namespace DownloadResponse {
  export type AsObject = {
    id: string,
    filename: string,
    mimetype: string,
  }
}

export class UploadRequest extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  getMimetype(): string;
  setMimetype(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadRequest): UploadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadRequest;
  static deserializeBinaryFromReader(message: UploadRequest, reader: jspb.BinaryReader): UploadRequest;
}

export namespace UploadRequest {
  export type AsObject = {
    filename: string,
    mimetype: string,
  }
}

export class UploadResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  getBytes(): number;
  setBytes(value: number): void;

  getChunks(): number;
  setChunks(value: number): void;

  getMb(): number;
  setMb(value: number): void;

  getElapsedtime(): number;
  setElapsedtime(value: number): void;

  getMbps(): number;
  setMbps(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadResponse): UploadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadResponse;
  static deserializeBinaryFromReader(message: UploadResponse, reader: jspb.BinaryReader): UploadResponse;
}

export namespace UploadResponse {
  export type AsObject = {
    id: string,
    filename: string,
    bytes: number,
    chunks: number,
    mb: number,
    elapsedtime: number,
    mbps: number,
  }
}

export class BeginStream extends jspb.Message {
  getChecksum(): string;
  setChecksum(value: string): void;

  hasStat(): boolean;
  clearStat(): void;
  getStat(): Stat | undefined;
  setStat(value?: Stat): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeginStream.AsObject;
  static toObject(includeInstance: boolean, msg: BeginStream): BeginStream.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeginStream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeginStream;
  static deserializeBinaryFromReader(message: BeginStream, reader: jspb.BinaryReader): BeginStream;
}

export namespace BeginStream {
  export type AsObject = {
    checksum: string,
    stat?: Stat.AsObject,
  }
}

export class Stream extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Stream.AsObject;
  static toObject(includeInstance: boolean, msg: Stream): Stream.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Stream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Stream;
  static deserializeBinaryFromReader(message: Stream, reader: jspb.BinaryReader): Stream;
}

export namespace Stream {
  export type AsObject = {
    data: Uint8Array | string,
  }
}

export class EndStream extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndStream.AsObject;
  static toObject(includeInstance: boolean, msg: EndStream): EndStream.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EndStream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndStream;
  static deserializeBinaryFromReader(message: EndStream, reader: jspb.BinaryReader): EndStream;
}

export namespace EndStream {
  export type AsObject = {
  }
}

export class Stat extends jspb.Message {
  getBirthtimems(): number;
  setBirthtimems(value: number): void;

  getBlksize(): number;
  setBlksize(value: number): void;

  getBlocks(): number;
  setBlocks(value: number): void;

  hasCtime(): boolean;
  clearCtime(): void;
  getCtime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCtime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getCtimems(): number;
  setCtimems(value: number): void;

  getDev(): number;
  setDev(value: number): void;

  getGid(): number;
  setGid(value: number): void;

  getIno(): number;
  setIno(value: number): void;

  getMode(): number;
  setMode(value: number): void;

  hasMtime(): boolean;
  clearMtime(): void;
  getMtime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setMtime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getMtimems(): number;
  setMtimems(value: number): void;

  getNlink(): number;
  setNlink(value: number): void;

  getRdev(): number;
  setRdev(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  getUid(): number;
  setUid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Stat.AsObject;
  static toObject(includeInstance: boolean, msg: Stat): Stat.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Stat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Stat;
  static deserializeBinaryFromReader(message: Stat, reader: jspb.BinaryReader): Stat;
}

export namespace Stat {
  export type AsObject = {
    birthtimems: number,
    blksize: number,
    blocks: number,
    ctime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    ctimems: number,
    dev: number,
    gid: number,
    ino: number,
    mode: number,
    mtime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    mtimems: number,
    nlink: number,
    rdev: number,
    size: number,
    uid: number,
  }
}

export class CustomCommandRequest extends jspb.Message {
  getCommand(): string;
  setCommand(value: string): void;

  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomCommandRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CustomCommandRequest): CustomCommandRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CustomCommandRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomCommandRequest;
  static deserializeBinaryFromReader(message: CustomCommandRequest, reader: jspb.BinaryReader): CustomCommandRequest;
}

export namespace CustomCommandRequest {
  export type AsObject = {
    command: string,
    id: string,
    name: string,
    data: string,
  }
}

export class CustomCommandResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomCommandResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CustomCommandResponse): CustomCommandResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CustomCommandResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomCommandResponse;
  static deserializeBinaryFromReader(message: CustomCommandResponse, reader: jspb.BinaryReader): CustomCommandResponse;
}

export namespace CustomCommandResponse {
  export type AsObject = {
    result: string,
  }
}

export class SigninRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getJwt(): string;
  setJwt(value: string): void;

  getPing(): boolean;
  setPing(value: boolean): void;

  getValidateonly(): boolean;
  setValidateonly(value: boolean): void;

  getAgent(): string;
  setAgent(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  getLongtoken(): boolean;
  setLongtoken(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SigninRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SigninRequest): SigninRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SigninRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SigninRequest;
  static deserializeBinaryFromReader(message: SigninRequest, reader: jspb.BinaryReader): SigninRequest;
}

export namespace SigninRequest {
  export type AsObject = {
    username: string,
    password: string,
    jwt: string,
    ping: boolean,
    validateonly: boolean,
    agent: string,
    version: string,
    longtoken: boolean,
  }
}

export class SigninResponse extends jspb.Message {
  getJwt(): string;
  setJwt(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SigninResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SigninResponse): SigninResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SigninResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SigninResponse;
  static deserializeBinaryFromReader(message: SigninResponse, reader: jspb.BinaryReader): SigninResponse;
}

export namespace SigninResponse {
  export type AsObject = {
    jwt: string,
    user?: User.AsObject,
  }
}

export class RefreshToken extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getJwt(): string;
  setJwt(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshToken.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshToken): RefreshToken.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RefreshToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshToken;
  static deserializeBinaryFromReader(message: RefreshToken, reader: jspb.BinaryReader): RefreshToken;
}

export namespace RefreshToken {
  export type AsObject = {
    username: string,
    jwt: string,
    user?: User.AsObject,
  }
}

export class Role extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Role.AsObject;
  static toObject(includeInstance: boolean, msg: Role): Role.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Role, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Role;
  static deserializeBinaryFromReader(message: Role, reader: jspb.BinaryReader): Role;
}

export namespace Role {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  clearRolesList(): void;
  getRolesList(): Array<Role>;
  setRolesList(value: Array<Role>): void;
  addRoles(value?: Role, index?: number): Role;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    name: string,
    username: string,
    email: string,
    rolesList: Array<Role.AsObject>,
  }
}

export class Customer extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getType(): string;
  setType(value: string): void;

  getStripeid(): string;
  setStripeid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getName(): string;
  setName(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getVattype(): string;
  setVattype(value: string): void;

  getVatnumber(): string;
  setVatnumber(value: string): void;

  getTaxrate(): string;
  setTaxrate(value: string): void;

  getTax(): number;
  setTax(value: number): void;

  getCoupon(): string;
  setCoupon(value: string): void;

  getHascard(): boolean;
  setHascard(value: boolean): void;

  getMemory(): string;
  setMemory(value: string): void;

  getOpenflowuserplan(): string;
  setOpenflowuserplan(value: string): void;

  getSupportplan(): string;
  setSupportplan(value: string): void;

  getSupporthourplan(): string;
  setSupporthourplan(value: string): void;

  getSubscriptionid(): string;
  setSubscriptionid(value: string): void;

  getAdmins(): string;
  setAdmins(value: string): void;

  getUsers(): string;
  setUsers(value: string): void;

  getCustomattr1(): string;
  setCustomattr1(value: string): void;

  getCustomattr2(): string;
  setCustomattr2(value: string): void;

  getCustomattr3(): string;
  setCustomattr3(value: string): void;

  getCustomattr4(): string;
  setCustomattr4(value: string): void;

  getCustomattr5(): string;
  setCustomattr5(value: string): void;

  clearDomainsList(): void;
  getDomainsList(): Array<string>;
  setDomainsList(value: Array<string>): void;
  addDomains(value: string, index?: number): string;

  getDbusage(): number;
  setDbusage(value: number): void;

  getDblocked(): boolean;
  setDblocked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Customer.AsObject;
  static toObject(includeInstance: boolean, msg: Customer): Customer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Customer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Customer;
  static deserializeBinaryFromReader(message: Customer, reader: jspb.BinaryReader): Customer;
}

export namespace Customer {
  export type AsObject = {
    id: string,
    type: string,
    stripeid: string,
    userid: string,
    name: string,
    country: string,
    email: string,
    address: string,
    vattype: string,
    vatnumber: string,
    taxrate: string,
    tax: number,
    coupon: string,
    hascard: boolean,
    memory: string,
    openflowuserplan: string,
    supportplan: string,
    supporthourplan: string,
    subscriptionid: string,
    admins: string,
    users: string,
    customattr1: string,
    customattr2: string,
    customattr3: string,
    customattr4: string,
    customattr5: string,
    domainsList: Array<string>,
    dbusage: number,
    dblocked: boolean,
  }
}

export class EnsureCustomerRequest extends jspb.Message {
  hasCustomer(): boolean;
  clearCustomer(): void;
  getCustomer(): Customer | undefined;
  setCustomer(value?: Customer): void;

  hasStripe(): boolean;
  clearStripe(): void;
  getStripe(): stripe_pb.StripeCustomer | undefined;
  setStripe(value?: stripe_pb.StripeCustomer): void;

  getEnsureas(): string;
  setEnsureas(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnsureCustomerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EnsureCustomerRequest): EnsureCustomerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EnsureCustomerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnsureCustomerRequest;
  static deserializeBinaryFromReader(message: EnsureCustomerRequest, reader: jspb.BinaryReader): EnsureCustomerRequest;
}

export namespace EnsureCustomerRequest {
  export type AsObject = {
    customer?: Customer.AsObject,
    stripe?: stripe_pb.StripeCustomer.AsObject,
    ensureas: string,
  }
}

export class EnsureCustomerResponse extends jspb.Message {
  hasCustomer(): boolean;
  clearCustomer(): void;
  getCustomer(): Customer | undefined;
  setCustomer(value?: Customer): void;

  hasStripe(): boolean;
  clearStripe(): void;
  getStripe(): stripe_pb.StripeCustomer | undefined;
  setStripe(value?: stripe_pb.StripeCustomer): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnsureCustomerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EnsureCustomerResponse): EnsureCustomerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EnsureCustomerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnsureCustomerResponse;
  static deserializeBinaryFromReader(message: EnsureCustomerResponse, reader: jspb.BinaryReader): EnsureCustomerResponse;
}

export namespace EnsureCustomerResponse {
  export type AsObject = {
    customer?: Customer.AsObject,
    stripe?: stripe_pb.StripeCustomer.AsObject,
  }
}

