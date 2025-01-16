import opentelemetry, { TraceFlags, Context, ROOT_CONTEXT, SpanContext, trace, context, Span } from "@opentelemetry/api";
export class apiinstrumentation {
    public static setparent(traceId: string = undefined, spanId: string = undefined, traceFlags = TraceFlags.SAMPLED): Context {
        if (traceId != null && traceId != "") {
            const spanContext: SpanContext = {
                traceId,
                spanId,
                traceFlags: TraceFlags.SAMPLED,
            };
            return trace.setSpanContext(ROOT_CONTEXT, spanContext);
        } else {
            return context.active();
        }
    }
    public static With<T>(spanname:string, traceId: string = undefined, spanId: string = undefined, traceFlags = TraceFlags.SAMPLED, callback: (span: Span) => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const tracer = opentelemetry.trace.getTracer('default');
            const Context = apiinstrumentation.setparent(traceId, spanId, traceFlags)
            tracer.startActiveSpan(spanname, undefined, Context, async (span: Span) => {
                var result = await callback(span);
                resolve(result);
            });
            // tracer.startSpan(this.name, undefined, Context);
            // context.with( Context, async (span: Span)=> {
            //     var result = await callback(span);
            //     resolve(result);
            // }, undefined, undefined);
        });
    }
    public static GetTraceSpanId(span: Span): [string, string] {
        if (span == null) return [null, null];
        var ctx = span.spanContext();
        // @ts-ignore
        if (ctx == null) return [null, null];
        // @ts-ignore
        const { traceId, spanId } = ctx;
        return [traceId, spanId];
    }

}