import { Component, OnInit, Input, ElementRef } from "@angular/core";
import axios from "axios";
@Component({
  selector: "app-listof-cardeal",
  templateUrl: "./listof-cardeal.component.html",
  styleUrls: ["./listof-cardeal.component.css"],
})
export class ListofCardealComponent implements OnInit {
  @Input() car;
  reservations: any;
  hasHistory:boolean
  isReserve:string
  constructor(private elem: ElementRef) {}

  ngOnInit() {
    this.isReserve = this.car.isInUse ? 'Reserve' : 'Available'
    axios.get("http://localhost:8080/api/car/"+this.car.carId+"/revervationHistory").then((response) => {
      this.reservations = response.data[0].reservation
      this.hasHistory = this.reservations.length == 0 ? false : true
    });
  }

  openform(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale is-active";
  }
  closeform(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale";
  }
  removeDeal() {
    axios
      .delete(
        "http://localhost:8080/api/carAvailable/" + this.car.carAvailableId
      )
      .then((response) => {
        console.log(response);
        this.closeform("remove_deal_popup");

      })
      .catch((error) => {
        console.log(error);
        alert("This can is reserved by someone")
      });
  }
}
