import { SdItemObjectComponent } from "./sd-item/sd-item-object/sd-item-object.component";
import { MatIconModule, MatChipsModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material";
import { ExcludeSdItemSiblingsPipe } from "./sd-item/exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { MatFormFieldModule, MatGridListModule, MatSlideToggleModule, MatSelectModule } from "@angular/material";
import { SdItemComponent } from "./sd-item/sd-item.component";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModelEditorComponent } from "./model-editor.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { SdItemStringComponent } from "./sd-item/sd-item-string/sd-item-string.component";
import { SdItemNumberComponent } from "./sd-item/sd-item-number/sd-item-number.component";
import { SdItemBooleanComponent } from "./sd-item/sd-item-boolean/sd-item-boolean.component";

describe("ModelEditorComponent", () => {
  let component: ModelEditorComponent;
  let fixture: ComponentFixture<ModelEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelEditorComponent,
        SdItemComponent,
        SdItemStringComponent,
        SdItemNumberComponent,
        SdItemObjectComponent,
        SdItemBooleanComponent,
        ExcludeSdItemSiblingsPipe,
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        MatChipsModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
