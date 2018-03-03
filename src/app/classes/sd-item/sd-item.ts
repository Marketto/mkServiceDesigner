export type SdItemType = 'object' | 'string' | 'number' | 'integer' | 'boolean';

export abstract class SdItem {
    id: number;
    name: String = '';
    type: SdItemType = null;
    required: Boolean = false;
    dependencies: Array<SdItem>;
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
}
