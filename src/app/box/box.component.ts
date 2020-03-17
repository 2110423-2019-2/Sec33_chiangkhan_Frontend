import { Component, OnInit } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { REVIEWS } from '../review/mock-review';
import axios from 'axios';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  cars: any[] ;  
  reviews = REVIEWS ;

  review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  constructor() { 
    
  }

  ngOnInit(){
    axios.get('http://localhost:8080/api/car/')
    .then((response) => {
      console.log(response);
      this.cars = response.data
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
    // always executed
    });
  }

  popupadd() {
    document.getElementById('popupadd').className = "modal modal-fx-fadeInScale is-active";
  }
  del_popupadd() {
    document.getElementById('popupadd').className = "modal modal-fx-fadeInScale";
    console.log("work")
  }


}
