import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatGridListModule, MatSelectModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { SdItemBooleanComponent } from "./sd-item-boolean.component";

describe("SdItemBooleanComponent", () => {
  let component: SdItemBooleanComponent;
  let fixture: ComponentFixture<SdItemBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SdItemBooleanComponent,
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        MatSelectModule,
        MatGridListModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemBooleanComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
