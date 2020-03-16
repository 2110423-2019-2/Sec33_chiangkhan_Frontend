import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {
    
  }
  editProfile(){
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className = "modal modal-fx-fadeInScale is-active"
  }
  closePopup(){
    document.getElementsByClassName("modal modal-fx-fadeInScale is-active")[0].className = "modal modal-fx-fadeInScale"
  }
  updateProfile(){
    //do somethings
  }
}
