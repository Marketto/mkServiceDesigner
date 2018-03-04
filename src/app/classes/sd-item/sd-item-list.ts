import { SdItem } from './sd-item';

// Workaround to properly extend Array
class SdItemListCore {
    toJSONSchema(): object {
        const props = {};
        const sdItemArray = [].concat(this).filter(sdItem => !!sdItem.name);
        const required = sdItemArray.map(sdItem => sdItem.required && sdItem.name).filter(r => !!r);

        sdItemArray.forEach(sdItem => {
            props[sdItem.name] = sdItem.toJSONSchema();
        });

        return Object.assign(props, {
            required: (required.length > 0) ? required : undefined
        });
    }
}

export class SdItemList extends Array<SdItem> implements SdItemListCore {
    [index: number]: SdItem;
    constructor(items?: Array<SdItem> | SdItemList) {
        super(...items);
        Object.assign(this, SdItemListCore.prototype);
    }
    toJSONSchema;
}
