import { Component, Input } from "@angular/core";
import { SdItemObject } from "../../../classes/sd-item";

@Component({
  selector: "app-sd-item-object",
  styleUrls: ["./sd-item-object.component.less"],
  templateUrl: "./sd-item-object.component.html",
})
export class SdItemObjectComponent {
  @Input() public item: SdItemObject;

  public newItem() {
    this.item.children.push(new SdItemObject());
  }
}
