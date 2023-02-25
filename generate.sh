#!/usr/bin/env bash

PROTO_DIR="./proto"
OUT_DIR="./src/proto"
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"


mkdir -p src/proto 

# protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --grpc_out=grpc_js:./src/proto --ts_out='service=grpc-node,mode=grpc-js:./src/proto' --ts_proto_opt=snakeToCamel=false --proto_path=proto --ts_proto_out=./src/proto proto/base.proto proto/ace.proto proto/querys.proto proto/queues.proto proto/watch.proto proto/workitems.proto
# Generate JS and corresponding TS d.ts codes for each .proto file using the grpc-tools for Node.
$GRPC_TOOLS_NODE_PROTOC \
    --plugin=protoc-gen-grpc="$GRPC_TOOLS_NODE_PROTOC_PLUGIN" \
    --plugin=protoc-gen-ts="$PROTOC_GEN_TS_PATH" \
    --js_out=import_style=commonjs,binary:"$OUT_DIR" \
    --ts_out="$OUT_DIR" \
    --grpc_out="$OUT_DIR" \
    -I "$PROTO_DIR" \
    "$PROTO_DIR"/*.proto

OUT_DIR="./lib/proto"
$GRPC_TOOLS_NODE_PROTOC \
    --plugin=protoc-gen-grpc="$GRPC_TOOLS_NODE_PROTOC_PLUGIN" \
    --plugin=protoc-gen-ts="$PROTOC_GEN_TS_PATH" \
    --js_out=import_style=commonjs,binary:"$OUT_DIR" \
    --ts_out="$OUT_DIR" \
    --grpc_out="$OUT_DIR" \
    -I "$PROTO_DIR" \
    "$PROTO_DIR"/*.proto

npm run generate


# protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto  --ts_out='service=grpc-node,mode=grpc-js:./src/proto' --ts_proto_opt=snakeToCamel=false --proto_path=proto --ts_proto_out=./src/proto proto/base.proto proto/ace.proto proto/querys.proto proto/queues.proto proto/watch.proto proto/workitems.proto
# mkdir -p src/proto && protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto  --ts_out='service=grpc-node,mode=grpc-js:./src/proto' --ts_proto_opt=snakeToCamel=false --proto_path=proto --ts_proto_out=./src/proto proto/base.proto proto/ace.proto proto/querys.proto proto/queues.proto proto/watch.proto proto/workitems.proto
