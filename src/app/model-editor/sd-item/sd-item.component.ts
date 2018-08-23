
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import {
  SdItem,
  SdItemBoolean ,
  SdItemInteger,
  SdItemList,
  SdItemNumber,
  SdItemObject,
  SdItemString,
  SdItemType,
} from "../../classes/sd-item";
import { SdClipboardService } from "../../commons/sd-clipboard/sd-clipboard.service";

@Component({
  animations: [
    trigger(
      "itemAnimation", [
        transition("* => true", [
          style({ opacity: 0.7 }),
          animate("500ms", style({ opacity: 1 })),
        ]),
        transition("void => false", [
          style({ transform: "translateY(-100%)", opacity: 0 }),
          animate("500ms", style({ transform: "translateY(0)", opacity: 1 })),
        ]),
        transition("* => void", [
          style({ transform: "translateY(0)", opacity: 1 }),
          animate("500ms", style({ transform: "translateY(-100%)", opacity: 0 })),
        ]),
      ],
    ),
  ],
  selector: "app-sd-item",
  styleUrls: ["./sd-item.component.less"],
  templateUrl: "./sd-item.component.html",
})
export class SdItemComponent {
  @Input() public node: SdItemList;

  public itemFormList = [];
  private sdClipboardService: SdClipboardService;

  constructor(sdClipboardService: SdClipboardService) {
    this.sdClipboardService = sdClipboardService;
  }

  public changeType(item: SdItem, type: SdItemType) {
    if (item.type !== type) {
      const itemToConvertIndex = this.node.findIndex((sdi) => {
          return sdi === item;
        });

      let convertedItem: SdItem;
      switch (type) {
        case "object":
          convertedItem = new SdItemObject(item);
          break;
        case "string":
          convertedItem = new SdItemString(item);
          break;
        case "integer":
          convertedItem = new SdItemInteger(item);
          break;
        case "number":
          convertedItem = new SdItemNumber(item);
          break;
        case "boolean":
          convertedItem = new SdItemBoolean(item);
          break;
      }
      this.itemFormList[itemToConvertIndex] = { ...(this.itemFormList[itemToConvertIndex] || {}), type: true };

      this.node[itemToConvertIndex] = convertedItem;
    }
  }

  public removeItem(item: SdItem) {
    const itemToRemoveIndex = this.node.findIndex((sdi) => {
        return sdi === item;
      });

    this.itemFormList[itemToRemoveIndex] = { ...(this.itemFormList[itemToRemoveIndex] || {}), type: false };
    this.node.splice(itemToRemoveIndex, 1);
  }

  public copyItem(item: SdItem): void {
    this.sdClipboardService.item = item;
  }
}
