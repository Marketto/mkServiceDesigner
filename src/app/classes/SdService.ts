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

class SdServiceVerbs {
    GET: SdServiceVerbO = new SdServiceVerbO;
    POST: SdServiceVerbIO = new SdServiceVerbIO;
    PUT: SdServiceVerbIO = new SdServiceVerbIO;
    DELETE: SdServiceVerbIO = new SdServiceVerbIO;
    PATCH: SdServiceVerbIO = new SdServiceVerbIO;
}

export class SdService {
    constructor(parent?: SdService) {
        this.parent = parent;
    }
    parent: SdService;
    endPoint: String = '';
    get uri(): String {
        return (this.parent ? this.parent.uri : '') + '/' + this.endPoint;
    }
    verbs: SdServiceVerbs = new SdServiceVerbs;
}

export class SdServiceTreeItem extends TreeviewItem {
    constructor(parent?: SdServiceTreeItem) {
        super({
            text : '',
            value: null
        });
        this.parent = parent;
    }
    private parentTreeItem: SdServiceTreeItem;
    get parent(): SdServiceTreeItem {
        return this.parentTreeItem;
    }
    set parent(item: SdServiceTreeItem) {
        this.parentTreeItem = item;
        this.service.parent = this.parentTreeItem ? this.parentTreeItem.value : null;
    }
    private service: SdService = new SdService(this.parent ? this.parent.value : null);
    get value(): SdService {
        return this.service;
    }
    set value(any) {}
    get text(): string {
        return this.service.endPoint.toString();
    }
    set text(value: string) {
        if (this.service) {
            this.service.endPoint = String(value);
        }
    }
}
