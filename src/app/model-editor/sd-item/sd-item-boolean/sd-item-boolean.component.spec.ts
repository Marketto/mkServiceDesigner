import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdItemBooleanComponent } from './sd-item-boolean.component';

describe('SdItemBooleanComponent', () => {
  let component: SdItemBooleanComponent;
  let fixture: ComponentFixture<SdItemBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdItemBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
