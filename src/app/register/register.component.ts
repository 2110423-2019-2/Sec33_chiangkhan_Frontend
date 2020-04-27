import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input , ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import axios from 'axios';

import { ValidatePassword } from '../Validator/passwordValidator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  registerForm = new FormGroup({
    name : new FormControl("",Validators.required),
    username : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
    password : new FormControl("",[Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$'),Validators.minLength(6),Validators.maxLength(16),Validators.required]),
    email : new FormControl("",[Validators.email,Validators.required]),
    phone_num : new FormControl("",[Validators.minLength(10),Validators.maxLength(10),Validators.required]),
    bank_account: new FormControl("",[Validators.minLength(10),Validators.maxLength(10),Validators.required,Validators.pattern('[0-9]*')]),
    bank_account_branch: new FormControl("",Validators.required),
    credit_card_number : new FormControl("",[Validators.minLength(16),Validators.maxLength(16),Validators.required]),
    credit_card_expiry : new FormControl("",Validators.required),
    credit_card_security : new FormControl("",[Validators.minLength(3),Validators.maxLength(3),Validators.required]) ,
    driving_license : new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]*')]),
    address : new FormControl("",Validators.required),
    member_profile : new FormControl('https://firebasestorage.googleapis.com/v0/b/software-engineering-51d8d.appspot.com/o/profile%2FProfile.png?alt=media&token=2106ea73-e74c-428d-96e0-08a42cdce81f')
  })
  
  passwording:string = ""
  confirmPassword:string = ""
  comfirmPassworldValid:boolean 
  constructor(private authService : AuthService , private router : Router , private elem : ElementRef) {
    
  }

  ngOnInit() {
    
  }
 
  
  onChangeConfirm(){
    this.confirmPassword = this.confirmPassword
    if(this.passwording === this.confirmPassword){
      this.comfirmPassworldValid = true
      this.elem.nativeElement.querySelector('#confirmpassword').className = "input-group-success" 
      this.elem.nativeElement.querySelector('#valid_confirmEmail').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_confirmEmail').style.display = "none"
    }else{
      this.comfirmPassworldValid = false
      this.elem.nativeElement.querySelector('#confirmpassword').className = "input-group-invalid" 
      this.elem.nativeElement.querySelector('#valid_confirmEmail').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_confirmEmail').style.display = "block"
    }
  } 

  onSubmit(){
    this.validateAll()
    if(!this.registerForm.valid || !this.comfirmPassworldValid || this.confirmPassword == null){ 
        this.elem.nativeElement.querySelector('#invalid_register').style.display = "flex"
    }else{
    axios.post("http://"+environment.host+":8080/api/users",this.registerForm.value)
      .then((response) => {
        console.log(response); 
        this.elem.nativeElement.querySelector('#registerpop').className = "modal is-active"
      })
      .catch((error) => { 
        console.log(error.response.data.message)
        if(error.response.data.message == "DuplicateUser"){
          alert("username already exist in Database")
        }
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
  validateAll(){
    this.validateBank()
    this.validateCreditcard()
    this.validateEmail()
    this.validatePhonenum()
    this.validateSecurity()
    this.validateName()
    this.validatelicensePlate()
    this.validatePassword()
    this.validateUsername()
    this.validateAddress()
  }
  validateBranch(){
    if(this.registerForm.controls.bank_account_branch.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_branch').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_branch').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_branch').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_branch').style.display = "none"
    }
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
  validateName(){
    if(this.registerForm.controls.name.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_name').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_name').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_name').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_name').style.display = "none"
    }
  }
  validatePassword(){
    this.passwording = this.passwording 
    console.log(this.registerForm.controls.password)
    if(this.registerForm.controls.password.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_password').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_password').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_password').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_password').style.display = "none"
    }
  }
  validateUsername(){
    if(this.registerForm.controls.username.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_username').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_username').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_username').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_username').style.display = "none"
    }
  }
  validatelicensePlate(){
    if(this.registerForm.controls.driving_license.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_licensePlate').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_licensePlate').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_licensePlate').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_licensePlate').style.display = "none"
    }
  }
  validateAddress(){
    if(this.registerForm.controls.address.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_address').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_address').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_address').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_address').style.display = "none"
    }
  }
  validateEmail(){
    if(this.registerForm.controls.email.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_email').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_email').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_email').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_email').style.display = "none"
    }
  }
  validateBank(){
    if(this.registerForm.controls.bank_account.status != "VALID"){
      this.elem.nativeElement.querySelector('#valid_bank_account').style.display = "none"
      this.elem.nativeElement.querySelector('#invalid_bank_account').style.display = "block"
    }else{
      this.elem.nativeElement.querySelector('#valid_bank_account').style.display = "block"
      this.elem.nativeElement.querySelector('#invalid_bank_account').style.display = "none"
    }
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
