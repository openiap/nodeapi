// GENERATED CODE -- DO NOT EDIT!

// package: openiap
// file: base.proto

import * as base_pb from "./base_pb";
import * as querys_pb from "./querys_pb";
import * as queues_pb from "./queues_pb";
import * as watch_pb from "./watch_pb";
import * as workitems_pb from "./workitems_pb";
import * as grpc from "@grpc/grpc-js";

interface IFlowServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  setupStream: grpc.MethodDefinition<base_pb.Envelope, base_pb.Envelope>;
  signin: grpc.MethodDefinition<base_pb.SigninRequest, base_pb.SigninResponse>;
  download: grpc.MethodDefinition<base_pb.DownloadRequest, base_pb.DownloadResponse>;
  upload: grpc.MethodDefinition<base_pb.UploadRequest, base_pb.UploadResponse>;
  customCommand: grpc.MethodDefinition<base_pb.CustomCommandRequest, base_pb.CustomCommandResponse>;
  listCollections: grpc.MethodDefinition<querys_pb.ListCollectionsRequest, querys_pb.ListCollectionsResponse>;
  dropCollection: grpc.MethodDefinition<querys_pb.DropCollectionRequest, querys_pb.DropCollectionResponse>;
  createCollection: grpc.MethodDefinition<querys_pb.CreateCollectionRequest, querys_pb.CreateCollectionResponse>;
  query: grpc.MethodDefinition<querys_pb.QueryRequest, querys_pb.QueryResponse>;
  getDocumentVersion: grpc.MethodDefinition<querys_pb.GetDocumentVersionRequest, querys_pb.GetDocumentVersionResponse>;
  aggregate: grpc.MethodDefinition<querys_pb.AggregateRequest, querys_pb.AggregateResponse>;
  count: grpc.MethodDefinition<querys_pb.CountRequest, querys_pb.CountResponse>;
  insertOne: grpc.MethodDefinition<querys_pb.InsertOneRequest, querys_pb.InsertOneResponse>;
  insertMany: grpc.MethodDefinition<querys_pb.InsertManyRequest, querys_pb.InsertManyResponse>;
  updateOne: grpc.MethodDefinition<querys_pb.UpdateOneRequest, querys_pb.UpdateOneResponse>;
  updateDocument: grpc.MethodDefinition<querys_pb.UpdateDocumentRequest, querys_pb.UpdateDocumentResponse>;
  insertOrUpdateOne: grpc.MethodDefinition<querys_pb.InsertOrUpdateOneRequest, querys_pb.InsertOrUpdateOneResponse>;
  insertOrUpdateMany: grpc.MethodDefinition<querys_pb.InsertOrUpdateManyRequest, querys_pb.InsertOrUpdateManyResponse>;
  deleteOne: grpc.MethodDefinition<querys_pb.DeleteOneRequest, querys_pb.DeleteOneResponse>;
  deleteMany: grpc.MethodDefinition<querys_pb.DeleteManyRequest, querys_pb.DeleteManyResponse>;
  registerQueue: grpc.MethodDefinition<queues_pb.RegisterQueueRequest, queues_pb.RegisterQueueResponse>;
  registerExchange: grpc.MethodDefinition<queues_pb.RegisterExchangeRequest, queues_pb.RegisterExchangeResponse>;
  queueMessage: grpc.MethodDefinition<queues_pb.QueueMessageRequest, queues_pb.QueueMessageResponse>;
  unRegisterQueue: grpc.MethodDefinition<queues_pb.UnRegisterQueueRequest, queues_pb.UnRegisterQueueResponse>;
  watch: grpc.MethodDefinition<watch_pb.WatchRequest, watch_pb.WatchResponse>;
  unWatch: grpc.MethodDefinition<watch_pb.UnWatchRequest, watch_pb.UnWatchResponse>;
  pushWorkitem: grpc.MethodDefinition<workitems_pb.PushWorkitemRequest, workitems_pb.PushWorkitemResponse>;
  pushWorkitems: grpc.MethodDefinition<workitems_pb.PushWorkitemsRequest, workitems_pb.PushWorkitemsResponse>;
  updateWorkitem: grpc.MethodDefinition<workitems_pb.UpdateWorkitemRequest, workitems_pb.UpdateWorkitemResponse>;
  popWorkitem: grpc.MethodDefinition<workitems_pb.PopWorkitemRequest, workitems_pb.PopWorkitemResponse>;
  deleteWorkitem: grpc.MethodDefinition<workitems_pb.DeleteWorkitemRequest, workitems_pb.DeleteWorkitemResponse>;
  addWorkItemQueue: grpc.MethodDefinition<workitems_pb.AddWorkItemQueueRequest, workitems_pb.AddWorkItemQueueResponse>;
  ensureCustomer: grpc.MethodDefinition<base_pb.EnsureCustomerRequest, base_pb.EnsureCustomerResponse>;
}

