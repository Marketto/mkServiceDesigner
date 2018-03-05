import { SdItem } from './sd-item';

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
}
