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
    if(this.registerForm.value.firstname == null || this.registerForm.value.lastname == null  || this.registerForm.value.username == null 
      || this.registerForm.value.password == null  || this.registerForm.value.email == null || this.registerForm.value.phone_num == null
      || this.registerForm.value.bank_account == null  || this.registerForm.value.bank_account_branch == null || this.registerForm.value.credit_card_number == null
      || this.registerForm.value.credit_card_security == null  || this.registerForm.value.credit_card_expiry == null || this.registerForm.value.driving_license == null
      || this.registerForm.value.address == null){
      document.getElementsByClassName("non-active")[0].className = "active";
    } else if(this.passwording !== this.confirmPassword) {
      
    }else {
    console.log(this.registerForm.value)
    axios.post('http://localhost:8080/api/users',this.registerForm.value)
      .then((response) => {
        console.log(response);
        document.getElementById('registerpop').className = "modal is-active";
        document.getElementsByClassName("active")[0].className = "non-active"
        //window.location.assign("/")
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  cancel(){
    this.router.navigate(['/'])
  }

  del_registerpop() {
    document.getElementById('registerpop').className = "modal";
    window.location.assign("/");
    console.log("work")
  }

  moveToLogin() {
    window.location.assign("/");
  }

  hiddenError(){
    document.getElementsByClassName("active")[0].className = "non-active"
  }
  showError(){
    document.getElementsByClassName("non-active")[0].className = "active"
  }
  
}