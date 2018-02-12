import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTreeComponent } from './service-tree.component';

describe('ServiceTreeComponent', () => {
  let component: ServiceTreeComponent;
  let fixture: ComponentFixture<ServiceTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
