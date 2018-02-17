import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sd-item-object',
  templateUrl: './sd-item-object.component.html',
  styleUrls: ['./sd-item-object.component.less']
})
export class SdItemObjectComponent implements OnInit {
  @Input() item: Object = {};
  constructor() { }

  ngOnInit() {
  }

}
