import { Component, OnInit, Input } from '@angular/core';
import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-homepage-car',
  templateUrl: './homepage-car.component.html',
  styleUrls: ['./homepage-car.component.css']
})
export class HomepageCarComponent implements OnInit {
  reviews = REVIEWS ;
  @Input() car;
  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    var arr = Array.from(document.getElementsByClassName('fa-star'))
    for(let j = 0 ; j < this.reviews.length ; j++){
       for(let i = 0 ; i < this.reviews[j].rating ; i++){
         arr[5*j+i+5].className = "fa fa-star checked"     
      }
    }
  }
  openPopup(){
    console.log("open popup")
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className = "modal modal-fx-fadeInScale is-active"
  }
}
