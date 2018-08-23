import { SdItem } from "../sd-item";

type SdItemStringFormatJson = "hostname" | "ipv4" | "ipv6" | "date-time" | "email" | "uri" | false;
type XsdStringType = "xs:string" | "xs:dateTime" | "xs:anyURI";

export class SdItemString extends SdItem {
  public static fromJSON(key: string, value: any): SdItemString {
    if (!key) {
      return new SdItemString(Object.assign(Object.create(SdItemString.prototype), value || {}));
    }
  }

  public type: "string" = "string";
  public default: string;
  public domain: string[] = [];
  public minLength: number;
  public maxLength: number;
  public format: SdItemStringFormatJson = false;
  protected get xsdType(): XsdStringType {
    switch (this.format) {
      case "date-time":
        return "xs:dateTime";
      case "uri":
        return "xs:anyURI";
      default:
        return "xs:string";
    }
  }
  private $pattern: RegExp;

  get pattern(): string {
    if (this.$pattern) {
      const regexp = this.$pattern.toString();
      return regexp.substr(1, regexp.length - 2);
    }
    return null;
  }
  set pattern(value: string) {
    if (value) {
      try {
        this.$pattern = new RegExp(value);
      } catch (e) {
        return;
      }
    } else {
      this.$pattern = null;
    }
  }

  constructor(item?: SdItem) {
    super(item);
    if (item && item instanceof SdItemString) {
      this.default = item.default;
      this.domain = item.domain;
      this.minLength = item.minLength;
      this.maxLength = item.maxLength;
      this.pattern = item.pattern;
      this.format = item.format;
    }
  }

  public toJSON(): object {
    const json = super.toJSON();
    return Object.assign(json, {
      $pattern : undefined,
      pattern: this.pattern,
    });
  }

  public clone(): SdItemString {
    return new SdItemString(this);
  }

  protected toItemJSONSchema(): object {
    const jss = super.toItemJSONSchema();
    return Object.assign(jss, {
      default: this.default || undefined,
      enum: (this.domain.length > 0) ? this.domain : undefined,
      format: this.format || undefined,
      maxLength: Number.isInteger(this.maxLength) ? this.maxLength : undefined,
      minLength: Number.isInteger(this.minLength) ? this.minLength : undefined,
      pattern: this.pattern || undefined,
    });
  }
}
