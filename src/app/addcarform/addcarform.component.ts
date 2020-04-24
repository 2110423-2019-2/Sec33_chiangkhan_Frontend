import { async } from "@angular/core/testing";
import { BoxComponent } from "./../box/box.component";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit, ElementRef } from "@angular/core";
import axios from "axios";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "angularfire2/storage";
import * as firebase from "firebase";
@Component({
  selector: "app-addcarform",
  templateUrl: "./addcarform.component.html",
  styleUrls: ["./addcarform.component.css"],
})
export class AddcarformComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  addcarForm = new FormGroup({
    licenseplate: new FormControl(),
    carDescription: new FormControl(),
  });
  valueCartype: String;
  valueCarmodel: String;
  valueCapacity: Number;
  url:string
  constructor(
    private elem: ElementRef,
    private router: Router,
    private boxComponent: BoxComponent,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {}

  addCar() {
    Object.assign(
      this.addcarForm.value,
      { photoOfCarDocument: this.url },
      { capacity: this.valueCapacity },
      { carType: this.valueCartype },
      { carModel: this.valueCarmodel }
    );
    axios
      .post("http://localhost:8080/api/car/", this.addcarForm.value)
      .then((response) => {
        console.log(response);
        console.log(response.data.raw[0].car_id);
        document.getElementsByClassName(
          "modal modal-fx-fadeInScale is-active"
        )[0].className = "modal modal-fx-fadeInScale";
        this.boxComponent.tab("available");
      })
      .catch(function (error) {
        console.log(error);
        alert("Fail");
      })
      .finally(() => {
      });
  }

  addcarType(type: String) {
    this.valueCartype = type;
    this.toggleDropdown(type);
  }
  addcarModel(model: String) {
    this.valueCarmodel = model;
    this.toggleDropdown(model);
  }
  addCapacity(capacity: Number) {
    this.valueCapacity = capacity;
    this.toggleDropdown("capacity");
  }
  closeAllDropdown(filter: String) {
    let allDropdown = this.elem.nativeElement.querySelectorAll(".dropdown");
    for (let i = 0; i < allDropdown.length; i++) {
      if (allDropdown[i].id != filter) allDropdown[i].className = "dropdown";
    }
  }
  toggleDropdown(filter: String) {
    this.closeAllDropdown(filter);
    filter = "#" + filter;
    this.elem.nativeElement.querySelector(filter).classList.toggle("is-active");
  }
  closePopup() {
    this.elem.nativeElement.querySelector(".modal").className =
      "modal modal-fx-fadeInScale";
  }
  upload(event) {
    this.ref = this.afStorage.ref("car").child(this.addcarForm.value.licenseplate);
    this.task = this.ref.put(event.target.files[0]);
    setTimeout(() => {
      this.fetchPhoto()
    }, 3000);
  }

  fetchPhoto() {
    var storageRef = firebase
      .storage()
      .ref()
      .child("car/"+this.addcarForm.value.licenseplate)
      .getDownloadURL()
      .then((res) => {
        console.log(res);
        this.url = res
      });
  }
}
