/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "openiap";

export interface RegisterQueueRequest {
  queuename: string;
}

export interface RegisterQueueResponse {
  queuename: string;
}

export interface RegisterExchangeRequest {
  exchangename: string;
  algorithm: string;
  routingkey: string;
  addqueue: boolean;
}

export interface RegisterExchangeResponse {
  queuename: string;
}

export interface QueueMessageRequest {
  queuename: string;
  correlationId: string;
  replyto: string;
  routingkey: string;
  exchangename: string;
  data: string;
  striptoken: boolean;
}

export interface QueueMessageResponse {
  queuename: string;
  correlationId: string;
  replyto: string;
  routingkey: string;
  exchangename: string;
  data: string;
}

export interface QueueEvent {
  queuename: string;
  correlationId: string;
  replyto: string;
  routingkey: string;
  exchangename: string;
  data: string;
}

export interface UnRegisterQueueRequest {
  queuename: string;
}

export interface UnRegisterQueueResponse {
}

export interface CreateWorkflowInstanceRequest {
  targetid: string;
  workflowid: string;
  name: string;
  resultqueue: string;
  data: string;
  initialrun: boolean;
}

export interface CreateWorkflowInstanceResponse {
  instanceid: string;
}

function createBaseRegisterQueueRequest(): RegisterQueueRequest {
  return { queuename: "" };
}

