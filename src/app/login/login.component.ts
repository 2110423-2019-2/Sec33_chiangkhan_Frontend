import { Component, OnInit } from '@angular/core';
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
   
  }

  onSubmit(){
   console.log(this.loginForm.value)
   var res =  this.authService.login(this.loginForm.value)
   
    // if(res === "200"){
    //   this.router.navigate(['/homepage'])
    // }else if(res ==="401"){
    //   alert("Incorrect username or password")
    // }
  }



}
