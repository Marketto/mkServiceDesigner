import { TreeviewItem } from 'ngx-treeview';
import { SdNode, SdItemObject } from './SdItem';

export type SdServiceVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type SdServiceIOType = 'request' | 'response';

class SdServiceVerbO {
    response: SdNode = new SdNode;
}
class SdServiceVerbIO extends SdServiceVerbO {
    request: SdNode = new SdNode;
}

interface SdServiceVerbsJSON {
    GET?: SdServiceVerbO;
    POST?: SdServiceVerbIO;
    PUT?: SdServiceVerbIO;
    DELETE?: SdServiceVerbIO;
    PATCH?: SdServiceVerbIO;
}

class SdServiceVerbs {
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
}

interface SdServiceJSON {
    endPoint: String;
    verbs: SdServiceVerbs;
}
export class SdService {
    endPoint: String = '';
    verbs: SdServiceVerbs = new SdServiceVerbs;

    public static fromJSON(key: string, value: any): SdService {
        if (!key) {
            const sdService = Object.create(SdService.prototype);

            return Object.assign(sdService, {
                endPoint: value.endPoint || '',
                verbs: SdServiceVerbs.fromJSON(null, value.verbs)
            });
        }
        return value;
    }
    public toJSON(): SdServiceJSON {
        return Object.assign({parent: undefined}, this);
    }
}

/*interface SdServiceTreeItemJSON {
    endPoint: String;
    verbs: SdServiceVerbsJSON;
    children: Array<SdServiceTreeItem>;
}*/
export class SdServiceTreeItem extends TreeviewItem {
    constructor() {
        super({
            text : '',
            value: null
        });
    }
    private parentTreeItem: SdServiceTreeItem;
    children: Array<SdServiceTreeItem>;
    value: SdService = new SdService;

    get uri(): String {
        return (this.parent ? this.parent.uri : '') + '/' + this.value.endPoint;
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
        if (this.value) {
            this.value.endPoint = String(value);
        }
    }
    public static fromJSON(key: string, value: any): SdServiceTreeItem {
        if (!key) {
            const sdServiceTreeItem = Object.create(SdServiceTreeItem.prototype);

            return Object.assign(sdServiceTreeItem, {
                value: SdService.fromJSON(null, value),
                children: Array.isArray(value.children) ? (value.children || []).map(child => {
                    const sdServiceTreeItemChild = SdServiceTreeItem.fromJSON(null, child);
                    sdServiceTreeItemChild.parent = sdServiceTreeItem;
                    return sdServiceTreeItemChild;
                }) : undefined
            });
        }
        return value;
    }
    public toJSON(): SdServiceJSON {
        return Object.assign({}, this.value, {
            parent: undefined,
            children: this.children
        });
    }
}
