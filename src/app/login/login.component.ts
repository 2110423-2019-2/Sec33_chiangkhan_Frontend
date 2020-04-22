import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service'

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
  constructor(public router : Router , private authService : AuthService) {
    
  }

  ngOnInit() {
   
  }

  onSubmit(){
    if((this.loginForm.value.username == null || this.loginForm.value.username == "" )&& (this.loginForm.value.password == null ||this.loginForm.value.password == "")){
      document.getElementsByClassName("non-active")[0].className = "active"
    }else if(this.loginForm.value.username == null || this.loginForm.value.username == ""){
      document.getElementsByClassName("non-active")[0].className = "active"
    }else if(this.loginForm.value.password == null || this.loginForm.value.password == ""){
      document.getElementsByClassName("non-active")[0].className = "active"
    }else {
      // hhussy0 
      // 1kvWSXcXcpka
      axios.post('http://localhost:8080/api/auth/login',this.loginForm.value)
      .then((response) => {
        console.log(response);
        window.location.assign("/homepage")
      })
      .catch((error) => {
        console.log(error);
        document.getElementsByClassName("non-active")[0].className = "active"
      });
     
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
 