import { XMLChild } from "xml-decorators";
import { SdItem } from "../sd-item";
import { SdItemList } from "../sd-item-list/sd-item-list";

type SdItemObjectAdditionalPropertiesType = boolean | "string" | "number" | "integer" | "boolean";

export class SdItemObject extends SdItem {
  public static fromJSON(key: string, value: any): SdItemObject {
    if (!key) {
      const jsonItem = value || {};
      const sdItemObject = new SdItemObject();
      Object.assign(sdItemObject, jsonItem, {
        children: SdItemList.fromJSON(null, jsonItem.children || []),
      });
      return sdItemObject;
    }
  }

  public type: "object" = "object";
  @XMLChild({ name: "xs:complexType" })
  public children: SdItemList = new SdItemList();
  private $additionalProperties: SdItemObjectAdditionalPropertiesType = true;

  constructor(item?: SdItem) {
    super(item);
    if (item && item instanceof SdItemObject) {
      this.additionalProperties = item.additionalProperties;
      this.children = item.children;
    }
  }

  public clone(): SdItemObject {
    return new SdItemObject(this);
  }

  protected get xsdType(): undefined {
    return;
  }

  get additionalProperties(): SdItemObjectAdditionalPropertiesType {
    return ( (this.children || []).length > 0 || this.$additionalProperties) ? this.$additionalProperties : true;
  }
  set additionalProperties(value: SdItemObjectAdditionalPropertiesType) {
    this.$additionalProperties = value;
  }

  public toJSON(): object {
    const json = super.toJSON();
    return Object.assign(json, {
      $additionalProperties: undefined,
      additionalProperties: this.additionalProperties,
    });
  }

  protected toItemJSONSchema(): object {
    const jss = super.toItemJSONSchema();
    const properties = (this.children.length > 0) ? this.children.toJSONSchema() : {};
    return Object.assign(jss, {
      additionalProperties: this.additionalProperties,
    }, properties);
  }

}
