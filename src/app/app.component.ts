import { Component } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { SdServiceVerb, SdServiceIOType, SdService } from './classes/SdService';
import { SdItemObject } from './classes/SdItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'Marketto Service Designer';
  treeItems: TreeviewItem;

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

  service: SdService = new SdService;

  newItem() {
    this.service.verbs[this.verb][this.io].push(new SdItemObject());
    // this.service.verbs[this.verb][this.io].newObject();
  }
}
