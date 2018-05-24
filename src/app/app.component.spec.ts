import { async, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule } from "@angular/forms";
import { ServiceTreeComponent } from "./service-tree/service-tree.component";

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
import { TranslateModule } from "@ngx-translate/core";
import { AppComponent } from "./app.component";
import { ModelEditorComponent } from "./model-editor/model-editor.component";

import { SdItemBooleanComponent } from "./model-editor/sd-item/sd-item-boolean/sd-item-boolean.component";
import { SdItemNumberComponent } from "./model-editor/sd-item/sd-item-number/sd-item-number.component";
import { SdItemObjectComponent } from "./model-editor/sd-item/sd-item-object/sd-item-object.component";
import {
  RegexpValidatorDirective,
} from "./model-editor/sd-item/sd-item-string/regexp-validator/regexp-validator.directive";
import { SdItemStringComponent } from "./model-editor/sd-item/sd-item-string/sd-item-string.component";
import { SdItemComponent } from "./model-editor/sd-item/sd-item.component";
import { ServiceTreeComponent } from "./service-tree/service-tree.component";

import {
  ExcludeSdItemSiblingsPipe,
} from "./model-editor/sd-item/exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { TreeviewModule } from "ngx-treeview";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title "Marketto Service Designer"`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Marketto Service Designer");
  }));
});
