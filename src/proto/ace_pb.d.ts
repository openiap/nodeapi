// package: openiap
// file: ace.proto

import * as jspb from "google-protobuf";

export class Ace extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getDeny(): boolean;
  setDeny(value: boolean): void;

  getRights(): number;
  setRights(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ace.AsObject;
  static toObject(includeInstance: boolean, msg: Ace): Ace.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Ace, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ace;
  static deserializeBinaryFromReader(message: Ace, reader: jspb.BinaryReader): Ace;
}

export namespace Ace {
  export type AsObject = {
    id: string,
    deny: boolean,
    rights: number,
  }
}

