// package: openiap
// file: stripe.proto

import * as jspb from "google-protobuf";

export class StripeCoupon extends jspb.Message {
  getDuration(): string;
  setDuration(value: string): void;

  getDurationInMonths(): number;
  setDurationInMonths(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeCoupon.AsObject;
  static toObject(includeInstance: boolean, msg: StripeCoupon): StripeCoupon.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeCoupon, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeCoupon;
  static deserializeBinaryFromReader(message: StripeCoupon, reader: jspb.BinaryReader): StripeCoupon;
}

export namespace StripeCoupon {
  export type AsObject = {
    duration: string,
    durationInMonths: number,
    name: string,
  }
}

export class StripeCustomerDiscount extends jspb.Message {
  getSubscription(): string;
  setSubscription(value: string): void;

  getStart(): number;
  setStart(value: number): void;

  getCustomer(): string;
  setCustomer(value: string): void;

  hasCoupon(): boolean;
  clearCoupon(): void;
  getCoupon(): StripeCoupon | undefined;
  setCoupon(value?: StripeCoupon): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeCustomerDiscount.AsObject;
  static toObject(includeInstance: boolean, msg: StripeCustomerDiscount): StripeCustomerDiscount.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeCustomerDiscount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeCustomerDiscount;
  static deserializeBinaryFromReader(message: StripeCustomerDiscount, reader: jspb.BinaryReader): StripeCustomerDiscount;
}

export namespace StripeCustomerDiscount {
  export type AsObject = {
    subscription: string,
    start: number,
    customer: string,
    coupon?: StripeCoupon.AsObject,
  }
}

export class StripeCustomerAddress extends jspb.Message {
  getLine1(): string;
  setLine1(value: string): void;

  getLine2(): string;
  setLine2(value: string): void;

  getPostalCode(): string;
  setPostalCode(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getState(): string;
  setState(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeCustomerAddress.AsObject;
  static toObject(includeInstance: boolean, msg: StripeCustomerAddress): StripeCustomerAddress.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeCustomerAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeCustomerAddress;
  static deserializeBinaryFromReader(message: StripeCustomerAddress, reader: jspb.BinaryReader): StripeCustomerAddress;
}

export namespace StripeCustomerAddress {
  export type AsObject = {
    line1: string,
    line2: string,
    postalCode: string,
    city: string,
    state: string,
    country: string,
  }
}

export class StripeTaxVerification extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): void;

  getVerifiedAddress(): string;
  setVerifiedAddress(value: string): void;

  getVerifiedName(): string;
  setVerifiedName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeTaxVerification.AsObject;
  static toObject(includeInstance: boolean, msg: StripeTaxVerification): StripeTaxVerification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeTaxVerification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeTaxVerification;
  static deserializeBinaryFromReader(message: StripeTaxVerification, reader: jspb.BinaryReader): StripeTaxVerification;
}

export namespace StripeTaxVerification {
  export type AsObject = {
    status: string,
    verifiedAddress: string,
    verifiedName: string,
  }
}

export class StripeTaxId extends jspb.Message {
  getCountry(): string;
  setCountry(value: string): void;

  getCustomer(): string;
  setCustomer(value: string): void;

  getType(): string;
  setType(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  hasVerification(): boolean;
  clearVerification(): void;
  getVerification(): StripeTaxVerification | undefined;
  setVerification(value?: StripeTaxVerification): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeTaxId.AsObject;
  static toObject(includeInstance: boolean, msg: StripeTaxId): StripeTaxId.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeTaxId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeTaxId;
  static deserializeBinaryFromReader(message: StripeTaxId, reader: jspb.BinaryReader): StripeTaxId;
}

export namespace StripeTaxId {
  export type AsObject = {
    country: string,
    customer: string,
    type: string,
    value: string,
    verification?: StripeTaxVerification.AsObject,
  }
}

export class StripeRecurring extends jspb.Message {
  getInterval(): string;
  setInterval(value: string): void;

  getIntervalCount(): number;
  setIntervalCount(value: number): void;

  getTrialPeriodDays(): number;
  setTrialPeriodDays(value: number): void;

  getUsageType(): string;
  setUsageType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeRecurring.AsObject;
  static toObject(includeInstance: boolean, msg: StripeRecurring): StripeRecurring.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeRecurring, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeRecurring;
  static deserializeBinaryFromReader(message: StripeRecurring, reader: jspb.BinaryReader): StripeRecurring;
}

export namespace StripeRecurring {
  export type AsObject = {
    interval: string,
    intervalCount: number,
    trialPeriodDays: number,
    usageType: string,
  }
}

export class StripePrice extends jspb.Message {
  getNickname(): string;
  setNickname(value: string): void;

  getProduct(): string;
  setProduct(value: string): void;

  getActive(): boolean;
  setActive(value: boolean): void;

  getBillingScheme(): string;
  setBillingScheme(value: string): void;

  getCurrency(): string;
  setCurrency(value: string): void;

