import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { REVIEWS } from "../review/mock-review";

@Component({
  selector: "app-homepage-car-popup",
  templateUrl: "./homepage-car-popup.component.html",
  styleUrls: ["./homepage-car-popup.component.css"],
})
export class HomepageCarPopupComponent implements OnInit {
  @Input() car;
  car_popup: any;
  reviews = REVIEWS;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.car_popup = this.car;
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
