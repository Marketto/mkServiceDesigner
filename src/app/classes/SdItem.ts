export type SdItemType = 'object' | 'string' | 'number' | 'integer' | 'boolean';
type SdItemObjectAdditionalPropertiesType = 'string' | 'number' | 'integer' | 'boolean';
type SdItemStringFormatJson = 'hostname' | 'ipv4' | 'ipv6' | 'date-time' | 'email' | 'uri';

class SdItemObjectAdditionalProperties {
    type: SdItemObjectAdditionalPropertiesType;
}

export abstract class SdItem {
    id: number;
    name: String = '';
    type: SdItemType = null;
    listOf: Boolean = false;
    required: Boolean = false;
    dependencies: Array<SdItem>;

    constructor(item?: SdItem) {
        if (item) {
            this.id = item.id;
            this.name = item.name;
            this.listOf = item.listOf;
            this.required = item.required;
            this.dependencies = item.dependencies;
        }
    }
}

export class SdItemObject extends SdItem {
    type: 'object' = 'object';
    additionalProperties: Boolean | SdItemObjectAdditionalProperties = false;
    children: SdNode = new SdNode;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemObject) {
            this.additionalProperties = item.additionalProperties;
            this.children = item.children;
        }
    }
}

export class SdItemString extends SdItem {
    type: 'string' = 'string';
    domain: Array<String> = [];
    minLength: Number;
    maxLength: Number;
    pattern: RegExp;
    format: SdItemStringFormatJson | null | undefined;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemString) {
            this.domain = item.domain;
            this.minLength = item.minLength;
            this.maxLength = item.maxLength;
            this.pattern = item.pattern;
            this.format = item.format;
        }
    }
}

export class SdItemNumber extends SdItem {
    type: 'number' = 'number';
    protected $multipleOf: Number;
    protected $minValue: Number;
    exclusiveMin: Boolean;
    protected $maxValue: Number;
    exclusiveMax: Boolean;

    get multipleOf(): Number {
        return this.$multipleOf;
    }
    set multipleOf(multipleOf: Number) {
        this.$multipleOf = multipleOf;
    }

    get minValue(): Number {
        return this.$minValue;
    }
    set minValue(minValue: Number) {
        this.$minValue = minValue;
    }

    get maxValue(): Number {
        return this.$maxValue;
    }
    set maxValue(maxValue: Number) {
        this.$maxValue = maxValue;
    }

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemNumber) {
            this.multipleOf = item.multipleOf;
            this.minValue = item.minValue;
            this.exclusiveMin = item.exclusiveMin;
            this.maxValue = item.maxValue;
            this.exclusiveMax = item.exclusiveMax;
        }
    }
}

export class SdItemInteger extends SdItemNumber {
    type: 'number' = 'number';

    set multipleOf(multipleOf: Number) {
        this.$multipleOf = multipleOf ? Math.round(multipleOf.valueOf()) : multipleOf;
    }

    set minValue(minValue: Number) {
        this.$minValue = minValue ? Math.round(minValue.valueOf()) : minValue;
    }

    set maxValue(maxValue: Number) {
        this.$maxValue = maxValue ? Math.round(maxValue.valueOf()) : maxValue;
    }
}

export class SdItemBoolean extends SdItem {
    type: 'boolean' = 'boolean';
}

export class SdNode extends Array {
    [index: number]: SdItem;
    /* constructor() {
        super();
    }
    public push(...items: SdItem[]): number {
        return super.push(...items);
    }
    public newObject(): number {
        return super.push(new SdItemObject);
    }
    public newString(): number {
        return super.push(new SdItemString);
    } */
}
