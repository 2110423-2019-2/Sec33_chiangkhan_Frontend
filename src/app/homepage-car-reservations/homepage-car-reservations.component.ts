import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-car-reservations',
  templateUrl: './homepage-car-reservations.component.html',
  styleUrls: ['./homepage-car-reservations.component.css']
})
export class HomepageCarReservationsComponent implements OnInit {
  isConfirm:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  openPopup(){
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className = "modal modal-fx-fadeInScale is-active"
  }
  createReservation(){
    if(this.isConfirm){
      document.getElementsByClassName("modal modal-fx-fadeInScale")[1].className = "modal modal-fx-fadeInScale is-active"
    }else{
      alert("You must confirm agreement")
    }
    
  }
  confirmAgreement(){
    if(!this.isConfirm){
      this.isConfirm = true;
    }else{
      this.isConfirm = false ;
    }
  }

}
