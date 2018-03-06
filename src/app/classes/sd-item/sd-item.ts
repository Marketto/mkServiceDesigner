import { XMLElement, XMLAttribute, XMLChild, xml } from 'xml-decorators';
import { ClassProvider } from '@angular/core';
export type SdItemType = 'object' | 'string' | 'number' | 'integer' | 'boolean';

export interface SdItemInterface {
    symbol: symbol;
    id: number;
    name: String;
    type: SdItemType;
    required: Boolean;

    toJSON(): any;
    toJSONSchema(): any;
    toXSD(any): any;
}

export abstract class SdItem implements SdItemInterface {
    symbol = Symbol();
    id: number;
    name: String = '';
    type: SdItemType = null;
    required: Boolean = false;
    dependencies: Array<SdItem>;

    // Array props
    listOf: Boolean = false;
    minOccurrences: Number = 0;
    maxOccurrences: Number = null;
    uniqueItems: Boolean = false;


    constructor(item?: SdItem) {
        if (item) {
            this.symbol = item.symbol;
            this.id = item.id;
            this.name = item.name;
            this.listOf = item.listOf;
            this.required = item.required;
            this.dependencies = item.dependencies;
            this.minOccurrences = item.minOccurrences;
            this.maxOccurrences = item.maxOccurrences;
            this.uniqueItems = item.uniqueItems;
        }
    }


    public static fromJSON(key: string, value: any): SdItem {
        if (!key) {
            const sdItem = Object.create(SdItem.prototype);

            return Object.assign(sdItem, {});
        }
        return value;
    }
    public toJSON(): object {
        return Object.assign({}, this);
    }

    protected toItemJSONSchema(): object {
        return {
            id: this.id,
            type: this.type
        };
    }
    public toJSONSchema(): object {
        const itemJSS = this.toItemJSONSchema();
        if (this.listOf) {
            return {
                type: 'array',
                items: [itemJSS],
                additionalItems: false,
                uniqueItems: this.uniqueItems,
                minItems: (this.minOccurrences !== null) ? this.minOccurrences : undefined,
                maxItems: (this.maxOccurrences !== null) ? this.maxOccurrences : undefined
            };
        }
        return itemJSS;
    }

    public toXSD(xsdType?: any): XsdSdItem|any {
        if (this.name.length > 0) {
            return new (xsdType || XsdSdItem)(this);
        }
        return;
    }
}


type XsdType = 'xs:anyType' | 'xs:string' | 'xs:boolean' | 'xs:integer' | 'xs:decimal' |
    'xs:nonPositiveInteger' | 'xs:negativeInteger' | 'xs:nonNegativeInteger' | 'xs:positiveInteger';
@XMLElement({ root: 'xs:element' })
export class XsdSdItem {
    @XMLAttribute({required: true})
    private name: string;
    @XMLAttribute({})
    protected type: XsdType = 'xs:anyType';
    @XMLAttribute({})
    private minOccurs: number;
    @XMLAttribute({})
    private maxOccurs: number |'unbounded';

    constructor (item: SdItem) {
        if (item && item.name) {
            this.name = item.name.toString();
            this.minOccurs = Math.max(item.required ? 1 : 0, ((item.listOf && item.minOccurrences) || 0).valueOf());
            this.maxOccurs = item.listOf ? (item.maxOccurrences ? item.maxOccurrences.valueOf() : 'unbounded') : undefined;
        }
    }

    public serialize(): string {
        return xml.serialize(this);
    }
}
