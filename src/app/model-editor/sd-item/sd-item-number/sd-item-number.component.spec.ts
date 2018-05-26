import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatGridListModule, MatSelectModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { SdItemNumberComponent } from "./sd-item-number.component";

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
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
