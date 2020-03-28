import { RESERVATIONS } from './../reservations/mock-reservations';
import { Component, OnInit } from '@angular/core';
import { CARS } from './mock-cars';

@Component({
  selector: 'app-listofcars',
  templateUrl: './listofcars.component.html',
  styleUrls: ['./listofcars.component.css']
})

  export class ListofcarsComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {
      document.getElementsByClassName("unactive")[2].className = "active"
    }

    cars = CARS;
    reservations = RESERVATIONS;
    
    functionOne() {

        document.getElementById("popup").className = "modal modal-fx-fadeInScale is-active"; 
        console.log("work uuu");
    }
    closepopup(){
    
        document.getElementById("popup").className = "modal modal-fx-fadeInScale";
    }

  }