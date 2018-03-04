import { SdItem } from './sd-item';

export class SdItemList extends Array<SdItem> {
    [index: number]: SdItem;
    constructor(items?: Array<SdItem> | SdItemList) {
        super(...items);
        Object.assign(this,
            ...Object.keys(SdItemList.prototype)
                .filter(m => typeof Array.prototype[m] === 'undefined')
                .map(m => ({ [m]: SdItemList.prototype[m]}))
        );
    }
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
