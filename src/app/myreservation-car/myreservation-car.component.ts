import { REVIEWS } from "../review/mock-review";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-myreservation-car",
  templateUrl: "./myreservation-car.component.html",
  styleUrls: ["./myreservation-car.component.css"],
})
export class MyReservationCarComponent implements OnInit {
  reviews = REVIEWS;
  @Input() car;
  state_button: String = "Pickup";
  display_reserve: boolean = false;
  display_return: boolean = false;
  display_cancel: boolean = false;
  display_pending: boolean = false;
  constructor(private elem: ElementRef) {}
  openPopup(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-3dFlipVertical is-active";
  }
  pickup_return() {
    if (this.state_button == "Pickup") {
      this.state_button = "Return";
    } else {
      axios
        .patch(
          "http://localhost:8080/api/car-reservation/" +
            this.car.carReservationId,
          { status: "RETURNED" }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  }

  ngOnInit() {
    if (this.car.status == "CANCELLED") {
      this.display_cancel = true;
    } else if (this.car.status == "RETURNED") {
      this.display_return = true;
    } else if (this.car.status == "PENDING") {
      this.display_pending = true;
    } else {
      this.display_reserve = true;
    }
    console.log(this.car);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elem.nativeElement.querySelector(".card-before").className = "card";
    }, 500);
  }
}
