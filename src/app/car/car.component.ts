import { Component, OnInit, Input } from '@angular/core';

import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() 
  image1;

  constructor() { }

  popupremove() {
    document.getElementById('popupremove').className = "modal modal-fx-fadeInScale is-active";
  }
  del_popupremove() {
    document.getElementById('popupremove').className = "modal modal-fx-fadeInScale";
    console.log("work")
  }

  reviews = REVIEWS ;

  ngOnInit(): void {
    document.getElementsByClassName("unactive")[3].className = "active"
  }

  review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }

}
