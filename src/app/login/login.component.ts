import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import axios from "axios";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "angularfire2/storage";
import * as firebase from "firebase";
import { environment } from '../../environments/environment.prod'
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  public user = [];
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    public router: Router,
    private authService: AuthService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      (this.loginForm.value.username == null ||
        this.loginForm.value.username == "") &&
      (this.loginForm.value.password == null ||
        this.loginForm.value.password == "")
    ) {
      document.getElementsByClassName("non-active")[0].className = "active";
    } else if (
      this.loginForm.value.username == null ||
      this.loginForm.value.username == ""
    ) {
      document.getElementsByClassName("non-active")[0].className = "active";
    } else if (
      this.loginForm.value.password == null ||
      this.loginForm.value.password == ""
    ) {
      document.getElementsByClassName("non-active")[0].className = "active";
    } else {
      // hhussy0
      // 1kvWSXcXcpka
      axios
        .post("http://"+environment.host+":8080/api/auth/login", this.loginForm.value)
        .then((response) => {
          console.log(response);
          window.location.assign("/homepage");
        })
        .catch((error) => {
          console.log(error);
          document.getElementsByClassName("non-active")[0].className = "active";
        })
        .then(() => {
          axios
            .get("http://"+environment.host+":8080/api/review")
            .then((response) => {
              console.log(response);
            })
            .catch((error) => console.log(error));
        });
    }
  }

  usernameChange() {
    document.getElementsByClassName("input")[0].className = "input";
  }
  passwordChange() {
    document.getElementsByClassName("input")[1].className = "input";
  }

  hiddenError() {
    document.getElementsByClassName("active")[0].className = "non-active";
  }
  showError() {
    document.getElementsByClassName("non-active")[0].className = "active";
  }

  upload(event) {
    const car_id = 102;
    this.ref = this.afStorage.ref("car").child("carid" + car_id);
    this.task = this.ref.put(event.target.files[0]);
  }
  myFunction() {
    var storageRef = firebase.storage().ref().child("car");
    const fileRef = storageRef
      .listAll()
      .then((res) => {
        res.items.forEach((img) => {
          console.log(img.toString());
          img.getDownloadURL().then((url) => {
            console.log(url);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  fetchPhoto() {
    var storageRef = firebase
      .storage()
      .ref()
      .child("car/carid101")
      .getDownloadURL()
      .then((res) => {
        console.log(res);
      });
  }
}
