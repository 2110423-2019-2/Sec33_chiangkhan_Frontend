import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service'
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = [] ;
  loginForm = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  })
  constructor(private router : Router , private authService : AuthService) {
    
  }

  ngOnInit() {
   console.log(Array.prototype.slice.call(document.getElementsByTagName("html"))[0])
  }

  onSubmit(){
    if((this.loginForm.value.username == null || this.loginForm.value.username == "" )&& (this.loginForm.value.password == null ||this.loginForm.value.password == "")){
      console.log("username password null")
      document.getElementsByClassName("input")[0].className = "input is-danger"
      document.getElementsByClassName("input")[1].className = "input is-danger"
      document.getElementsByClassName("non-active")[0].className = "active"
    }else if(this.loginForm.value.username == null || this.loginForm.value.username == ""){
      console.log("username null")
      document.getElementsByClassName("input")[0].className = "input is-danger"
      document.getElementsByClassName("non-active")[0].className = "active"
    }else if(this.loginForm.value.password == null || this.loginForm.value.password == ""){
      console.log("password null")
      document.getElementsByClassName("input")[1].className = "input is-danger"
      document.getElementsByClassName("non-active")[0].className = "active"
    }else {
      console.log("complete")
      console.log(this.loginForm.value)
      var res =  this.authService.login(this.loginForm.value)
      this.router.navigate(['/homepage'])
    }
  }

  usernameChange(){
    document.getElementsByClassName("input")[0].className = "input"
  }
  passwordChange(){
    document.getElementsByClassName("input")[1].className = "input"
  }

  hiddenError(){
    document.getElementsByClassName("active")[0].className = "non-active"
  }
  showError(){
    document.getElementsByClassName("non-active")[0].className = "active"
  }

}
