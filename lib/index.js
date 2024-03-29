"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.InsertOrUpdateOneResponse = exports.InsertOrUpdateOneRequest = exports.UpdateResult = exports.UpdateDocumentResponse = exports.UpdateDocumentRequest = exports.UpdateOneResponse = exports.UpdateOneRequest = exports.InsertManyResponse = exports.InsertManyRequest = exports.InsertOneResponse = exports.InsertOneRequest = exports.CountResponse = exports.CountRequest = exports.AggregateResponse = exports.AggregateRequest = exports.GetDocumentVersionResponse = exports.GetDocumentVersionRequest = exports.QueryResponse = exports.QueryRequest = exports.DropCollectionResponse = exports.DropCollectionRequest = exports.ListCollectionsResponse = exports.ListCollectionsRequest = exports.User = exports.Role = exports.RefreshToken = exports.SigninResponse = exports.SigninRequest = exports.CustomCommandResponse = exports.CustomCommandRequest = exports.EndStream = exports.Stream = exports.BeginStream = exports.UploadResponse = exports.UploadRequest = exports.DownloadResponse = exports.DownloadRequest = exports.GetElementResponse = exports.GetElementRequest = exports.ErrorResponse = exports.PingResponse = exports.PingRequest = exports.Envelope = exports.protowrap = exports.openiap = exports.Rights = exports.WellknownIds = exports.Ace = exports.client = exports.Base = void 0;
exports.apiinstrumentation = exports.Stat = exports.changestream = exports.config = exports.QueueMessageResponse = exports.QueueMessageRequest = exports.QueueEvent = exports.UnRegisterQueueResponse = exports.UnRegisterQueueRequest = exports.RegisterQueueResponse = exports.RegisterQueueRequest = exports.RegisterExchangeResponse = exports.RegisterExchangeRequest = exports.DeleteWorkItemQueueResponse = exports.DeleteWorkItemQueueRequest = exports.UpdateWorkItemQueueResponse = exports.UpdateWorkItemQueueRequest = exports.AddWorkItemQueueResponse = exports.AddWorkItemQueueRequest = exports.WorkItemQueue = exports.DeleteWorkitemResponse = exports.DeleteWorkitemRequest = exports.PopWorkitemResponse = exports.PopWorkitemRequest = exports.UpdateWorkitemResponse = exports.UpdateWorkitemRequest = exports.PushWorkitemsResponse = exports.PushWorkitemsRequest = exports.PushWorkitemResponse = exports.PushWorkitemRequest = exports.WorkitemFile = exports.Workitem = exports.UnWatchResponse = exports.UnWatchRequest = exports.WatchResponse = exports.WatchRequest = exports.WatchEvent = exports.DeleteManyResponse = exports.DeleteManyRequest = exports.DeleteOneResponse = exports.DeleteOneRequest = exports.InsertOrUpdateManyResponse = exports.InsertOrUpdateManyRequest = void 0;
var Base_1 = require("./Base");
__createBinding(exports, Base_1, "Base");
var client_1 = require("./client");
__createBinding(exports, client_1, "client");
var Ace_1 = require("./Ace");
__createBinding(exports, Ace_1, "Ace");
var WellknownIds_1 = require("./WellknownIds");
__createBinding(exports, WellknownIds_1, "WellknownIds");
var Rights_1 = require("./Rights");
__createBinding(exports, Rights_1, "Rights");
var openiap_1 = require("./openiap");
__createBinding(exports, openiap_1, "openiap");
var protowrap_1 = require("./protowrap");
__createBinding(exports, protowrap_1, "protowrap");
var base_1 = require("./proto/base");
__createBinding(exports, base_1, "Envelope");
__createBinding(exports, base_1, "PingRequest");
__createBinding(exports, base_1, "PingResponse");
__createBinding(exports, base_1, "ErrorResponse");
__createBinding(exports, base_1, "GetElementRequest");
__createBinding(exports, base_1, "GetElementResponse");
__createBinding(exports, base_1, "DownloadRequest");
__createBinding(exports, base_1, "DownloadResponse");
__createBinding(exports, base_1, "UploadRequest");
__createBinding(exports, base_1, "UploadResponse");
__createBinding(exports, base_1, "BeginStream");
__createBinding(exports, base_1, "Stream");
__createBinding(exports, base_1, "EndStream");
var base_2 = require("./proto/base");
__createBinding(exports, base_2, "CustomCommandRequest");
__createBinding(exports, base_2, "CustomCommandResponse");
__createBinding(exports, base_2, "SigninRequest");
__createBinding(exports, base_2, "SigninResponse");
__createBinding(exports, base_2, "RefreshToken");
__createBinding(exports, base_2, "Role");
__createBinding(exports, base_2, "User");
var querys_1 = require("./proto/querys");
__createBinding(exports, querys_1, "ListCollectionsRequest");
__createBinding(exports, querys_1, "ListCollectionsResponse");
__createBinding(exports, querys_1, "DropCollectionRequest");
__createBinding(exports, querys_1, "DropCollectionResponse");
__createBinding(exports, querys_1, "QueryRequest");
__createBinding(exports, querys_1, "QueryResponse");
var querys_2 = require("./proto/querys");
__createBinding(exports, querys_2, "GetDocumentVersionRequest");
__createBinding(exports, querys_2, "GetDocumentVersionResponse");
__createBinding(exports, querys_2, "AggregateRequest");
__createBinding(exports, querys_2, "AggregateResponse");
__createBinding(exports, querys_2, "CountRequest");
__createBinding(exports, querys_2, "CountResponse");
var querys_3 = require("./proto/querys");
__createBinding(exports, querys_3, "InsertOneRequest");
__createBinding(exports, querys_3, "InsertOneResponse");
__createBinding(exports, querys_3, "InsertManyRequest");
__createBinding(exports, querys_3, "InsertManyResponse");
__createBinding(exports, querys_3, "UpdateOneRequest");
__createBinding(exports, querys_3, "UpdateOneResponse");
var querys_4 = require("./proto/querys");
__createBinding(exports, querys_4, "UpdateDocumentRequest");
__createBinding(exports, querys_4, "UpdateDocumentResponse");
__createBinding(exports, querys_4, "UpdateResult");
__createBinding(exports, querys_4, "InsertOrUpdateOneRequest");
__createBinding(exports, querys_4, "InsertOrUpdateOneResponse");
var querys_5 = require("./proto/querys");
__createBinding(exports, querys_5, "InsertOrUpdateManyRequest");
__createBinding(exports, querys_5, "InsertOrUpdateManyResponse");
__createBinding(exports, querys_5, "DeleteOneRequest");
__createBinding(exports, querys_5, "DeleteOneResponse");
__createBinding(exports, querys_5, "DeleteManyRequest");
__createBinding(exports, querys_5, "DeleteManyResponse");
var watch_1 = require("./proto/watch");
__createBinding(exports, watch_1, "WatchEvent");
__createBinding(exports, watch_1, "WatchRequest");
__createBinding(exports, watch_1, "WatchResponse");
__createBinding(exports, watch_1, "UnWatchRequest");
__createBinding(exports, watch_1, "UnWatchResponse");
var workitems_1 = require("./proto/workitems");
__createBinding(exports, workitems_1, "Workitem");
__createBinding(exports, workitems_1, "WorkitemFile");
__createBinding(exports, workitems_1, "PushWorkitemRequest");
__createBinding(exports, workitems_1, "PushWorkitemResponse");
__createBinding(exports, workitems_1, "PushWorkitemsRequest");
__createBinding(exports, workitems_1, "PushWorkitemsResponse");
var workitems_2 = require("./proto/workitems");
__createBinding(exports, workitems_2, "UpdateWorkitemRequest");
__createBinding(exports, workitems_2, "UpdateWorkitemResponse");
__createBinding(exports, workitems_2, "PopWorkitemRequest");
__createBinding(exports, workitems_2, "PopWorkitemResponse");
__createBinding(exports, workitems_2, "DeleteWorkitemRequest");
__createBinding(exports, workitems_2, "DeleteWorkitemResponse");
var workitems_3 = require("./proto/workitems");
__createBinding(exports, workitems_3, "WorkItemQueue");
__createBinding(exports, workitems_3, "AddWorkItemQueueRequest");
__createBinding(exports, workitems_3, "AddWorkItemQueueResponse");
var workitems_4 = require("./proto/workitems");
__createBinding(exports, workitems_4, "UpdateWorkItemQueueRequest");
__createBinding(exports, workitems_4, "UpdateWorkItemQueueResponse");
__createBinding(exports, workitems_4, "DeleteWorkItemQueueRequest");
__createBinding(exports, workitems_4, "DeleteWorkItemQueueResponse");
var queues_1 = require("./proto/queues");
__createBinding(exports, queues_1, "RegisterExchangeRequest");
__createBinding(exports, queues_1, "RegisterExchangeResponse");
__createBinding(exports, queues_1, "RegisterQueueRequest");
__createBinding(exports, queues_1, "RegisterQueueResponse");
__createBinding(exports, queues_1, "UnRegisterQueueRequest");
__createBinding(exports, queues_1, "UnRegisterQueueResponse");
var queues_2 = require("./proto/queues");
__createBinding(exports, queues_2, "QueueEvent");
__createBinding(exports, queues_2, "QueueMessageRequest");
__createBinding(exports, queues_2, "QueueMessageResponse");
var config_1 = require("./config");
__createBinding(exports, config_1, "config");
var client_2 = require("./client");
__createBinding(exports, client_2, "changestream");
var base_3 = require("./proto/base");
__createBinding(exports, base_3, "Stat");
var apiinstrumentation_1 = require("./apiinstrumentation");
__createBinding(exports, apiinstrumentation_1, "apiinstrumentation");
//# sourceMappingURL=index.js.map