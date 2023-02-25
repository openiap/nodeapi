"use strict";
exports.__esModule = true;
exports.Base = void 0;
var Ace_1 = require("./Ace");
var Rights_1 = require("./Rights");
var WellknownIds_1 = require("./WellknownIds");
var Base = /** @class */ (function () {
    function Base() {
        this._type = 'unknown';
        this._acl = [];
        this._encrypt = [];
        this._version = 0;
        Base.addRight(this, WellknownIds_1.WellknownIds.admins, 'admins', [Rights_1.Rights.full_control]);
    }
    /**
     * Create new instance of object, using values from input object
     * @param  {T} o Base object
     * @returns T New object as Type
     */
    Base.assign = function (source) {
        return Object.assign(new Base(), source);
    };
    /**
     * Enumerate ACL for specefic ID
     * @param  {string} _id Id to search for
     * @param  {boolean=false} deny look for deny or allow permission
     * @returns Ace Ace if found, else null
     */
    Base.getRight = function (item, _id, deny) {
        if (deny === void 0) { deny = false; }
        var result = null;
        if (!item._acl) {
            item._acl = [];
        }
        item._acl.forEach(function (a, index) {
            if (a._id === _id && (a.deny === deny || a.deny == null)) {
                result = item._acl[index];
            }
        });
        return result;
    };
    /**
     * Set right for specefic id, if exists
     * @param  {Ace} x
     * @returns void
     */
    Base.setRight = function (item, x) {
        if (!item._acl) {
            item._acl = [];
        }
        item._acl.forEach(function (a, index) {
            if (a._id === x._id && (a.deny === x.deny || a.deny == null)) {
                item._acl[index] = x;
            }
        });
    };
    /**
     * Add/update right for user/role
     * @param  {string} _id user/role id
     * @param  {string} name Displayname for user/role
     * @param  {number[]} rights Right to set
     * @param  {boolean=false} deny Deny the right
     * @returns void
     */
    Base.addRight = function (item, _id, name, rights, deny) {
        if (deny === void 0) { deny = false; }
        var right = Base.getRight(item, _id, deny);
        if (!right) {
            right = new Ace_1.Ace();
            Ace_1.Ace.resetnone(right);
            item._acl.push(right);
        }
        if (deny == true)
            right.deny = deny;
        right._id = _id;
        if (name != null && name != "")
            right.name = name;
        if (rights[0] === -1) {
            Ace_1.Ace.resetfullcontrol(right);
            // for (let i: number = 0; i < 1000; i++) {
            //     Ace.setBit(right, i);
            // }
        }
        else {
            rights.forEach(function (bit) {
                try {
                    Ace_1.Ace.setBit(right, bit);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        Base.setRight(item, right);
    };
    /**
     * Remove a right from user/role
     * @param  {string} _id user/role id
     * @param  {number[]=null} rights Right to revoke
     * @param  {boolean=false} deny Deny right
     * @returns void
     */
    Base.removeRight = function (item, _id, rights, deny) {
        if (rights === void 0) { rights = null; }
        if (deny === void 0) { deny = false; }
        if (!item._acl) {
            item._acl = [];
        }
        var right = Base.getRight(item, _id, deny);
        if (!right) {
            return;
        }
        if (rights[0] === -1) {
            item._acl = item._acl.filter(function (x) { return x._id !== _id; });
        }
        else {
            rights.forEach(function (bit) {
                Ace_1.Ace.unsetBit(right, bit);
            });
        }
        Base.setRight(item, right);
    };
    Base.hasRight = function (item, _id, bit, deny) {
        if (deny === void 0) { deny = false; }
        var ace = Base.getRight(item, _id, deny);
        if (ace == null)
            return false;
        return Ace_1.Ace.isBitSet(ace, bit);
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=Base.js.map