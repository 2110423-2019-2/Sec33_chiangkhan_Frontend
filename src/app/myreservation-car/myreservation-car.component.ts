import { REVIEWS } from '../review/mock-review';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-myreservation-car',
  templateUrl: './myreservation-car.component.html',
  styleUrls: ['./myreservation-car.component.css']
})
export class MyReservationCarComponent implements OnInit {
  reviews = REVIEWS ;
  @Input() car ;

  review_popup(){
    document.getElementById('review_popup').className = "modal is-active" ;
  }
  cancel_popup(){
    document.getElementById('cancel_popup').className = "modal is-active" ;
  }
  agreement_popup(){
    document.getElementById('agreement_popup').className = "modal is-active" ;
  }
  constructor() {
    
   }

  ngOnInit() {
  }

}
