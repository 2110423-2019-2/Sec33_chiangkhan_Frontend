
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyReservationCarComponent } from './myreservation-car.component';


describe('CarListComponent', () => {
  let component: MyReservationCarComponent;
  let fixture: ComponentFixture<MyReservationCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReservationCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
