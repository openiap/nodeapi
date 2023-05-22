// package: openiap
// file: querys.proto

import * as jspb from "google-protobuf";

export class ListCollectionsRequest extends jspb.Message {
  getIncludehist(): boolean;
  setIncludehist(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCollectionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListCollectionsRequest): ListCollectionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCollectionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCollectionsRequest;
  static deserializeBinaryFromReader(message: ListCollectionsRequest, reader: jspb.BinaryReader): ListCollectionsRequest;
}

export namespace ListCollectionsRequest {
  export type AsObject = {
    includehist: boolean,
  }
}

export class ListCollectionsResponse extends jspb.Message {
  getResults(): string;
  setResults(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCollectionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCollectionsResponse): ListCollectionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCollectionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCollectionsResponse;
  static deserializeBinaryFromReader(message: ListCollectionsResponse, reader: jspb.BinaryReader): ListCollectionsResponse;
}

export namespace ListCollectionsResponse {
  export type AsObject = {
    results: string,
  }
}

export class DropCollectionRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DropCollectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DropCollectionRequest): DropCollectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DropCollectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DropCollectionRequest;
  static deserializeBinaryFromReader(message: DropCollectionRequest, reader: jspb.BinaryReader): DropCollectionRequest;
}

export namespace DropCollectionRequest {
  export type AsObject = {
    collectionname: string,
  }
}

export class DropCollectionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DropCollectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DropCollectionResponse): DropCollectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DropCollectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DropCollectionResponse;
  static deserializeBinaryFromReader(message: DropCollectionResponse, reader: jspb.BinaryReader): DropCollectionResponse;
}

export namespace DropCollectionResponse {
  export type AsObject = {
  }
}

export class col_timeseries extends jspb.Message {
  getTimefield(): string;
  setTimefield(value: string): void;

  getMetafield(): string;
  setMetafield(value: string): void;

  getGranularity(): string;
  setGranularity(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): col_timeseries.AsObject;
  static toObject(includeInstance: boolean, msg: col_timeseries): col_timeseries.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: col_timeseries, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): col_timeseries;
  static deserializeBinaryFromReader(message: col_timeseries, reader: jspb.BinaryReader): col_timeseries;
}

export namespace col_timeseries {
  export type AsObject = {
    timefield: string,
    metafield: string,
    granularity: string,
  }
}

export class col_collation extends jspb.Message {
  getLocale(): string;
  setLocale(value: string): void;

  getCaselevel(): boolean;
  setCaselevel(value: boolean): void;

  getCasefirst(): string;
  setCasefirst(value: string): void;

  getStrength(): number;
  setStrength(value: number): void;

  getNumericordering(): boolean;
  setNumericordering(value: boolean): void;

  getAlternate(): string;
  setAlternate(value: string): void;

  getMaxvariable(): string;
  setMaxvariable(value: string): void;

  getBackwards(): boolean;
  setBackwards(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): col_collation.AsObject;
  static toObject(includeInstance: boolean, msg: col_collation): col_collation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: col_collation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): col_collation;
  static deserializeBinaryFromReader(message: col_collation, reader: jspb.BinaryReader): col_collation;
}

export namespace col_collation {
  export type AsObject = {
    locale: string,
    caselevel: boolean,
    casefirst: string,
    strength: number,
    numericordering: boolean,
    alternate: string,
    maxvariable: string,
    backwards: boolean,
  }
}

export class CreateCollectionRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  hasCollation(): boolean;
  clearCollation(): void;
  getCollation(): col_collation | undefined;
  setCollation(value?: col_collation): void;

  hasTimeseries(): boolean;
  clearTimeseries(): void;
  getTimeseries(): col_timeseries | undefined;
  setTimeseries(value?: col_timeseries): void;

  getExpireafterseconds(): number;
  setExpireafterseconds(value: number): void;

  getChangestreampreandpostimages(): boolean;
  setChangestreampreandpostimages(value: boolean): void;

  getCapped(): boolean;
  setCapped(value: boolean): void;

  getMax(): number;
  setMax(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCollectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCollectionRequest): CreateCollectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCollectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCollectionRequest;
  static deserializeBinaryFromReader(message: CreateCollectionRequest, reader: jspb.BinaryReader): CreateCollectionRequest;
}

export namespace CreateCollectionRequest {
  export type AsObject = {
    collectionname: string,
    collation?: col_collation.AsObject,
    timeseries?: col_timeseries.AsObject,
    expireafterseconds: number,
    changestreampreandpostimages: boolean,
    capped: boolean,
    max: number,
    size: number,
  }
}

