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
    // console.log(this.elementref.nativeElement.querySelectorAll(".fa"))
  }
  
  ngAfterViewInit(){
    let arr = this.elementref.nativeElement.querySelectorAll(".fa")
    for(let j = 0 ; j < this.car.avgRating ; j++){
      arr[j].className = "fa fa-star checked"   
      arr[j+5].className = "fa fa-star checked"      
    }

  }
  openPopup(){
    console.log("open popup")
    this.elementref.nativeElement.querySelectorAll(".modal")[0].className = "modal modal-fx-fadeInScale is-active";
  }
}
