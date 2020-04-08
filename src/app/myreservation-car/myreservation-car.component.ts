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
      this.elem.nativeElement.querySelectorAll('button')[0].style.display = 'none'
      this.elem.nativeElement.querySelectorAll('button')[1].style.display = 'none'
      this.elem.nativeElement.querySelectorAll('button')[2].style.display = 'none'
      this.elem.nativeElement.querySelectorAll('button')[3].style.display = 'none'
      this.elem.nativeElement.querySelector('.tag').className = 'tag is-danger is-light is-medium'
    }else if(this.car.status == "Returned"){
      this.elem.nativeElement.querySelectorAll('button')[0].style.display = 'none'
      this.elem.nativeElement.querySelectorAll('button')[1].style.display = 'none'
      this.elem.nativeElement.querySelector('.tag').className = 'tag is-primary is-light is-medium'
    }else{
      this.elem.nativeElement.querySelectorAll('button')[3].style.display = 'none'
      this.elem.nativeElement.querySelector('.tag').className = 'tag is-success is-light is-medium'
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {this.elem.nativeElement.querySelector(".card-before").className = "card" },500);
  }
}
