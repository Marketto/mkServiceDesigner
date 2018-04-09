import { XMLAttribute, XMLChild, XMLElement } from "xml-decorators";
import { SdItemList } from "./../sd-item";
import { SdServiceVerb } from "./sd-service-verb";

interface InterfaceSdServiceVerbsJSON {
    GET?: SdServiceVerb;
    POST?: SdServiceVerb;
    PUT?: SdServiceVerb;
    DELETE?: SdServiceVerb;
    PATCH?: SdServiceVerb;
}

@XMLElement({ root: "endpoint" })
export class SdServiceVerbs {
  public static fromJSON(key: string, value: any): SdServiceVerbs {
    if (!key) {
      const sdServiceVerbs = new SdServiceVerbs();
      sdServiceVerbs.GET = SdServiceVerb.fromJSON(null, value.GET);
      sdServiceVerbs.POST = SdServiceVerb.fromJSON(null, value.POST);
      sdServiceVerbs.PUT = SdServiceVerb.fromJSON(null, value.PUT);
      sdServiceVerbs.DELETE = SdServiceVerb.fromJSON(null, value.DELETE);
      sdServiceVerbs.PATCH = SdServiceVerb.fromJSON(null, value.PATCH);
      return sdServiceVerbs;
    }
  }

  public GET: SdServiceVerb = new SdServiceVerb("GET");
  public POST: SdServiceVerb = new SdServiceVerb("POST");
  public PUT: SdServiceVerb = new SdServiceVerb("PUT");
  public DELETE: SdServiceVerb = new SdServiceVerb("DELETE");
  public PATCH: SdServiceVerb = new SdServiceVerb("PATCH");

  @XMLAttribute({ required: true })
  public address: string;
  @XMLChild({})
  private get operation(): SdServiceVerb[] {
    const ops: SdServiceVerb[] = new Array<SdServiceVerb>();

    if (this.GET.response.length > 0) {
      ops.push(this.GET);
    }

    if ((this.POST.request.length + this.POST.response.length) > 0) {
      ops.push(this.POST);
    }

    if ((this.PUT.request.length + this.PUT.response.length) > 0) {
      ops.push(this.PUT);
    }

    if ((this.DELETE.request.length + this.DELETE.response.length) > 0) {
      ops.push(this.DELETE);
    }

    if ((this.PATCH.request.length + this.PATCH.response.length) > 0) {
      ops.push(this.PATCH);
    }

    return ops;
  }

  public toJSON(): InterfaceSdServiceVerbsJSON {
    return {
      DELETE: (this.DELETE && (this.DELETE.response || this.DELETE.request)) ? this.DELETE : undefined,
      GET: (this.GET && this.GET.response) ? this.GET : undefined,
      PATCH: (this.PATCH && (this.PATCH.response || this.PATCH.request)) ? this.PATCH : undefined,
      POST: (this.POST && (this.POST.response || this.POST.request)) ? this.POST : undefined,
      PUT: (this.PUT && (this.PUT.response || this.PUT.request)) ? this.PUT : undefined,
    };
  }

  public toJSONSchemaList() {
    const getList = (this.GET.toJSONSchemaList() || []).map((io) => Object.assign({ verb: "GET" }, io));
    const putList = (this.PUT.toJSONSchemaList() || []).map((io) => Object.assign({ verb: "PUT" }, io));
    const postList = (this.POST.toJSONSchemaList() || []).map((io) => Object.assign({ verb: "POST" }, io));
    const deleteList = (this.DELETE.toJSONSchemaList() || []).map((io) => Object.assign({ verb: "DELETE" }, io));
    const patchList = (this.PATCH.toJSONSchemaList() || []).map((io) => Object.assign({ verb: "PATCH" }, io));

    const verbList = [].concat(getList, putList, postList, deleteList, patchList).filter((s) => !!s);

    return verbList.length > 0 ? verbList : undefined;
  }
}
