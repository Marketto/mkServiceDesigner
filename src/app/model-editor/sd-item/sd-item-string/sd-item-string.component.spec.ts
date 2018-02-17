import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdItemStringComponent } from './sd-item-string.component';

describe('SdItemStringComponent', () => {
  let component: SdItemStringComponent;
  let fixture: ComponentFixture<SdItemStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdItemStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
