
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { TreeviewComponent, TreeviewConfig } from "ngx-treeview";
import { SdServiceTreeItem } from "./../classes/sd-service";

@Component({
  animations: [
    trigger(
      "nodeAnimation", [
        transition(":enter", [
          style({ transform: "translateY(-100%)", opacity: 0 }),
          animate("500ms", style({ transform: "translateY(0)", opacity: 1 })),
        ]),
      ],
    ),
  ],
  providers: [],
  selector: "app-service-tree",
  styleUrls: ["./service-tree.component.less"],
  templateUrl: "./service-tree.component.html",
})
export class ServiceTreeComponent {
  public PATH_NAME_REGEXP = /^(?:(?:[a-z0-9]+(?:[\-\_][a-z0-9]+)*)|(?:\{[a-zA-Z]+\}))$/;

  @ViewChild(TreeviewComponent)
  public treeviewComponent: TreeviewComponent;

  public treeviewCfg: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasCollapseExpand: true,
    hasFilter: false,
  });
  public editMode: boolean = false;

  private selectedSSTI: SdServiceTreeItem;
  private rootServiceTI: SdServiceTreeItem;

  @Input()
  public get rootService(): SdServiceTreeItem {
    return this.rootServiceTI;
  }
  public set rootService(serviceItem: SdServiceTreeItem) {
    this.selected = this.rootServiceTI = serviceItem;
  }

  @Output("select") private select = new EventEmitter();
  @Input("select")
  public get selected(): SdServiceTreeItem {
    return this.selectedSSTI;
  }
  public set selected(item: SdServiceTreeItem) {
    this.selectedSSTI = item || this.selectedSSTI;
    this.select.emit(this.selectedSSTI);
  }

  public addItem(item: SdServiceTreeItem) {
    const serviceItem: SdServiceTreeItem = new SdServiceTreeItem();
    serviceItem.parent = item;
  }
  public removeItem(item: SdServiceTreeItem) {
    if (this.selected === item) {
      this.selected = item.parent;
    }
    const itemIndex = item.parent.children.findIndex((child) => {
        return child === item;
      });
    item.parent.children.splice(itemIndex, 1);
  }
  public selectItem(item: SdServiceTreeItem) {
    this.selected = item;
  }
}
