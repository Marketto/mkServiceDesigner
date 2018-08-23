import { SdItem } from "../sd-item";

export class SdItemBoolean extends SdItem {

  public static fromJSON(key: string, value: any): SdItemBoolean {
    if (!key) {
      return new SdItemBoolean(value);
    }
  }

  public type: "boolean" = "boolean";
  public default: boolean;

  protected get xsdType(): "xs:boolean" {
    return "xs:boolean";
  }

  constructor(item?: SdItem) {
      super(item);
      if (item && item instanceof SdItemBoolean) {
          this.default = item.default;
      }
  }

  public clone(): SdItemBoolean {
    return new SdItemBoolean(this);
  }

  protected toItemJSONSchema(): object {
      const jss = super.toItemJSONSchema();
      return Object.assign(jss, {
          default: (this.default !== null) ? this.default : undefined,
      });
  }
}
