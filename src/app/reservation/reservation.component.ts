import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  cars = [{status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Returned" ,type : "Truck" , Model : "BMW Z1" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"},
          {status : "Canceled" ,type : "Sport car" , Model : "BMW Z3" , licensePlate : "12-3456" , PickupDate : "18-11-2019",PickupLocation : "AAAAA",ReturnDate : "12-12'2019",ReturnLocation : "BBBBB"}
          ];
}
