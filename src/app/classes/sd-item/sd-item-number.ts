import { SdItemNumeric } from './sd-item-numeric';

export class SdItemNumber extends SdItemNumeric {
    type: 'number' = 'number';

    public static fromJSON(key: string, value: any): SdItemNumber {
        if (!key) {
            return new SdItemNumber(Object.assign(Object.create(SdItemNumber.prototype), value || {}));
        }
    }
}
