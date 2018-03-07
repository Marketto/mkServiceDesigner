import { XMLElement, XMLAttribute, XMLChild, xml } from 'xml-decorators';
import { SdItemList, XsdSdItemList } from './../sd-item/sd-item-list';


export type SdServiceVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type SdServiceIOType = 'request' | 'response';

interface SdServiceVerbsJSON {
    GET?: SdServiceVerbO;
    POST?: SdServiceVerbIO;
    PUT?: SdServiceVerbIO;
    DELETE?: SdServiceVerbIO;
    PATCH?: SdServiceVerbIO;
}

const SCHEMA_VERSION = 'http://json-schema.org/schema#';

export class SdServiceVerbO {
    response: SdItemList = new SdItemList;

    public static fromJSON(key: string, value: any): SdServiceVerbO {
        if (!key) {
            const sdServiceVerbO = new SdServiceVerbO;
            sdServiceVerbO.response = SdItemList.fromJSON(null, value.response);
            return sdServiceVerbO;
        }
    }
    toJSONSchemaList() {
        const jss = this.response.toJSONSchema();
        return jss ? [{
            io: 'response',
            schema: Object.assign({
                $schema: SCHEMA_VERSION
            }, jss)
        }] : undefined;
    }

    public toXSD(): XsdSdServiceVerbIO {
        return this.response.filter(item => !!item.name).length > 0 ? new XsdSdServiceVerbIO(this) : undefined;
    }
}
export class SdServiceVerbIO extends SdServiceVerbO {
    request: SdItemList = new SdItemList;

    public static fromJSON(key: string, value: any): SdServiceVerbIO {
        if (!key) {
            const sdServiceVerbIO = new SdServiceVerbIO;
            sdServiceVerbIO.request = SdItemList.fromJSON(null, value.request);
            sdServiceVerbIO.response = SdItemList.fromJSON(null, value.response);
            return sdServiceVerbIO;
        }
    }
    toJSONSchemaList() {
        const jss = this.request.toJSONSchema();
        const schemaList = [
            jss && {
                io: 'request',
                schema: Object.assign({
                    $schema: SCHEMA_VERSION
                }, jss)
            }].concat(super.toJSONSchemaList()).filter(s => !!s);

        return schemaList.length > 0 ? schemaList : undefined;
    }

    public toXSD(): XsdSdServiceVerbIO {
        return this.request.filter(item => !!item.name).length > 0 ? new XsdSdServiceVerbIO(this) : super.toXSD();
    }
}


export class SdServiceVerbs {
    GET: SdServiceVerbO = new SdServiceVerbO;
    POST: SdServiceVerbIO = new SdServiceVerbIO;
    PUT: SdServiceVerbIO = new SdServiceVerbIO;
    DELETE: SdServiceVerbIO = new SdServiceVerbIO;
    PATCH: SdServiceVerbIO = new SdServiceVerbIO;

    public static fromJSON(key: string, value: any): SdServiceVerbs {
        if (!key) {
            const sdServiceVerbs = new SdServiceVerbs;
            sdServiceVerbs.GET = SdServiceVerbO.fromJSON(null, value.GET);
            sdServiceVerbs.POST = SdServiceVerbIO.fromJSON(null, value.POST);
            sdServiceVerbs.PUT = SdServiceVerbIO.fromJSON(null, value.PUT);
            sdServiceVerbs.DELETE = SdServiceVerbIO.fromJSON(null, value.DELETE);
            sdServiceVerbs.PATCH = SdServiceVerbIO.fromJSON(null, value.PATCH);
            return sdServiceVerbs;
        }
    }
    public toJSON(): SdServiceVerbsJSON {
        const json: Object = new Object();
        return {
            GET: (this.GET && this.GET.response) ? this.GET : undefined,
            POST: (this.POST && (this.POST.response || this.POST.request)) ? this.POST : undefined,
            PUT: (this.PUT && (this.PUT.response || this.PUT.request)) ? this.PUT : undefined,
            DELETE: (this.DELETE && (this.DELETE.response || this.DELETE.request)) ? this.DELETE : undefined,
            PATCH: (this.PATCH && (this.PATCH.response || this.PATCH.request)) ? this.PATCH : undefined
        };
    }

    toJSONSchemaList() {
        const getList = (this.GET.toJSONSchemaList() || []).map(io => Object.assign({ verb: 'GET' }, io));
        const putList = (this.PUT.toJSONSchemaList() || []).map(io => Object.assign({ verb: 'PUT' }, io));
        const postList = (this.POST.toJSONSchemaList() || []).map(io => Object.assign({ verb: 'POST' }, io));
        const deleteList = (this.DELETE.toJSONSchemaList() || []).map(io => Object.assign({ verb: 'DELETE' }, io));
        const patchList = (this.PATCH.toJSONSchemaList() || []).map(io => Object.assign({ verb: 'PATCH' }, io));

        const verbList = [].concat(getList, putList, postList, deleteList, patchList).filter(s => !!s);

        return verbList.length > 0 ? verbList : undefined;
    }

    public toXSD(): XsdSdServiceVerbs {
        return new XsdSdServiceVerbs(this);
    }
}




@XMLElement({ root: 'operation' })
class XsdSdServiceVerbIO {
    @XMLChild({})
    private output: XsdSdItemList;
    @XMLChild({})
    private input: XsdSdItemList;
    @XMLAttribute({ required: true, name: 'whttp:method'})
    public method: SdServiceVerb;

    constructor(verbIo: SdServiceVerbO) {
        this.output = verbIo.response.length > 0 ? verbIo.response.toXSD() : undefined;
        if (verbIo instanceof SdServiceVerbIO) {
            this.input = verbIo.request.length > 0 ? verbIo.request.toXSD() : undefined;
        }
    }

    public serialize(): string {
        return xml.serialize(this);
    }
}

@XMLElement({ root: 'endpoint' })
export class XsdSdServiceVerbs {
    @XMLChild({})
    private operation: XsdSdServiceVerbIO[] = new Array < XsdSdServiceVerbIO >();
    @XMLAttribute({required: true})
    public address: string;

    constructor(verb: SdServiceVerbs) {
        const get = verb.GET.toXSD();
        if (get) {
            get.method = 'GET';
            this.operation.push(get);
        }

        const post = verb.POST.toXSD();
        if (post) {
            post.method = 'POST';
            this.operation.push(post);
        }

        const put = verb.PUT.toXSD();
        if (put) {
            put.method = 'PUT';
            this.operation.push(put);
        }

        const del = verb.DELETE.toXSD();
        if (del) {
            del.method = 'DELETE';
            this.operation.push(del);
        }

        const patch = verb.PATCH.toXSD();
        if (patch) {
            patch.method = 'PATCH';
            this.operation.push(patch);
        }
    }

    public serialize(): string {
        return xml.serialize(this);
    }
}
