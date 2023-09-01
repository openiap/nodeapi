import { TraceFlags, Context, Span } from "@opentelemetry/api";
export declare class apiinstrumentation {
    static setparent(traceId?: string, spanId?: string, traceFlags?: TraceFlags): Context;
    static With<T>(spanname: string, traceId: string, spanId: string, traceFlags: TraceFlags, callback: (span: Span) => Promise<T>): Promise<T>;
}
