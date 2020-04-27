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

import { environment } from '../../environments/environment.prod'

@Component({
  selector: "app-addcarform",
  templateUrl: "./addcarform.component.html",
  styleUrls: ["./addcarform.component.css"],
})
export class AddcarformComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  licenseplate : string;
  addcarForm = new FormGroup({
    // licenseplate: new FormControl('',[Validators.minLength(7),Validators.maxLength(8)]),
    prefix : new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]),
    number : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(4),Validators.pattern('[0-9]*')]),
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
      { licenseplate: this.licenseplate },
      { photoOfCarDocument: this.url },
      { capacity: this.valueCapacity },
      { carType: this.valueCartype },
      { carModel: this.valueCarmodel }
    );
    delete this.addcarForm.value["number"];
    delete this.addcarForm.value["prefix"];
    console.log(this.addcarForm.value)
    axios
      .post("http://"+ environment.host +":8080/api/car/", this.addcarForm.value)
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
  checkPrefix(){
    if(this.addcarForm.controls.prefix.status != "VALID"){
      this.elem.nativeElement.querySelector('#prefix').className = 'input is-danger'
    }else{
      this.elem.nativeElement.querySelector('#prefix').className = 'input is-success'
    }
  }
  checkNumber(){
    if(this.addcarForm.controls.number.status != "VALID"){
      this.elem.nativeElement.querySelector('#number').className = 'input is-danger'
    }else{ 
      this.elem.nativeElement.querySelector('#number').className = 'input is-success'
    }
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
    this.licenseplate = this.addcarForm.value.prefix + " " +this.addcarForm.value.number
    this.ref = this.afStorage.ref("car").child(this.licenseplate);
    this.task = this.ref.put(event.target.files[0]);
    setTimeout(() => {
      this.fetchPhoto()
    }, 4000);
  }

  fetchPhoto() {
    var storageRef = firebase
      .storage()
      .ref()
      .child("car/"+this.licenseplate)
      .getDownloadURL()
      .then((res) => {
        console.log(res);
        this.url = res
      });
  }
}