export class CreateCollectionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCollectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCollectionResponse): CreateCollectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCollectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCollectionResponse;
  static deserializeBinaryFromReader(message: CreateCollectionResponse, reader: jspb.BinaryReader): CreateCollectionResponse;
}

export namespace CreateCollectionResponse {
  export type AsObject = {
  }
}

export class QueryRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  getCollectionname(): string;
  setCollectionname(value: string): void;

  getProjection(): string;
  setProjection(value: string): void;

  getTop(): number;
  setTop(value: number): void;

  getSkip(): number;
  setSkip(value: number): void;

  getOrderby(): string;
  setOrderby(value: string): void;

  getQueryas(): string;
  setQueryas(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryRequest): QueryRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryRequest;
  static deserializeBinaryFromReader(message: QueryRequest, reader: jspb.BinaryReader): QueryRequest;
}

export namespace QueryRequest {
  export type AsObject = {
    query: string,
    collectionname: string,
    projection: string,
    top: number,
    skip: number,
    orderby: string,
    queryas: string,
  }
}

export class QueryResponse extends jspb.Message {
  getResults(): string;
  setResults(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryResponse): QueryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryResponse;
  static deserializeBinaryFromReader(message: QueryResponse, reader: jspb.BinaryReader): QueryResponse;
}

export namespace QueryResponse {
  export type AsObject = {
    results: string,
  }
}

export class GetDocumentVersionRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getId(): string;
  setId(value: string): void;

  getVersion(): number;
  setVersion(value: number): void;

  getDecrypt(): boolean;
  setDecrypt(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDocumentVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDocumentVersionRequest): GetDocumentVersionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDocumentVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDocumentVersionRequest;
  static deserializeBinaryFromReader(message: GetDocumentVersionRequest, reader: jspb.BinaryReader): GetDocumentVersionRequest;
}

export namespace GetDocumentVersionRequest {
  export type AsObject = {
    collectionname: string,
    id: string,
    version: number,
    decrypt: boolean,
  }
}

export class GetDocumentVersionResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDocumentVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDocumentVersionResponse): GetDocumentVersionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDocumentVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDocumentVersionResponse;
  static deserializeBinaryFromReader(message: GetDocumentVersionResponse, reader: jspb.BinaryReader): GetDocumentVersionResponse;
}

export namespace GetDocumentVersionResponse {
  export type AsObject = {
    result: string,
  }
}

export class AggregateRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getAggregates(): string;
  setAggregates(value: string): void;

  getQueryas(): string;
  setQueryas(value: string): void;

  getHint(): string;
  setHint(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AggregateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AggregateRequest): AggregateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AggregateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AggregateRequest;
  static deserializeBinaryFromReader(message: AggregateRequest, reader: jspb.BinaryReader): AggregateRequest;
}

export namespace AggregateRequest {
  export type AsObject = {
    collectionname: string,
    aggregates: string,
    queryas: string,
    hint: string,
  }
}

export class AggregateResponse extends jspb.Message {
  getResults(): string;
  setResults(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AggregateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AggregateResponse): AggregateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AggregateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AggregateResponse;
  static deserializeBinaryFromReader(message: AggregateResponse, reader: jspb.BinaryReader): AggregateResponse;
}

export namespace AggregateResponse {
  export type AsObject = {
    results: string,
  }
}

export class CountRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getQuery(): string;
  setQuery(value: string): void;

  getQueryas(): string;
  setQueryas(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CountRequest): CountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountRequest;
  static deserializeBinaryFromReader(message: CountRequest, reader: jspb.BinaryReader): CountRequest;
}

export namespace CountRequest {
  export type AsObject = {
    collectionname: string,
    query: string,
    queryas: string,
  }
}

export class CountResponse extends jspb.Message {
  getResult(): number;
  setResult(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CountResponse): CountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountResponse;
  static deserializeBinaryFromReader(message: CountResponse, reader: jspb.BinaryReader): CountResponse;
}

export namespace CountResponse {
  export type AsObject = {
    result: number,
  }
}

export class InsertOneRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getItem(): string;
  setItem(value: string): void;

  getW(): number;
  setW(value: number): void;

  getJ(): boolean;
  setJ(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InsertOneRequest): InsertOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertOneRequest;
  static deserializeBinaryFromReader(message: InsertOneRequest, reader: jspb.BinaryReader): InsertOneRequest;
}

