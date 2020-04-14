import { Component, OnInit, ElementRef } from "@angular/core";
import axios from "axios";
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  information: any;
  updateProfileForm = new FormGroup({
    name : new FormControl(),
    password : new FormControl(),
    email : new FormControl(),
    phone_num : new FormControl(),
    bank_account: new FormControl(),
    bank_account_branch: new FormControl(),
    credit_card_number : new FormControl(),
    credit_card_expiry : new FormControl(),
    credit_card_security : new FormControl() ,
    driving_license : new FormControl(),
    address : new FormControl()
  })

  constructor(private elem: ElementRef) {}

  ngOnInit() {
    axios
      .get("http://localhost:8080/api/member/info")
      .then((response) => {
        console.log(response.data);
        this.information = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  editProfile(form: String) {
    this.setValue()
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale is-active";
  }
  closePopup(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale";
  }
  updateProfile() {
    console.log(this.updateProfileForm.value)
    axios
      .put("http://localhost:8080/api/member/update",this.updateProfileForm.value)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  setValue(){
    let info ={
      "name": this.information.name,
      "password": this.information.password,
      "email": this.information.email,
      "phone_num": this.information.phone_num,
      "bank_account": this.information.bank_account,
      "bank_account_branch": this.information.bank_account_branch,
      "credit_card_number": this.information.credit_card_number,
      "credit_card_expiry": this.information.credit_card_expiry,
      "credit_card_security": this.information.credit_card_security,
      "driving_license": this.information.driving_license,
      "address": this.information.address
    }
    this.updateProfileForm.setValue(info)
  }
}
