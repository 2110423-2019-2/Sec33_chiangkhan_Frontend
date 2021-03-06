import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit, ElementRef } from "@angular/core";
import { AuthService } from "../auth.service";
import axios from "axios";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
@Component({
  selector: "app-myreservation",
  templateUrl: "./myreservation.component.html",
  styleUrls: ["./myreservation.component.css"],
})
export class MyReservationComponent implements OnInit {
  isvalid: boolean = true;
  carReservation: any;
  hasCar:boolean = true
  currentTab:string
  constructor(
    private elem: ElementRef,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.auth.checkStatus();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentTab = params.get(params.keys[0])
      axios
      .get("http://"+environment.host+":8080/api/car-reservation/")
      .then((response) => {
        console.log(response);
        this.carReservation = response.data;
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        if(params.get(params.keys[0]) != "all" && params.get(params.keys[0]) != null){
          this.filterCar(params.get(params.keys[0]))
        }
        this.hasCar = this.carReservation.length == 0 ? false : true
      });
    });
    document.getElementsByClassName("unactive")[1].className = "active";
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
    this.untab(tab);
    this.router.navigate([
      "/homepage/reservation",
      {
        filter: tab,
      },
    ]);
    tab = "#" + tab;
    this.elem.nativeElement.querySelector(tab).className = "is-active";
  }
  filterCar(tab:string){
    let filter = [];
    this.carReservation.forEach((element) => {
      if (element.status == tab) {
        filter.push(element);
      }
    });
    this.carReservation = filter
  }
}
