import { TestBed } from '@angular/core/testing';

import { CustomersuccessService } from './customersuccess.service';

describe('CustomersuccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomersuccessService = TestBed.get(CustomersuccessService);
    expect(service).toBeTruthy();
  });
});
