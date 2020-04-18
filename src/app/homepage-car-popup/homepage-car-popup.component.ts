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
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.car_popup = this.car;
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
  ngAfterViewInit() {
    // this.getAddress(this.car.pickupLocation.x,this.car.pickupLocation.y)
  }
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
              console.log(this.address);
              break
            }
          }else{
            setTimeout(() => {
            }, 500);
          }
        }
      }
    );
  }
}
