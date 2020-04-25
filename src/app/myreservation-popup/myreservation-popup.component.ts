import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from "@angular/core";
import axios from "axios";
import { MyReservationComponent } from "../myreservation/myreservation.component";
@Component({
  selector: "app-myreservation-popup",
  templateUrl: "./myreservation-popup.component.html",
  styleUrls: ["./myreservation-popup.component.css"],
})
export class MyreservationPopupComponent implements OnInit {
  @Input() reviews;
  @Input() car;
  valueRating: Number;
  comment: String;
  information: any;
  display_confirming: boolean = true;
  display_confirmed: boolean = false;
  constructor(
    private elem: ElementRef,
    private myReservation: MyReservationComponent
  ) {}

  ngOnInit() {
    if (this.car.status == "RESERVED" || this.car.status == "RETURNED" || this.car.status == "PICKED") {
      this.display_confirming = false;
      this.display_confirmed = true;
    } else if (this.car.status == "PENDING") {
      this.display_confirming = true;
      this.display_confirmed = false;
    }
  }
  ngAfterViewInit() {}
  closePopup(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-3dFlipVertical";
  }
  addReview() {
    let reviewForm = Object.assign(
      {},
      { comment: this.comment },
      { rating: this.valueRating },
      { carId: this.car.relatedCarAvailable.carId }
    );
    console.log(reviewForm)
    axios
      .post("http://localhost:8080/api/review/", reviewForm)
      .then((response) => {
        console.log(response);
        this.closePopup("review_popup");
      })
      .catch((error) => console.log(error));
  }
  rating(rating: Number) {
    this.valueRating = rating;
  }
  cancelReservation() {
    axios
      .patch(
        "http://localhost:8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "CANCELED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("cancel_popup");
        this.myReservation.tab('CANCELED')
      })
      .catch((error) => console.log(error));
  }
  confirmAgreement() {
    axios
      .patch(
        "http://localhost:8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "RESERVED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("agreement_popup");
        this.myReservation.tab('all')
      })
      .catch((error) => console.log(error));
  }
  pickupCar() {
    axios
      .patch(
        "http://localhost:8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "PICKED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("popupPickup");
        // this.router.navigate(['/homepage/reservation',{ filter: "Picked" }]);
        this.myReservation.tab('PICKED')
      })
      .catch((error) => console.log(error));
  }
  returnCar() {
    axios
      .patch(
        "http://localhost:8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "RETURNED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("popupReturn");
        this.myReservation.tab('RETURNED')
      })
      .catch((error) => console.log(error));
  }
}
