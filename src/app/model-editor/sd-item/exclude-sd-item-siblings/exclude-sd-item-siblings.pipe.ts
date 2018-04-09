import { Pipe, PipeTransform } from "@angular/core";
import { SdItem, SdItemList } from "./../../../classes/sd-item";

@Pipe({
  name: "excludeSdItemSiblings",
  pure: false,
})
export class ExcludeSdItemSiblingsPipe implements PipeTransform {
  private sdItemList: SdItemList;
  private exclusion: SdItemList|SdItem[];
  private filteredList: SdItemList;

  public transform(sdItemList: SdItemList, exclusion?: any): SdItemList {
    if (sdItemList !== this.sdItemList && exclusion !== this.exclusion) {
      const excludeList = [].concat(exclusion);
      this.filteredList = new SdItemList(sdItemList.filter((sdItem) => {
        return sdItem.name && !excludeList.some((excluded) => excluded === sdItem);
      }));
    }
    return this.filteredList;
  }

}
