import { Component, OnInit, Input } from '@angular/core';
import { SdItemComponent } from './sd-item/sd-item.component';
import { SdItemList } from '../classes/sd-item/sd-item-list';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.less']
})
export class ModelEditorComponent implements OnInit {
  @Input() service: SdItemList;
  constructor() { }

  ngOnInit() {
  }

}
