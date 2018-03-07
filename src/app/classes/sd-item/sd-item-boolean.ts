import { SdItem, XsdSdItem } from './sd-item';


export class SdItemBoolean extends SdItem {
    type: 'boolean' = 'boolean';
    default: Boolean;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemBoolean) {
            this.default = item.default;
        }
    }

    public static fromJSON(key: string, value: any): SdItemBoolean {
        if (!key) {
            return new SdItemBoolean(Object.assign(Object.create(SdItemBoolean.prototype), value || {}));
        }
    }

    protected toItemJSONSchema(): object {
        const jss = super.toItemJSONSchema();
        return Object.assign(jss, {
            default: (this.default !== null) ? this.default : undefined
        });
    }

    public toXSD(): XsdSdItemBoolean {
        return super.toXSD(XsdSdItemBoolean);
    }
}



class XsdSdItemBoolean extends XsdSdItem {
    protected type: 'xs:boolean' = 'xs:boolean';
    constructor(item: SdItemBoolean) {
        super(item);
    }
}
