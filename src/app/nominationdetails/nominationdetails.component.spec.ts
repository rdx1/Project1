import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationdetailsComponent } from './nominationdetails.component';

describe('NominationdetailsComponent', () => {
  let component: NominationdetailsComponent;
  let fixture: ComponentFixture<NominationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
