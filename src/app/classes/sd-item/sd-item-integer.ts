import { SdItemNumeric } from './sd-item-numeric';
import { SdItem } from './sd-item';

export class SdItemInteger extends SdItemNumeric {
    type: 'integer' = 'integer';
    private $multipleOf: Number;
    private $minValue: Number;
    private $maxValue: Number;

    get multipleOf(): Number {
        return this.$multipleOf;
    }
    set multipleOf(multipleOf: Number) {
        this.$multipleOf = multipleOf ? Math.round(multipleOf.valueOf()) : multipleOf;
    }

    get minValue(): Number {
        return this.$minValue;
    }
    set minValue(minValue: Number) {
        this.$minValue = minValue ? Math.round(minValue.valueOf()) : minValue;
    }

    get maxValue(): Number {
        return this.$maxValue;
    }
    set maxValue(maxValue: Number) {
        this.$maxValue = maxValue ? Math.round(maxValue.valueOf()) : maxValue;
    }
}
