import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatIconModule, MatToolbarModule, MatTooltipModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { TreeviewModule } from "ngx-treeview";
import { ServiceTreeComponent } from "./service-tree.component";

describe("ServiceTreeComponent", () => {
  let component: ServiceTreeComponent;
  let fixture: ComponentFixture<ServiceTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServiceTreeComponent,
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        TreeviewModule.forRoot(),
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,

      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTreeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