export const RegisterQueueRequest = {
  encode(message: RegisterQueueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterQueueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterQueueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterQueueRequest {
    return { queuename: isSet(object.queuename) ? String(object.queuename) : "" };
  },

  toJSON(message: RegisterQueueRequest): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterQueueRequest>, I>>(base?: I): RegisterQueueRequest {
    return RegisterQueueRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterQueueRequest>, I>>(object: I): RegisterQueueRequest {
    const message = createBaseRegisterQueueRequest();
    message.queuename = object.queuename ?? "";
    return message;
  },
};

function createBaseRegisterQueueResponse(): RegisterQueueResponse {
  return { queuename: "" };
}

export const RegisterQueueResponse = {
  encode(message: RegisterQueueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterQueueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterQueueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterQueueResponse {
    return { queuename: isSet(object.queuename) ? String(object.queuename) : "" };
  },

  toJSON(message: RegisterQueueResponse): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterQueueResponse>, I>>(base?: I): RegisterQueueResponse {
    return RegisterQueueResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterQueueResponse>, I>>(object: I): RegisterQueueResponse {
    const message = createBaseRegisterQueueResponse();
    message.queuename = object.queuename ?? "";
    return message;
  },
};

function createBaseRegisterExchangeRequest(): RegisterExchangeRequest {
  return { exchangename: "", algorithm: "", routingkey: "", addqueue: false };
}

export const RegisterExchangeRequest = {
  encode(message: RegisterExchangeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exchangename !== "") {
      writer.uint32(10).string(message.exchangename);
    }
    if (message.algorithm !== "") {
      writer.uint32(18).string(message.algorithm);
    }
    if (message.routingkey !== "") {
      writer.uint32(26).string(message.routingkey);
    }
    if (message.addqueue === true) {
      writer.uint32(32).bool(message.addqueue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterExchangeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterExchangeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangename = reader.string();
          break;
        case 2:
          message.algorithm = reader.string();
          break;
        case 3:
          message.routingkey = reader.string();
          break;
        case 4:
          message.addqueue = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterExchangeRequest {
    return {
      exchangename: isSet(object.exchangename) ? String(object.exchangename) : "",
      algorithm: isSet(object.algorithm) ? String(object.algorithm) : "",
      routingkey: isSet(object.routingkey) ? String(object.routingkey) : "",
      addqueue: isSet(object.addqueue) ? Boolean(object.addqueue) : false,
    };
  },

  toJSON(message: RegisterExchangeRequest): unknown {
    const obj: any = {};
    message.exchangename !== undefined && (obj.exchangename = message.exchangename);
    message.algorithm !== undefined && (obj.algorithm = message.algorithm);
    message.routingkey !== undefined && (obj.routingkey = message.routingkey);
    message.addqueue !== undefined && (obj.addqueue = message.addqueue);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterExchangeRequest>, I>>(base?: I): RegisterExchangeRequest {
    return RegisterExchangeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterExchangeRequest>, I>>(object: I): RegisterExchangeRequest {
    const message = createBaseRegisterExchangeRequest();
    message.exchangename = object.exchangename ?? "";
    message.algorithm = object.algorithm ?? "";
    message.routingkey = object.routingkey ?? "";
    message.addqueue = object.addqueue ?? false;
    return message;
  },
};

function createBaseRegisterExchangeResponse(): RegisterExchangeResponse {
  return { queuename: "" };
}

export const RegisterExchangeResponse = {
  encode(message: RegisterExchangeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterExchangeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterExchangeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterExchangeResponse {
    return { queuename: isSet(object.queuename) ? String(object.queuename) : "" };
  },

  toJSON(message: RegisterExchangeResponse): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterExchangeResponse>, I>>(base?: I): RegisterExchangeResponse {
    return RegisterExchangeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterExchangeResponse>, I>>(object: I): RegisterExchangeResponse {
    const message = createBaseRegisterExchangeResponse();
    message.queuename = object.queuename ?? "";
    return message;
  },
};

function createBaseQueueMessageRequest(): QueueMessageRequest {
  return {
    queuename: "",
    correlationId: "",
    replyto: "",
    routingkey: "",
    exchangename: "",
    data: "",
    striptoken: false,
  };
}

export const QueueMessageRequest = {
  encode(message: QueueMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    if (message.correlationId !== "") {
      writer.uint32(18).string(message.correlationId);
    }
    if (message.replyto !== "") {
      writer.uint32(26).string(message.replyto);
    }
    if (message.routingkey !== "") {
      writer.uint32(34).string(message.routingkey);
    }
    if (message.exchangename !== "") {
      writer.uint32(42).string(message.exchangename);
    }
    if (message.data !== "") {
      writer.uint32(50).string(message.data);
    }
    if (message.striptoken === true) {
      writer.uint32(56).bool(message.striptoken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueueMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        case 2:
          message.correlationId = reader.string();
          break;
        case 3:
          message.replyto = reader.string();
          break;
        case 4:
          message.routingkey = reader.string();
          break;
        case 5:
          message.exchangename = reader.string();
          break;
        case 6:
          message.data = reader.string();
          break;
        case 7:
          message.striptoken = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueueMessageRequest {
    return {
      queuename: isSet(object.queuename) ? String(object.queuename) : "",
      correlationId: isSet(object.correlationId) ? String(object.correlationId) : "",
      replyto: isSet(object.replyto) ? String(object.replyto) : "",
      routingkey: isSet(object.routingkey) ? String(object.routingkey) : "",
      exchangename: isSet(object.exchangename) ? String(object.exchangename) : "",
      data: isSet(object.data) ? String(object.data) : "",
      striptoken: isSet(object.striptoken) ? Boolean(object.striptoken) : false,
    };
  },

  toJSON(message: QueueMessageRequest): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    message.correlationId !== undefined && (obj.correlationId = message.correlationId);
    message.replyto !== undefined && (obj.replyto = message.replyto);
    message.routingkey !== undefined && (obj.routingkey = message.routingkey);
    message.exchangename !== undefined && (obj.exchangename = message.exchangename);
    message.data !== undefined && (obj.data = message.data);
    message.striptoken !== undefined && (obj.striptoken = message.striptoken);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueueMessageRequest>, I>>(base?: I): QueueMessageRequest {
    return QueueMessageRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueueMessageRequest>, I>>(object: I): QueueMessageRequest {
    const message = createBaseQueueMessageRequest();
    message.queuename = object.queuename ?? "";
    message.correlationId = object.correlationId ?? "";
    message.replyto = object.replyto ?? "";
    message.routingkey = object.routingkey ?? "";
    message.exchangename = object.exchangename ?? "";
    message.data = object.data ?? "";
    message.striptoken = object.striptoken ?? false;
    return message;
  },
};

function createBaseQueueMessageResponse(): QueueMessageResponse {
  return { queuename: "", correlationId: "", replyto: "", routingkey: "", exchangename: "", data: "" };
}

export const QueueMessageResponse = {
  encode(message: QueueMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    if (message.correlationId !== "") {
      writer.uint32(18).string(message.correlationId);
    }
    if (message.replyto !== "") {
      writer.uint32(26).string(message.replyto);
    }
    if (message.routingkey !== "") {
      writer.uint32(34).string(message.routingkey);
    }
    if (message.exchangename !== "") {
      writer.uint32(42).string(message.exchangename);
    }
    if (message.data !== "") {
      writer.uint32(50).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueueMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        case 2:
          message.correlationId = reader.string();
          break;
        case 3:
          message.replyto = reader.string();
          break;
        case 4:
          message.routingkey = reader.string();
          break;
        case 5:
          message.exchangename = reader.string();
          break;
        case 6:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueueMessageResponse {
    return {
      queuename: isSet(object.queuename) ? String(object.queuename) : "",
      correlationId: isSet(object.correlationId) ? String(object.correlationId) : "",
      replyto: isSet(object.replyto) ? String(object.replyto) : "",
      routingkey: isSet(object.routingkey) ? String(object.routingkey) : "",
      exchangename: isSet(object.exchangename) ? String(object.exchangename) : "",
      data: isSet(object.data) ? String(object.data) : "",
    };
  },

  toJSON(message: QueueMessageResponse): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    message.correlationId !== undefined && (obj.correlationId = message.correlationId);
    message.replyto !== undefined && (obj.replyto = message.replyto);
    message.routingkey !== undefined && (obj.routingkey = message.routingkey);
    message.exchangename !== undefined && (obj.exchangename = message.exchangename);
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueueMessageResponse>, I>>(base?: I): QueueMessageResponse {
    return QueueMessageResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueueMessageResponse>, I>>(object: I): QueueMessageResponse {
    const message = createBaseQueueMessageResponse();
    message.queuename = object.queuename ?? "";
    message.correlationId = object.correlationId ?? "";
    message.replyto = object.replyto ?? "";
    message.routingkey = object.routingkey ?? "";
    message.exchangename = object.exchangename ?? "";
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseQueueEvent(): QueueEvent {
  return { queuename: "", correlationId: "", replyto: "", routingkey: "", exchangename: "", data: "" };
}

export const QueueEvent = {
  encode(message: QueueEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    if (message.correlationId !== "") {
      writer.uint32(18).string(message.correlationId);
    }
    if (message.replyto !== "") {
      writer.uint32(26).string(message.replyto);
    }
    if (message.routingkey !== "") {
      writer.uint32(34).string(message.routingkey);
    }
    if (message.exchangename !== "") {
      writer.uint32(42).string(message.exchangename);
    }
    if (message.data !== "") {
      writer.uint32(50).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueueEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        case 2:
          message.correlationId = reader.string();
          break;
        case 3:
          message.replyto = reader.string();
          break;
        case 4:
          message.routingkey = reader.string();
          break;
        case 5:
          message.exchangename = reader.string();
          break;
        case 6:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueueEvent {
    return {
      queuename: isSet(object.queuename) ? String(object.queuename) : "",
      correlationId: isSet(object.correlationId) ? String(object.correlationId) : "",
      replyto: isSet(object.replyto) ? String(object.replyto) : "",
      routingkey: isSet(object.routingkey) ? String(object.routingkey) : "",
      exchangename: isSet(object.exchangename) ? String(object.exchangename) : "",
      data: isSet(object.data) ? String(object.data) : "",
    };
  },

  toJSON(message: QueueEvent): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    message.correlationId !== undefined && (obj.correlationId = message.correlationId);
    message.replyto !== undefined && (obj.replyto = message.replyto);
    message.routingkey !== undefined && (obj.routingkey = message.routingkey);
    message.exchangename !== undefined && (obj.exchangename = message.exchangename);
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueueEvent>, I>>(base?: I): QueueEvent {
    return QueueEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueueEvent>, I>>(object: I): QueueEvent {
    const message = createBaseQueueEvent();
    message.queuename = object.queuename ?? "";
    message.correlationId = object.correlationId ?? "";
    message.replyto = object.replyto ?? "";
    message.routingkey = object.routingkey ?? "";
    message.exchangename = object.exchangename ?? "";
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseUnRegisterQueueRequest(): UnRegisterQueueRequest {
  return { queuename: "" };
}

export const UnRegisterQueueRequest = {
  encode(message: UnRegisterQueueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queuename !== "") {
      writer.uint32(10).string(message.queuename);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnRegisterQueueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnRegisterQueueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queuename = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnRegisterQueueRequest {
    return { queuename: isSet(object.queuename) ? String(object.queuename) : "" };
  },

  toJSON(message: UnRegisterQueueRequest): unknown {
    const obj: any = {};
    message.queuename !== undefined && (obj.queuename = message.queuename);
    return obj;
  },

  create<I extends Exact<DeepPartial<UnRegisterQueueRequest>, I>>(base?: I): UnRegisterQueueRequest {
    return UnRegisterQueueRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UnRegisterQueueRequest>, I>>(object: I): UnRegisterQueueRequest {
    const message = createBaseUnRegisterQueueRequest();
    message.queuename = object.queuename ?? "";
    return message;
  },
};

function createBaseUnRegisterQueueResponse(): UnRegisterQueueResponse {
  return {};
}

export const UnRegisterQueueResponse = {
  encode(_: UnRegisterQueueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnRegisterQueueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnRegisterQueueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UnRegisterQueueResponse {
    return {};
  },

  toJSON(_: UnRegisterQueueResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UnRegisterQueueResponse>, I>>(base?: I): UnRegisterQueueResponse {
    return UnRegisterQueueResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UnRegisterQueueResponse>, I>>(_: I): UnRegisterQueueResponse {
    const message = createBaseUnRegisterQueueResponse();
    return message;
  },
};

function createBaseCreateWorkflowInstanceRequest(): CreateWorkflowInstanceRequest {
  return { targetid: "", workflowid: "", name: "", resultqueue: "", data: "", initialrun: false };
}

export const CreateWorkflowInstanceRequest = {
  encode(message: CreateWorkflowInstanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.targetid !== "") {
      writer.uint32(10).string(message.targetid);
    }
    if (message.workflowid !== "") {
      writer.uint32(18).string(message.workflowid);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.resultqueue !== "") {
      writer.uint32(34).string(message.resultqueue);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.initialrun === true) {
      writer.uint32(48).bool(message.initialrun);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkflowInstanceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWorkflowInstanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.targetid = reader.string();
          break;
        case 2:
          message.workflowid = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.resultqueue = reader.string();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.initialrun = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkflowInstanceRequest {
    return {
      targetid: isSet(object.targetid) ? String(object.targetid) : "",
      workflowid: isSet(object.workflowid) ? String(object.workflowid) : "",
      name: isSet(object.name) ? String(object.name) : "",
      resultqueue: isSet(object.resultqueue) ? String(object.resultqueue) : "",
      data: isSet(object.data) ? String(object.data) : "",
      initialrun: isSet(object.initialrun) ? Boolean(object.initialrun) : false,
    };
  },

  toJSON(message: CreateWorkflowInstanceRequest): unknown {
    const obj: any = {};
    message.targetid !== undefined && (obj.targetid = message.targetid);
    message.workflowid !== undefined && (obj.workflowid = message.workflowid);
    message.name !== undefined && (obj.name = message.name);
    message.resultqueue !== undefined && (obj.resultqueue = message.resultqueue);
    message.data !== undefined && (obj.data = message.data);
    message.initialrun !== undefined && (obj.initialrun = message.initialrun);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateWorkflowInstanceRequest>, I>>(base?: I): CreateWorkflowInstanceRequest {
    return CreateWorkflowInstanceRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateWorkflowInstanceRequest>, I>>(
    object: I,
  ): CreateWorkflowInstanceRequest {
    const message = createBaseCreateWorkflowInstanceRequest();
    message.targetid = object.targetid ?? "";
    message.workflowid = object.workflowid ?? "";
    message.name = object.name ?? "";
    message.resultqueue = object.resultqueue ?? "";
    message.data = object.data ?? "";
    message.initialrun = object.initialrun ?? false;
    return message;
  },
};

function createBaseCreateWorkflowInstanceResponse(): CreateWorkflowInstanceResponse {
  return { instanceid: "" };
}

export const CreateWorkflowInstanceResponse = {
  encode(message: CreateWorkflowInstanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceid !== "") {
      writer.uint32(10).string(message.instanceid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkflowInstanceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWorkflowInstanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.instanceid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkflowInstanceResponse {
    return { instanceid: isSet(object.instanceid) ? String(object.instanceid) : "" };
  },

  toJSON(message: CreateWorkflowInstanceResponse): unknown {
    const obj: any = {};
    message.instanceid !== undefined && (obj.instanceid = message.instanceid);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateWorkflowInstanceResponse>, I>>(base?: I): CreateWorkflowInstanceResponse {
    return CreateWorkflowInstanceResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateWorkflowInstanceResponse>, I>>(
    object: I,
  ): CreateWorkflowInstanceResponse {
    const message = createBaseCreateWorkflowInstanceResponse();
    message.instanceid = object.instanceid ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
