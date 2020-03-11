import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPopupComponent } from './myreservation-popup.component';

describe('ReviewPopupComponent', () => {
  let component: ReviewPopupComponent;
  let fixture: ComponentFixture<ReviewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
