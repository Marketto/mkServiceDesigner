import { Component, OnInit, Input } from '@angular/core';
import { SdNode, SdItem, SdItemType, SdItemObject, SdItemString, SdItemInteger, SdItemNumber, SdItemBoolean } from '../../classes/SdItem';

@Component({
  selector: 'app-sd-item',
  templateUrl: './sd-item.component.html',
  styleUrls: ['./sd-item.component.less']
})
export class SdItemComponent implements OnInit {
  @Input() node: SdNode;

  changeType(item: SdItem, type: SdItemType) {
    if (item.type !== type) {
      const itemToConvert = this.node.findIndex(sdi => {
          return sdi === item;
        });
      let convertedItem: SdItem;
      switch (type) {
        case 'object':
          convertedItem = new SdItemObject(item);
          break;
        case 'string':
          convertedItem = new SdItemString(item);
          break;
        case 'integer':
          convertedItem = new SdItemInteger(item);
          break;
        case 'number':
          convertedItem = new SdItemNumber(item);
          break;
        case 'boolean':
          convertedItem = new SdItemBoolean(item);
          break;
      }
      this.node[itemToConvert] = convertedItem;
    }
  }

  removeItem(item: SdItem) {
    const itemToRemoveIndex = this.node.findIndex(sdi => {
        return sdi === item;
      });
    this.node.splice(itemToRemoveIndex, 1);
  }

  constructor() { }

  ngOnInit() {
  }

}