export const FlowServiceService: IFlowServiceService;

export interface IFlowServiceServer extends grpc.UntypedServiceImplementation {
  setupStream: grpc.handleBidiStreamingCall<base_pb.Envelope, base_pb.Envelope>;
  signin: grpc.handleUnaryCall<base_pb.SigninRequest, base_pb.SigninResponse>;
  download: grpc.handleUnaryCall<base_pb.DownloadRequest, base_pb.DownloadResponse>;
  upload: grpc.handleUnaryCall<base_pb.UploadRequest, base_pb.UploadResponse>;
  customCommand: grpc.handleUnaryCall<base_pb.CustomCommandRequest, base_pb.CustomCommandResponse>;
  listCollections: grpc.handleUnaryCall<querys_pb.ListCollectionsRequest, querys_pb.ListCollectionsResponse>;
  dropCollection: grpc.handleUnaryCall<querys_pb.DropCollectionRequest, querys_pb.DropCollectionResponse>;
  createCollection: grpc.handleUnaryCall<querys_pb.CreateCollectionRequest, querys_pb.CreateCollectionResponse>;
  query: grpc.handleUnaryCall<querys_pb.QueryRequest, querys_pb.QueryResponse>;
  getDocumentVersion: grpc.handleUnaryCall<querys_pb.GetDocumentVersionRequest, querys_pb.GetDocumentVersionResponse>;
  aggregate: grpc.handleUnaryCall<querys_pb.AggregateRequest, querys_pb.AggregateResponse>;
  count: grpc.handleUnaryCall<querys_pb.CountRequest, querys_pb.CountResponse>;
  insertOne: grpc.handleUnaryCall<querys_pb.InsertOneRequest, querys_pb.InsertOneResponse>;
  insertMany: grpc.handleUnaryCall<querys_pb.InsertManyRequest, querys_pb.InsertManyResponse>;
  updateOne: grpc.handleUnaryCall<querys_pb.UpdateOneRequest, querys_pb.UpdateOneResponse>;
  updateDocument: grpc.handleUnaryCall<querys_pb.UpdateDocumentRequest, querys_pb.UpdateDocumentResponse>;
  insertOrUpdateOne: grpc.handleUnaryCall<querys_pb.InsertOrUpdateOneRequest, querys_pb.InsertOrUpdateOneResponse>;
  insertOrUpdateMany: grpc.handleUnaryCall<querys_pb.InsertOrUpdateManyRequest, querys_pb.InsertOrUpdateManyResponse>;
  deleteOne: grpc.handleUnaryCall<querys_pb.DeleteOneRequest, querys_pb.DeleteOneResponse>;
  deleteMany: grpc.handleUnaryCall<querys_pb.DeleteManyRequest, querys_pb.DeleteManyResponse>;
  registerQueue: grpc.handleUnaryCall<queues_pb.RegisterQueueRequest, queues_pb.RegisterQueueResponse>;
  registerExchange: grpc.handleUnaryCall<queues_pb.RegisterExchangeRequest, queues_pb.RegisterExchangeResponse>;
  queueMessage: grpc.handleUnaryCall<queues_pb.QueueMessageRequest, queues_pb.QueueMessageResponse>;
  unRegisterQueue: grpc.handleUnaryCall<queues_pb.UnRegisterQueueRequest, queues_pb.UnRegisterQueueResponse>;
  watch: grpc.handleUnaryCall<watch_pb.WatchRequest, watch_pb.WatchResponse>;
  unWatch: grpc.handleUnaryCall<watch_pb.UnWatchRequest, watch_pb.UnWatchResponse>;
  pushWorkitem: grpc.handleUnaryCall<workitems_pb.PushWorkitemRequest, workitems_pb.PushWorkitemResponse>;
  pushWorkitems: grpc.handleUnaryCall<workitems_pb.PushWorkitemsRequest, workitems_pb.PushWorkitemsResponse>;
  updateWorkitem: grpc.handleUnaryCall<workitems_pb.UpdateWorkitemRequest, workitems_pb.UpdateWorkitemResponse>;
  popWorkitem: grpc.handleUnaryCall<workitems_pb.PopWorkitemRequest, workitems_pb.PopWorkitemResponse>;
  deleteWorkitem: grpc.handleUnaryCall<workitems_pb.DeleteWorkitemRequest, workitems_pb.DeleteWorkitemResponse>;
  addWorkItemQueue: grpc.handleUnaryCall<workitems_pb.AddWorkItemQueueRequest, workitems_pb.AddWorkItemQueueResponse>;
  ensureCustomer: grpc.handleUnaryCall<base_pb.EnsureCustomerRequest, base_pb.EnsureCustomerResponse>;
}

