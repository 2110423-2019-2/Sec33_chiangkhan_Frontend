import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarReservationsComponent } from './homepage-car-reservations.component';

describe('HomepageCarReservationsComponent', () => {
  let component: HomepageCarReservationsComponent;
  let fixture: ComponentFixture<HomepageCarReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCarReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCarReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
