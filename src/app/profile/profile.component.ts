import { Component, OnInit, ElementRef } from "@angular/core";
import axios from "axios";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "angularfire2/storage";
import * as firebase from "firebase";
import { FORMERR } from "dns";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  information: any;
  confirmpassword: String = "";
  confirmpasswordValid: boolean;
  url: string;
  updateProfileForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl("", Validators.email),
    phone_num: new FormControl("", [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    bank_account: new FormControl("", [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    bank_account_branch: new FormControl(),
    credit_card_number: new FormControl("", [
      Validators.minLength(16),
      Validators.maxLength(16),
    ]),
    credit_card_expiry: new FormControl(),
    credit_card_security: new FormControl("", [
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
    driving_license: new FormControl(),
    address: new FormControl(),
    member_profile: new FormControl(this.url),
  });

  constructor(
    private elem: ElementRef,
    private auth: AuthService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.auth.checkStatus();
    axios
      .get("http://localhost:8080/api/member/info")
      .then((response) => {
        console.log(response.data);
        this.information = response.data;
        console.log(this.information.member_profile);
        console.log(this.information.member_profile["url"]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // this.fetchPhoto();
      });
    this.setValue();
  }

  editProfile(form: String) {
    this.setValue();
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale is-active";
  }
  closePopup(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale";
  }
  onChangeConfirmPass() {
    if (this.confirmpassword === this.updateProfileForm.value.password) {
      this.confirmpasswordValid = true;
      this.elem.nativeElement.querySelector("#confirmPassword").className =
        "input is-success";
    } else {
      this.confirmpasswordValid = false;
      this.elem.nativeElement.querySelector("#confirmPassword").className =
        "input is-danger";
    }
  }
  onChangeCredit() {
    if (
      this.updateProfileForm.controls.credit_card_number.status == "INVALID"
    ) {
      this.elem.nativeElement.querySelector("#credit").className =
        "input is-danger";
    } else {
      this.elem.nativeElement.querySelector("#credit").className =
        "input is-success";
    }
  }
  onChangeBank() {
    if (this.updateProfileForm.controls.bank_account.status == "INVALID") {
      this.elem.nativeElement.querySelector("#bank_account").className =
        "input is-danger";
    } else {
      this.elem.nativeElement.querySelector("#bank_account").className =
        "input is-success";
    }
  }
  onChangeEmail() {
    if (this.updateProfileForm.controls.email.status == "INVALID") {
      this.elem.nativeElement.querySelector("#emai;").className =
        "input is-danger";
    } else {
      this.elem.nativeElement.querySelector("#email").className =
        "input is-success";
    }
  }
  onChangePhone() {
    if (this.updateProfileForm.controls.phone_num.status == "INVALID") {
      this.elem.nativeElement.querySelector("#phone").className =
        "input is-danger";
    } else {
      this.elem.nativeElement.querySelector("#phone").className =
        "input is-success";
    }
  }
  onChangeExpiry() {
    if (
      this.updateProfileForm.controls.credit_card_expiry.status == "INVALID"
    ) {
      this.elem.nativeElement.querySelector("#CVV").className =
        "input is-danger";
    } else {
      this.elem.nativeElement.querySelector("#CVV").className =
        "input is-success";
    }
  }
  onChangeCVV() {
    if (
      this.updateProfileForm.controls.credit_card_security.status == "INVALID"
    ) {
      this.elem.nativeElement.querySelector("#CVV").className =
        "input is-danger";
    } else {
      this.elem.nativeElement.querySelector("#CVV").className =
        "input is-success";
    }
  }

  updateProfile() {
    if (this.verify_edit_profile()) {
      axios
        .put(
          "http://localhost:8080/api/member/notupdatepass",
          this.updateProfileForm.value
        )
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      this.closePopup("editProfile");
    } else {
      console.log("cant update profile");
    }
  }
  setValue() {
    let info = {
      name: this.information.name,
      email: this.information.email,
      phone_num: this.information.phone_num,
      bank_account: this.information.bank_account,
      bank_account_branch: this.information.bank_account_branch,
      credit_card_number: this.information.credit_card_number,
      credit_card_expiry: this.information.credit_card_expiry,
      credit_card_security: this.information.credit_card_security,
      driving_license: this.information.driving_license,
      address: this.information.address,
      member_profile: this.information.member_profile,
    };
    this.updateProfileForm.setValue(info);
  }

  verify_edit_profile() {
    if (this.updateProfileForm.get("name").value == null) {
      return false;
    }
    if (this.updateProfileForm.get("email").value == null) {
      return false;
    }
    if (this.updateProfileForm.get("phone_num").value == null) {
      return false;
    }
    if (this.updateProfileForm.get("driving_license").value == null) {
      return false;
    }
    if (this.updateProfileForm.get("address").value == null) {
      return false;
    }
    return true;
  }
  fetchPhoto() {
    var storageRef = firebase
      .storage()
      .ref()
      .child("profile/" + this.information.username)
      .getDownloadURL()
      .then((res) => {
        console.log(res);
        this.url = res;
        axios
          .put("http://localhost:8080/api/member/updatePhoto", {
            newUrl: this.url,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            alert("Fail to update profile images");
          });
      })
      .catch((err) => {});
  }
  upload(event) {
    const username = this.information.username;
    this.ref = this.afStorage.ref("profile").child(username);
    this.task = this.ref.put(event.target.files[0]);
    setTimeout(() => {
      this.fetchPhoto();
    }, 3000);
  }
}
