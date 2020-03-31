import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-homepage-car',
  templateUrl: './homepage-car.component.html',
  styleUrls: ['./homepage-car.component.css']
})
export class HomepageCarComponent implements OnInit {
  reviews = REVIEWS ;
  @Input() car;
  constructor(private elementref:ElementRef) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    var arr = Array.from(document.getElementsByClassName('fa-star'))
    for(let j = 0 ; j < this.car.avgRating ; j++){
      arr[j].className = "fa fa-star checked"     
    }

  }
  openPopup(){
    console.log("open popup")
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className = "modal modal-fx-fadeInScale is-active"
  }
}