export class FlowServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  setupStream(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<base_pb.Envelope, base_pb.Envelope>;
  setupStream(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<base_pb.Envelope, base_pb.Envelope>;
  signin(argument: base_pb.SigninRequest, callback: grpc.requestCallback<base_pb.SigninResponse>): grpc.ClientUnaryCall;
  signin(argument: base_pb.SigninRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.SigninResponse>): grpc.ClientUnaryCall;
  signin(argument: base_pb.SigninRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.SigninResponse>): grpc.ClientUnaryCall;
  download(argument: base_pb.DownloadRequest, callback: grpc.requestCallback<base_pb.DownloadResponse>): grpc.ClientUnaryCall;
  download(argument: base_pb.DownloadRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.DownloadResponse>): grpc.ClientUnaryCall;
  download(argument: base_pb.DownloadRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.DownloadResponse>): grpc.ClientUnaryCall;
  upload(argument: base_pb.UploadRequest, callback: grpc.requestCallback<base_pb.UploadResponse>): grpc.ClientUnaryCall;
  upload(argument: base_pb.UploadRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.UploadResponse>): grpc.ClientUnaryCall;
  upload(argument: base_pb.UploadRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.UploadResponse>): grpc.ClientUnaryCall;
  customCommand(argument: base_pb.CustomCommandRequest, callback: grpc.requestCallback<base_pb.CustomCommandResponse>): grpc.ClientUnaryCall;
  customCommand(argument: base_pb.CustomCommandRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.CustomCommandResponse>): grpc.ClientUnaryCall;
  customCommand(argument: base_pb.CustomCommandRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.CustomCommandResponse>): grpc.ClientUnaryCall;
  listCollections(argument: querys_pb.ListCollectionsRequest, callback: grpc.requestCallback<querys_pb.ListCollectionsResponse>): grpc.ClientUnaryCall;
  listCollections(argument: querys_pb.ListCollectionsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.ListCollectionsResponse>): grpc.ClientUnaryCall;
  listCollections(argument: querys_pb.ListCollectionsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.ListCollectionsResponse>): grpc.ClientUnaryCall;
  dropCollection(argument: querys_pb.DropCollectionRequest, callback: grpc.requestCallback<querys_pb.DropCollectionResponse>): grpc.ClientUnaryCall;
  dropCollection(argument: querys_pb.DropCollectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.DropCollectionResponse>): grpc.ClientUnaryCall;
  dropCollection(argument: querys_pb.DropCollectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.DropCollectionResponse>): grpc.ClientUnaryCall;
  createCollection(argument: querys_pb.CreateCollectionRequest, callback: grpc.requestCallback<querys_pb.CreateCollectionResponse>): grpc.ClientUnaryCall;
  createCollection(argument: querys_pb.CreateCollectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.CreateCollectionResponse>): grpc.ClientUnaryCall;
  createCollection(argument: querys_pb.CreateCollectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.CreateCollectionResponse>): grpc.ClientUnaryCall;
  query(argument: querys_pb.QueryRequest, callback: grpc.requestCallback<querys_pb.QueryResponse>): grpc.ClientUnaryCall;
  query(argument: querys_pb.QueryRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.QueryResponse>): grpc.ClientUnaryCall;
  query(argument: querys_pb.QueryRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.QueryResponse>): grpc.ClientUnaryCall;
  getDocumentVersion(argument: querys_pb.GetDocumentVersionRequest, callback: grpc.requestCallback<querys_pb.GetDocumentVersionResponse>): grpc.ClientUnaryCall;
  getDocumentVersion(argument: querys_pb.GetDocumentVersionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.GetDocumentVersionResponse>): grpc.ClientUnaryCall;
  getDocumentVersion(argument: querys_pb.GetDocumentVersionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.GetDocumentVersionResponse>): grpc.ClientUnaryCall;
  aggregate(argument: querys_pb.AggregateRequest, callback: grpc.requestCallback<querys_pb.AggregateResponse>): grpc.ClientUnaryCall;
  aggregate(argument: querys_pb.AggregateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.AggregateResponse>): grpc.ClientUnaryCall;
  aggregate(argument: querys_pb.AggregateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.AggregateResponse>): grpc.ClientUnaryCall;
  count(argument: querys_pb.CountRequest, callback: grpc.requestCallback<querys_pb.CountResponse>): grpc.ClientUnaryCall;
  count(argument: querys_pb.CountRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.CountResponse>): grpc.ClientUnaryCall;
  count(argument: querys_pb.CountRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.CountResponse>): grpc.ClientUnaryCall;
  insertOne(argument: querys_pb.InsertOneRequest, callback: grpc.requestCallback<querys_pb.InsertOneResponse>): grpc.ClientUnaryCall;
  insertOne(argument: querys_pb.InsertOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertOneResponse>): grpc.ClientUnaryCall;
  insertOne(argument: querys_pb.InsertOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertOneResponse>): grpc.ClientUnaryCall;
  insertMany(argument: querys_pb.InsertManyRequest, callback: grpc.requestCallback<querys_pb.InsertManyResponse>): grpc.ClientUnaryCall;
  insertMany(argument: querys_pb.InsertManyRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertManyResponse>): grpc.ClientUnaryCall;
  insertMany(argument: querys_pb.InsertManyRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertManyResponse>): grpc.ClientUnaryCall;
  updateOne(argument: querys_pb.UpdateOneRequest, callback: grpc.requestCallback<querys_pb.UpdateOneResponse>): grpc.ClientUnaryCall;
  updateOne(argument: querys_pb.UpdateOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.UpdateOneResponse>): grpc.ClientUnaryCall;
  updateOne(argument: querys_pb.UpdateOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.UpdateOneResponse>): grpc.ClientUnaryCall;
  updateDocument(argument: querys_pb.UpdateDocumentRequest, callback: grpc.requestCallback<querys_pb.UpdateDocumentResponse>): grpc.ClientUnaryCall;
  updateDocument(argument: querys_pb.UpdateDocumentRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.UpdateDocumentResponse>): grpc.ClientUnaryCall;
  updateDocument(argument: querys_pb.UpdateDocumentRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.UpdateDocumentResponse>): grpc.ClientUnaryCall;
  insertOrUpdateOne(argument: querys_pb.InsertOrUpdateOneRequest, callback: grpc.requestCallback<querys_pb.InsertOrUpdateOneResponse>): grpc.ClientUnaryCall;
  insertOrUpdateOne(argument: querys_pb.InsertOrUpdateOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertOrUpdateOneResponse>): grpc.ClientUnaryCall;
  insertOrUpdateOne(argument: querys_pb.InsertOrUpdateOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertOrUpdateOneResponse>): grpc.ClientUnaryCall;
  insertOrUpdateMany(argument: querys_pb.InsertOrUpdateManyRequest, callback: grpc.requestCallback<querys_pb.InsertOrUpdateManyResponse>): grpc.ClientUnaryCall;
  insertOrUpdateMany(argument: querys_pb.InsertOrUpdateManyRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertOrUpdateManyResponse>): grpc.ClientUnaryCall;
  insertOrUpdateMany(argument: querys_pb.InsertOrUpdateManyRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.InsertOrUpdateManyResponse>): grpc.ClientUnaryCall;
  deleteOne(argument: querys_pb.DeleteOneRequest, callback: grpc.requestCallback<querys_pb.DeleteOneResponse>): grpc.ClientUnaryCall;
  deleteOne(argument: querys_pb.DeleteOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.DeleteOneResponse>): grpc.ClientUnaryCall;
  deleteOne(argument: querys_pb.DeleteOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.DeleteOneResponse>): grpc.ClientUnaryCall;
  deleteMany(argument: querys_pb.DeleteManyRequest, callback: grpc.requestCallback<querys_pb.DeleteManyResponse>): grpc.ClientUnaryCall;
  deleteMany(argument: querys_pb.DeleteManyRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.DeleteManyResponse>): grpc.ClientUnaryCall;
  deleteMany(argument: querys_pb.DeleteManyRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<querys_pb.DeleteManyResponse>): grpc.ClientUnaryCall;
  registerQueue(argument: queues_pb.RegisterQueueRequest, callback: grpc.requestCallback<queues_pb.RegisterQueueResponse>): grpc.ClientUnaryCall;
  registerQueue(argument: queues_pb.RegisterQueueRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.RegisterQueueResponse>): grpc.ClientUnaryCall;
  registerQueue(argument: queues_pb.RegisterQueueRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.RegisterQueueResponse>): grpc.ClientUnaryCall;
  registerExchange(argument: queues_pb.RegisterExchangeRequest, callback: grpc.requestCallback<queues_pb.RegisterExchangeResponse>): grpc.ClientUnaryCall;
  registerExchange(argument: queues_pb.RegisterExchangeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.RegisterExchangeResponse>): grpc.ClientUnaryCall;
  registerExchange(argument: queues_pb.RegisterExchangeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.RegisterExchangeResponse>): grpc.ClientUnaryCall;
  queueMessage(argument: queues_pb.QueueMessageRequest, callback: grpc.requestCallback<queues_pb.QueueMessageResponse>): grpc.ClientUnaryCall;
  queueMessage(argument: queues_pb.QueueMessageRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.QueueMessageResponse>): grpc.ClientUnaryCall;
  queueMessage(argument: queues_pb.QueueMessageRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.QueueMessageResponse>): grpc.ClientUnaryCall;
  unRegisterQueue(argument: queues_pb.UnRegisterQueueRequest, callback: grpc.requestCallback<queues_pb.UnRegisterQueueResponse>): grpc.ClientUnaryCall;
  unRegisterQueue(argument: queues_pb.UnRegisterQueueRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.UnRegisterQueueResponse>): grpc.ClientUnaryCall;
  unRegisterQueue(argument: queues_pb.UnRegisterQueueRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<queues_pb.UnRegisterQueueResponse>): grpc.ClientUnaryCall;
  watch(argument: watch_pb.WatchRequest, callback: grpc.requestCallback<watch_pb.WatchResponse>): grpc.ClientUnaryCall;
  watch(argument: watch_pb.WatchRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<watch_pb.WatchResponse>): grpc.ClientUnaryCall;
  watch(argument: watch_pb.WatchRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<watch_pb.WatchResponse>): grpc.ClientUnaryCall;
  unWatch(argument: watch_pb.UnWatchRequest, callback: grpc.requestCallback<watch_pb.UnWatchResponse>): grpc.ClientUnaryCall;
  unWatch(argument: watch_pb.UnWatchRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<watch_pb.UnWatchResponse>): grpc.ClientUnaryCall;
  unWatch(argument: watch_pb.UnWatchRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<watch_pb.UnWatchResponse>): grpc.ClientUnaryCall;
  pushWorkitem(argument: workitems_pb.PushWorkitemRequest, callback: grpc.requestCallback<workitems_pb.PushWorkitemResponse>): grpc.ClientUnaryCall;
  pushWorkitem(argument: workitems_pb.PushWorkitemRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.PushWorkitemResponse>): grpc.ClientUnaryCall;
  pushWorkitem(argument: workitems_pb.PushWorkitemRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.PushWorkitemResponse>): grpc.ClientUnaryCall;
  pushWorkitems(argument: workitems_pb.PushWorkitemsRequest, callback: grpc.requestCallback<workitems_pb.PushWorkitemsResponse>): grpc.ClientUnaryCall;
  pushWorkitems(argument: workitems_pb.PushWorkitemsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.PushWorkitemsResponse>): grpc.ClientUnaryCall;
  pushWorkitems(argument: workitems_pb.PushWorkitemsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.PushWorkitemsResponse>): grpc.ClientUnaryCall;
  updateWorkitem(argument: workitems_pb.UpdateWorkitemRequest, callback: grpc.requestCallback<workitems_pb.UpdateWorkitemResponse>): grpc.ClientUnaryCall;
  updateWorkitem(argument: workitems_pb.UpdateWorkitemRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.UpdateWorkitemResponse>): grpc.ClientUnaryCall;
  updateWorkitem(argument: workitems_pb.UpdateWorkitemRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.UpdateWorkitemResponse>): grpc.ClientUnaryCall;
  popWorkitem(argument: workitems_pb.PopWorkitemRequest, callback: grpc.requestCallback<workitems_pb.PopWorkitemResponse>): grpc.ClientUnaryCall;
  popWorkitem(argument: workitems_pb.PopWorkitemRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.PopWorkitemResponse>): grpc.ClientUnaryCall;
  popWorkitem(argument: workitems_pb.PopWorkitemRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.PopWorkitemResponse>): grpc.ClientUnaryCall;
  deleteWorkitem(argument: workitems_pb.DeleteWorkitemRequest, callback: grpc.requestCallback<workitems_pb.DeleteWorkitemResponse>): grpc.ClientUnaryCall;
  deleteWorkitem(argument: workitems_pb.DeleteWorkitemRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.DeleteWorkitemResponse>): grpc.ClientUnaryCall;
  deleteWorkitem(argument: workitems_pb.DeleteWorkitemRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.DeleteWorkitemResponse>): grpc.ClientUnaryCall;
  addWorkItemQueue(argument: workitems_pb.AddWorkItemQueueRequest, callback: grpc.requestCallback<workitems_pb.AddWorkItemQueueResponse>): grpc.ClientUnaryCall;
  addWorkItemQueue(argument: workitems_pb.AddWorkItemQueueRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.AddWorkItemQueueResponse>): grpc.ClientUnaryCall;
  addWorkItemQueue(argument: workitems_pb.AddWorkItemQueueRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<workitems_pb.AddWorkItemQueueResponse>): grpc.ClientUnaryCall;
  ensureCustomer(argument: base_pb.EnsureCustomerRequest, callback: grpc.requestCallback<base_pb.EnsureCustomerResponse>): grpc.ClientUnaryCall;
  ensureCustomer(argument: base_pb.EnsureCustomerRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.EnsureCustomerResponse>): grpc.ClientUnaryCall;
  ensureCustomer(argument: base_pb.EnsureCustomerRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<base_pb.EnsureCustomerResponse>): grpc.ClientUnaryCall;
}
