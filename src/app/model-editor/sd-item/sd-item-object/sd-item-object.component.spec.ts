
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material";
import {
  MatChipsModule,
  MatGridListModule,
  MatIconModule,
  MatSlideToggleModule,
  MatTooltipModule,
} from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { ExcludeSdItemSiblingsPipe } from "../exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { SdItemBooleanComponent } from "../sd-item-boolean/sd-item-boolean.component";
import { SdItemNumberComponent } from "../sd-item-number/sd-item-number.component";
import { SdItemStringComponent } from "../sd-item-string/sd-item-string.component";
import { SdItemComponent } from "./../sd-item.component";
import { SdItemObjectComponent } from "./sd-item-object.component";

import { MaxDirective } from "../../../commons/validators/max/max.directive";
import { MinDirective } from "../../../commons/validators/min/min.directive";
import { StepDirective } from "../../../commons/validators/step/step.directive";

describe("SdItemObjectComponent", () => {
  let component: SdItemObjectComponent;
  let fixture: ComponentFixture<SdItemObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MinDirective,
        MaxDirective,
        StepDirective,
        SdItemObjectComponent,
        SdItemComponent,
        SdItemBooleanComponent,
        SdItemStringComponent,
        SdItemNumberComponent,
        ExcludeSdItemSiblingsPipe,
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        MatChipsModule,
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
    fixture = TestBed.createComponent(SdItemObjectComponent);
    component = fixture.componentInstance;

  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
