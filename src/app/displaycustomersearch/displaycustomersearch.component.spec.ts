import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycustomersearchComponent } from './displaycustomersearch.component';

describe('DisplaycustomersearchComponent', () => {
  let component: DisplaycustomersearchComponent;
  let fixture: ComponentFixture<DisplaycustomersearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaycustomersearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaycustomersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