export namespace InsertOneRequest {
  export type AsObject = {
    collectionname: string,
    item: string,
    w: number,
    j: boolean,
  }
}

export class InsertOneResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InsertOneResponse): InsertOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertOneResponse;
  static deserializeBinaryFromReader(message: InsertOneResponse, reader: jspb.BinaryReader): InsertOneResponse;
}

export namespace InsertOneResponse {
  export type AsObject = {
    result: string,
  }
}

export class InsertManyRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getItems(): string;
  setItems(value: string): void;

  getW(): number;
  setW(value: number): void;

  getJ(): boolean;
  setJ(value: boolean): void;

  getSkipresults(): boolean;
  setSkipresults(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertManyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InsertManyRequest): InsertManyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertManyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertManyRequest;
  static deserializeBinaryFromReader(message: InsertManyRequest, reader: jspb.BinaryReader): InsertManyRequest;
}

export namespace InsertManyRequest {
  export type AsObject = {
    collectionname: string,
    items: string,
    w: number,
    j: boolean,
    skipresults: boolean,
  }
}

export class InsertManyResponse extends jspb.Message {
  getResults(): string;
  setResults(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertManyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InsertManyResponse): InsertManyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertManyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertManyResponse;
  static deserializeBinaryFromReader(message: InsertManyResponse, reader: jspb.BinaryReader): InsertManyResponse;
}

export namespace InsertManyResponse {
  export type AsObject = {
    results: string,
  }
}

export class UpdateOneRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getItem(): string;
  setItem(value: string): void;

  getW(): number;
  setW(value: number): void;

  getJ(): boolean;
  setJ(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOneRequest): UpdateOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOneRequest;
  static deserializeBinaryFromReader(message: UpdateOneRequest, reader: jspb.BinaryReader): UpdateOneRequest;
}

export namespace UpdateOneRequest {
  export type AsObject = {
    collectionname: string,
    item: string,
    w: number,
    j: boolean,
  }
}

export class UpdateOneResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOneResponse): UpdateOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOneResponse;
  static deserializeBinaryFromReader(message: UpdateOneResponse, reader: jspb.BinaryReader): UpdateOneResponse;
}

export namespace UpdateOneResponse {
  export type AsObject = {
    result: string,
  }
}

export class UpdateDocumentRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getQuery(): string;
  setQuery(value: string): void;

  getDocument(): string;
  setDocument(value: string): void;

  getW(): number;
  setW(value: number): void;

  getJ(): boolean;
  setJ(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDocumentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDocumentRequest): UpdateDocumentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateDocumentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDocumentRequest;
  static deserializeBinaryFromReader(message: UpdateDocumentRequest, reader: jspb.BinaryReader): UpdateDocumentRequest;
}

export namespace UpdateDocumentRequest {
  export type AsObject = {
    collectionname: string,
    query: string,
    document: string,
    w: number,
    j: boolean,
  }
}

export class UpdateResult extends jspb.Message {
  getAcknowledged(): boolean;
  setAcknowledged(value: boolean): void;

  getMatchedcount(): number;
  setMatchedcount(value: number): void;

  getModifiedcount(): number;
  setModifiedcount(value: number): void;

  getUpsertedcount(): number;
  setUpsertedcount(value: number): void;

  getUpsertedid(): string;
  setUpsertedid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateResult.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateResult): UpdateResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateResult;
  static deserializeBinaryFromReader(message: UpdateResult, reader: jspb.BinaryReader): UpdateResult;
}

export namespace UpdateResult {
  export type AsObject = {
    acknowledged: boolean,
    matchedcount: number,
    modifiedcount: number,
    upsertedcount: number,
    upsertedid: string,
  }
}

export class UpdateDocumentResponse extends jspb.Message {
  hasOpresult(): boolean;
  clearOpresult(): void;
  getOpresult(): UpdateResult | undefined;
  setOpresult(value?: UpdateResult): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDocumentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDocumentResponse): UpdateDocumentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateDocumentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDocumentResponse;
  static deserializeBinaryFromReader(message: UpdateDocumentResponse, reader: jspb.BinaryReader): UpdateDocumentResponse;
}

export namespace UpdateDocumentResponse {
  export type AsObject = {
    opresult?: UpdateResult.AsObject,
  }
}

