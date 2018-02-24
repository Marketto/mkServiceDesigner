import { Component } from '@angular/core';
import { TreeviewConfig } from 'ngx-treeview';
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
}
