import { Component, OnInit, Input } from '@angular/core';
import { SdList } from '../../classes/sdList';

@Component({
  selector: 'app-sd-item',
  templateUrl: './sd-item.component.html',
  styleUrls: ['./sd-item.component.less']
})
export class SdItemComponent implements OnInit {
  @Input() list: SdList[];
  @Input() item: Object = {};
  constructor() { }

  ngOnInit() {
  }

}
