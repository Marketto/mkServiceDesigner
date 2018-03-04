import { SdItem } from './sd-item';

type SdItemStringFormatJson = 'hostname' | 'ipv4' | 'ipv6' | 'date-time' | 'email' | 'uri' | false;

export class SdItemString extends SdItem {
    type: 'string' = 'string';
    domain: Array<String> = [];
    minLength: number;
    maxLength: number;
    pattern: string; // RegExp;
    format: SdItemStringFormatJson = false;

    constructor(item?: SdItem) {
        super(item);
        if (item && item instanceof SdItemString) {
            this.domain = item.domain;
            this.minLength = item.minLength;
            this.maxLength = item.maxLength;
            this.pattern = item.pattern;
            this.format = item.format;
        }
    }

    protected toItemJSONSchema(): object {
        const jss = super.toItemJSONSchema();
        let pattern;
        if (this.pattern) {
            try {
                const regexp = new RegExp(this.pattern).toString();
                pattern = regexp.substr(1, regexp.length - 2);
            } catch (e) {}
        }
        return Object.assign(jss, {
            enum: (this.domain.length > 0) ? this.domain : undefined,
            minLength: Number.isInteger(this.minLength) ? this.minLength : undefined,
            maxLength: Number.isInteger(this.maxLength) ? this.maxLength : undefined,
            pattern: pattern,
            format: this.format ? this.format : undefined
        });
    }
}
