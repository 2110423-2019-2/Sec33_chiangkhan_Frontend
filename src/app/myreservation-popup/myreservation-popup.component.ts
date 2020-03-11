import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-myreservation-popup',
  templateUrl: './myreservation-popup.component.html',
  styleUrls: ['./myreservation-popup.component.css']
})
export class MyreservationPopupComponent implements OnInit {
  @Input() reviews;
  constructor() { }

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    var arr = Array.from(document.getElementsByClassName('fa'))
    for(let j = 0 ; j < this.reviews.length ; j++){
       for(let i = 0 ; i < this.reviews[j].rating ; i++){
         arr[5*j+i].className = "fa fa-star checked"     
      }
    }
  }
  delete_review_popup(){
    document.getElementById('review_popup').className = "modal" ;
  }
  delete_cancel_popup(){
    document.getElementById('cancel_popup').className = "modal" ;
  }
  delete_agreement_popup(){
    document.getElementById('agreement_popup').className = "modal" ;
  }
}
