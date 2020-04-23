import { element } from "protractor";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import axios from "axios";
@Component({
  selector: "app-homepage-car-popup",
  templateUrl: "./homepage-car-popup.component.html",
  styleUrls: ["./homepage-car-popup.component.css"],
})
export class HomepageCarPopupComponent implements OnInit {
  @Input() car;
  car_popup: any;
  reviews: any;
  private geoCoder;
  zoom: number;
  address: string;
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  five: number = 0;
  size: number = 0;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.car_popup = this.car;
    axios
      .get("http://localhost:8080/api/car/" + this.car.carId + "/carReview")
      .then((response) => {
        this.reviews = response.data[0].review;
        this.size = this.reviews.length;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.reviews.forEach((element) => {
          if (element.rating == 1) {
            this.one += 1;
          } else if (element.rating == 2) {
            this.two += 1;
          } else if (element.rating == 3) {
            this.three += 1;
          } else if (element.rating == 4) {
            this.four += 1;
          } else if (element.rating == 5) {
            this.five += 1;
          }
        });
      });
  }
  ngAfterViewInit() {}
  reserveCar() {
    this.router.navigate(["/homepage/HomepageCarReservations"], {
      state: { data: this.car },
    });
  }
  closePopup() {
    document.getElementsByClassName(
      "modal modal-fx-fadeInScale is-active"
    )[0].className = "modal modal-fx-fadeInScale";
  }

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        while (true) {
          if (status === "OK") {
            if (results[0]) {
              this.zoom = 12;
              this.address = results[0].formatted_address;
              break;
            }
          } else {
            setTimeout(() => {}, 500);
          }
        }
      }
    );
  }
}
