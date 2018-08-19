import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatGridListModule, MatSelectModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { SdItemNumberComponent } from "./sd-item-number.component";

import { MaxDirective } from "../../../commons/validators/max/max.directive";
import { MinDirective } from "../../../commons/validators/min/min.directive";
import { StepDirective } from "../../../commons/validators/step/step.directive";

describe("SdItemNumberComponent", () => {
  let component: SdItemNumberComponent;
  let fixture: ComponentFixture<SdItemNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MinDirective,
        MaxDirective,
        StepDirective,
        SdItemNumberComponent,
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        MatGridListModule,
        MatSelectModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemNumberComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
