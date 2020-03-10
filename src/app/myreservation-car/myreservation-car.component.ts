import { REVIEWS } from '../review/mock-review';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-myreservation-car',
  templateUrl: './myreservation-car.component.html',
  styleUrls: ['./myreservation-car.component.css']
})
export class MyReservationCarComponent implements OnInit {
  reviews = REVIEWS ;
  @Input() car ;
  constructor(private elem: ElementRef) {
    
  }
  review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-3dFlipVertical is-active" ;
  }
  cancel_popup(){
    document.getElementById('cancel_popup').className = "modal modal-fx-3dFlipVertical is-active" ;
  }
  agreement_popup(){
    document.getElementById('agreement_popup').className = "modal modal-fx-3dFlipVertical is-active" ;
  }
  
  ngOnInit() {
    if(this.car.status == "Canceled"){
      this.elem.nativeElement.querySelectorAll('button')[1].className = 'button is-danger is-disabled'
      this.elem.nativeElement.querySelectorAll('button')[2].className = 'button is-info is-disabled'
      this.elem.nativeElement.querySelectorAll('button')[3].className = 'button is-dark is-disabled'
    }else if(this.car.status == "Returned"){
      this.elem.nativeElement.querySelectorAll('button')[1].className = 'button is-danger is-disabled'
    }else{
      this.elem.nativeElement.querySelectorAll('button')[0].id = "pickup"
      this.elem.nativeElement.querySelectorAll('button')[3].className = 'button is-dark is-disabled'
    }
  }

}
