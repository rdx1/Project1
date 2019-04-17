import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersuccessComponent } from './customersuccess.component';

describe('CustomersuccessComponent', () => {
  let component: CustomersuccessComponent;
  let fixture: ComponentFixture<CustomersuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
