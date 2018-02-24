import { Component, OnInit, Injectable, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TreeviewComponent, TreeviewConfig } from 'ngx-treeview';
import { SdServiceTreeItem } from './../classes/SdService';

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
    this._rootService = serviceItem;
    if (!this._selected) {
      this.selected = serviceItem;
    }
  }

  @Output() select = new EventEmitter();
  @Input()
  get selected(): SdServiceTreeItem {
    return this._selected;
  }
  set selected(item: SdServiceTreeItem) {
      this._selected = item || this._selected;
      this.select.emit(this._selected);
  }


  treeviewCfg = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasCollapseExpand: true,
    hasFilter: false
  });

  editMode: Boolean = false;

  addItem(item: SdServiceTreeItem) {
    const serviceItem: SdServiceTreeItem = new SdServiceTreeItem(item);
    item.children = (item.children || []).concat(serviceItem);
  }
  removeItem(item: SdServiceTreeItem) {
    this.selected = item.parent;
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
