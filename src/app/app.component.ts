import { Component, Inject } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { DOCUMENT, DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { TreeviewConfig } from "ngx-treeview";
import { Observable } from "rxjs/Observable";
import * as EN_TRANSLATION from "../assets/i18n/en.json";
import * as IT_TRANSLATION from "../assets/i18n/it.json";
import * as RU_TRANSLATION from "../assets/i18n/ru.json";
import { ContentElement } from "./classes/content-element";
import { SdItemObject } from "./classes/sd-item";
import { SdService, SdServiceIOType, SdServiceTreeItem, SdServiceVerbType } from "./classes/sd-service";
import { FileServiceSD } from "./file-service/file-service-sd";
import { IfileService } from "./file-service/file-service.interface";
import { JsonMockFileService } from "./file-service/json-file-service/json-mock-file.service";
import { JsonSchemaFileService } from "./file-service/json-file-service/json-schema-file.service";
import { MksdFileService } from "./file-service/mksd-file-service/mksd-file.service";
import { MockettaroFileService } from "./file-service/mockettaro-file-service/mockettaro-file.service";
import { WsdlFileService } from "./file-service/wsdl-file-service/wsdl-file.service";

@Component({
  selector    : "app-root",
  styleUrls   : ["./app.component.less"],
  templateUrl : "./app.component.html",
})

export class AppComponent {

  public title = "Marketto Service Designer";
  public treeItems: SdServiceTreeItem;
  public projectName: string;
  public mksdFileTypes: string[] = [
      `.${MksdFileService.extension}`,
      MksdFileService.mimeType,
    ];

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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    public snackBar: MatSnackBar,

    public mksdFileService: MksdFileService,
    public wsdlFileService: WsdlFileService,
    public jsonSchemaFileService: JsonSchemaFileService,
    public jsonMockFileService: JsonMockFileService,
    public mockettaroFileService: MockettaroFileService,
  ) {
    this.initTranslate();
  }

  public newItem() {
    this.currentService.value.verbs[this.verb][this.io].push(new SdItemObject());
  }

  public saveMKSD() {
    this.manageExport(this.mksdFileService);
  }

  public openMKSD(file: File) {
    this.mksdFileService.load(file).subscribe((fileServiceSd: FileServiceSD) => {
      this.projectName = fileServiceSd.projectName;
      this.serviceRoot = fileServiceSd.serviceTree;
      this.showMessage("LOAD_SUCCEDED");
    }, this.showMessage);
  }

  public exportJsonSchema() {
    this.manageExport(this.jsonSchemaFileService);
  }

  public exportJsonMock() {
    this.manageExport(this.jsonMockFileService);
  }

  public exportMockettaro() {
    this.manageExport(this.mockettaroFileService);
  }

  public exportWSDL() {
    this.manageExport(this.wsdlFileService);
  }

  private manageExport(fileService: IfileService) {
    const input = new FileServiceSD({
      projectName: this.projectName,
      serviceTree: this.serviceRoot,
    });
    fileService
      .save(input)
      .subscribe(() => {
        this.showMessage("EXPORT_SUCCEDED");
      }, this.showMessage);
  }

  private showMessage(msgKey, err?) {
    const MESSAGE_KEY = `MESSAGE.${msgKey}`;
    const BUTTON_LABEL = "MESSAGE.BUTTON.DISMISS";
    this.translate.get([MESSAGE_KEY, BUTTON_LABEL])
      .toPromise().then((translations) => {
        this.snackBar.open(
          translations[MESSAGE_KEY],
          translations[BUTTON_LABEL],
          {
            duration: 2000,
          },
        );
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
