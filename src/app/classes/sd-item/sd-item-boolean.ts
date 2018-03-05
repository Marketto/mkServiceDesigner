import { SdItem } from './sd-item';

export class SdItemBoolean extends SdItem {
    type: 'boolean' = 'boolean';
    default: Boolean;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemBoolean) {
            this.default = item.default;
        }
    }

    protected toItemJSONSchema(): object {
        const jss = super.toItemJSONSchema();
        return Object.assign(jss, {
            default: (this.default !== null) ? this.default : undefined
        });
    }
}
