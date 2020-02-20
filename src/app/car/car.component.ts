import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() 
  image1;

  constructor() { }

  ngOnInit(): void {
  }

  review_popup(){
    document.getElementById('review_popup').className = "modal is-active" ;
  }

}
