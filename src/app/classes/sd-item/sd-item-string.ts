import { SdItem } from './sd-item';

type SdItemStringFormatJson = 'hostname' | 'ipv4' | 'ipv6' | 'date-time' | 'email' | 'uri' | false;

export class SdItemString extends SdItem {
    type: 'string' = 'string';
    domain: Array<String> = [];
    minLength: Number;
    maxLength: Number;
    pattern: RegExp;
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
}
