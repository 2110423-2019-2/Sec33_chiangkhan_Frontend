import { AddcarService } from './addcar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-addcarform',
  templateUrl: './addcarform.component.html',
  styleUrls: ['./addcarform.component.css']
})
export class AddcarformComponent implements OnInit {
  addcarForm = new FormGroup({
    licenseplate : new FormControl(),
    capacity : new FormControl(),
    carModel : new FormControl(),
    carType : new FormControl(),
    carDescription : new FormControl(),
    photoOfCarDocument : new FormControl()
  })
  valueCartype:String;
  valueCarmodel:String;
  valueCapacity:Number;
  constructor(private addcarService:AddcarService , private elem:ElementRef ) { }

  ngOnInit() {
    
  } 
  addCar(){
    axios.post('http://localhost:8080/api/car/', this.addcarForm.value)
    .then(function (response) {
      console.log(response);
      document.getElementsByClassName("modal modal-fx-fadeInScale is-active")[0].className = "modal modal-fx-fadeInScale"
    })
    .catch(function (error) {
      console.log(error);
      alert("Fail")
    });
  }

  addcarType(type:String){
    this.valueCartype = type ;
    this.toggleDropdown(type)
  }
  addcarModel(model:String){
    this.valueCarmodel = model;
    this.toggleDropdown(model)
  }
  addCapacity(capacity:Number){
    this.valueCapacity = capacity;
    this.toggleDropdown('capacity')
  }
  closeAllDropdown(filter:String){
    let allDropdown = this.elem.nativeElement.querySelectorAll('.dropdown')
    for(let i = 0 ; i < allDropdown.length ; i++){
      if(allDropdown[i].id != filter)
       allDropdown[i].className = "dropdown"
    }
  }
  toggleDropdown(filter:String){
    this.closeAllDropdown(filter)
    filter = '#' + filter ;
    this.elem.nativeElement.querySelector(filter).classList.toggle("is-active");
  }
  closePopup(){
    console.log('wok')
    this.elem.nativeElement.querySelector(".modal").className = "modal modal-fx-fadeInScale"
  }
}

    