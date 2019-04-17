import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenominationComponent } from './homenomination.component';

describe('HomenominationComponent', () => {
  let component: HomenominationComponent;
  let fixture: ComponentFixture<HomenominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
