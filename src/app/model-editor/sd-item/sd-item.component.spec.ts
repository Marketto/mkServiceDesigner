import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdItemComponent } from './sd-item.component';

describe('SdItemComponent', () => {
  let component: SdItemComponent;
  let fixture: ComponentFixture<SdItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
