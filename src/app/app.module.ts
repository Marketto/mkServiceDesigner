import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { TreeviewModule } from "ngx-treeview";
import { AppComponent } from "./app.component";
import { JsonMockFileService } from "./file-service/json-file-service/json-mock-file.service";
import { JsonSchemaFileService } from "./file-service/json-file-service/json-schema-file.service";
import { MockettaroFileService } from "./file-service/mockettaro-file-service/mockettaro-file.service";
import { WsdlFileService } from "./file-service/wsdl-file-service/wsdl-file.service";
import { ZipFileService } from "./file-service/zip-file-service/zip-file.service";
import { ModelEditorComponent } from "./model-editor/model-editor.component";
import {
  ExcludeSdItemSiblingsPipe,
} from "./model-editor/sd-item/exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { SdItemBooleanComponent } from "./model-editor/sd-item/sd-item-boolean/sd-item-boolean.component";
import { SdItemNumberComponent } from "./model-editor/sd-item/sd-item-number/sd-item-number.component";
import { SdItemObjectComponent } from "./model-editor/sd-item/sd-item-object/sd-item-object.component";
import {
  RegexpValidatorDirective,
} from "./model-editor/sd-item/sd-item-string/regexp-validator/regexp-validator.directive";
import { SdItemStringComponent } from "./model-editor/sd-item/sd-item-string/sd-item-string.component";
import { SdItemComponent } from "./model-editor/sd-item/sd-item.component";
import { ServiceTreeComponent } from "./service-tree/service-tree.component";

import { MaxDirective } from "./commons/validators/max/max.directive";
import { MinDirective } from "./commons/validators/min/min.directive";
import { StepDirective } from "./commons/validators/step/step.directive";
import { MksdFileService } from "./file-service/mksd-file-service/mksd-file.service";

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ServiceTreeComponent,
    ModelEditorComponent,
    SdItemComponent,
    SdItemStringComponent,
    SdItemNumberComponent,
    SdItemObjectComponent,
    SdItemBooleanComponent,
    RegexpValidatorDirective,
    ExcludeSdItemSiblingsPipe,
    MinDirective,
    MaxDirective,
    StepDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    TreeviewModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSidenavModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [
    ZipFileService,
    WsdlFileService,
    MksdFileService,
    MockettaroFileService,
    JsonMockFileService,
    JsonSchemaFileService,
  ],
})
export class AppModule { }
