
import { XMLElement, XMLChild, xml } from 'xml-decorators';
import { SdItemBoolean } from './sd-item-boolean';
import { SdItemInteger } from './sd-item-integer';
import { SdItemNumber } from './sd-item-number';
import { SdItemString } from './sd-item-string';
import { SdItemObject } from './sd-item-object';
import { SdItem, XsdSdItem } from './sd-item';

export class SdItemList extends Array<SdItem> {
    [index: number]: SdItem;
    constructor(items?: Array<SdItem> | SdItemList) {
        super(...items);
        Object.assign(this,
            ...Object.keys(SdItemList.prototype)
                .filter(m => typeof Array.prototype[m] === 'undefined')
                .map(m => ({ [m]: SdItemList.prototype[m]}))
        );
    }

    public static fromJSON(key: string, value: any): SdItemList {
        if (!key && value instanceof Array) {
            const sdItemList = new SdItemList;
            value.forEach(item => {
                switch (item.type) {
                    case 'string':
                        sdItemList.push(SdItemString.fromJSON(null, item));
                        break;
                    case 'object':
                        sdItemList.push(SdItemObject.fromJSON(null, item));
                        break;
                    case 'number':
                        sdItemList.push(SdItemNumber.fromJSON(null, item));
                        break;
                    case 'integer':
                        sdItemList.push(SdItemInteger.fromJSON(null, item));
                        break;
                    case 'boolean':
                        sdItemList.push(SdItemBoolean.fromJSON(null, item));
                        break;
                    default:
                        sdItemList.push(SdItem.fromJSON(null, item));
                }
            });
            return sdItemList;
        }
    }
    toJSONSchema(): object {
        const sdItemArray = [].concat(this).filter(sdItem => !!sdItem.name);
        const required = sdItemArray.map(sdItem => sdItem.required && sdItem.name).filter(r => !!r);
        const schemaList = {
            properties: {},
            required: (required.length > 0) ? required : undefined
        };

        sdItemArray.forEach(sdItem => {
            schemaList.properties[sdItem.name] = sdItem.toJSONSchema();
        });

        return sdItemArray.length > 0 ? schemaList : undefined;
    }

    public toXSD(): XsdSdItemList {
        const eligibleXsdList = this.filter(item => !!item.name);
        return eligibleXsdList.length > 0 ? new XsdSdItemList(new SdItemList(eligibleXsdList)) : undefined;
    }
}

@XMLElement({ root: 'xs:complexType' })
export class XsdSdItemList {
    @XMLChild({ name: 'xs:element', implicitStructure: 'xs:sequence.$' })
    private elements: Array<XsdSdItem> = new Array<XsdSdItem>();

    constructor(itemList: SdItemList) {
        this.elements = itemList.map(item => item.toXSD());
    }

    public serialize(root?: string): string {
        return xml.serialize(this);
    }
}
