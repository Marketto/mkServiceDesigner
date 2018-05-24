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
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { TreeviewModule } from "ngx-treeview";
import { AppComponent } from "./app.component";
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
import { MultipleOfDirective } from "./commons/validators/multiple-of/multiple-of.directive";

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
    MultipleOfDirective,
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
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
  ],
  providers: [],
})
export class AppModule { }
