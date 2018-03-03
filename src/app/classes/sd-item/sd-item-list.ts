import { SdItem } from './sd-item';

export class SdItemList extends Array<SdItem> {
    [index: number]: SdItem;
    constructor(items?: Array<SdItem> | SdItemList) {
        super(...items);
        Object.setPrototypeOf(this, Object.create(SdItemList.prototype));
    }

    toJSONSchema() {
        return;
    }
}
