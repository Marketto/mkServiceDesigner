import { xml, XMLChild, XMLElement } from "xml-decorators";
import { SdItem } from "../sd-item";
import { SdItemBoolean } from "../sd-item-boolean/sd-item-boolean";
import { SdItemInteger } from "../sd-item-integer/sd-item-integer";
import { SdItemNumber } from "../sd-item-number/sd-item-number";
import { SdItemObject } from "../sd-item-object/sd-item-object";
import { SdItemString } from "../sd-item-string/sd-item-string";

@XMLElement({ root: "xs:complexType" })
export class SdItemList extends Array<SdItem> {
  [index: number]: SdItem;

  public static fromJSON(key: string, value: any): SdItemList {
    if (!key && value instanceof Array) {
      const sdItemList = new SdItemList();
      value.forEach((item) => {
        switch (item.type) {
          case "string":
            sdItemList.push(SdItemString.fromJSON(null, item));
            break;
          case "object":
            sdItemList.push(SdItemObject.fromJSON(null, item));
            break;
          case "number":
            sdItemList.push(SdItemNumber.fromJSON(null, item));
            break;
          case "integer":
            sdItemList.push(SdItemInteger.fromJSON(null, item));
            break;
          case "boolean":
            sdItemList.push(SdItemBoolean.fromJSON(null, item));
            break;
          default:
            sdItemList.push(SdItem.fromJSON(null, item));
        }
      });
      return sdItemList;
    }
  }

  @XMLChild({ name: "xs:element", implicitStructure: "xs:sequence.$" })
  private get elements(): SdItem[] {
    return this.filter((sdItem) => {
      return !!sdItem.name;
    });
  }

  constructor(items?: SdItem[] | SdItemList) {
    super(...items);
    Object.assign(
      this,
      ...Object.keys(SdItemList.prototype)
        .filter((m) => typeof Array.prototype[m] === "undefined")
        .map((m) => {
          return {
            [m]: SdItemList.prototype[m],
          };
        }),
    );
  }

  public toJSONSchema(): object {
    const sdItemArray: SdItem[] = [].concat(this).filter((sdItem) => !!sdItem.name);
    const required = sdItemArray
      .filter((sdItem) => sdItem.required && sdItem.name)
      .map((sdItem) => sdItem.name);
    const dependencies = sdItemArray
      .filter((sdItem) => sdItem.name && (sdItem.dependencies || []).length > 0 )
      .map((sdItem) => {
        return {
          [sdItem.name]: sdItem.dependencies,
        };
      });
    const schemaList = {
      dependencies: (dependencies.length > 0) ? dependencies : undefined,
      properties: Object.assign({}, ...sdItemArray.map((sdItem) => {
        return {
          [sdItem.name]: sdItem.toJSONSchema(),
        };
      })),
      required: (required.length > 0) ? required : undefined,
    };

    return sdItemArray.length > 0 ? schemaList : undefined;
  }
}
