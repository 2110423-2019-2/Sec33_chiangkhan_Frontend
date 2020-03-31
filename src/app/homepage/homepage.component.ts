import { Component, OnInit, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import axios from "axios";
import { Router, ParamMap } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  searchForm = new FormGroup({
    cartype: new FormControl(),
    capacity: new FormControl(),
    model: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  cars: any[];
  dateForm = new FormGroup({
    startDate: new FormControl()
  });
  state: number = 0;
  sortDropDown: String = "sort";
  valueSort: String = "";
  orderby: String = "Max -> Min";
  orderDropDown: String = "";

  constructor(
    private elementref: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public _location: Location
  ) {}

  getSearchCar() {
    let duration = [];
    duration.push(
      this.searchForm.value.startDate,
      this.searchForm.value.endDate
    );
    this.router.navigate([
      "/homepage",
      {
        carType: this.searchForm.value.cartype,
        capacity: this.searchForm.value.capacity,
        // location : this.searchForm.value.location ,
        carModel: this.searchForm.value.model,
        sortby: this.valueSort,
        duration: Array(duration)
      }
    ]);
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramm = {};
      for (let p in params.keys) {
        if (
          params.get(params.keys[p]) != "null" &&
          params.get(params.keys[p]) != ""
        ) {
          if (
            params.keys[p] == "duration" &&
            params.get(params.keys[p]) != ","
          ) {
            console.log(params.get(params.keys[p]));
            paramm[params.keys[p]] = [params.get(params.keys[p]).split(",")];
            continue;
          } else if (params.get(params.keys[p]) == ",") {
          } else {
            paramm[params.keys[p]] = params.get(params.keys[p]);
          }
        }
      }
      console.log(paramm);
      axios
        .get("http://localhost:8080/api/car/", { params: paramm })
        .then(response => {
          console.log(response);
          this.cars = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  onChangeDate() {
    // console.log(this.dateForm.value)
  }
  toggleFilter() {
    if (this.state == 0) {
      // console.log("yes")
      this.elementref.nativeElement.querySelector(".input.input-0").className =
        "input input-1";
      this.elementref.nativeElement.querySelector(".input.input-0").className =
        "input input-1";
      this.elementref.nativeElement.querySelector(".input.input-0").className =
        "input input-1";
      this.elementref.nativeElement.querySelector(".input.input-0").className =
        "input input-1";
      this.elementref.nativeElement.querySelector(".input.input-0").className =
        "input input-1";
      this.elementref.nativeElement.querySelector(".input.input-0").className =
        "input input-1";
      this.elementref.nativeElement.querySelector(
        ".button.button-0"
      ).className = "button button-1";
      this.elementref.nativeElement.querySelector(".fil").className = "fill";
      this.elementref.nativeElement.querySelector(".fil").className = "fill";
      this.elementref.nativeElement.querySelector(".fil").className = "fill";
      this.elementref.nativeElement.querySelector(".fil").className = "fill";
      this.elementref.nativeElement.querySelector(".fil").className = "fill";
      this.elementref.nativeElement.querySelector(".fil").className = "fill";
      this.state = 1;
    } else {
      // console.log("no")
      this.elementref.nativeElement.querySelector(".input.input-1").className =
        "input input-0";
      this.elementref.nativeElement.querySelector(".input.input-1").className =
        "input input-0";
      this.elementref.nativeElement.querySelector(".input.input-1").className =
        "input input-0";
      this.elementref.nativeElement.querySelector(".input.input-1").className =
        "input input-0";
      this.elementref.nativeElement.querySelector(".input.input-1").className =
        "input input-0";
      this.elementref.nativeElement.querySelector(".input.input-1").className =
        "input input-0";
      this.elementref.nativeElement.querySelector(
        ".button.button-1"
      ).className = "button button-0";
      this.elementref.nativeElement.querySelector(".fill").className = "fil";
      this.elementref.nativeElement.querySelector(".fill").className = "fil";
      this.elementref.nativeElement.querySelector(".fill").className = "fil";
      this.elementref.nativeElement.querySelector(".fill").className = "fil";
      this.elementref.nativeElement.querySelector(".fill").className = "fil";
      this.elementref.nativeElement.querySelector(".fill").className = "fil";
      this.state = 0;
    }
  }

  toggleDropdown1() {
    var dropdown = document.querySelector("#sort");
    dropdown.addEventListener("click", function(event) {
      event.stopPropagation();
      dropdown.classList.toggle("is-active");
    });
  }

  toggleDropdown2() {
    var dropdown = document.querySelector("#order");
    dropdown.addEventListener("click", function(event) {
      event.stopPropagation();
      dropdown.classList.toggle("is-active");
    });
  }

  sortbyAvgRatingInc() {
    this.sortDropDown = "Review";
    this.valueSort = "avgRating DESC";
  }

  sortbycapacityInc() {
    this.sortDropDown = "Capacity";
    this.valueSort = "avgRating DESC";
  }
  orderbyDESC() {
    this.orderby = "Max -> Min";
    if (this.sortDropDown == "Capacity") {
      this.valueSort = "capacity DESC";
    } else if (this.sortDropDown == "Review") {
      this.valueSort = "Review DESC";
    }
  }
  orderbyASC() {
    this.orderby = "Min -> Max";
    if (this.sortDropDown == "Capacity") {
      this.valueSort = "capacity ASC";
    } else if (this.sortDropDown == "Review") {
      this.valueSort = "avgRating ASC";
    }
  }
}
