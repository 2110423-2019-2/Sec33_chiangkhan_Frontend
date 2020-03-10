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
    
  }
  delete_review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-3dFlipVertical" ;
  }
  delete_cancel_popup(){
    document.getElementById('cancel_popup').className = "modal modal-fx-3dFlipVertical" ;
  }
  delete_agreement_popup(){
    document.getElementById('agreement_popup').className = "modal modal-fx-3dFlipVertical" ;
  }
}
