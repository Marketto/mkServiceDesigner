import { SdItem } from "./sd-item";
import { SdItemNumeric } from "./sd-item-numeric";

export class SdItemInteger extends SdItemNumeric {
  public static fromJSON(key: string, value: any): SdItemInteger {
    if (!key) {
      return new SdItemInteger(Object.assign(Object.create(SdItemInteger.prototype), value || {}));
    }
  }

  public type: "integer" = "integer";
  private $multipleOf: number;
  private $minValue: number;
  private $maxValue: number;

  get multipleOf(): number {
      return this.$multipleOf;
  }
  set multipleOf(multipleOf: number) {
      this.$multipleOf = multipleOf ? Math.round(multipleOf.valueOf()) : multipleOf;
  }

  get minValue(): number {
      return this.$minValue;
  }
  set minValue(minValue: number) {
      this.$minValue = minValue ? Math.round(minValue.valueOf()) : minValue;
  }

  get maxValue(): number {
      return this.$maxValue;
  }
  set maxValue(maxValue: number) {
      this.$maxValue = maxValue ? Math.round(maxValue.valueOf()) : maxValue;
  }
}
