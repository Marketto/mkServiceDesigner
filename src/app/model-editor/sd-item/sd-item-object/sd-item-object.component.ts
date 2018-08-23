import { Component, Input } from "@angular/core";
import { SdItemObject } from "../../../classes/sd-item";
import { SdClipboardService } from "../../../commons/sd-clipboard/sd-clipboard.service";

@Component({
  selector: "app-sd-item-object",
  styleUrls: ["./sd-item-object.component.less"],
  templateUrl: "./sd-item-object.component.html",
})
export class SdItemObjectComponent {
  @Input() public item: SdItemObject;
  private sdClipboardService: SdClipboardService;

  constructor(sdClipboardService: SdClipboardService) {
    this.sdClipboardService = sdClipboardService;
  }

  public newItem() {
    this.item.children.push(new SdItemObject());
  }

  public pasteItem() {
    if (this.sdClipboardService.item) {
      this.item.children.push(this.sdClipboardService.item.clone());
      this.sdClipboardService.item = null;
    }
  }

  public get allowPasteItem(): boolean {
    return !!this.sdClipboardService.item && this.sdClipboardService.item !== this.item;
  }
}
