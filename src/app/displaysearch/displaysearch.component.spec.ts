import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysearchComponent } from './displaysearch.component';

describe('DisplaysearchComponent', () => {
  let component: DisplaysearchComponent;
  let fixture: ComponentFixture<DisplaysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaysearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
