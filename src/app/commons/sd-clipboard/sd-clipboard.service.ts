import { Injectable } from "@angular/core";
import { SdItem } from "../../classes/sd-item/sd-item";

let $sdItem: SdItem;
@Injectable({
  providedIn: "root",
})
export class SdClipboardService {
  public get item(): SdItem {
    return $sdItem;
  }
  public set item(sdItem: SdItem) {
      $sdItem = sdItem;
  }
}
