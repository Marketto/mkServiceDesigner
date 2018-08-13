import { Component, Input } from "@angular/core";
import { SdItemList } from "../classes/sd-item";

@Component({
  selector: "app-model-editor",
  styleUrls: ["./model-editor.component.less"],
  templateUrl: "./model-editor.component.html",
})
export class ModelEditorComponent {
  @Input() public service: SdItemList;
}
