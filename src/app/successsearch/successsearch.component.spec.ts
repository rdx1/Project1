import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesssearchComponent } from './successsearch.component';

describe('SuccesssearchComponent', () => {
  let component: SuccesssearchComponent;
  let fixture: ComponentFixture<SuccesssearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesssearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesssearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
