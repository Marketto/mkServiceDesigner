import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewComponent, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-service-tree',
  templateUrl: './service-tree.component.html',
  styleUrls: ['./service-tree.component.less'],
  providers: [
  ]
})
export class ServiceTreeComponent implements OnInit {
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  services = [new TreeviewItem({
    text: '/',
    value: 0,
    children : []
  })];

  treeviewCfg = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasCollapseExpand: true,
    hasFilter: false
  });

  editMode: Boolean = false;
  selectedItem: TreeviewItem = null;

  addItem() {
    const newEndPoint: TreeviewItem = new TreeviewItem({ text: 'new', value: 1});
    this.selectedItem.children = (this.selectedItem.children || []).concat(newEndPoint);
  }
  selectItem(item: TreeviewItem) {
    this.editMode = this.editMode && this.selectedItem === item;
    this.selectedItem = item;
  }
  editItem(itemElement, item: TreeviewItem) {
    this.editMode = true;
    this.selectedItem = item;
    itemElement.focus();
  }
  blurItem() {
    this.editMode = false;
    this.selectedItem = null;
  }
  keyUpItem(event, item: TreeviewItem) {
    if (event.keyCode === 13) {
      this.editMode = false;
      this.selectedItem = item;
    }
  }

  constructor() {}

  ngOnInit() {
  }

}
