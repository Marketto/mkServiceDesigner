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
    verbs: SdServiceVerbs = new SdServiceVerbs;
}
