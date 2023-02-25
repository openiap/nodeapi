export declare class config {
    static ThrottlerMS: number;
    static EndstreamDelay: number;
    static BeginstreamDelay: number;
    static ChecksumCheckFiles: boolean;
    static ChecksumCheckPackages: boolean;
    static DoPing: boolean;
    static doDumpStack: boolean;
    static doDumpMesssages: boolean;
    static doDumpMesssagesSeq: boolean;
    static doDumpMesssagesIds: boolean;
    static doDumpTimestamp: boolean;
    static doDumpMesssageStreams: boolean;
    static doDumpMessageHexLines: number;
    static doDumpMessageHexBytesPerLine: number;
    static DoDumpToConsole: boolean;
    static doDumpToFile: boolean;
    static defaultsocketport: number;
    static defaultwebport: number;
    static defaultgrpcport: number;
    static SendFileHighWaterMark: number;
    static role: string;
    static color: {
        Reset: string;
        Bright: string;
        Dim: string;
        Underscore: string;
        Blink: string;
        Reverse: string;
        Hidden: string;
        FgBlack: string;
        FgRed: string;
        FgGreen: string;
        FgYellow: string;
        FgBlue: string;
        FgMagenta: string;
        FgCyan: string;
        FgWhite: string;
        BgBlack: string;
        BgRed: string;
        BgGreen: string;
        BgYellow: string;
        BgBlue: string;
        BgMagenta: string;
        BgCyan: string;
        BgWhite: string;
    };
    static info(message: string): void;
    static warn(message: string): void;
    static err(error: any): void;
    static dumpmessage(direction: string, message: any): void;
    static filecounter: number;
    static filedata: string;
    static dumpdata(data: any): void;
    static hex(buffer: any, bytes_per_line: number, bytes_per_group: number, radix: number, littleEndian: boolean): string;
    static maxnumberlen(bytes: number, radix: number): number;
    static col(text: string, c: string): string;
    static colrole(): string;
    static ts(): string;
    static seq(sequence: number, id: string, rid: string): string;
}
