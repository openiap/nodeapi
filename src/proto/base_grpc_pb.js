// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var base_pb = require('./base_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
var querys_pb = require('./querys_pb.js');
var queues_pb = require('./queues_pb.js');
var watch_pb = require('./watch_pb.js');
var workitems_pb = require('./workitems_pb.js');

function serialize_openiap_AddWorkItemQueueRequest(arg) {
  if (!(arg instanceof workitems_pb.AddWorkItemQueueRequest)) {
    throw new Error('Expected argument of type openiap.AddWorkItemQueueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_AddWorkItemQueueRequest(buffer_arg) {
  return workitems_pb.AddWorkItemQueueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_AddWorkItemQueueResponse(arg) {
  if (!(arg instanceof workitems_pb.AddWorkItemQueueResponse)) {
    throw new Error('Expected argument of type openiap.AddWorkItemQueueResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_AddWorkItemQueueResponse(buffer_arg) {
  return workitems_pb.AddWorkItemQueueResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_AggregateRequest(arg) {
  if (!(arg instanceof querys_pb.AggregateRequest)) {
    throw new Error('Expected argument of type openiap.AggregateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_AggregateRequest(buffer_arg) {
  return querys_pb.AggregateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_AggregateResponse(arg) {
  if (!(arg instanceof querys_pb.AggregateResponse)) {
    throw new Error('Expected argument of type openiap.AggregateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_AggregateResponse(buffer_arg) {
  return querys_pb.AggregateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_CountRequest(arg) {
  if (!(arg instanceof querys_pb.CountRequest)) {
    throw new Error('Expected argument of type openiap.CountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_CountRequest(buffer_arg) {
  return querys_pb.CountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_CountResponse(arg) {
  if (!(arg instanceof querys_pb.CountResponse)) {
    throw new Error('Expected argument of type openiap.CountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_CountResponse(buffer_arg) {
  return querys_pb.CountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_CustomCommandRequest(arg) {
  if (!(arg instanceof base_pb.CustomCommandRequest)) {
    throw new Error('Expected argument of type openiap.CustomCommandRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_CustomCommandRequest(buffer_arg) {
  return base_pb.CustomCommandRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_CustomCommandResponse(arg) {
  if (!(arg instanceof base_pb.CustomCommandResponse)) {
    throw new Error('Expected argument of type openiap.CustomCommandResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_CustomCommandResponse(buffer_arg) {
  return base_pb.CustomCommandResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DeleteManyRequest(arg) {
  if (!(arg instanceof querys_pb.DeleteManyRequest)) {
    throw new Error('Expected argument of type openiap.DeleteManyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DeleteManyRequest(buffer_arg) {
  return querys_pb.DeleteManyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DeleteManyResponse(arg) {
  if (!(arg instanceof querys_pb.DeleteManyResponse)) {
    throw new Error('Expected argument of type openiap.DeleteManyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DeleteManyResponse(buffer_arg) {
  return querys_pb.DeleteManyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DeleteOneRequest(arg) {
  if (!(arg instanceof querys_pb.DeleteOneRequest)) {
    throw new Error('Expected argument of type openiap.DeleteOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DeleteOneRequest(buffer_arg) {
  return querys_pb.DeleteOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DeleteOneResponse(arg) {
  if (!(arg instanceof querys_pb.DeleteOneResponse)) {
    throw new Error('Expected argument of type openiap.DeleteOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DeleteOneResponse(buffer_arg) {
  return querys_pb.DeleteOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DeleteWorkitemRequest(arg) {
  if (!(arg instanceof workitems_pb.DeleteWorkitemRequest)) {
    throw new Error('Expected argument of type openiap.DeleteWorkitemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DeleteWorkitemRequest(buffer_arg) {
  return workitems_pb.DeleteWorkitemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DeleteWorkitemResponse(arg) {
  if (!(arg instanceof workitems_pb.DeleteWorkitemResponse)) {
    throw new Error('Expected argument of type openiap.DeleteWorkitemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DeleteWorkitemResponse(buffer_arg) {
  return workitems_pb.DeleteWorkitemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DownloadRequest(arg) {
  if (!(arg instanceof base_pb.DownloadRequest)) {
    throw new Error('Expected argument of type openiap.DownloadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DownloadRequest(buffer_arg) {
  return base_pb.DownloadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DownloadResponse(arg) {
  if (!(arg instanceof base_pb.DownloadResponse)) {
    throw new Error('Expected argument of type openiap.DownloadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DownloadResponse(buffer_arg) {
  return base_pb.DownloadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DropCollectionRequest(arg) {
  if (!(arg instanceof querys_pb.DropCollectionRequest)) {
    throw new Error('Expected argument of type openiap.DropCollectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DropCollectionRequest(buffer_arg) {
  return querys_pb.DropCollectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_DropCollectionResponse(arg) {
  if (!(arg instanceof querys_pb.DropCollectionResponse)) {
    throw new Error('Expected argument of type openiap.DropCollectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_DropCollectionResponse(buffer_arg) {
  return querys_pb.DropCollectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_Envelope(arg) {
  if (!(arg instanceof base_pb.Envelope)) {
    throw new Error('Expected argument of type openiap.Envelope');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_Envelope(buffer_arg) {
  return base_pb.Envelope.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_GetDocumentVersionRequest(arg) {
  if (!(arg instanceof querys_pb.GetDocumentVersionRequest)) {
    throw new Error('Expected argument of type openiap.GetDocumentVersionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_GetDocumentVersionRequest(buffer_arg) {
  return querys_pb.GetDocumentVersionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_GetDocumentVersionResponse(arg) {
  if (!(arg instanceof querys_pb.GetDocumentVersionResponse)) {
    throw new Error('Expected argument of type openiap.GetDocumentVersionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_GetDocumentVersionResponse(buffer_arg) {
  return querys_pb.GetDocumentVersionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertManyRequest(arg) {
  if (!(arg instanceof querys_pb.InsertManyRequest)) {
    throw new Error('Expected argument of type openiap.InsertManyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertManyRequest(buffer_arg) {
  return querys_pb.InsertManyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertManyResponse(arg) {
  if (!(arg instanceof querys_pb.InsertManyResponse)) {
    throw new Error('Expected argument of type openiap.InsertManyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertManyResponse(buffer_arg) {
  return querys_pb.InsertManyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertOneRequest(arg) {
  if (!(arg instanceof querys_pb.InsertOneRequest)) {
    throw new Error('Expected argument of type openiap.InsertOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertOneRequest(buffer_arg) {
  return querys_pb.InsertOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertOneResponse(arg) {
  if (!(arg instanceof querys_pb.InsertOneResponse)) {
    throw new Error('Expected argument of type openiap.InsertOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertOneResponse(buffer_arg) {
  return querys_pb.InsertOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertOrUpdateManyRequest(arg) {
  if (!(arg instanceof querys_pb.InsertOrUpdateManyRequest)) {
    throw new Error('Expected argument of type openiap.InsertOrUpdateManyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertOrUpdateManyRequest(buffer_arg) {
  return querys_pb.InsertOrUpdateManyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertOrUpdateManyResponse(arg) {
  if (!(arg instanceof querys_pb.InsertOrUpdateManyResponse)) {
    throw new Error('Expected argument of type openiap.InsertOrUpdateManyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertOrUpdateManyResponse(buffer_arg) {
  return querys_pb.InsertOrUpdateManyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertOrUpdateOneRequest(arg) {
  if (!(arg instanceof querys_pb.InsertOrUpdateOneRequest)) {
    throw new Error('Expected argument of type openiap.InsertOrUpdateOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertOrUpdateOneRequest(buffer_arg) {
  return querys_pb.InsertOrUpdateOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_InsertOrUpdateOneResponse(arg) {
  if (!(arg instanceof querys_pb.InsertOrUpdateOneResponse)) {
    throw new Error('Expected argument of type openiap.InsertOrUpdateOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_InsertOrUpdateOneResponse(buffer_arg) {
  return querys_pb.InsertOrUpdateOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_ListCollectionsRequest(arg) {
  if (!(arg instanceof querys_pb.ListCollectionsRequest)) {
    throw new Error('Expected argument of type openiap.ListCollectionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_ListCollectionsRequest(buffer_arg) {
  return querys_pb.ListCollectionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_ListCollectionsResponse(arg) {
  if (!(arg instanceof querys_pb.ListCollectionsResponse)) {
    throw new Error('Expected argument of type openiap.ListCollectionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_ListCollectionsResponse(buffer_arg) {
  return querys_pb.ListCollectionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_PopWorkitemRequest(arg) {
  if (!(arg instanceof workitems_pb.PopWorkitemRequest)) {
    throw new Error('Expected argument of type openiap.PopWorkitemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_PopWorkitemRequest(buffer_arg) {
  return workitems_pb.PopWorkitemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_PopWorkitemResponse(arg) {
  if (!(arg instanceof workitems_pb.PopWorkitemResponse)) {
    throw new Error('Expected argument of type openiap.PopWorkitemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_PopWorkitemResponse(buffer_arg) {
  return workitems_pb.PopWorkitemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_PushWorkitemRequest(arg) {
  if (!(arg instanceof workitems_pb.PushWorkitemRequest)) {
    throw new Error('Expected argument of type openiap.PushWorkitemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_PushWorkitemRequest(buffer_arg) {
  return workitems_pb.PushWorkitemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_PushWorkitemResponse(arg) {
  if (!(arg instanceof workitems_pb.PushWorkitemResponse)) {
    throw new Error('Expected argument of type openiap.PushWorkitemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_PushWorkitemResponse(buffer_arg) {
  return workitems_pb.PushWorkitemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_PushWorkitemsRequest(arg) {
  if (!(arg instanceof workitems_pb.PushWorkitemsRequest)) {
    throw new Error('Expected argument of type openiap.PushWorkitemsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_PushWorkitemsRequest(buffer_arg) {
  return workitems_pb.PushWorkitemsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_PushWorkitemsResponse(arg) {
  if (!(arg instanceof workitems_pb.PushWorkitemsResponse)) {
    throw new Error('Expected argument of type openiap.PushWorkitemsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_PushWorkitemsResponse(buffer_arg) {
  return workitems_pb.PushWorkitemsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_QueryRequest(arg) {
  if (!(arg instanceof querys_pb.QueryRequest)) {
    throw new Error('Expected argument of type openiap.QueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_QueryRequest(buffer_arg) {
  return querys_pb.QueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_QueryResponse(arg) {
  if (!(arg instanceof querys_pb.QueryResponse)) {
    throw new Error('Expected argument of type openiap.QueryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_QueryResponse(buffer_arg) {
  return querys_pb.QueryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_QueueMessageRequest(arg) {
  if (!(arg instanceof queues_pb.QueueMessageRequest)) {
    throw new Error('Expected argument of type openiap.QueueMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_QueueMessageRequest(buffer_arg) {
  return queues_pb.QueueMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_QueueMessageResponse(arg) {
  if (!(arg instanceof queues_pb.QueueMessageResponse)) {
    throw new Error('Expected argument of type openiap.QueueMessageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_QueueMessageResponse(buffer_arg) {
  return queues_pb.QueueMessageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_RegisterExchangeRequest(arg) {
  if (!(arg instanceof queues_pb.RegisterExchangeRequest)) {
    throw new Error('Expected argument of type openiap.RegisterExchangeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_RegisterExchangeRequest(buffer_arg) {
  return queues_pb.RegisterExchangeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_RegisterExchangeResponse(arg) {
  if (!(arg instanceof queues_pb.RegisterExchangeResponse)) {
    throw new Error('Expected argument of type openiap.RegisterExchangeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_RegisterExchangeResponse(buffer_arg) {
  return queues_pb.RegisterExchangeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_RegisterQueueRequest(arg) {
  if (!(arg instanceof queues_pb.RegisterQueueRequest)) {
    throw new Error('Expected argument of type openiap.RegisterQueueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_RegisterQueueRequest(buffer_arg) {
  return queues_pb.RegisterQueueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_RegisterQueueResponse(arg) {
  if (!(arg instanceof queues_pb.RegisterQueueResponse)) {
    throw new Error('Expected argument of type openiap.RegisterQueueResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_RegisterQueueResponse(buffer_arg) {
  return queues_pb.RegisterQueueResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_SigninRequest(arg) {
  if (!(arg instanceof base_pb.SigninRequest)) {
    throw new Error('Expected argument of type openiap.SigninRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_SigninRequest(buffer_arg) {
  return base_pb.SigninRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_SigninResponse(arg) {
  if (!(arg instanceof base_pb.SigninResponse)) {
    throw new Error('Expected argument of type openiap.SigninResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_SigninResponse(buffer_arg) {
  return base_pb.SigninResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UnRegisterQueueRequest(arg) {
  if (!(arg instanceof queues_pb.UnRegisterQueueRequest)) {
    throw new Error('Expected argument of type openiap.UnRegisterQueueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UnRegisterQueueRequest(buffer_arg) {
  return queues_pb.UnRegisterQueueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UnRegisterQueueResponse(arg) {
  if (!(arg instanceof queues_pb.UnRegisterQueueResponse)) {
    throw new Error('Expected argument of type openiap.UnRegisterQueueResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UnRegisterQueueResponse(buffer_arg) {
  return queues_pb.UnRegisterQueueResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UnWatchRequest(arg) {
  if (!(arg instanceof watch_pb.UnWatchRequest)) {
    throw new Error('Expected argument of type openiap.UnWatchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UnWatchRequest(buffer_arg) {
  return watch_pb.UnWatchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UnWatchResponse(arg) {
  if (!(arg instanceof watch_pb.UnWatchResponse)) {
    throw new Error('Expected argument of type openiap.UnWatchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UnWatchResponse(buffer_arg) {
  return watch_pb.UnWatchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UpdateDocumentRequest(arg) {
  if (!(arg instanceof querys_pb.UpdateDocumentRequest)) {
    throw new Error('Expected argument of type openiap.UpdateDocumentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UpdateDocumentRequest(buffer_arg) {
  return querys_pb.UpdateDocumentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UpdateDocumentResponse(arg) {
  if (!(arg instanceof querys_pb.UpdateDocumentResponse)) {
    throw new Error('Expected argument of type openiap.UpdateDocumentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UpdateDocumentResponse(buffer_arg) {
  return querys_pb.UpdateDocumentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UpdateOneRequest(arg) {
  if (!(arg instanceof querys_pb.UpdateOneRequest)) {
    throw new Error('Expected argument of type openiap.UpdateOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UpdateOneRequest(buffer_arg) {
  return querys_pb.UpdateOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UpdateOneResponse(arg) {
  if (!(arg instanceof querys_pb.UpdateOneResponse)) {
    throw new Error('Expected argument of type openiap.UpdateOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UpdateOneResponse(buffer_arg) {
  return querys_pb.UpdateOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UpdateWorkitemRequest(arg) {
  if (!(arg instanceof workitems_pb.UpdateWorkitemRequest)) {
    throw new Error('Expected argument of type openiap.UpdateWorkitemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UpdateWorkitemRequest(buffer_arg) {
  return workitems_pb.UpdateWorkitemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UpdateWorkitemResponse(arg) {
  if (!(arg instanceof workitems_pb.UpdateWorkitemResponse)) {
    throw new Error('Expected argument of type openiap.UpdateWorkitemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UpdateWorkitemResponse(buffer_arg) {
  return workitems_pb.UpdateWorkitemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UploadRequest(arg) {
  if (!(arg instanceof base_pb.UploadRequest)) {
    throw new Error('Expected argument of type openiap.UploadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UploadRequest(buffer_arg) {
  return base_pb.UploadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_UploadResponse(arg) {
  if (!(arg instanceof base_pb.UploadResponse)) {
    throw new Error('Expected argument of type openiap.UploadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_UploadResponse(buffer_arg) {
  return base_pb.UploadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_WatchRequest(arg) {
  if (!(arg instanceof watch_pb.WatchRequest)) {
    throw new Error('Expected argument of type openiap.WatchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_WatchRequest(buffer_arg) {
  return watch_pb.WatchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_openiap_WatchResponse(arg) {
  if (!(arg instanceof watch_pb.WatchResponse)) {
    throw new Error('Expected argument of type openiap.WatchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_openiap_WatchResponse(buffer_arg) {
  return watch_pb.WatchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FlowServiceService = exports.FlowServiceService = {
  setupStream: {
    path: '/openiap.FlowService/SetupStream',
    requestStream: true,
    responseStream: true,
    requestType: base_pb.Envelope,
    responseType: base_pb.Envelope,
    requestSerialize: serialize_openiap_Envelope,
    requestDeserialize: deserialize_openiap_Envelope,
    responseSerialize: serialize_openiap_Envelope,
    responseDeserialize: deserialize_openiap_Envelope,
  },
  signin: {
    path: '/openiap.FlowService/Signin',
    requestStream: false,
    responseStream: false,
    requestType: base_pb.SigninRequest,
    responseType: base_pb.SigninResponse,
    requestSerialize: serialize_openiap_SigninRequest,
    requestDeserialize: deserialize_openiap_SigninRequest,
    responseSerialize: serialize_openiap_SigninResponse,
    responseDeserialize: deserialize_openiap_SigninResponse,
  },
  download: {
    path: '/openiap.FlowService/Download',
    requestStream: false,
    responseStream: false,
    requestType: base_pb.DownloadRequest,
    responseType: base_pb.DownloadResponse,
    requestSerialize: serialize_openiap_DownloadRequest,
    requestDeserialize: deserialize_openiap_DownloadRequest,
    responseSerialize: serialize_openiap_DownloadResponse,
    responseDeserialize: deserialize_openiap_DownloadResponse,
  },
  upload: {
    path: '/openiap.FlowService/Upload',
    requestStream: false,
    responseStream: false,
    requestType: base_pb.UploadRequest,
    responseType: base_pb.UploadResponse,
    requestSerialize: serialize_openiap_UploadRequest,
    requestDeserialize: deserialize_openiap_UploadRequest,
    responseSerialize: serialize_openiap_UploadResponse,
    responseDeserialize: deserialize_openiap_UploadResponse,
  },
  customCommand: {
    path: '/openiap.FlowService/CustomCommand',
    requestStream: false,
    responseStream: false,
    requestType: base_pb.CustomCommandRequest,
    responseType: base_pb.CustomCommandResponse,
    requestSerialize: serialize_openiap_CustomCommandRequest,
    requestDeserialize: deserialize_openiap_CustomCommandRequest,
    responseSerialize: serialize_openiap_CustomCommandResponse,
    responseDeserialize: deserialize_openiap_CustomCommandResponse,
  },
  listCollections: {
    path: '/openiap.FlowService/ListCollections',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.ListCollectionsRequest,
    responseType: querys_pb.ListCollectionsResponse,
    requestSerialize: serialize_openiap_ListCollectionsRequest,
    requestDeserialize: deserialize_openiap_ListCollectionsRequest,
    responseSerialize: serialize_openiap_ListCollectionsResponse,
    responseDeserialize: deserialize_openiap_ListCollectionsResponse,
  },
  dropCollection: {
    path: '/openiap.FlowService/DropCollection',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.DropCollectionRequest,
    responseType: querys_pb.DropCollectionResponse,
    requestSerialize: serialize_openiap_DropCollectionRequest,
    requestDeserialize: deserialize_openiap_DropCollectionRequest,
    responseSerialize: serialize_openiap_DropCollectionResponse,
    responseDeserialize: deserialize_openiap_DropCollectionResponse,
  },
  query: {
    path: '/openiap.FlowService/Query',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.QueryRequest,
    responseType: querys_pb.QueryResponse,
    requestSerialize: serialize_openiap_QueryRequest,
    requestDeserialize: deserialize_openiap_QueryRequest,
    responseSerialize: serialize_openiap_QueryResponse,
    responseDeserialize: deserialize_openiap_QueryResponse,
  },
  getDocumentVersion: {
    path: '/openiap.FlowService/GetDocumentVersion',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.GetDocumentVersionRequest,
    responseType: querys_pb.GetDocumentVersionResponse,
    requestSerialize: serialize_openiap_GetDocumentVersionRequest,
    requestDeserialize: deserialize_openiap_GetDocumentVersionRequest,
    responseSerialize: serialize_openiap_GetDocumentVersionResponse,
    responseDeserialize: deserialize_openiap_GetDocumentVersionResponse,
  },
  aggregate: {
    path: '/openiap.FlowService/Aggregate',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.AggregateRequest,
    responseType: querys_pb.AggregateResponse,
    requestSerialize: serialize_openiap_AggregateRequest,
    requestDeserialize: deserialize_openiap_AggregateRequest,
    responseSerialize: serialize_openiap_AggregateResponse,
    responseDeserialize: deserialize_openiap_AggregateResponse,
  },
  count: {
    path: '/openiap.FlowService/Count',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.CountRequest,
    responseType: querys_pb.CountResponse,
    requestSerialize: serialize_openiap_CountRequest,
    requestDeserialize: deserialize_openiap_CountRequest,
    responseSerialize: serialize_openiap_CountResponse,
    responseDeserialize: deserialize_openiap_CountResponse,
  },
  insertOne: {
    path: '/openiap.FlowService/InsertOne',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.InsertOneRequest,
    responseType: querys_pb.InsertOneResponse,
    requestSerialize: serialize_openiap_InsertOneRequest,
    requestDeserialize: deserialize_openiap_InsertOneRequest,
    responseSerialize: serialize_openiap_InsertOneResponse,
    responseDeserialize: deserialize_openiap_InsertOneResponse,
  },
  insertMany: {
    path: '/openiap.FlowService/InsertMany',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.InsertManyRequest,
    responseType: querys_pb.InsertManyResponse,
    requestSerialize: serialize_openiap_InsertManyRequest,
    requestDeserialize: deserialize_openiap_InsertManyRequest,
    responseSerialize: serialize_openiap_InsertManyResponse,
    responseDeserialize: deserialize_openiap_InsertManyResponse,
  },
  updateOne: {
    path: '/openiap.FlowService/UpdateOne',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.UpdateOneRequest,
    responseType: querys_pb.UpdateOneResponse,
    requestSerialize: serialize_openiap_UpdateOneRequest,
    requestDeserialize: deserialize_openiap_UpdateOneRequest,
    responseSerialize: serialize_openiap_UpdateOneResponse,
    responseDeserialize: deserialize_openiap_UpdateOneResponse,
  },
  updateDocument: {
    path: '/openiap.FlowService/UpdateDocument',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.UpdateDocumentRequest,
    responseType: querys_pb.UpdateDocumentResponse,
    requestSerialize: serialize_openiap_UpdateDocumentRequest,
    requestDeserialize: deserialize_openiap_UpdateDocumentRequest,
    responseSerialize: serialize_openiap_UpdateDocumentResponse,
    responseDeserialize: deserialize_openiap_UpdateDocumentResponse,
  },
  insertOrUpdateOne: {
    path: '/openiap.FlowService/InsertOrUpdateOne',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.InsertOrUpdateOneRequest,
    responseType: querys_pb.InsertOrUpdateOneResponse,
    requestSerialize: serialize_openiap_InsertOrUpdateOneRequest,
    requestDeserialize: deserialize_openiap_InsertOrUpdateOneRequest,
    responseSerialize: serialize_openiap_InsertOrUpdateOneResponse,
    responseDeserialize: deserialize_openiap_InsertOrUpdateOneResponse,
  },
  insertOrUpdateMany: {
    path: '/openiap.FlowService/InsertOrUpdateMany',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.InsertOrUpdateManyRequest,
    responseType: querys_pb.InsertOrUpdateManyResponse,
    requestSerialize: serialize_openiap_InsertOrUpdateManyRequest,
    requestDeserialize: deserialize_openiap_InsertOrUpdateManyRequest,
    responseSerialize: serialize_openiap_InsertOrUpdateManyResponse,
    responseDeserialize: deserialize_openiap_InsertOrUpdateManyResponse,
  },
  deleteOne: {
    path: '/openiap.FlowService/DeleteOne',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.DeleteOneRequest,
    responseType: querys_pb.DeleteOneResponse,
    requestSerialize: serialize_openiap_DeleteOneRequest,
    requestDeserialize: deserialize_openiap_DeleteOneRequest,
    responseSerialize: serialize_openiap_DeleteOneResponse,
    responseDeserialize: deserialize_openiap_DeleteOneResponse,
  },
  deleteMany: {
    path: '/openiap.FlowService/DeleteMany',
    requestStream: false,
    responseStream: false,
    requestType: querys_pb.DeleteManyRequest,
    responseType: querys_pb.DeleteManyResponse,
    requestSerialize: serialize_openiap_DeleteManyRequest,
    requestDeserialize: deserialize_openiap_DeleteManyRequest,
    responseSerialize: serialize_openiap_DeleteManyResponse,
    responseDeserialize: deserialize_openiap_DeleteManyResponse,
  },
  registerQueue: {
    path: '/openiap.FlowService/RegisterQueue',
    requestStream: false,
    responseStream: false,
    requestType: queues_pb.RegisterQueueRequest,
    responseType: queues_pb.RegisterQueueResponse,
    requestSerialize: serialize_openiap_RegisterQueueRequest,
    requestDeserialize: deserialize_openiap_RegisterQueueRequest,
    responseSerialize: serialize_openiap_RegisterQueueResponse,
    responseDeserialize: deserialize_openiap_RegisterQueueResponse,
  },
  registerExchange: {
    path: '/openiap.FlowService/RegisterExchange',
    requestStream: false,
    responseStream: false,
    requestType: queues_pb.RegisterExchangeRequest,
    responseType: queues_pb.RegisterExchangeResponse,
    requestSerialize: serialize_openiap_RegisterExchangeRequest,
    requestDeserialize: deserialize_openiap_RegisterExchangeRequest,
    responseSerialize: serialize_openiap_RegisterExchangeResponse,
    responseDeserialize: deserialize_openiap_RegisterExchangeResponse,
  },
  queueMessage: {
    path: '/openiap.FlowService/QueueMessage',
    requestStream: false,
    responseStream: false,
    requestType: queues_pb.QueueMessageRequest,
    responseType: queues_pb.QueueMessageResponse,
    requestSerialize: serialize_openiap_QueueMessageRequest,
    requestDeserialize: deserialize_openiap_QueueMessageRequest,
    responseSerialize: serialize_openiap_QueueMessageResponse,
    responseDeserialize: deserialize_openiap_QueueMessageResponse,
  },
  unRegisterQueue: {
    path: '/openiap.FlowService/UnRegisterQueue',
    requestStream: false,
    responseStream: false,
    requestType: queues_pb.UnRegisterQueueRequest,
    responseType: queues_pb.UnRegisterQueueResponse,
    requestSerialize: serialize_openiap_UnRegisterQueueRequest,
    requestDeserialize: deserialize_openiap_UnRegisterQueueRequest,
    responseSerialize: serialize_openiap_UnRegisterQueueResponse,
    responseDeserialize: deserialize_openiap_UnRegisterQueueResponse,
  },
  watch: {
    path: '/openiap.FlowService/Watch',
    requestStream: false,
    responseStream: false,
    requestType: watch_pb.WatchRequest,
    responseType: watch_pb.WatchResponse,
    requestSerialize: serialize_openiap_WatchRequest,
    requestDeserialize: deserialize_openiap_WatchRequest,
    responseSerialize: serialize_openiap_WatchResponse,
    responseDeserialize: deserialize_openiap_WatchResponse,
  },
  unWatch: {
    path: '/openiap.FlowService/UnWatch',
    requestStream: false,
    responseStream: false,
    requestType: watch_pb.UnWatchRequest,
    responseType: watch_pb.UnWatchResponse,
    requestSerialize: serialize_openiap_UnWatchRequest,
    requestDeserialize: deserialize_openiap_UnWatchRequest,
    responseSerialize: serialize_openiap_UnWatchResponse,
    responseDeserialize: deserialize_openiap_UnWatchResponse,
  },
  pushWorkitem: {
    path: '/openiap.FlowService/PushWorkitem',
    requestStream: false,
    responseStream: false,
    requestType: workitems_pb.PushWorkitemRequest,
    responseType: workitems_pb.PushWorkitemResponse,
    requestSerialize: serialize_openiap_PushWorkitemRequest,
    requestDeserialize: deserialize_openiap_PushWorkitemRequest,
    responseSerialize: serialize_openiap_PushWorkitemResponse,
    responseDeserialize: deserialize_openiap_PushWorkitemResponse,
  },
  pushWorkitems: {
    path: '/openiap.FlowService/PushWorkitems',
    requestStream: false,
    responseStream: false,
    requestType: workitems_pb.PushWorkitemsRequest,
    responseType: workitems_pb.PushWorkitemsResponse,
    requestSerialize: serialize_openiap_PushWorkitemsRequest,
    requestDeserialize: deserialize_openiap_PushWorkitemsRequest,
    responseSerialize: serialize_openiap_PushWorkitemsResponse,
    responseDeserialize: deserialize_openiap_PushWorkitemsResponse,
  },
  updateWorkitem: {
    path: '/openiap.FlowService/UpdateWorkitem',
    requestStream: false,
    responseStream: false,
    requestType: workitems_pb.UpdateWorkitemRequest,
    responseType: workitems_pb.UpdateWorkitemResponse,
    requestSerialize: serialize_openiap_UpdateWorkitemRequest,
    requestDeserialize: deserialize_openiap_UpdateWorkitemRequest,
    responseSerialize: serialize_openiap_UpdateWorkitemResponse,
    responseDeserialize: deserialize_openiap_UpdateWorkitemResponse,
  },
  popWorkitem: {
    path: '/openiap.FlowService/PopWorkitem',
    requestStream: false,
    responseStream: false,
    requestType: workitems_pb.PopWorkitemRequest,
    responseType: workitems_pb.PopWorkitemResponse,
    requestSerialize: serialize_openiap_PopWorkitemRequest,
    requestDeserialize: deserialize_openiap_PopWorkitemRequest,
    responseSerialize: serialize_openiap_PopWorkitemResponse,
    responseDeserialize: deserialize_openiap_PopWorkitemResponse,
  },
  deleteWorkitem: {
    path: '/openiap.FlowService/DeleteWorkitem',
    requestStream: false,
    responseStream: false,
    requestType: workitems_pb.DeleteWorkitemRequest,
    responseType: workitems_pb.DeleteWorkitemResponse,
    requestSerialize: serialize_openiap_DeleteWorkitemRequest,
    requestDeserialize: deserialize_openiap_DeleteWorkitemRequest,
    responseSerialize: serialize_openiap_DeleteWorkitemResponse,
    responseDeserialize: deserialize_openiap_DeleteWorkitemResponse,
  },
  addWorkItemQueue: {
    path: '/openiap.FlowService/AddWorkItemQueue',
    requestStream: false,
    responseStream: false,
    requestType: workitems_pb.AddWorkItemQueueRequest,
    responseType: workitems_pb.AddWorkItemQueueResponse,
    requestSerialize: serialize_openiap_AddWorkItemQueueRequest,
    requestDeserialize: deserialize_openiap_AddWorkItemQueueRequest,
    responseSerialize: serialize_openiap_AddWorkItemQueueResponse,
    responseDeserialize: deserialize_openiap_AddWorkItemQueueResponse,
  },
};

exports.FlowServiceClient = grpc.makeGenericClientConstructor(FlowServiceService);
