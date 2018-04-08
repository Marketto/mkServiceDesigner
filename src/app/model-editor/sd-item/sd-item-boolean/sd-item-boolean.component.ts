import { Component, OnInit, Input } from '@angular/core';

import { SdItemBoolean } from '../../../classes/sd-item/sd-item-boolean';

@Component({
  selector: 'app-sd-item-boolean',
  templateUrl: './sd-item-boolean.component.html',
  styleUrls: ['./sd-item-boolean.component.less']
})
export class SdItemBooleanComponent implements OnInit {
  @Input() item: SdItemBoolean;
  constructor() { }

  ngOnInit() {
  }

}
