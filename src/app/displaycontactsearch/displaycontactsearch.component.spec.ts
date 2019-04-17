import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycontactsearchComponent } from './displaycontactsearch.component';

describe('DisplaycontactsearchComponent', () => {
  let component: DisplaycontactsearchComponent;
  let fixture: ComponentFixture<DisplaycontactsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaycontactsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaycontactsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
