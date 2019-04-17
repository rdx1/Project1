import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycustomersuccesssearchComponent } from './displaycustomersuccesssearch.component';

describe('DisplaycustomersuccesssearchComponent', () => {
  let component: DisplaycustomersuccesssearchComponent;
  let fixture: ComponentFixture<DisplaycustomersuccesssearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaycustomersuccesssearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaycustomersuccesssearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
