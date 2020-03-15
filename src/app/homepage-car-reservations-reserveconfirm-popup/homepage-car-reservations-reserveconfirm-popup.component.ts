import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-car-reservations-reserveconfirm-popup',
  templateUrl: './homepage-car-reservations-reserveconfirm-popup.component.html',
  styleUrls: ['./homepage-car-reservations-reserveconfirm-popup.component.css']
})
export class HomepageCarReservationsReserveconfirmPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   closePopup(){
    document.getElementsByClassName("modal modal-fx-fadeInScale is-active")[0].className = "modal modal-fx-fadeInScale"
  }

}
