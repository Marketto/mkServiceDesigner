import { SdServiceVerbs } from './sd-service-verbs';
import { SdItemList } from '../sd-item/sd-item-list';
import { TreeviewItem } from 'ngx-treeview';


export type SdServiceVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type SdServiceIOType = 'request' | 'response';

export interface SdServiceJSON {
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
