export type SdItemType = 'object' | 'string' | 'number' | 'integer' | 'boolean';

export abstract class SdItem {
    id: number;
    name: String = '';
    type: SdItemType = null;
    required: Boolean = false;
    dependencies: Array<SdItem>;

    // Array props
    listOf: Boolean = false;
    minOccurrences: Number = 0;
    maxOccurrences: Number = null;
    uniqueItems: Boolean = false;

    constructor(item?: SdItem) {
        if (item) {
            this.id = item.id;
            this.name = item.name;
            this.listOf = item.listOf;
            this.required = item.required;
            this.dependencies = item.dependencies;
            this.minOccurrences = item.minOccurrences;
            this.maxOccurrences = item.maxOccurrences;
            this.uniqueItems = item.uniqueItems;
        }
    }

    public static fromJSON(key: string, value: any): SdItem {
        if (!key) {
            const sdItem = Object.create(SdItem.prototype);

            return Object.assign(sdItem, {});
        }
        return value;
    }
    public toJSON(): object {
        return Object.assign({}, this);
    }

    protected toItemJSONSchema(): object {
        return {
            id: this.id,
            type: this.type
        };
    }
    public toJSONSchema(): object {
        const itemJSS = this.toItemJSONSchema();
        if (this.listOf) {
            return {
                type: 'array',
                items: [itemJSS],
                additionalItems: false,
                uniqueItems: this.uniqueItems,
                minItems: (this.minOccurrences !== null) ? this.minOccurrences : undefined,
                maxItems: (this.maxOccurrences !== null) ? this.maxOccurrences : undefined
            };
        }
        return itemJSS;
    }
}
