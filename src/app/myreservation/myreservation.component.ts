import { Component, OnInit, ElementRef } from "@angular/core";
import axios from "axios";
@Component({
  selector: "app-myreservation",
  templateUrl: "./myreservation.component.html",
  styleUrls: ["./myreservation.component.css"],
})
export class MyReservationComponent implements OnInit {
  isvalid: boolean = true;
  carReservation: any;
  constructor(private elem: ElementRef) {}

  ngOnInit() {
    // activeNavbar
    document.getElementsByClassName("unactive")[1].className = "active";
    axios
      .get("http://localhost:8080/api/car-reservation/")
      .then((response) => {
        console.log(response);
        this.carReservation = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.carReservation);
  }
  cars = [
    {
      status: "Canceled",
      type: "Sport car",
      Model: "BMW Z3",
      licensePlate: "12-3456",
      PickupDate: "18-11-2019",
      PickupLocation: "AAAAA",
      ReturnDate: "12-12'2019",
      ReturnLocation: "BBBBB",
    },
    {
      status: "Returned",
      type: "Truck",
      Model: "BMW Z1",
      licensePlate: "12-3456",
      PickupDate: "18-11-2019",
      PickupLocation: "AAAAA",
      ReturnDate: "12-12'2019",
      ReturnLocation: "BBBBB",
    },
    {
      status: "Reserving",
      type: "Sport car",
      Model: "BMW Z3",
      licensePlate: "12-3456",
      PickupDate: "18-11-2019",
      PickupLocation: "AAAAA",
      ReturnDate: "12-12'2019",
      ReturnLocation: "BBBBB",
    },
    {
      status: "Canceled",
      type: "Sport car",
      Model: "BMW Z3",
      licensePlate: "12-3456",
      PickupDate: "18-11-2019",
      PickupLocation: "AAAAA",
      ReturnDate: "12-12'2019",
      ReturnLocation: "BBBBB",
    },
    {
      status: "Canceled",
      type: "Sport car",
      Model: "BMW Z3",
      licensePlate: "12-3456",
      PickupDate: "18-11-2019",
      PickupLocation: "AAAAA",
      ReturnDate: "12-12'2019",
      ReturnLocation: "BBBBB",
    },
  ];

  untab(tab: String) {
    var t = this.elem.nativeElement.querySelectorAll("li");
    for (let i = 0; i < t.length; i++) {
      if (t[i].id != tab) {
        t[i].className = "";
      }
    }
  }
  tab(tab: String) {
    this.untab(tab);
    tab = "#" + tab;
    this.elem.nativeElement.querySelector(tab).className = "is-active";
  }
}
