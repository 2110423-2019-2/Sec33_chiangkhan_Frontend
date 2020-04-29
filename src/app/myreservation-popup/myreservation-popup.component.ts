import { element } from 'protractor';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewEncapsulation,
} from "@angular/core";
import axios from "axios";
import { MyReservationComponent } from "../myreservation/myreservation.component";
import { environment } from "src/environments/environment";
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
    if (
      this.car.status == "RESERVED" ||
      this.car.status == "RETURNED" ||
      this.car.status == "PICKED"
    ) {
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
    console.log(reviewForm);
    axios
      .post("http://" + environment.host + ":8080/api/review/", reviewForm)
      .then((response) => {
        console.log(response);
        this.closePopup("review_popup");
      })
      .catch((error) => console.log(error));
  }
  rating(rating: number) {
    let list = ['fa-frown','fa-frown-open','fa-meh','fa-surprise','fa-grin-stars']
    this.valueRating = rating;
    console.log(this.valueRating)
    let ei = this.elem.nativeElement.querySelectorAll('i')
    ei[0].className = "far fa-frown fa-4x"
    ei[1].className = "far fa-frown-open fa-4x"
    ei[2].className = "far fa-meh fa-4x"
    ei[3].className = "far fa-surprise fa-4x"
    ei[4].className = "far fa-grin-stars fa-4x"
    ei[rating-1].className = "fas " +list[rating-1]+ " fa-4x"
  }
  cancelReservation() {
    axios
      .patch(
        "http://" +
          environment.host +
          ":8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "CANCELED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("cancel_popup");
        this.myReservation.tab("CANCELED");
      })
      .catch((error) => console.log(error));
  }
  confirmAgreement() {
    axios
      .patch(
        "http://" +
          environment.host +
          ":8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "RESERVED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("agreement_popup");
        this.myReservation.tab("all");
      })
      .catch((error) => console.log(error));
  }
  pickupCar() {
    axios
      .patch(
        "http://" +
          environment.host +
          ":8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "PICKED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("popupPickup");
        // this.router.navigate(['/homepage/reservation',{ filter: "Picked" }]);
        this.myReservation.tab("PICKED");
      })
      .catch((error) => console.log(error));
  }
  returnCar() {
    axios
      .patch(
        "http://" +
          environment.host +
          ":8080/api/car-reservation/" +
          this.car.carReservationId,
        { status: "RETURNED" }
      )
      .then((response) => {
        console.log(response);
        this.closePopup("popupReturn");
        this.myReservation.tab("RETURNED");
      })
      .catch((error) => console.log(error));
  }
}
