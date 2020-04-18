import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import axios from 'axios'
@Component({
  selector: "app-homepage-car-popup",
  templateUrl: "./homepage-car-popup.component.html",
  styleUrls: ["./homepage-car-popup.component.css"],
})
export class HomepageCarPopupComponent implements OnInit {
  @Input() car;
  car_popup: any;
  reviews:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.car_popup = this.car;
    axios
    .get("http://localhost:8080/api/car/" + this.car.carId + "/carReview")
    .then((response) => {
      console.log(response);
      this.reviews = response.data[0].review
    })
    .catch((error) => {
      console.log(error);
    });
  }
  ngAfterViewInit() {}
  reserveCar() {
    this.router.navigate(["/homepage/HomepageCarReservations"], {
      state: { data: this.car},
    });
  }
  closePopup() {
    document.getElementsByClassName(
      "modal modal-fx-fadeInScale is-active"
    )[0].className = "modal modal-fx-fadeInScale";
  }
}
