import { Car } from './../listofcars/car';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() 
  car;

  constructor(private elem :ElementRef) { }

  reviews = REVIEWS ;

  ngOnInit(){
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {this.elem.nativeElement.querySelector(".card-before").className = "card" },500);
  }
  showPopup(popup:String){
    popup = "#" + popup
    this.elem.nativeElement.querySelector(popup).className = "modal modal-fx-fadeInScale is-active"
  }
  deletePopup(popup:String){
    popup = "#" + popup
    this.elem.nativeElement.querySelector(popup).className = "modal modal-fx-fadeInScale"
  }

}
