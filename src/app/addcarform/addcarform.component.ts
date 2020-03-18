import { AddcarService } from './addcar.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-addcarform',
  templateUrl: './addcarform.component.html',
  styleUrls: ['./addcarform.component.css']
})
export class AddcarformComponent implements OnInit {
  addcarForm = new FormGroup({
    carType : new FormControl(),
    carModel : new FormControl(),
    licensePlate : new FormControl(),
    capacity : new FormControl(),
    photo : new FormControl(),
    photoDoc : new FormControl(),
    description : new FormControl()
  })
  constructor(private addcarService:AddcarService) { }

  ngOnInit() {
    
  } 
  onSubmit(){
    console.log(this.addcarForm.value)
    axios.post('http://localhost:8080/api/car/', this.addcarForm.value)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
    