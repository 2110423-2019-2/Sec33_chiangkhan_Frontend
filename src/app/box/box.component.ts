import { Component, OnInit } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {


  reviews = REVIEWS ;

  review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  constructor() { }

  ngOnInit(): void {
  }

  popupadd() {
    document.getElementById('popupadd').className = "modal modal-fx-fadeInScale is-active";
  }
  del_popupadd() {
    document.getElementById('popupadd').className = "modal modal-fx-fadeInScale";
    console.log("work")
  }


}
