import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import axios from "axios";
import { environment } from '../../environments/environment.prod'
@Component({
  selector: "app-myreservation-car",
  templateUrl: "./myreservation-car.component.html",
  styleUrls: ["./myreservation-car.component.css"],
})
export class MyReservationCarComponent implements OnInit {
  @Input() car: any;
  state_button: String;
  display_reserve: boolean = false;
  display_return: boolean = false;
  display_cancel: boolean = false;
  display_pending: boolean = false;
  display_picked: boolean = false;
  constructor(private elem: ElementRef) {}
  openPopup(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-3dFlipVertical is-active";
  }
  pickup_return() {
    if (this.state_button == "Pickup") {
      this.elem.nativeElement.querySelector("#popupPickup").className =
        "modal modal-fx-3dFlipVertical is-active";
    } else {
      this.elem.nativeElement.querySelector("#popupReturn").className =
        "modal modal-fx-3dFlipVertical is-active";
    }
  }

  ngOnInit() {
    if (this.car.status == "CANCELED") {
      this.display_cancel = true;
    } else if (this.car.status == "RETURNED") {
      this.display_return = true;
    } else if (this.car.status == "PENDING") {
      this.display_pending = true;
    } else if (this.car.status == "PICKED") {
      this.state_button = "Return";
      this.display_picked = true;
    } else if (this.car.status == "RESERVED") {
      this.state_button = "Pickup";
      this.display_reserve = true;
    }
  }
  ngAfterViewInit(): void {
    axios
      .get(
        "http://"+environment.host+":8080/api/car/" +
          this.car.relatedCarAvailable.carId +
          "/carInfo"
      )
      .then((response) => {
        Object.assign(this.car, response.data);
        axios
          .get("http://"+environment.host+":8080/api/member/" + this.car.ownerId + "/name")
          .then((response) => {
            Object.assign(this.car, response.data);
            console.log(this.car);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      this.elem.nativeElement.querySelector(".card-before").className = "card";
    }, 500);
  }
}
