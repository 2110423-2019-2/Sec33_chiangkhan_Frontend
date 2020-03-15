import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarReservationsPopupComponent } from './homepage-car-reservations-popup.component';

describe('HomepageCarReservationsPopupComponent', () => {
  let component: HomepageCarReservationsPopupComponent;
  let fixture: ComponentFixture<HomepageCarReservationsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCarReservationsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCarReservationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
