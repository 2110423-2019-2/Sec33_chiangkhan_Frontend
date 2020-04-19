import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { RESERVATIONS } from "./../reservations/mock-reservations";
import axios from "axios";
@Component({
  selector: "app-listof-cardeal",
  templateUrl: "./listof-cardeal.component.html",
  styleUrls: ["./listof-cardeal.component.css"],
})
export class ListofCardealComponent implements OnInit {
  @Input() car;
  reservations = RESERVATIONS;
  constructor(private elem: ElementRef) {}

  ngOnInit() {
    console.log(this.car);
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
    console.log(this.car.carAvailableId);
    axios
      .delete(
        "http://localhost:8080/api/carAvailable/" + this.car.carAvailableId
      )
      .then((response) => {
        console.log(response);
        this.closeform('remove_deal_popup')
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
