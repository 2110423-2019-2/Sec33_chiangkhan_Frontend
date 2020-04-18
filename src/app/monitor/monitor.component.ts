import { Component, OnInit } from "@angular/core";
import axios from "axios";
@Component({
  selector: "app-monitor",
  templateUrl: "./monitor.component.html",
  styleUrls: ["./monitor.component.css"],
})
export class MonitorComponent implements OnInit {
  sum: number;
  car: any;
  carsAvailable;any
  constructor() {}

  ngOnInit() {
    axios
      .get("http://localhost:8080/api/car")
      .then((response) => {
        console.log(response);
        this.car = response.data;
      })
      .finally(() => {
        let carsAvailable = [];
        this.car.forEach((car) => {
          car.availability.forEach((element) => {
            let temp = Object.assign({}, car);
            let temp1 = Object.assign(temp, element);
            delete temp1["availability"];
            carsAvailable.push(temp1);
          });
        });
        this.carsAvailable = carsAvailable;
        console.log(this.carsAvailable);
      });
  }
}
