import { SdItem } from './sd-item';

export abstract class SdItemNumeric extends SdItem {
    type: 'number' | 'integer';
    multipleOf: Number;
    minValue: Number;
    exclusiveMin: Boolean;
    maxValue: Number;
    exclusiveMax: Boolean;

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
}
