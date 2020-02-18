import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.css']
})
export class ReviewPopupComponent implements OnInit {
  @Input() reviews;
  constructor() { }

  ngOnInit() {
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
