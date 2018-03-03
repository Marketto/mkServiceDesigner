import { Component, OnInit, Injectable, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TreeviewComponent, TreeviewConfig } from 'ngx-treeview';
import { SdServiceTreeItem } from './../classes/sd-service';

@Component({
  selector: 'app-service-tree',
  templateUrl: './service-tree.component.html',
  styleUrls: ['./service-tree.component.less'],
  providers: [
  ]
})
export class ServiceTreeComponent implements OnInit {
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  _selected: SdServiceTreeItem;
  _rootService: SdServiceTreeItem;
  @Input()
  get rootService(): SdServiceTreeItem {
    return this._rootService;
  }
  set rootService(serviceItem: SdServiceTreeItem) {
    this.selected = this._rootService = serviceItem;
  }

  @Output('select') private select = new EventEmitter();
  @Input('select')
  get selected(): SdServiceTreeItem {
    return this._selected;
  }
  set selected(item: SdServiceTreeItem) {
    if (item) {
      this._selected = item || this._selected;
    }
    this.select.emit(this._selected);
  }


  treeviewCfg = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasCollapseExpand: true,
    hasFilter: false
  });

  editMode: Boolean = false;

  addItem(item: SdServiceTreeItem) {
    const serviceItem: SdServiceTreeItem = new SdServiceTreeItem;
    serviceItem.parent = item;
  }
  removeItem(item: SdServiceTreeItem) {
    if (this.selected === item) {
      this.selected = item.parent;
    }
    const itemIndex = item.parent.children.findIndex(child => {
        return child === item;
      });
    item.parent.children.splice(itemIndex, 1);
  }
  selectItem(item: SdServiceTreeItem) {
    this.selected = item;
  }

  constructor() {}

  ngOnInit() {}

}
