import { TreeviewItem } from "ngx-treeview";
import { InterfaceSdServiceJSON, SdService } from "./sd-service";
import { IsdServiceJSONSchemaType } from "./sd-service-verb-types";
import { SdServiceVerbs } from "./sd-service-verbs";

export const SERVICE_PATH_NAME_REGEXP: RegExp = /^(?:(?:[a-z0-9]+(?:[\-\_][a-z0-9]+)*)|(?:\{[a-zA-Z]+\}))$/;

export class SdServiceTreeItem extends TreeviewItem {
  public static fromJSON(key: string, value: any): SdServiceTreeItem {
    if (!key) {
      const sdServiceTreeItem = new SdServiceTreeItem();
      sdServiceTreeItem.value = SdService.fromJSON(null, value);
      sdServiceTreeItem.children = Array.isArray(value.children) ? (value.children || []).map((child) => {
        const sdServiceTreeItemChild = SdServiceTreeItem.fromJSON(null, child);
        sdServiceTreeItemChild.parent = sdServiceTreeItem;
        return sdServiceTreeItemChild;
      }) : undefined;

      return sdServiceTreeItem;
    }
    return value;
  }

  public children: SdServiceTreeItem[];
  public value: SdService = new SdService();

  private parentTreeItem: SdServiceTreeItem;

  constructor() {
    super({
        text: "",
        value: null,
    });
  }

  get uri(): string {
    return (this.parent ? this.parent.uri : "") + "/" + this.value.endPoint;
  }

  get parent(): SdServiceTreeItem {
    return this.parentTreeItem;
  }
  set parent(item: SdServiceTreeItem) {
    this.parentTreeItem = item;
    item.children = (item.children || []).concat(this);
  }

  get text(): string {
    return this.value.endPoint.toString();
  }
  set text(value: string) {
    if (this.value && (SERVICE_PATH_NAME_REGEXP.test(value) || !value)) {
      this.value.endPoint = String(value);
    }
  }

  public toJSON(): InterfaceSdServiceJSON {
    return Object.assign({}, this.value, {
      children: this.children,
      parent: undefined,
    });
  }

  public toJSONSchemaList(): IsdServiceJSONSchemaType[] {
    const serviceList = (this.value.toJSONSchemaList() || [])
      .filter((s) => !!s)
      .map((s) => Object.assign({}, s, {
        schema: s.schema,
        uri: this.uri,
      }) )
      .concat(...(this.children || []).map((c) => c.toJSONSchemaList()).filter((s) => !!s) );
    return serviceList.length > 0 ? serviceList : undefined;
  }

  public flatList(): SdService[] {
    this.value.verbs.address = this.uri;

    const outList = this.value.endPoint ? [this.value] : [];
    if (this.children) {
      this.children
        .filter((s) => !!s.value.endPoint)
        .forEach((s) => {
          outList.push(...s.flatList());
        });
    }
    return outList;
  }
}
