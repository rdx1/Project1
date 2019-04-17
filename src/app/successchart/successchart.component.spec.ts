import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesschartComponent } from './successchart.component';

describe('SuccesschartComponent', () => {
  let component: SuccesschartComponent;
  let fixture: ComponentFixture<SuccesschartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesschartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
