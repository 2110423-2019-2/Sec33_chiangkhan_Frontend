import { Component, OnInit } from '@angular/core';
import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-homepage-car-popup',
  templateUrl: './homepage-car-popup.component.html',
  styleUrls: ['./homepage-car-popup.component.css']
})
export class HomepageCarPopupComponent implements OnInit {
  reviews = REVIEWS ;
  constructor() { }

  ngOnInit() {
  }
  closePopup(){
    document.getElementsByClassName("modal is-active")[0].className = "modal"
  }
}
