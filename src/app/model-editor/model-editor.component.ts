import { Component, OnInit } from '@angular/core';
import { SdItemComponent } from './sd-item/sd-item.component';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.less']
})
export class ModelEditorComponent implements OnInit {
  service: Object = {
    verbs : {
        GET : {
          response : []
        }
      }
    };
  constructor() { }

  ngOnInit() {
  }

}
