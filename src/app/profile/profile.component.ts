import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    phone_number: new FormControl(),
    license_number: new FormControl(),
    address: new FormControl(),
  })
  
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
    console.log("update profile executed");
    if (this.verify_edit_profile()) {
      document.getElementById("first_name").nodeValue = this.editForm.get('first_name').value
      this.closePopup()
    }
    
  }

  verify_edit_profile() {
    console.log("executed verify submit");
    if (this.editForm.get('first_name').value == null) {
      console.log("first name is null!");
      return false;
    }
    if (this.editForm.get('last_name').value == null) {
      console.log("last name is null!");
      return false;
    }
    if (this.editForm.get('email').value == null) {
      console.log("email is null!");
      return false;
    }
    if (this.editForm.get('phone_number').value == null) {
      console.log("phone number is null!");
      return false;
    }
    if (this.editForm.get('license_number').value == null) {
      console.log("license number is null!");
      return false;
    }
    if (this.editForm.get('address').value == null) {
      console.log("address is null!");
      return false;
    }
    return true;
  }
}
