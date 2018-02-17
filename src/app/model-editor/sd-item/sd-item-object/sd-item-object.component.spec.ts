import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdItemObjectComponent } from './sd-item-object.component';

describe('SdItemObjectComponent', () => {
  let component: SdItemObjectComponent;
  let fixture: ComponentFixture<SdItemObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdItemObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdItemObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
