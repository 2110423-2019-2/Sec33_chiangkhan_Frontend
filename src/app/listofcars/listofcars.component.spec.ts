import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofcarsComponent } from './listofcars.component';

describe('HomepageComponent', () => {
  let component: ListofcarsComponent;
  let fixture: ComponentFixture<ListofcarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofcarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});