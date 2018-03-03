import { SdItemList } from './sd-item-list';
import { SdItem } from './sd-item';


type SdItemObjectAdditionalPropertiesType = 'string' | 'number' | 'integer' | 'boolean';

class SdItemObjectAdditionalProperties {
    type: SdItemObjectAdditionalPropertiesType;
}

export class SdItemObject extends SdItem {
    type: 'object' = 'object';
    additionalProperties: Boolean | SdItemObjectAdditionalProperties = false;
    children: SdItemList = new SdItemList;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemObject) {
            this.additionalProperties = item.additionalProperties;
            this.children = item.children;
        }
    }
}
