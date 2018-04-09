import { ENTER } from "@angular/cdk/keycodes";
import { Component, Input } from "@angular/core";
import { MatChipInputEvent } from "@angular/material";

import { SdItemString } from "../../../classes/sd-item";

@Component({
  selector: "app-sd-item-string",
  styleUrls: ["./sd-item-string.component.less"],
  templateUrl: "./sd-item-string.component.html",
})
export class SdItemStringComponent {
  @Input() public item: SdItemString;
  public separatorKeysCodes = [ENTER];

  public addDomain(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.item.domain.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  public removeDomain(domainValue: string): void {
    const index = this.item.domain.indexOf(domainValue);

    if (index >= 0) {
      this.item.domain.splice(index, 1);
    }
  }
}
