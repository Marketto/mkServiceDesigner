import { XMLAttribute, XMLChild, XMLElement } from "xml-decorators";
import { SdServiceVerbs } from "./sd-service-verbs";

export interface InterfaceSdServiceJSON {
    endPoint: string;
    verbs: SdServiceVerbs;
}

@XMLElement({ root: "description" })
export class SdService {
  public static fromJSON(key: string, value: any): SdService {
    if (!key) {
      const sdService = new SdService();
      sdService.endPoint = value.endPoint || "";
      sdService.verbs = SdServiceVerbs.fromJSON(null, value.verbs);
      return sdService;
    }
    return value;
  }

  public endPoint: string = "";
  @XMLChild({ implicitStructure: "service.$", name: "endpoint" })
  public verbs: SdServiceVerbs = new SdServiceVerbs();

  @XMLAttribute({})
  private xmlns = "http://www.w3.org/ns/wsdl";
  @XMLAttribute({})
  private "xmls:whttp" = "http://www.w3.org/ns/wsdl/http";
  @XMLAttribute({})
  private "xmlns:wsoap" = "http://www.w3.org/ns/wsdl/soap";

  public toJSON(): InterfaceSdServiceJSON {
    return Object.assign({parent: undefined}, this);
  }

  public toJSONSchemaList() {
    const verbList = (this.verbs.toJSONSchemaList() || [])
      .map((s) => Object.assign(s, {
          endPoint: this.endPoint,
          schema: Object.assign(s.schema, {
              title: (this.endPoint || "").replace("/", " ") || undefined,
          }),
      }));
    return verbList.length > 0 ? verbList : undefined;
  }
}
