import { XsdSdServiceVerbs } from './sd-service-verbs';
import { XMLElement, XMLAttribute, XMLChild, xml } from 'xml-decorators';
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
            const sdServiceTreeItem = new SdServiceTreeItem;
            sdServiceTreeItem.value = SdService.fromJSON(null, value);
            sdServiceTreeItem.children = Array.isArray(value.children) ? (value.children || []).map(child => {
                const sdServiceTreeItemChild = SdServiceTreeItem.fromJSON(null, child);
                sdServiceTreeItemChild.parent = sdServiceTreeItem;
                return sdServiceTreeItemChild;
            }) : undefined;

            return sdServiceTreeItem;
        }
        return value;
    }
    public toJSON(): SdServiceJSON {
        return Object.assign({}, this.value, {
            parent: undefined,
            children: this.children
        });
    }

    toJSONSchemaList () {
        const serviceList = (this.value.toJSONSchemaList() || [])
          .filter(s => !!s)
          .map(s => Object.assign({}, s, {
              uri: this.uri,
              schema: s.schema
          }) )
          .concat(...(this.children || []).map(c => c.toJSONSchemaList()) );
        return serviceList.length > 0 ? serviceList : undefined;
    }

    public toXSD(): XsdSdService {
        return this.value.endPoint ? new XsdSdService(this) : undefined;
    }
    public toXSDList(): XsdSdService[] {
        const xsdServiceChildren = this.children ? this.children.map(s => s.toXSDList()) : undefined;
        return [this.toXSD()].concat(...xsdServiceChildren).filter(s => !!s);
    }
}


@XMLElement({ root: 'description' })
class XsdSdService {
    public path: string;
    @XMLChild({ implicitStructure: 'service.$'})
    private endpoint: XsdSdServiceVerbs;
    @XMLAttribute({})
    private xmlns = 'http://www.w3.org/ns/wsdl';
    @XMLAttribute({})
    private 'xmls:whttp' = 'http://www.w3.org/ns/wsdl/http';
    @XMLAttribute({})
    private 'xmlns:wsoap' = 'http://www.w3.org/ns/wsdl/soap';
    // @XMLAttribute({})
    // targetNamespace = 'http://www.example.com/wsdl20sample';

    constructor(service: SdServiceTreeItem) {
        const serviceVerbs = service.value.verbs.toXSD();
        if (serviceVerbs) {
            this.path = serviceVerbs.address = service.uri.toString();
            this.endpoint = serviceVerbs;
        }
    }

    public serialize(): string {
        return xml.serialize(this);
    }
}
