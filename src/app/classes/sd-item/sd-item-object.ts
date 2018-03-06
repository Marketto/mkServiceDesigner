import { XMLChild } from 'xml-decorators';
import { SdItemList } from './sd-item-list';
import { SdItem, XsdSdItem } from './sd-item';


type SdItemObjectAdditionalPropertiesType = boolean | 'string' | 'number' | 'integer' | 'boolean';


export class SdItemObject extends SdItem {
    type: 'object' = 'object';
    private $additionalProperties: SdItemObjectAdditionalPropertiesType = true;
    children: SdItemList = new SdItemList;

    get additionalProperties(): SdItemObjectAdditionalPropertiesType {
        return ( (this.children || []).length > 0 || this.$additionalProperties) ? this.$additionalProperties : true;
    }
    set additionalProperties(value: SdItemObjectAdditionalPropertiesType) {
        this.$additionalProperties = value;
    }

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemObject) {
            this.additionalProperties = item.additionalProperties;
            this.children = item.children;
        }
    }


    public toJSON(): object {
        const json = super.toJSON();
        return Object.assign(json, {
            $additionalProperties: undefined,
            additionalProperties: this.additionalProperties
        });
    }

    protected toItemJSONSchema(): object {
        const jss = super.toItemJSONSchema();
        const children = (this.children.length > 0) ? this.children.toJSONSchema() : undefined;
        return Object.assign(jss, {
            properties: children,
            additionalProperties: this.additionalProperties
        });
    }

    public toXSD(): XsdSdItemSObject {
        return super.toXSD(XsdSdItemSObject);
    }
}


class XsdSdItemSObject extends XsdSdItem {
    protected type: undefined = undefined;
    @XMLChild({ name: 'xs:complexType'})
    private complexType;

    constructor(item: SdItemObject) {
        super(item);
        this.complexType = item.children.toXSD();
    }
}
