import { Component, OnInit, Input, ElementRef } from "@angular/core";
import axios from "axios";
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
  constructor(private elem: ElementRef) {}

  ngOnInit() {
    if (this.car.status == "RESERVED" || this.car.status == "RETURNED") {
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
    console.log(this.valueRating);
  }
  cancelReservation() {
    console.log(this.car.carReservationId);
    axios
      .patch(
        "http://localhost:8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "CANCELED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("cancel_popup");
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
      })
      .catch((error) => console.log(error));
  }
}
