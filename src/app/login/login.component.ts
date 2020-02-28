import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';

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
  constructor() {
    const axios = require('axios');
   }

  ngOnInit() {
    
  }
  onSubmit(){
    console.log(this.loginForm.value)
    this.getUser()
  }
  async getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }

}
