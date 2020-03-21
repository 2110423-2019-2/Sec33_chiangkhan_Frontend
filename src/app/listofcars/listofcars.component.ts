import { FormGroup, FormControl } from '@angular/forms';
import { RESERVATIONS } from './../reservations/mock-reservations';
import { Component, OnInit } from '@angular/core';
import { CARS } from './mock-cars';


@Component({
  selector: 'app-listofcars',
  templateUrl: './listofcars.component.html',
  styleUrls: ['./listofcars.component.css']
})

  export class ListofcarsComponent implements OnInit {
    
    public user = [] ;
    addDealForm = new FormGroup({
      start_dates: new FormControl(),
      pickup_location: new FormControl()
    })

    constructor() { }

    ngOnInit() {
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

    functionTwo() {

      document.getElementById("form").className = "modal modal-fx-fadeInScale is-active"; 
      console.log("work uuu");
  }

  closeform(){
    
    document.getElementById("form").className = "modal modal-fx-fadeInScale";
}

  startDateChange() {
    // document.getElementById("start_dates")
  }  

  endDateChange() {
    // document.getElementById("start_dates")
  }  

  pickupLocationChange() {

  }

  returnLocationChange() {

  }

  submit_add_deal() {
    this.cars.unshift({ id: 50, image: "https://assets.bugatti.com/fileadmin/_processed_/sei/p54/se-image-e6678a2b1c56c59044f81a3742c784d4.jpg", 
    Availability: 'Available', Type: 'Sport', Model: 'BMW i8', LicensePlate: 'พซ 1150', Seats: '5', Doors: '4',
    StartDate: "someday", EndDate: '13/05/2019', PickupLocation: 'Suanlum', ReturnLocation: 'Suanlum', Price: '4,200' })
    this.closeform();
    console.log(this.addDealForm.value)
  }

  }