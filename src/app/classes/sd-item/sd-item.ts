import { XMLAttribute, XMLElement } from "xml-decorators";

export type SdItemType = "object" | "string" | "number" | "integer" | "boolean";

export interface InterfaceSdItem {
  symbol: symbol;
  id: number;
  name: string;
  type: SdItemType;
  required: boolean;

  toJSON(): any;
  toJSONSchema(): any;
}

type XsdType = "xs:anyType" | "xs:string" | "xs:dateTime" | "xs:anyURI" | "xs:boolean" | "xs:integer" | "xs:decimal" |
  "xs:nonPositiveInteger" | "xs:negativeInteger" | "xs:nonNegativeInteger" | "xs:positiveInteger";

@XMLElement({ root: "xs:element" })
export abstract class SdItem implements InterfaceSdItem {
  public static fromJSON(key: string, value: any): SdItem {
    return;
  }

  @XMLAttribute({ required: true })
  public name: string = "";

  public symbol = Symbol();
  public id: number;
  public type: SdItemType = null;
  public required: boolean = false;
  public dependencies: string[];

  // Array props
  public   listOf: boolean = false;
  public   minOccurrences: number = 0;
  public   maxOccurrences: number = null;
  public   uniqueItems: boolean = false;

  @XMLAttribute({ name: "type" })
  protected get xsdType(): XsdType {
    return "xs:anyType";
  }
  @XMLAttribute({})
  private get minOccurs(): number {
    return Math.max(this.required ? 1 : 0, ((this.listOf && this.minOccurrences) || 0).valueOf());
  }
  @XMLAttribute({})
  private get maxOccurs(): number | "unbounded" {
    return this.listOf ? (this.maxOccurrences ? this.maxOccurrences.valueOf() : "unbounded") : undefined;
  }

  constructor(item?: SdItem) {
      if (item) {
          this.symbol = item.symbol;
          this.id = item.id;
          this.name = item.name;
          this.listOf = item.listOf;
          this.required = item.required;
          this.dependencies = item.dependencies;
          this.minOccurrences = item.minOccurrences;
          this.maxOccurrences = item.maxOccurrences;
          this.uniqueItems = item.uniqueItems;
      }
  }

  public toJSON(): object {
      return Object.assign({}, this);
  }

  public toJSONSchema(): object {
    const itemJSS = this.toItemJSONSchema();
    if (this.listOf) {
      return {
        additionalItems: false,
        items: [itemJSS],
        maxItems: (this.maxOccurrences !== null) ? this.maxOccurrences : undefined,
        minItems: (this.minOccurrences !== null) ? this.minOccurrences : undefined,
        type: "array",
        uniqueItems: this.uniqueItems,
      };
    }
    return itemJSS;
  }

  protected toItemJSONSchema(): object {
    return {
      $id: this.id,
      type: this.type,
    };
  }
}
