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
    document.getElementsByClassName("modal")[0].className = "modal is-active"
  }
  closePopup(){
    document.getElementsByClassName("modal is-active")[0].className = "modal"
  }
  updateProfile(){
    //do somethings
  }
}
