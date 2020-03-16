import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarReservationsReserveconfirmPopupComponent } from './homepage-car-reservations-reserveconfirm-popup.component';

describe('HomepageCarReservationsReserveconfirmPopupComponent', () => {
  let component: HomepageCarReservationsReserveconfirmPopupComponent;
  let fixture: ComponentFixture<HomepageCarReservationsReserveconfirmPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCarReservationsReserveconfirmPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCarReservationsReserveconfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
