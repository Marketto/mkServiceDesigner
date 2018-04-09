import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { TreeviewConfig } from "ngx-treeview";

import { saveAs } from "file-saver/FileSaver";
import * as jsf from "json-schema-faker";
import * as JSZip from "jszip";
import faker from "typescript-json-schema-faker";
import { xml } from "xml-decorators";

import { ContentElement } from "./classes/content-element";
import { SdItemObject } from "./classes/sd-item";
import { SdService, SdServiceIOType, SdServiceTreeItem, SdServiceVerbType } from "./classes/sd-service";

import * as EN_TRANSLATION from "../assets/i18n/en.json";
import * as IT_TRANSLATION from "../assets/i18n/it.json";
import * as RU_TRANSLATION from "../assets/i18n/ru.json";

@Component({
  selector    : "app-root",
  styleUrls   : ["./app.component.less"],
  templateUrl : "./app.component.html",
})

export class AppComponent {
  public mksdRootJsonFileName = "serviceRoot.json";
  public mksdMimeType = "application/x-mk-service-designer";
  public mksdFileType = ".mksd";

  public title = "Marketto Service Designer";
  public treeItems: SdServiceTreeItem;

  public projectName: string;

  public io: SdServiceIOType = "response";
  public serviceRoot: SdServiceTreeItem = new SdServiceTreeItem();
  public currentService: SdServiceTreeItem;

  private verbVal: SdServiceVerbType = "GET";

  get verb(): SdServiceVerbType {
    return this.verbVal;
  }
  set verb(verb: SdServiceVerbType) {
    this.verbVal = verb;
    if (verb === "GET") {
      this.io = "response";
    } else {
      this.io = "request";
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService) {
    this.initTranslate();
    jsf.option({
      alwaysFakeOptionals: true,
    });
  }

  public newItem() {
    this.currentService.value.verbs[this.verb][this.io].push(new SdItemObject());
  }

  public saveMKSD() {
    const mksdRawFile = [{
      data: JSON.stringify(this.serviceRoot),
      filePath: this.mksdRootJsonFileName,
    }];
    this.exportZip(mksdRawFile, this.mksdFileType, this.mksdMimeType);
  }

  public openMKSD(file: File) {
    const mksdFile = new JSZip();
    mksdFile.loadAsync(file).then((archive) => {
      if (archive.files[this.mksdRootJsonFileName]) {
        archive.files[this.mksdRootJsonFileName].async("blob").then((sourceFile) => {
          const fileReader = new FileReader();
          fileReader.readAsBinaryString(sourceFile);
          fileReader.onload = () => {
            this.projectName = file.name.replace(this.mksdFileType, "");
            this.serviceRoot = JSON.parse(fileReader.result, SdServiceTreeItem.fromJSON);
          };
          fileReader.onerror = (err) => {
            this.exportError("file reader", err);
          };
        }, (err) => {
          this.exportError("zip fetcher", err);
        });
      }
    }, (err) => {
      this.exportError("zip loading", err);
    });
  }

  public exportJsonSchema() {
    const ARCHIVE_NAME = "JSON Schema.zip";
    const schemaList = this.serviceRoot.toJSONSchemaList() || [];
    if (schemaList.length > 0) {
      const contentList = schemaList.map((schemaCfg) => {
        return new ContentElement(
          `${schemaCfg.uri}/${schemaCfg.verb}_${schemaCfg.io}.json`,
          JSON.stringify(schemaCfg.schema, null, 4),
        );
      });
      this.exportZip(contentList, ` ${ARCHIVE_NAME}`);

    } else {
      this.nothingToExport();
    }
  }

  public exportJsonMock() {
    const ARCHIVE_NAME = "JSON MOCKS.zip";
    const schemaList = (this.serviceRoot.toJSONSchemaList() || [])
      .map((schemaCfg) => {
        const jsonMock = faker(schemaCfg.schema);
        return jsonMock && new ContentElement(
          `${schemaCfg.uri}/${schemaCfg.verb}_${schemaCfg.io}.json`,
          JSON.stringify(jsonMock, null, 4),
        );
      }).filter((schemaCfg) => !!schemaCfg);

    if (schemaList.length > 0) {
      this.exportZip(schemaList, ` ${ARCHIVE_NAME}`);
    } else {
      this.nothingToExport();
    }
  }

  public exportWSDL() {
    const ARCHIVE_NAME = "WSDL.zip";
    const schemaList = this.serviceRoot.flatList();
    if ((schemaList || []).length > 0) {
      const contentList = schemaList.map((xsd) => {
        return new ContentElement(`${xsd.verbs.address}.wsdl`, xml.serialize(xsd));
      });
      this.exportZip(contentList, ` ${ARCHIVE_NAME}`);
    } else {
      this.nothingToExport();
    }
  }

  private nothingToExport() {
    return;
  }
  private exportError(msg, err) {
    return;
  }

  private exportZip(fileList: ContentElement[], extension: string, mimeType?: string) {
    const zip = new JSZip();
    fileList.forEach((e) => {
      zip.file(e.filePath, e.data);
    });
    zip.generateAsync({
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
      mimeType,
      type: "blob",
    }).then((blobData) => {
      if (!this.projectName) {
        this.translate.get("DEFAULT.FILE_NAME").toPromise().then((projectName) => {
          this.projectName = projectName;
          saveAs(blobData, `${this.projectName}${extension}`);
        });
      } else {
        saveAs(blobData, `${this.projectName}${extension}`);
      }
    });
  }

  private initTranslate() {
    const DEFAULT_LANGUAGE = "en";

    this.translate.setTranslation("en", EN_TRANSLATION);
    this.translate.setTranslation("it", IT_TRANSLATION);
    this.translate.setTranslation("ru", RU_TRANSLATION);

    this.translate.setDefaultLang(DEFAULT_LANGUAGE);

    const appropriateLanguage = Object.keys(this.translate.translations).find((ln) => {
      const cultureLang = this.translate.getBrowserCultureLang();
      const browserLang = this.translate.getBrowserLang();

      return ln === cultureLang || ln === browserLang;
    }) || DEFAULT_LANGUAGE;

    this.translate.use(appropriateLanguage);

    this.document.documentElement.lang = appropriateLanguage;
  }
}
