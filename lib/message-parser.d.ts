/// <reference types="node" />
import { Transform } from "stream";
export declare class messageParser extends Transform {
    seq: any;
    buffer: any;
    readPointer: any;
    basebufferSize: any;
    bufferSize: any;
    bufferIncrement: any;
    writePointer: any;
    maxWritePointer: any;
    lastDecreased: any;
    DecreaseTimeCheck: any;
    messages: any;
    maxMessagesQueue: any;
    constructor();
    _transform(buffer: any, encoding: any, callback: any): any;
    calculateMaxBufferSize(): any;
    _flush(callback: any): void;
}
