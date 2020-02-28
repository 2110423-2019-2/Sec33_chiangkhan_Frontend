// import { axios } from 'axios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.component.html',
  styleUrls: ['./myreservation.component.css']
})
export class MyReservationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  cars = [{status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Returned" ,type : "Truck" , Model : "BMW Z1" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          // {status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"}
          ];
}
