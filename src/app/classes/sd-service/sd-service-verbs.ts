import { SdItemList } from './../sd-item/sd-item-list';


interface SdServiceVerbsJSON {
    GET?: SdServiceVerbO;
    POST?: SdServiceVerbIO;
    PUT?: SdServiceVerbIO;
    DELETE?: SdServiceVerbIO;
    PATCH?: SdServiceVerbIO;
}

export class SdServiceVerbO {
    response: SdItemList = new SdItemList;

    toJSONSchemaList() {
        const jss = this.response.toJSONSchema();
        return jss ? [{
            io: 'response',
            schema: jss
        }] : undefined;
    }
}
export class SdServiceVerbIO extends SdServiceVerbO {
    request: SdItemList = new SdItemList;

    toJSONSchemaList() {
        const jss = this.request.toJSONSchema();
        const schemaList = [
            jss && {
                io: 'request',
                schema: this.request.toJSONSchema()
            }].concat(super.toJSONSchemaList()).filter(s => !!s);

        return schemaList.length > 0 ? schemaList : undefined;
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
            const sdServiceVerb = Object.create(SdServiceVerbs.prototype);
            return Object.assign(sdServiceVerb, {
                GET: value.GET || new SdServiceVerbO,
                POST: value.POST || new SdServiceVerbIO,
                PUT: value.PUT || new SdServiceVerbIO,
                DELETE: value.DELETE || new SdServiceVerbIO,
                PATCH: value.PATCH || new SdServiceVerbIO
            });
        }
        return value;
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
}
