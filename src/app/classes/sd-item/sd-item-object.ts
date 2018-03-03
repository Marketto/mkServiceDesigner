import { SdItemList } from './sd-item-list';
import { SdItem } from './sd-item';


type SdItemObjectAdditionalPropertiesType = boolean | 'string' | 'number' | 'integer' | 'boolean';

export class SdItemObject extends SdItem {
    type: 'object' = 'object';
    additionalProperties: SdItemObjectAdditionalPropertiesType = false;
    children: SdItemList = new SdItemList;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemObject) {
            this.additionalProperties = item.additionalProperties;
            this.children = item.children;
        }
    }
}
