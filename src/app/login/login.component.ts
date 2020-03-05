import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  })
  constructor(private router : Router) {
    
  }

  ngOnInit() {
    
  }
  onSubmit(){
    console.log(this.loginForm.value)
    // this.getUser()
  }

  // try to get request to backend
  async getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }

}
