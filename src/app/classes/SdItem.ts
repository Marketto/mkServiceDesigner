type SdItemType = 'object' | 'string' | 'number' | 'integer' | 'boolean';
type SdItemObjectAdditionalPropertiesType = 'string' | 'number' | 'integer' | 'boolean';
type SdItemStringFormatJson = 'hostname' | 'ipv4' | 'ipv6' | 'date-time' | 'email' | 'uri';

class SdItemObjectAdditionalProperties {
    type: SdItemObjectAdditionalPropertiesType;
}

abstract class SdItemGeneric {
    id: number;
    name: String = '';
    type: SdItemType = null;
    listOf: Boolean = false;
    required: Boolean = false;
}

export class SdItemObject extends SdItemGeneric {
    type: 'object' = 'object';
    additionalProperties: Boolean | SdItemObjectAdditionalProperties = false;
    children: SdNode = new SdNode;
}

export class SdItemString extends SdItemGeneric {
    type: 'string' = 'string';
    domain: Array<String> = [];
    minLength: Number;
    maxLength: Number;
    pattern: RegExp;
    format: SdItemStringFormatJson | null | undefined;
}

export class SdItemNumber extends SdItemGeneric {
    type: 'number'|'integer' = 'number';
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
