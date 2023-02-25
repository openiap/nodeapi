export declare class Ace {
    static ace_right_bits: number;
    static full_control: number;
    deny: boolean;
    _id: string;
    name: string;
    rights: string | number;
    constructor();
    static resetfullcontrol(item: Ace): void;
    static resetnone(item: Ace): void;
    static _base64ToArrayBuffer(base64: any): ArrayBuffer;
    static _arrayBufferToBase64(arraybuffer: any): string;
    static isBitSet(item: Ace, bit: number): boolean;
    static setBit(item: Ace, bit: number): string | number;
    static unsetBit(item: Ace, bit: number): string | number;
    static toogleBit(item: Ace, bit: number): void;
}
