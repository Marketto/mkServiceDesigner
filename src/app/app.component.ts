import { Component } from '@angular/core';
import { TreeviewConfig } from 'ngx-treeview';

import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';

import { SdService, SdServiceVerb, SdServiceIOType } from './classes/sd-service/sd-service';
import { SdServiceTreeItem } from './classes/sd-service/sd-service-tree-item';
import { SdItemObject } from './classes/sd-item/sd-item-object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  mksdRootJsonFileName = 'serviceRoot.json';
  mksdMimeType = 'application/x-mk-service-designer';
  mksdFileType = '.mksd';

  title = 'Marketto Service Designer';
  treeItems: SdServiceTreeItem;

  projectName: String;

  private _verb: SdServiceVerb = 'GET';
  private io: SdServiceIOType = 'response';
  serviceRoot: SdServiceTreeItem = new SdServiceTreeItem;
  private currentService: SdServiceTreeItem;

  get verb (): SdServiceVerb {
    return this._verb;
  }
  set verb (verb: SdServiceVerb) {
    this._verb = verb;
    if (verb === 'GET') {
      this.io = 'response';
    } else {
      this.io = 'request';
    }
  }

  newItem() {
    this.currentService.value.verbs[this.verb][this.io].push(new SdItemObject);
  }
  saveMKSD() {
    const mksdFileName = this.projectName + this.mksdFileType;
    const mksdFile = new JSZip();
    mksdFile.file(this.mksdRootJsonFileName, JSON.stringify(this.serviceRoot));
    mksdFile.generateAsync({
      'type': 'blob',
      'compression': 'DEFLATE',
      'compressionOptions': {
        'level': 9
      },
      'mimeType': this.mksdMimeType
    }).then(blobData => saveAs(blobData, mksdFileName));
  }
  openMKSD(file: File) {
    const mksdFile = new JSZip();
    mksdFile.loadAsync(file).then(archive => {
      if (archive.files[this.mksdRootJsonFileName]) {
        archive.files[this.mksdRootJsonFileName].async('blob').then(sourceFile => {
          const fileReader = new FileReader();
          fileReader.readAsBinaryString(sourceFile);
          fileReader.onload = () => {
            console.log('SOURCE JSON', JSON.parse(fileReader.result));
            this.projectName = file.name.replace(this.mksdFileType, '');
            this.serviceRoot = JSON.parse(fileReader.result, SdServiceTreeItem.fromJSON);
            console.log('SdServiceTreeItem PARSED', this.serviceRoot);
          };
          fileReader.onerror = err => {
            console.error('file reader', err);
          };
        }, err => {
          console.error('zip fetcher', err);
        });
      }
    }, err => {
      console.error('zip loading', err);
    });
  }
}
