import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatSidenavModule,
  MatInputModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatMenuModule,
  MatDividerModule
} from '@angular/material';
import { TreeviewModule } from 'ngx-treeview';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { ServiceTreeComponent } from './service-tree/service-tree.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { SdItemComponent } from './model-editor/sd-item/sd-item.component';
import { SdItemStringComponent } from './model-editor/sd-item/sd-item-string/sd-item-string.component';
import { SdItemNumberComponent } from './model-editor/sd-item/sd-item-number/sd-item-number.component';
import { SdItemObjectComponent } from './model-editor/sd-item/sd-item-object/sd-item-object.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceTreeComponent,
    ModelEditorComponent,
    SdItemComponent,
    SdItemStringComponent,
    SdItemNumberComponent,
    SdItemObjectComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule,
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
