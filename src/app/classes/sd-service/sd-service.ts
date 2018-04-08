import { SdServiceVerbs, SdServiceVerb, SdServiceIOType, XsdSdServiceVerbs } from './sd-service-verbs';
import { SdItemList } from '../sd-item/sd-item-list';
import { TreeviewItem } from 'ngx-treeview';


export interface SdServiceJSON {
    endPoint: String;
    verbs: SdServiceVerbs;
}
export class SdService {
    endPoint: String = '';
    verbs: SdServiceVerbs = new SdServiceVerbs;

    public static fromJSON(key: string, value: any): SdService {
        if (!key) {
            const sdService = new SdService;
            sdService.endPoint = value.endPoint || '';
            sdService.verbs = SdServiceVerbs.fromJSON(null, value.verbs);
            return sdService;
        }
        return value;
    }
    public toJSON(): SdServiceJSON {
        return Object.assign({parent: undefined}, this);
    }

    toJSONSchemaList () {
        const verbList = (this.verbs.toJSONSchemaList() || [])
          .map(s => Object.assign(s, {
              endPoint: this.endPoint,
              schema: Object.assign(s.schema, {
                  title: (this.endPoint || '').replace('/', ' ') || undefined
              })
          }));
        return verbList.length > 0 ? verbList : undefined;
    }
}
