import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sd-item-string',
  templateUrl: './sd-item-string.component.html',
  styleUrls: ['./sd-item-string.component.less']
})
export class SdItemStringComponent implements OnInit {
  @Input() item = {
    $domain : []
  };
  constructor() {
  }

  ngOnInit() {
    this.item.$domain = this.item.$domain || [];
  }

}
