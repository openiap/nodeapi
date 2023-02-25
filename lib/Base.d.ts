import { Ace } from "./Ace";
export declare class Base {
    _id: string;
    _type: string;
    _acl: Ace[];
    name: string;
    _name: string;
    _encrypt: string[];
    _createdbyid: string;
    _createdby: string;
    _created: Date;
    _modifiedbyid: string;
    _modifiedby: string;
    _modified: Date;
    _version: number;
    constructor();
    /**
     * Create new instance of object, using values from input object
     * @param  {T} o Base object
     * @returns T New object as Type
     */
    static assign<T>(source: T): T;
    /**
     * Enumerate ACL for specefic ID
     * @param  {string} _id Id to search for
     * @param  {boolean=false} deny look for deny or allow permission
     * @returns Ace Ace if found, else null
     */
    static getRight(item: Base, _id: string, deny?: boolean): Ace;
    /**
     * Set right for specefic id, if exists
     * @param  {Ace} x
     * @returns void
     */
    static setRight(item: Base, x: Ace): void;
    /**
     * Add/update right for user/role
     * @param  {string} _id user/role id
     * @param  {string} name Displayname for user/role
     * @param  {number[]} rights Right to set
     * @param  {boolean=false} deny Deny the right
     * @returns void
     */
    static addRight(item: Base, _id: string, name: string, rights: number[], deny?: boolean): void;
    /**
     * Remove a right from user/role
     * @param  {string} _id user/role id
     * @param  {number[]=null} rights Right to revoke
     * @param  {boolean=false} deny Deny right
     * @returns void
     */
    static removeRight(item: Base, _id: string, rights?: number[], deny?: boolean): void;
    static hasRight(item: Base, _id: string, bit: number, deny?: boolean): boolean;
}
