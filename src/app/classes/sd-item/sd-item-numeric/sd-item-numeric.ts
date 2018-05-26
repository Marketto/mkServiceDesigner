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
  protected $exclusiveMin: boolean = false;
  protected $exclusiveMax: boolean = false;

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

  public get exclusiveMin(): boolean {
    return this.$exclusiveMin;
  }
  public set exclusiveMin(exMin: boolean) {
    this.setExclusiveMin(exMin);
  }

  public get exclusiveMax(): boolean {
    return this.$exclusiveMax;
  }
  public set exclusiveMax(exMax: boolean) {
    this.setExclusiveMax(exMax);
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
    if(
      !isNaN(minValue) &&
      minValue !== null &&
      (
        (
          !isNaN(this.maxValue) &&
          (
            this.maxValue > minValue ||
            (
              !(this.exclusiveMax || this.exclusiveMin) &&
              this.maxValue === minValue
            )
          )
        ) ||
        isNaN(this.maxValue)
      )
    ){
      this.$minValue = minValue;
    } else if (isNaN(minValue) || minValue === null){
      this.$minValue = undefined;
    }

    // Default value check & correction
    if (
      !isNaN(this.default) &&
      !isNaN(this.minValue) &&
      this.default <= this.minValue
    ) {
      this.$default = undefined;
      this.default = this.minValue;
    }
  }
  protected setExclusiveMin(exMin: boolean) {
    this.$exclusiveMin = exMin;
  }
  protected setMaxValue(maxValue: number) {
    if(
      !isNaN(maxValue) &&
      maxValue !== null &&
      (
        (
          !isNaN(this.minValue) &&
          (
            this.minValue < maxValue ||
            (
              !(this.exclusiveMax || this.exclusiveMin) &&
              this.minValue === maxValue
            )
          )
        ) ||
        isNaN(this.minValue)
      ) &&
      (
        (
          !isNaN(this.multipleOf) &&
          (
            maxValue > this.multipleOf ||
            (
              !(this.exclusiveMax || this.exclusiveMin) &&
              maxValue === this.multipleOf
            )
          )
        ) ||
        isNaN(this.multipleOf)
      )
    ){
      this.$maxValue = maxValue;
    } else if (isNaN(maxValue) || maxValue === null) {
      this.$maxValue = undefined;
    }

    // Default value check & correction
    if (
      !isNaN(this.default) &&
      !isNaN(this.maxValue) &&
      this.default >= this.maxValue
    ) {
      this.$default = undefined;
      this.default = this.maxValue;
    }
  }
  protected setExclusiveMax(exMax: boolean) {
    this.$exclusiveMax = exMax;
  }
  protected setDefault(defaultValue: number) {
    if(
      !isNaN(defaultValue) &&
      defaultValue !== null &&
      (
        (
          !isNaN(this.minValue) &&
          (
            this.minValue < defaultValue ||
            (
              !this.exclusiveMin &&
              this.minValue === defaultValue
            )
          )
        ) ||
        isNaN(this.minValue)
      ) &&
      (
        (
          !isNaN(this.maxValue) &&
          (
            this.maxValue > defaultValue ||
            (
              !this.exclusiveMax &&
              this.maxValue === defaultValue
            )
          )
        ) ||
        isNaN(this.maxValue)
      ) &&
      (
        (
          !isNaN(this.multipleOf) &&
          !(defaultValue % this.multipleOf)
        ) ||
        isNaN(this.multipleOf)
      )
    ){
      this.$default = defaultValue;
    } else if (isNaN(defaultValue) || defaultValue === null) {
      this.$default = undefined;
    };
  }
  protected setMultipleOf(multipleOf: number) {
    if (
      !isNaN(multipleOf) &&
      multipleOf !== null &&
      (
        (
          !isNaN(this.maxValue) &&
          (
            this.maxValue > multipleOf ||
            (
              !(this.exclusiveMax || this.exclusiveMin) &&
              this.maxValue === multipleOf
            )
          )
        ) ||
        isNaN(this.maxValue)
      )
    ){
      this.$multipleOf = multipleOf;
    } else if(isNaN(multipleOf) || multipleOf === null){
      this.$multipleOf = undefined;
    }

    if (
      !isNaN(this.default) &&
      !isNaN(this.multipleOf) &&
      ( this.default % this.multipleOf )
    ) {
      this.default = Math.round(this.default / this.multipleOf) * this.multipleOf;
    }
  }

  protected get xsdType(): XsdNumericType {
    if (
      (
        this.multipleOf &&
        Math.round(this.multipleOf.valueOf()) === this.multipleOf.valueOf()
      ) ||
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
