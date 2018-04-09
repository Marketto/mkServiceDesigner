import { isNumber } from "util";
import { SdItem } from "./sd-item";

type XsdNumericType =
  "xs:integer" |
  "xs:decimal" |
  "xs:nonPositiveInteger" |
  "xs:negativeInteger" |
  "xs:nonNegativeInteger" |
  "xs:positiveInteger";

export abstract class SdItemNumeric extends SdItem {
  public type: "number" | "integer";
  public default: number;
  public multipleOf: number;
  public minValue: number;
  public exclusiveMin: boolean = false;
  public maxValue: number;
  public exclusiveMax: boolean = false;

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
        exclusiveMax: (this.maxValue !== null && this.maxValue !== undefined) ? this.exclusiveMax : undefined,
        exclusiveMin: (this.minValue !== null && this.minValue !== undefined) ? this.exclusiveMin : undefined,
        maxValue: (this.maxValue !== null) ? this.maxValue : undefined,
        minValue: (this.minValue !== null) ? this.minValue : undefined,
        multipleOf: (this.multipleOf !== null) ? this.multipleOf : undefined,
      });
  }
}
