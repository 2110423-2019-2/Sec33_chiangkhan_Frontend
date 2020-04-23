import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit, ElementRef } from "@angular/core";
import { AuthService } from "../auth.service";
import axios from "axios";
@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.css"],
})
export class BoxComponent implements OnInit {
  cars: any[];
  hasCar :boolean = true
  review_popup() {
    document.getElementById("review_popup").className =
      "modal modal-fx-fadeInScale is-active";
  }
  popup() {
    document.getElementById("review_popup").className =
      "modal modal-fx-fadeInScale is-active";
  }
  constructor(
    private elem: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.checkStatus();
    this.route.paramMap.subscribe((params: ParamMap) => {
      axios
        .get("http://localhost:8080/api/car/mycar")
        .then((response) => {
          console.log(response);
          this.cars = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          if (params.get(params.keys[0]) != "null" && params.get(params.keys[0]) != null) {  
            this.filterCar(params.get(params.keys[0]));
          }
          this.hasCar = this.cars.length == 0 ? false : true
        });
    });
    document.getElementsByClassName("unactive")[3].className = "active";
  }

  popupadd() {
    document.getElementById("popupadd").className =
      "modal modal-fx-fadeInScale is-active";
  }
  del_popupadd() {
    document.getElementById("popupadd").className =
      "modal modal-fx-fadeInScale";

  }
  untab(tab: String) {
    var t = this.elem.nativeElement.querySelectorAll("li");
    for (let i = 0; i < t.length; i++) {
      if (t[i].id != tab) {
        t[i].className = "";
      }
    }
  }
  tab(tab: String) {
    let filter = [];
    let t: boolean;
    this.untab(tab);
    if (tab == "available") {
      t = false;
    } else if (tab == "reserve") {
      t = true;
    } else {
      t = null;
    }
    this.router.navigate([
      "/homepage/mycar",
      {
        filter: t,
      },
    ]);
    tab = "#" + tab;
    this.elem.nativeElement.querySelector(tab).className = "is-active";
  }
  filterCar(tab: string) {  
    let filter = [];
    this.cars.forEach((element) => {
      if (tab === String(element.isInUse)) {
        filter.push(element);
      }
    });
    this.cars = filter;
  }
}
