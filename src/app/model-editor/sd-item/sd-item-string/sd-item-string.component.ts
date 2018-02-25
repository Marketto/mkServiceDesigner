import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { SdItemString } from './../../../classes/SdItem';

@Component({
  selector: 'app-sd-item-string',
  templateUrl: './sd-item-string.component.html',
  styleUrls: ['./sd-item-string.component.less']
})
export class SdItemStringComponent implements OnInit {
  @Input() item: SdItemString;
  separatorKeysCodes = [ENTER];

  addDomain(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.item.domain.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeDomain(domainValue: String): void {
    const index = this.item.domain.indexOf(domainValue);

    if (index >= 0) {
      this.item.domain.splice(index, 1);
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
