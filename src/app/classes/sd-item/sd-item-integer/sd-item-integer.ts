import { SdItem } from "../sd-item";
import { SdItemNumeric } from "../sd-item-numeric/sd-item-numeric";

export class SdItemInteger extends SdItemNumeric {
  public static fromJSON(key: string, value: any): SdItemInteger {
    if (!key) {
      return new SdItemInteger(Object.assign(Object.create(SdItemInteger.prototype), value || {}));
    }
  }

  public type: "integer" = "integer";

  public get multipleOf(): number {
    return this.$multipleOf;
  }
  public set multipleOf(multipleOf: number) {
    super.setMultipleOf(multipleOf ? Math.round(multipleOf) : multipleOf);
  }

  public get minValue(): number {
    return this.$minValue;
  }
  public set minValue(minValue: number) {
    super.setMinValue(minValue ? Math.round(minValue) : minValue);
  }

  public get maxValue(): number {
    return this.$maxValue;
  }
  public set maxValue(maxValue: number) {
    super.setMaxValue(maxValue ? Math.round(maxValue.valueOf()) : maxValue);
  }

  public get default(): number {
    return this.$default;
  }
  public set default(defaultValue: number) {
    super.setDefault(defaultValue ? Math.round(defaultValue) : defaultValue);
  }
}
