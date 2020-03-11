import { element } from 'protractor';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AuthService } from '../auth.service';

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
    firstName : new FormControl(),
    lastName : new FormControl(),
    userName : new FormControl(),
    passWord : new FormControl(),
    email : new FormControl(),
    phoneNumber : new FormControl(),
    bankAccountForm: new FormGroup({
      bankAccount: new FormControl(),
      branch: new FormControl()
    }),
    drivingLicense : new FormControl(),
    creditCardForm : new FormGroup({
      creditCard : new FormControl(),
      expDate : new FormControl(),
      securityNumber : new FormControl()
    }),
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
  }
  cancel(){
    this.router.navigate(['/'])
  }
  
}
