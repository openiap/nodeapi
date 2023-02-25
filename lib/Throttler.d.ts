/// <reference types="node" />
import { Transform } from 'stream';
export declare class Throttler extends Transform {
    delay: number;
    constructor(delay: any);
    _transform(chunk: any, encoding: any, callback: any): void;
}
