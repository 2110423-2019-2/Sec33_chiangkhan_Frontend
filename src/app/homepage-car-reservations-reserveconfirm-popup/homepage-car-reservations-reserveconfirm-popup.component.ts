import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-homepage-car-reservations-reserveconfirm-popup",
  templateUrl:
    "./homepage-car-reservations-reserveconfirm-popup.component.html",
  styleUrls: ["./homepage-car-reservations-reserveconfirm-popup.component.css"],
})
export class HomepageCarReservationsReserveconfirmPopupComponent
  implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  closePopup() {
    document.getElementsByClassName(
      "modal modal-fx-fadeInScale is-active"
    )[0].className = "modal modal-fx-fadeInScale";
    this.router.navigate(['/homepage/reservation'])
  }
}
