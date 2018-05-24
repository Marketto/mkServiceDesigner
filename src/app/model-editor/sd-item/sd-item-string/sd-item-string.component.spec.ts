import { MatGridListModule, MatSelectModule, MatChipsModule, MatIconModule, MatTooltipModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SdItemStringComponent } from "./sd-item-string.component";
import { TranslateModule } from "@ngx-translate/core";

describe("SdItemStringComponent", () => {
  let component: SdItemStringComponent;
  let fixture: ComponentFixture<SdItemStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SdItemStringComponent,
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        MatChipsModule,
        MatGridListModule,
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemStringComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
