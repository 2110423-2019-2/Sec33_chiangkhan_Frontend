import { Component, OnInit, Input} from '@angular/core';
import { REVIEWS } from '../review/mock-review';

@Component({
  selector: 'app-homepage-car-popup',
  templateUrl: './homepage-car-popup.component.html',
  styleUrls: ['./homepage-car-popup.component.css']
})
export class HomepageCarPopupComponent implements OnInit {
  @Input() car;
  car_popup:any
  reviews = REVIEWS ;
  constructor() { }

  ngOnInit() {
    this.car_popup = this.car ;
    // console.log(this.car_popup)
  }
  closePopup(){
    document.getElementsByClassName("modal modal-fx-fadeInScale is-active")[0].className = "modal modal-fx-fadeInScale"
  }
}
