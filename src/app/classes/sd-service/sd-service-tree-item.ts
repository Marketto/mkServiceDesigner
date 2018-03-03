import { SdService, SdServiceJSON } from './sd-service';
import { TreeviewItem } from 'ngx-treeview';

export class SdServiceTreeItem extends TreeviewItem {
    constructor() {
        super({
            text: '',
            value: null
        });
    }
    private parentTreeItem: SdServiceTreeItem;
    children: Array<SdServiceTreeItem>;
    value: SdService = new SdService;

    get uri(): String {
        return (this.parent ? this.parent.uri : '') + '/' + this.value.endPoint;
    }

    get parent(): SdServiceTreeItem {
        return this.parentTreeItem;
    }
    set parent(item: SdServiceTreeItem) {
        this.parentTreeItem = item;
        item.children = (item.children || []).concat(this);
    }

    get text(): string {
        return this.value.endPoint.toString();
    }
    set text(value: string) {
        if (this.value) {
            this.value.endPoint = String(value);
        }
    }
    public static fromJSON(key: string, value: any): SdServiceTreeItem {
        if (!key) {
            const sdServiceTreeItem = Object.create(SdServiceTreeItem.prototype);

            return Object.assign(sdServiceTreeItem, {
                value: SdService.fromJSON(null, value),
                children: Array.isArray(value.children) ? (value.children || []).map(child => {
                    const sdServiceTreeItemChild = SdServiceTreeItem.fromJSON(null, child);
                    sdServiceTreeItemChild.parent = sdServiceTreeItem;
                    return sdServiceTreeItemChild;
                }) : undefined
            });
        }
        return value;
    }
    public toJSON(): SdServiceJSON {
        return Object.assign({}, this.value, {
            parent: undefined,
            children: this.children
        });
    }
}
