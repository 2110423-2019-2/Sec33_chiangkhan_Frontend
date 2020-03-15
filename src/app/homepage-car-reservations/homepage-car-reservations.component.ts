import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-car-reservations',
  templateUrl: './homepage-car-reservations.component.html',
  styleUrls: ['./homepage-car-reservations.component.css']
})
export class HomepageCarReservationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openPopup(){
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className = "modal modal-fx-fadeInScale is-active"
  }
   openPopup2(){
    document.getElementsByClassName("modal modal-fx-fadeInScale")[1].className = "modal modal-fx-fadeInScale is-active"
  }

}
