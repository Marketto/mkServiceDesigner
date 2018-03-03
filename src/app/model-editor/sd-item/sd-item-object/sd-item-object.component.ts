import { Component, OnInit, Input } from '@angular/core';

import { SdItemObject } from '../../../classes/sd-item/sd-item-object';

@Component({
  selector: 'app-sd-item-object',
  templateUrl: './sd-item-object.component.html',
  styleUrls: ['./sd-item-object.component.less']
})
export class SdItemObjectComponent implements OnInit {
  @Input() item: SdItemObject;

  newItem() {
    this.item.children.push(new SdItemObject());
    // this.service.verbs[this.verb][this.io].newObject();
  }

  constructor() { }

  ngOnInit() {
  }

}
