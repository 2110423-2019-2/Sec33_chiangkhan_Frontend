import { Component, OnInit, Input, ElementRef } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"],
})
export class CarComponent implements OnInit {
  @Input() car;
  constructor(private elem: ElementRef) {}

  reviews: any;
  carStatus: String;
  ngOnInit() {
    this.setStatus();
    axios
      .get("http://localhost:8080/api/car/" + this.car.carId + "/carReview")
      .then((response) => {
        console.log(response);
        this.reviews = response.data[0].review;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setStatus() {
    if (this.car.isInUse) {
      this.carStatus = "Reserved";
    } else {
      this.carStatus = "Available";
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elem.nativeElement.querySelector(".card-before").className = "card";
    }, 500);
  }
  showPopup(popup: String) {
    popup = "#" + popup;
    this.elem.nativeElement.querySelector(popup).className =
      "modal modal-fx-fadeInScale is-active";
  }
  deletePopup(popup: String) {
    popup = "#" + popup;
    this.elem.nativeElement.querySelector(popup).className =
      "modal modal-fx-fadeInScale";
  }
  removeCar() {
    console.log(this.car)
    axios
      .delete("http://localhost:8080/api/car/"+this.car.carId+"/deleteCar")
      .then((response) => {
        console.log(response);
        this.deletePopup('popupremove')
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
