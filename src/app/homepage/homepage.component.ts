import { Component, OnInit, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import axios from "axios";
import { Router, ParamMap } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

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

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  state: number = 0;
  sortDropDown: String = "sort";
  valueSort: String = "";
  orderby: String = "Max -> Min";
  orderDropDown: String = "";

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  leftx: number;
  lefty: number;
  rightx: number;
  righty: number;
  area: String = "";

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
        pickupArea : this.area,
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
    this.sortDropDown = "Rating";
    this.valueSort = "avgRating DESC";
  }

  sortbycapacityInc() {
    this.sortDropDown = "Capacity";
    this.valueSort = "capacity DESC";
  }
  orderbyDESC() {
    this.orderby = "Max -> Min";
    if (this.sortDropDown == "Capacity") {
      this.valueSort = "capacity DESC";
    } else if (this.sortDropDown == "Rating") {
      this.valueSort = "avgRating DESC";
    }
  }
  orderbyASC() {
    this.orderby = "Min -> Max";
    if (this.sortDropDown == "Capacity") {
      this.valueSort = "capacity ASC";
    } else if (this.sortDropDown == "Rating") {
      this.valueSort = "avgRating ASC";
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  // Add Deal Button
  openMap() {
    document.getElementById("form").className = "modal modal-fx-fadeInScale is-active";
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  closeform() {
    document.getElementById("form").className = "modal modal-fx-fadeInScale";
  }
  submit_add_deal() {
    this.closeform();
  }

  updatePoint() {
    this.lefty = this.latitude + 0.05;
    this.leftx = this.longitude + 0.05;
    this.righty = this.latitude - 0.05;
    this.rightx = this.longitude - 0.05;
    this.area = "[["+String(this.leftx)+","+String(this.lefty)+"],"+"["+String(this.rightx)+","+String(this.righty)+"]]"
  }
}
