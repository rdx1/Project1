import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcontactComponent } from './searchcontact.component';

describe('SearchcontactComponent', () => {
  let component: SearchcontactComponent;
  let fixture: ComponentFixture<SearchcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
