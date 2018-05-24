import { SdItemComponent } from "./../sd-item.component";
import { MatGridListModule, MatTooltipModule, MatIconModule, MatSlideToggleModule, MatChipsModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SdItemObjectComponent } from "./sd-item-object.component";
import { MatSelectModule } from "@angular/material";
import { ExcludeSdItemSiblingsPipe } from "../exclude-sd-item-siblings/exclude-sd-item-siblings.pipe";
import { SdItemStringComponent } from "../sd-item-string/sd-item-string.component";
import { SdItemNumberComponent } from "../sd-item-number/sd-item-number.component";
import { SdItemBooleanComponent } from "../sd-item-boolean/sd-item-boolean.component";

describe("SdItemObjectComponent", () => {
  let component: SdItemObjectComponent;
  let fixture: ComponentFixture<SdItemObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
