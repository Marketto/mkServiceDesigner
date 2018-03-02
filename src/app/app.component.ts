import { Component } from '@angular/core';
import { TreeviewConfig } from 'ngx-treeview';

import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';

import { SdServiceVerb, SdServiceIOType, SdService, SdServiceTreeItem } from './classes/SdService';
import { SdItemObject } from './classes/SdItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'Marketto Service Designer';
  treeItems: SdServiceTreeItem;

  private _verb: SdServiceVerb = 'GET';
  private io: SdServiceIOType = 'response';

  get verb () {
    return this._verb;
  }
  set verb (verb) {
    this._verb = verb;
    if (verb === 'GET') {
      this.io = 'response';
    }
  }

  serviceRoot: SdServiceTreeItem = new SdServiceTreeItem;
  currentService: SdService;
  newItem() {
    this.currentService.verbs[this.verb][this.io].push(new SdItemObject());
  }
  saveMKSD() {
    const mksdFileName = 'test.mksd';
    const mksdFile = new JSZip();
    mksdFile.file('serviceRoot.json', JSON.stringify(this.serviceRoot));
    mksdFile.generateAsync({
      'type': 'blob',
      'compression': 'DEFLATE',
      'compressionOptions': {
        'level': 9
      },
      'mimeType': 'application/x-mk-service-designer'
    }).then(blobData => saveAs(blobData, mksdFileName));
  }
}
