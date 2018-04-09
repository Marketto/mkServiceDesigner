import { Component, Input } from "@angular/core";
import { SdItemBoolean } from "../../../classes/sd-item";

@Component({
  selector: "app-sd-item-boolean",
  styleUrls: ["./sd-item-boolean.component.less"],
  templateUrl: "./sd-item-boolean.component.html",
})
export class SdItemBooleanComponent {
  @Input() public item: SdItemBoolean;
}