  hasRecurring(): boolean;
  clearRecurring(): void;
  getRecurring(): StripeRecurring | undefined;
  setRecurring(value?: StripeRecurring): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripePrice.AsObject;
  static toObject(includeInstance: boolean, msg: StripePrice): StripePrice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripePrice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripePrice;
  static deserializeBinaryFromReader(message: StripePrice, reader: jspb.BinaryReader): StripePrice;
}

export namespace StripePrice {
  export type AsObject = {
    nickname: string,
    product: string,
    active: boolean,
    billingScheme: string,
    currency: string,
    recurring?: StripeRecurring.AsObject,
  }
}

export class StripePlan extends jspb.Message {
  getStatus(): boolean;
  setStatus(value: boolean): void;

  getNickname(): string;
  setNickname(value: string): void;

  getProduct(): string;
  setProduct(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  getUsageType(): string;
  setUsageType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripePlan.AsObject;
  static toObject(includeInstance: boolean, msg: StripePlan): StripePlan.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripePlan, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripePlan;
  static deserializeBinaryFromReader(message: StripePlan, reader: jspb.BinaryReader): StripePlan;
}

export namespace StripePlan {
  export type AsObject = {
    status: boolean,
    nickname: string,
    product: string,
    amount: number,
    usageType: string,
  }
}

export class StripeSubscriptionItem extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getQuantity(): string;
  setQuantity(value: string): void;

  getSubscription(): string;
  setSubscription(value: string): void;

  hasPlan(): boolean;
  clearPlan(): void;
  getPlan(): StripePlan | undefined;
  setPlan(value?: StripePlan): void;

  hasPrice(): boolean;
  clearPrice(): void;
  getPrice(): StripePrice | undefined;
  setPrice(value?: StripePrice): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeSubscriptionItem.AsObject;
  static toObject(includeInstance: boolean, msg: StripeSubscriptionItem): StripeSubscriptionItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeSubscriptionItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeSubscriptionItem;
  static deserializeBinaryFromReader(message: StripeSubscriptionItem, reader: jspb.BinaryReader): StripeSubscriptionItem;
}

export namespace StripeSubscriptionItem {
  export type AsObject = {
    id: string,
    quantity: string,
    subscription: string,
    plan?: StripePlan.AsObject,
    price?: StripePrice.AsObject,
  }
}

export class StripeSubscription extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getBalance(): number;
  setBalance(value: number): void;

  getCurrency(): string;
  setCurrency(value: string): void;

  clearSubscriptionsList(): void;
  getSubscriptionsList(): Array<StripeSubscription>;
  setSubscriptionsList(value: Array<StripeSubscription>): void;
  addSubscriptions(value?: StripeSubscription, index?: number): StripeSubscription;

  clearTaxIdsList(): void;
  getTaxIdsList(): Array<StripeTaxId>;
  setTaxIdsList(value: Array<StripeTaxId>): void;
  addTaxIds(value?: StripeTaxId, index?: number): StripeTaxId;

  clearItemsList(): void;
  getItemsList(): Array<StripeSubscriptionItem>;
  setItemsList(value: Array<StripeSubscriptionItem>): void;
  addItems(value?: StripeSubscriptionItem, index?: number): StripeSubscriptionItem;

  clearDefaultTaxRatesList(): void;
  getDefaultTaxRatesList(): Array<string>;
  setDefaultTaxRatesList(value: Array<string>): void;
  addDefaultTaxRates(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeSubscription.AsObject;
  static toObject(includeInstance: boolean, msg: StripeSubscription): StripeSubscription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeSubscription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeSubscription;
  static deserializeBinaryFromReader(message: StripeSubscription, reader: jspb.BinaryReader): StripeSubscription;
}

export namespace StripeSubscription {
  export type AsObject = {
    address: string,
    balance: number,
    currency: string,
    subscriptionsList: Array<StripeSubscription.AsObject>,
    taxIdsList: Array<StripeTaxId.AsObject>,
    itemsList: Array<StripeSubscriptionItem.AsObject>,
    defaultTaxRatesList: Array<string>,
  }
}

export class StripeCustomer extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): StripeCustomerAddress | undefined;
  setAddress(value?: StripeCustomerAddress): void;

  getDescription(): string;
  setDescription(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  clearTaxIdsList(): void;
  getTaxIdsList(): Array<StripeTaxId>;
  setTaxIdsList(value: Array<StripeTaxId>): void;
  addTaxIds(value?: StripeTaxId, index?: number): StripeTaxId;

  clearSubscriptionsList(): void;
  getSubscriptionsList(): Array<StripeSubscription>;
  setSubscriptionsList(value: Array<StripeSubscription>): void;
  addSubscriptions(value?: StripeSubscription, index?: number): StripeSubscription;

  hasDiscount(): boolean;
  clearDiscount(): void;
  getDiscount(): StripeCustomerDiscount | undefined;
  setDiscount(value?: StripeCustomerDiscount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeCustomer.AsObject;
  static toObject(includeInstance: boolean, msg: StripeCustomer): StripeCustomer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeCustomer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeCustomer;
  static deserializeBinaryFromReader(message: StripeCustomer, reader: jspb.BinaryReader): StripeCustomer;
}

export namespace StripeCustomer {
  export type AsObject = {
    address?: StripeCustomerAddress.AsObject,
    description: string,
    name: string,
    email: string,
    taxIdsList: Array<StripeTaxId.AsObject>,
    subscriptionsList: Array<StripeSubscription.AsObject>,
    discount?: StripeCustomerDiscount.AsObject,
  }
}

