import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-car-reservations-popup',
  templateUrl: './homepage-car-reservations-popup.component.html',
  styleUrls: ['./homepage-car-reservations-popup.component.css']
})
export class HomepageCarReservationsPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   closePopup(){
    document.getElementsByClassName("modal modal-fx-fadeInScale is-active")[0].className = "modal modal-fx-fadeInScale"
  }
}
