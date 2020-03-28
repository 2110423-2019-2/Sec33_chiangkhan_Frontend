import { AddcarService } from './addcar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
    // carType : new FormControl(),
    // photo : new FormControl(),
    
  })
  constructor(private addcarService:AddcarService) { }

  ngOnInit() {
    
  } 
  onSubmit(){
    console.log(this.addcarForm.value)
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
}
    