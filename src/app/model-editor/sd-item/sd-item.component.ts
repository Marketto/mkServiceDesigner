import { Component, OnInit, Input } from '@angular/core';
import { SdNode, SdItem } from '../../classes/SdItem';

@Component({
  selector: 'app-sd-item',
  templateUrl: './sd-item.component.html',
  styleUrls: ['./sd-item.component.less']
})
export class SdItemComponent implements OnInit {
  @Input() node: SdNode;

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
