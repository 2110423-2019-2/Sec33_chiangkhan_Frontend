import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  aboutUsOver() {
    document.getElementById("about-us").className = "menu__link link--menu"
  }

  aboutUsLeave() {
    document.getElementById("about-us").className = "menu__link link--quiet"
  }

  careersOver() {
    document.getElementById("careers").className = "menu__link link--menu"
  }

  careersLeave() {
    document.getElementById("careers").className = "menu__link link--quiet"
  }

  carCareOver() {
    document.getElementById("car-care").className = "menu__link link--menu"
  }

  carCareLeave() {
    document.getElementById("car-care").className = "menu__link link--quiet"
  }

  callOver() {
    document.getElementById("call").className = "menu__link link--menu"
  }

  callLeave() {
    document.getElementById("call").className = "menu__link link--quiet"
  }


  emailOver() {
    document.getElementById("email").className = "menu__link link--menu"
  }

  emailLeave() {
    document.getElementById("email").className = "menu__link link--quiet"
  }


  loginOver() {
    document.getElementById("login").className = "menu__link link--menu"
  }

  loginLeave() {
    document.getElementById("login").className = "menu__link link--quiet"
  }


  registerOver() {
    document.getElementById("register").className = "menu__link link--menu"
  }

  registerLeave() {
    document.getElementById("register").className = "menu__link link--quiet"
  }


}
