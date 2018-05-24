import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SdItemNumberComponent } from "./sd-item-number.component";
import { MatGridListModule, MatSelectModule } from "@angular/material";

describe("SdItemNumberComponent", () => {
  let component: SdItemNumberComponent;
  let fixture: ComponentFixture<SdItemNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
