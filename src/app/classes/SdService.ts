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
    endPoint: String = '';
    verbs: SdServiceVerbs = new SdServiceVerbs;
}

export class SdServiceTreeItem extends TreeviewItem {
    constructor() {
        super({
            text : '',
            value: null
        });
    }
    private service: SdService = new SdService;
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
