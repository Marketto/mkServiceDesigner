import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { SdItem, SdItemType } from '../../classes/sd-item/sd-item';
import { SdItemList } from '../../classes/sd-item/sd-item-list';
import { SdItemBoolean } from './../../classes/sd-item/sd-item-boolean';
import { SdItemInteger } from './../../classes/sd-item/sd-item-integer';
import { SdItemString } from './../../classes/sd-item/sd-item-string';
import { SdItemObject } from '../../classes/sd-item/sd-item-object';
import { SdItemNumber } from '../../classes/sd-item/sd-item-number';

@Component({
  selector: 'app-sd-item',
  templateUrl: './sd-item.component.html',
  styleUrls: ['./sd-item.component.less'],
  animations: [
    trigger(
      'itemAnimation', [
        transition('* => true', [
          style({ opacity: 0.7 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition('void => false', [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition('* => void', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class SdItemComponent implements OnInit {
  @Input() node: SdItemList;

  itemFormList = [];

  changeType(item: SdItem, type: SdItemType) {
    if (item.type !== type) {
      const itemToConvertIndex = this.node.findIndex(sdi => {
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
      this.itemFormList[itemToConvertIndex] = { ...(this.itemFormList[itemToConvertIndex] || {}), type: true };

      this.node[itemToConvertIndex] = convertedItem;
    }
  }

  removeItem(item: SdItem) {
    const itemToRemoveIndex = this.node.findIndex(sdi => {
        return sdi === item;
      });

    this.itemFormList[itemToRemoveIndex] = { ...(this.itemFormList[itemToRemoveIndex] || {}), type: false };
    this.node.splice(itemToRemoveIndex, 1);
  }

  constructor() { }

  ngOnInit() {
  }

}
