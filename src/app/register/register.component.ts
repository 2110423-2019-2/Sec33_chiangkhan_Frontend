import { element } from 'protractor';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AuthService } from '../auth.service';
import axios from 'axios';

interface Course {
  description: string;
  courseListIcon:string;
  iconUrl:string;
  longDescription:string;
  url:string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstname : new FormControl(),
    lastname : new FormControl(),
    username : new FormControl(),
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
  passwording:string = ""
  confirmPassword:string = ""
  constructor(private http:HttpClient , private authService : AuthService , private router : Router) {
    
   }

  ngOnInit() {
    
  }
  ngOnChanges() {
    
  }
  onChangePassword(){
    this.passwording = this.passwording 
    console.log(this.passwording)
  }
  onChangeConfirm(){
    this.confirmPassword = this.confirmPassword
    if(this.passwording === this.confirmPassword){
      document.getElementById("confirm").className = "input is-success"
      console.log("Yes")
    }else{
      document.getElementById("confirm").className = "input is-danger"
    }
    console.log(this.confirmPassword)
  }

  onSubmit(){
    console.log(this.registerForm.value)
    axios.post('http://localhost:8080/api/users',this.registerForm.value)
      .then((response) => {
        console.log(response);
        window.location.assign("/")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  cancel(){
    this.router.navigate(['/'])
  }
  
}