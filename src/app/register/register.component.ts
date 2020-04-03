import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input , ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import axios from 'axios';


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
  constructor(private authService : AuthService , private router : Router , private elem : ElementRef) {
    
  }

  ngOnInit() {
    
  }
  
  onChangePassword(){ 
    this.passwording = this.passwording 
  }
  onChangeConfirm(){
    this.confirmPassword = this.confirmPassword
    if(this.passwording === this.confirmPassword){
      this.elem.nativeElement.querySelector('#confirmpassword').className = "input-group-success" 
      this.elem.nativeElement.querySelector('#valid_confirmEmail').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_confirmEmail').style.display = "none"
    }else{
      this.elem.nativeElement.querySelector('#confirmpassword').className = "input-group-invalid" 
      this.elem.nativeElement.querySelector('#valid_confirmEmail').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_confirmEmail').style.display = "block"
    }
  } 

  onSubmit(){
    if(this.registerForm.value.firstname == null || this.registerForm.value.lastname == null  || this.registerForm.value.username == null 
      || this.registerForm.value.password == null  || this.registerForm.value.email == null || this.registerForm.value.phone_num == null
      || this.registerForm.value.bank_account == null  || this.registerForm.value.bank_account_branch == null || this.registerForm.value.credit_card_number == null
      || this.registerForm.value.credit_card_security == null  || this.registerForm.value.credit_card_expiry == null || this.registerForm.value.driving_license == null
      || this.registerForm.value.address == null){
    } else if(this.passwording !== this.confirmPassword) {
    }else {
    axios.post('http://localhost:8080/api/users',this.registerForm.value)
      .then((response) => {
        console.log(response);
        document.getElementById('registerpop').className = "modal is-active";
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
  
  validatePhonenum(){
    if(this.registerForm.value.phone_num.length == 10){
      for(let index of this.registerForm.value.phone_num){
        if(isNaN(parseInt(index))){
          this.elem.nativeElement.querySelector('#valid_phonenum').style.display = "none"
          this.elem.nativeElement.querySelector('#invalid_phonenum').style.display = "block"
          break
        }else{
          this.elem.nativeElement.querySelector('#valid_phonenum').style.display = "block"
          this.elem.nativeElement.querySelector('#invalid_phonenum').style.display = "none"
        }
      }
    }else{
      this.elem.nativeElement.querySelector('#valid_phonenum').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_phonenum').style.display = "block"
    }
   
  }
  validateEmail(){
    // implement validation
  }
  validateCreditcard(){
    if(this.registerForm.value.credit_card_number.length != 16){
      this.elem.nativeElement.querySelector('#valid_credit').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_credit').style.display = "block"
    } else {
      this.elem.nativeElement.querySelector('#valid_credit').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_credit').style.display = "none"
    }
  }
  validateSecurity(){
    if(this.registerForm.value.credit_card_security.length == 3){
      for(let index of this.registerForm.value.credit_card_security){
        if(isNaN(parseInt(index))){
          this.elem.nativeElement.querySelector('#valid_security').style.display = "none"
          this.elem.nativeElement.querySelector('#invalid_security').style.display = "block"
          break
        }else{
          this.elem.nativeElement.querySelector('#valid_security').style.display = "block"
          this.elem.nativeElement.querySelector('#invalid_security').style.display = "none"
        }
      }
    }else{
      this.elem.nativeElement.querySelector('#valid_security').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_security').style.display = "block"
    }
  }
}