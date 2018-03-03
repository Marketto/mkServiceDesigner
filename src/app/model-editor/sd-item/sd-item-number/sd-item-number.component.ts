import { Component, OnInit, Input } from '@angular/core';

import { SdItemNumeric } from '../../../classes/sd-item/sd-item-numeric';

@Component({
  selector: 'app-sd-item-number',
  templateUrl: './sd-item-number.component.html',
  styleUrls: ['./sd-item-number.component.less']
})
export class SdItemNumberComponent implements OnInit {
  private isInteger: Boolean = false;
  @Input() item: SdItemNumeric;
  @Input('integer')
  set integer(val: Boolean) {
    this.isInteger = val !== false;
  }
  get integer() {
    return this.isInteger;
  }
  constructor() { }

  ngOnInit() {
  }

}
