import { SdItem, XsdSdItem } from './sd-item';
import { isNumber } from 'util';


export abstract class SdItemNumeric extends SdItem {
    type: 'number' | 'integer';
    default: Number;
    multipleOf: Number;
    minValue: Number;
    exclusiveMin: Boolean = false;
    maxValue: Number;
    exclusiveMax: Boolean = false;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemNumeric) {
            this.default = item.default;
            this.multipleOf = item.multipleOf;
            this.minValue = item.minValue;
            this.exclusiveMin = item.exclusiveMin;
            this.maxValue = item.maxValue;
            this.exclusiveMax = item.exclusiveMax;
        }
    }

    protected toItemJSONSchema(): object {
        const jss = super.toItemJSONSchema();
        return Object.assign(jss, {
            default: (this.default !== null) ? this.default : undefined,
            multipleOf: (this.multipleOf !== null) ? this.multipleOf : undefined,
            minValue: (this.minValue !== null) ? this.minValue : undefined,
            maxValue: (this.maxValue !== null) ? this.maxValue : undefined,
            exclusiveMin: (this.minValue !== null && this.minValue !== undefined) ? this.exclusiveMin : undefined,
            exclusiveMax: (this.maxValue !== null && this.maxValue !== undefined) ? this.exclusiveMax : undefined
        });
    }

    public toXSD(): XsdSdItemNumeric {
        return super.toXSD(XsdSdItemNumeric);
    }
}

type XsdNumericType = 'xs:integer' | 'xs:decimal' | 'xs:nonPositiveInteger' |
                        'xs:negativeInteger' | 'xs:nonNegativeInteger' | 'xs:positiveInteger';
class XsdSdItemNumeric extends XsdSdItem {
    protected type: XsdNumericType = 'xs:decimal';

    constructor(item: SdItemNumeric) {
        super(item);
        // type
        if ((item.multipleOf && Math.round(item.multipleOf.valueOf()) === item.multipleOf.valueOf()) || item.type === 'integer') {
            if (isNumber(item.maxValue) && item.maxValue.valueOf() <= 0) {
                this.type = !item.maxValue ? 'xs:nonPositiveInteger' : 'xs:negativeInteger';
            } else if (isNumber(item.minValue) && item.minValue.valueOf() >= 0) {
                this.type = !item.minValue ? 'xs:nonNegativeInteger' : 'xs:positiveInteger';
            } else {
                this.type = 'xs:integer';
            }
        } else {
            this.type = 'xs:decimal';
        }
    }
}
