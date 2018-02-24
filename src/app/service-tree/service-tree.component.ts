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

  addItem() {
    const serviceItem: SdServiceTreeItem = new SdServiceTreeItem();
    this.selected.children = (this.selected.children || []).concat(serviceItem);
  }
  selectItem(item: SdServiceTreeItem) {
    this.editMode = this.editMode && this.selected === item;
    this.selected = item;
  }
  editItem(itemElement, item: SdServiceTreeItem) {
    this.editMode = true;
    this.selected = item;
    itemElement.focus();
  }
  blurItem() {
    this.editMode = false;
  }
  keyUpItem(event) {
    if (event.keyCode === 13) {
      this.editMode = false;
    }
  }

  constructor() {}

  ngOnInit() {}

}
