import { isNumber } from "util";
import { SdItem } from "../sd-item";

type XsdNumericType =
  "xs:integer" |
  "xs:decimal" |
  "xs:nonPositiveInteger" |
  "xs:negativeInteger" |
  "xs:nonNegativeInteger" |
  "xs:positiveInteger";

export abstract class SdItemNumeric extends SdItem {
  public type: "number" | "integer";
  public exclusiveMin: boolean = false;
  public exclusiveMax: boolean = false;

  protected $default: number;
  protected $minValue: number;
  protected $maxValue: number;
  protected $multipleOf: number;

  public get minValue(): number {
    return this.$minValue;
  }
  public set minValue(minValue: number) {
    this.setMinValue(minValue);
  }

  public get maxValue(): number {
    return this.$maxValue;
  }
  public set maxValue(maxValue: number) {
    this.setMaxValue(maxValue);
  }

  public get default(): number {
    return this.$default;
  }
  public set default(defaultValue: number) {
    this.setDefault(defaultValue);
  }

  public get multipleOf(): number {
    return this.$multipleOf;
  }
  public set multipleOf(multipleOf: number) {
    this.setMultipleOf(multipleOf);
  }

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

  protected setMinValue(minValue: number) {
    this.$minValue = (
      !isNaN(minValue) &&
      minValue !== null &&
      (
        (
          !isNaN(this.maxValue) &&
          this.maxValue >= minValue
        ) ||
        isNaN(this.maxValue)
      )
    ) ? minValue : undefined;

    if (!isNaN(this.default) && this.default <= this.minValue) {
      this.$default = this.minValue;
    }
  }
  protected setMaxValue(maxValue: number) {
    this.$maxValue = (
      !isNaN(maxValue) &&
      maxValue !== null &&
      (
        (
          !isNaN(this.minValue) &&
          this.minValue <= maxValue
        ) ||
        isNaN(this.minValue)
      )
    ) ? maxValue : undefined;

    if (!isNaN(this.default) && this.default >= this.maxValue) {
      this.$default = this.maxValue;
    }
  }
  protected setDefault(defaultValue: number) {
    this.$default = (
      !isNaN(defaultValue) &&
      defaultValue !== null &&
      (
        (
          !isNaN(this.minValue) &&
          this.minValue < defaultValue
        ) ||
        isNaN(this.minValue)
      ) &&
      (
        (
          !isNaN(this.maxValue) &&
          this.maxValue > defaultValue
        ) ||
        isNaN(this.maxValue)
      )
    ) ? defaultValue : undefined;
  }
  protected setMultipleOf(multipleOf: number) {
    this.$multipleOf = (
      !isNaN(multipleOf) &&
      multipleOf !== null &&
      (
        (
          !isNaN(this.maxValue) &&
          this.maxValue > multipleOf
        ) ||
        isNaN(this.maxValue)
      )
    ) ? multipleOf : undefined;
  }

  protected get xsdType(): XsdNumericType {
    if (
      (this.multipleOf && Math.round(this.multipleOf.valueOf()) === this.multipleOf.valueOf()) ||
      this.type === "integer"
    ) {
      if (isNumber(this.maxValue) && this.maxValue.valueOf() <= 0) {
        return !this.maxValue ? "xs:nonPositiveInteger" : "xs:negativeInteger";
      } else if (isNumber(this.minValue) && this.minValue.valueOf() >= 0) {
        return !this.minValue ? "xs:nonNegativeInteger" : "xs:positiveInteger";
      } else {
        return "xs:integer";
      }
    }
    return "xs:decimal";
  }

  protected toItemJSONSchema(): object {
      const jss = super.toItemJSONSchema();
      return Object.assign(jss, {
        default: (this.default !== null) ? this.default : undefined,
        exclusiveMax: (this.maxValue !== null && this.maxValue !== undefined) ? this.exclusiveMax : undefined,
        exclusiveMin: (this.minValue !== null && this.minValue !== undefined) ? this.exclusiveMin : undefined,
        maxValue: (this.maxValue !== null) ? this.maxValue : undefined,
        minValue: (this.minValue !== null) ? this.minValue : undefined,
        multipleOf: (this.multipleOf !== null) ? this.multipleOf : undefined,
      });
  }
}
