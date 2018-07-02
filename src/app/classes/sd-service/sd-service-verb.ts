import { XMLAttribute, XMLChild, XMLElement } from "xml-decorators";
import { SdItemList } from "../sd-item";
import { SdServiceVerbType } from "./sd-service-verb-types";

export const SCHEMA_VERSION = "http://json-schema.org/draft-07/schema#";

@XMLElement({ root: "operation" })
export class SdServiceVerb {
  public static fromJSON(key: string, value: any): SdServiceVerb {
    if (!key) {
      const sdServiceVerb = new SdServiceVerb(value.method);
      sdServiceVerb.req = SdItemList.fromJSON(null, value.request);
      sdServiceVerb.response = SdItemList.fromJSON(null, value.response);
      return sdServiceVerb;
    }
  }

  @XMLChild({})
  private get input(): SdItemList {
    return (this.request || []).length > 0 ? this.request : undefined;
  }
  @XMLChild({})
  private get output(): SdItemList {
    return this.response.length > 0 ? this.response : undefined;
  }

  public response: SdItemList = new SdItemList();
  @XMLAttribute({ required: true, name: "whttp:method" })
  private method: SdServiceVerbType = "GET";
  private req: SdItemList;

  public get request(): SdItemList {
    return this.req;
  }
  public set request(sdListItem: SdItemList) {
    if (this.method !== "GET") {
      this.req = sdListItem;
    }
  }

  constructor(method: SdServiceVerbType) {
    if (method) {
      this.method = method;
      this.request = new SdItemList();
    }
  }

  public toJSONSchemaList() {
    const jssReq = this.request ? this.request.toJSONSchema() : undefined;
    const jssRes = this.response.toJSONSchema();

    const jssVerbs = [jssReq ? {
      io: "request",
      schema: Object.assign({
        $schema: SCHEMA_VERSION,
      }, jssReq),
    } : undefined,
    jssRes ? {
      io: "response",
      schema: Object.assign({
        $schema: SCHEMA_VERSION,
      }, jssRes),
    } : undefined].filter((v) => !!v);

    return jssVerbs.length > 0 ? jssVerbs : undefined;
  }
}
