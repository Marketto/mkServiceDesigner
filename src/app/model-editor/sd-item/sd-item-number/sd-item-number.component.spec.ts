import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdItemNumberComponent } from './sd-item-number.component';

describe('SdItemNumberComponent', () => {
  let component: SdItemNumberComponent;
  let fixture: ComponentFixture<SdItemNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdItemNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
