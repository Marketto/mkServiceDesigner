import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import {
  MatChipsModule,
  MatGridListModule,
  MatIconModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule,
} from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { ExcludeSdItemSiblingsPipe } from "./exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { SdItemBooleanComponent } from "./sd-item-boolean/sd-item-boolean.component";
import { SdItemNumberComponent } from "./sd-item-number/sd-item-number.component";
import { SdItemObjectComponent } from "./sd-item-object/sd-item-object.component";
import { SdItemStringComponent } from "./sd-item-string/sd-item-string.component";
import { SdItemComponent } from "./sd-item.component";

describe("SdItemComponent", () => {
  let component: SdItemComponent;
  let fixture: ComponentFixture<SdItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SdItemComponent,
        SdItemStringComponent,
        SdItemObjectComponent,
        SdItemNumberComponent,
        SdItemBooleanComponent,
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
    fixture = TestBed.createComponent(SdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
