import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTreeComponent } from './service-tree.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';

describe('ServiceTreeComponent', () => {
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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
