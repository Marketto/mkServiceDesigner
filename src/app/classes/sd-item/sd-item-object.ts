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

    protected toItemJSONSchema(): object {
        const jss = super.toItemJSONSchema();
        const children = (this.children.length > 0) ? this.children.toJSONSchema() : undefined;
        return Object.assign(jss, {
                properties: children
            });
    }
}