export class InsertOrUpdateOneRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getUniqeness(): string;
  setUniqeness(value: string): void;

  getItem(): string;
  setItem(value: string): void;

  getW(): number;
  setW(value: number): void;

  getJ(): boolean;
  setJ(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertOrUpdateOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InsertOrUpdateOneRequest): InsertOrUpdateOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertOrUpdateOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertOrUpdateOneRequest;
  static deserializeBinaryFromReader(message: InsertOrUpdateOneRequest, reader: jspb.BinaryReader): InsertOrUpdateOneRequest;
}

export namespace InsertOrUpdateOneRequest {
  export type AsObject = {
    collectionname: string,
    uniqeness: string,
    item: string,
    w: number,
    j: boolean,
  }
}

export class InsertOrUpdateOneResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertOrUpdateOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InsertOrUpdateOneResponse): InsertOrUpdateOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertOrUpdateOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertOrUpdateOneResponse;
  static deserializeBinaryFromReader(message: InsertOrUpdateOneResponse, reader: jspb.BinaryReader): InsertOrUpdateOneResponse;
}

export namespace InsertOrUpdateOneResponse {
  export type AsObject = {
    result: string,
  }
}

export class InsertOrUpdateManyRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getUniqeness(): string;
  setUniqeness(value: string): void;

  getItems(): string;
  setItems(value: string): void;

  getW(): number;
  setW(value: number): void;

  getJ(): boolean;
  setJ(value: boolean): void;

  getSkipresults(): boolean;
  setSkipresults(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertOrUpdateManyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InsertOrUpdateManyRequest): InsertOrUpdateManyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertOrUpdateManyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertOrUpdateManyRequest;
  static deserializeBinaryFromReader(message: InsertOrUpdateManyRequest, reader: jspb.BinaryReader): InsertOrUpdateManyRequest;
}

export namespace InsertOrUpdateManyRequest {
  export type AsObject = {
    collectionname: string,
    uniqeness: string,
    items: string,
    w: number,
    j: boolean,
    skipresults: boolean,
  }
}

export class InsertOrUpdateManyResponse extends jspb.Message {
  getResults(): string;
  setResults(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertOrUpdateManyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InsertOrUpdateManyResponse): InsertOrUpdateManyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InsertOrUpdateManyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertOrUpdateManyResponse;
  static deserializeBinaryFromReader(message: InsertOrUpdateManyResponse, reader: jspb.BinaryReader): InsertOrUpdateManyResponse;
}

export namespace InsertOrUpdateManyResponse {
  export type AsObject = {
    results: string,
  }
}

export class DeleteOneRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getId(): string;
  setId(value: string): void;

  getRecursive(): boolean;
  setRecursive(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOneRequest): DeleteOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOneRequest;
  static deserializeBinaryFromReader(message: DeleteOneRequest, reader: jspb.BinaryReader): DeleteOneRequest;
}

export namespace DeleteOneRequest {
  export type AsObject = {
    collectionname: string,
    id: string,
    recursive: boolean,
  }
}

export class DeleteOneResponse extends jspb.Message {
  getAffectedrows(): number;
  setAffectedrows(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOneResponse): DeleteOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOneResponse;
  static deserializeBinaryFromReader(message: DeleteOneResponse, reader: jspb.BinaryReader): DeleteOneResponse;
}

export namespace DeleteOneResponse {
  export type AsObject = {
    affectedrows: number,
  }
}

export class DeleteManyRequest extends jspb.Message {
  getCollectionname(): string;
  setCollectionname(value: string): void;

  getQuery(): string;
  setQuery(value: string): void;

  getRecursive(): boolean;
  setRecursive(value: boolean): void;

  clearIdsList(): void;
  getIdsList(): Array<string>;
  setIdsList(value: Array<string>): void;
  addIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteManyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteManyRequest): DeleteManyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteManyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteManyRequest;
  static deserializeBinaryFromReader(message: DeleteManyRequest, reader: jspb.BinaryReader): DeleteManyRequest;
}

export namespace DeleteManyRequest {
  export type AsObject = {
    collectionname: string,
    query: string,
    recursive: boolean,
    idsList: Array<string>,
  }
}

export class DeleteManyResponse extends jspb.Message {
  getAffectedrows(): number;
  setAffectedrows(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteManyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteManyResponse): DeleteManyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteManyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteManyResponse;
  static deserializeBinaryFromReader(message: DeleteManyResponse, reader: jspb.BinaryReader): DeleteManyResponse;
}

export namespace DeleteManyResponse {
  export type AsObject = {
    affectedrows: number,
  }
}

