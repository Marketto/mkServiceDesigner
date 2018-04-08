import { Component, OnInit, Input } from '@angular/core';

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
