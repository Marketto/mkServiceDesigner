import { browser } from 'protractor';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/platform-browser';
import { TreeviewConfig } from 'ngx-treeview';

import { saveAs } from 'file-saver/FileSaver';
import * as jsf from 'json-schema-faker';
import faker from 'typescript-json-schema-faker';
import * as JSZip from 'jszip';

import { SdServiceVerb, SdServiceIOType } from './classes/sd-service/sd-service-verbs';
import { SdService } from './classes/sd-service/sd-service';
import { SdServiceTreeItem } from './classes/sd-service/sd-service-tree-item';
import { SdItemObject } from './classes/sd-item/sd-item-object';


import * as EN_TRANSLATION from '../assets/i18n/en.json';
import * as IT_TRANSLATION from '../assets/i18n/it.json';
import * as RU_TRANSLATION from '../assets/i18n/ru.json';

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

  projectName: string;

  private _verb: SdServiceVerb = 'GET';
  io: SdServiceIOType = 'response';
  serviceRoot: SdServiceTreeItem = new SdServiceTreeItem;
  currentService: SdServiceTreeItem;

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
    const mksdFile = new JSZip();
    mksdFile.file(this.mksdRootJsonFileName, JSON.stringify(this.serviceRoot));
    mksdFile.generateAsync({
      'type': 'blob',
      'compression': 'DEFLATE',
      'compressionOptions': {
        'level': 9
      },
      'mimeType': this.mksdMimeType
    }).then(blobData => {
      if (!this.projectName) {
        this.translate.get('DEFAULT.FILE_NAME').toPromise().then(projectName => {
          this.projectName = projectName;
          const mksdFileName = this.projectName + this.mksdFileType;
          saveAs(blobData, mksdFileName);
        });
      } else {
        const mksdFileName = this.projectName + this.mksdFileType;
        saveAs(blobData, mksdFileName);
      }
    });
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

  exportJsonSchema() {
    const zip = new JSZip();
    const ARCHIVE_NAME = 'JSON Schema.zip';
    const schemaList = (this.serviceRoot.toJSONSchemaList() || []).filter(schemaCfg => !!schemaCfg);
    if (schemaList.length > 0) {
      schemaList.forEach(schemaCfg => {
        zip.file(`${schemaCfg.uri}/${schemaCfg.verb}_${schemaCfg.io}.json`, JSON.stringify(schemaCfg.schema, null, 4));
      });
      zip.generateAsync({
        'type': 'blob',
        'compression': 'DEFLATE',
        'compressionOptions': {
          'level': 9
        }
      }).then(blobData => {
        if (!this.projectName) {
          this.translate.get('DEFAULT.FILE_NAME').toPromise().then(projectName => {
            this.projectName = projectName;
            saveAs(blobData, `${this.projectName} ${ARCHIVE_NAME}`);
          });
        } else {
          saveAs(blobData, `${this.projectName} ${ARCHIVE_NAME}`);
        }
      });
    } else {
      console.warn('Nothing to export');
    }
  }

  exportJsonMock() {
    const zip = new JSZip();
    const ARCHIVE_NAME = 'JSON MOCKS.zip';
    const schemaList = (this.serviceRoot.toJSONSchemaList() || [])
      .filter(schemaCfg => !!schemaCfg)
      .map(schemaCfg => {
        const jsonMock = faker(schemaCfg.schema);
        if (jsonMock) {
          return {
            filePath: `${schemaCfg.uri}/${schemaCfg.verb}_${schemaCfg.io}.json`,
            data: JSON.stringify(jsonMock, null, 4)
          };
        }
      }).filter(schemaCfg => !!schemaCfg);

    if (schemaList.length > 0) {
      schemaList.forEach(schemaCfg => {
        zip.file(schemaCfg.filePath, schemaCfg.data);
      });
      zip.generateAsync({
        'type': 'blob',
        'compression': 'DEFLATE',
        'compressionOptions': {
          'level': 9
        }
      }).then(blobData => {
        if (!this.projectName) {
          this.translate.get('DEFAULT.FILE_NAME').toPromise().then(projectName => {
            this.projectName = projectName;
            saveAs(blobData, `${this.projectName} ${ARCHIVE_NAME}`);
          });
        } else {
          saveAs(blobData, `${this.projectName} ${ARCHIVE_NAME}`);
        }
      });
    } else {
      console.warn('Nothing to export');
    }
  }

  exportWSDL() {
    const zip = new JSZip();
    const ARCHIVE_NAME = 'WSDL.zip';
    const schemaList = this.serviceRoot.toXSDList();
    if ((schemaList || []).length > 0) {
      schemaList.forEach(xsd => {
        zip.file(`${xsd.path}.wsdl`, xsd.serialize());
      });
      zip.generateAsync({
        'type': 'blob',
        'compression': 'DEFLATE',
        'compressionOptions': {
          'level': 9
        }
      }).then(blobData => {
        if (!this.projectName) {
          this.translate.get('DEFAULT.FILE_NAME').toPromise().then(projectName => {
            this.projectName = projectName;
            saveAs(blobData, `${this.projectName} ${ARCHIVE_NAME}`);
          });
        } else {
          saveAs(blobData, `${this.projectName} ${ARCHIVE_NAME}`);
        }
      });
    } else {
      // TODO message for nothing to save
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService) {
    this.initTranslate();
    jsf.option({
      alwaysFakeOptionals: true
    });
  }

  initTranslate() {
    const DEFAULT_LANGUAGE = 'en';

    this.translate.setTranslation('en', EN_TRANSLATION);
    this.translate.setTranslation('it', IT_TRANSLATION);
    this.translate.setTranslation('ru', RU_TRANSLATION);

    this.translate.setDefaultLang(DEFAULT_LANGUAGE);

    const appropriateLanguage = Object.keys(this.translate.translations).find(ln => {
      const cultureLang = this.translate.getBrowserCultureLang();
      const browserLang = this.translate.getBrowserLang();

      return ln === cultureLang || ln === browserLang;
    }) || DEFAULT_LANGUAGE;

    this.translate.use(appropriateLanguage);

    this.document.documentElement.lang = appropriateLanguage;
  }
}
