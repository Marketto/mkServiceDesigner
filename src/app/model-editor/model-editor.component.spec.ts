import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import {
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule,
} from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { ModelEditorComponent } from "./model-editor.component";
import { ExcludeSdItemSiblingsPipe } from "./sd-item/exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { SdItemBooleanComponent } from "./sd-item/sd-item-boolean/sd-item-boolean.component";
import { SdItemNumberComponent } from "./sd-item/sd-item-number/sd-item-number.component";
import { SdItemObjectComponent } from "./sd-item/sd-item-object/sd-item-object.component";
import { SdItemStringComponent } from "./sd-item/sd-item-string/sd-item-string.component";
import { SdItemComponent } from "./sd-item/sd-item.component";

import { MaxDirective } from "../commons/validators/max/max.directive";
import { MinDirective } from "../commons/validators/min/min.directive";
import { StepDirective } from "../commons/validators/step/step.directive";

describe("ModelEditorComponent", () => {
  let component: ModelEditorComponent;
  let fixture: ComponentFixture<ModelEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MinDirective,
        MaxDirective,
        StepDirective,
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
