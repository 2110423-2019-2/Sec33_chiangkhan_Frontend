import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router, ParamMap, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { AuthService } from "../auth.service";
import axios from "axios";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  searchForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  cars: any[];
  carsAvailable: any[];

  @ViewChild("search", { static: true })
  public searchElementRef: ElementRef;
  amountAllcar: number;
  pagination: any;
  paginationCurrent: any = 0;
  stateShowCar: number = 0;
  state: number = 0;
  sortDropDown: String = "sort";
  valueSort: String = "";
  orderby: String = "Max -> Min";
  orderDropDown: String = "";

  valueCapacity: number;
  valueCarmodel: String;
  valueCartype: String;

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
  name: any;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private elementref: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public _location: Location,
    private auth: AuthService
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
        carType: this.valueCartype,
        capacity: this.valueCapacity,
        pickupArea: this.area,
        carModel: this.valueCarmodel,
        sortby: this.valueSort,
        duration: Array(duration),
        pagination: this.paginationCurrent,
      },
    ]);
  }
  ngOnInit() {
    this.auth.checkStatus();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramm = {};
      for (let p in params.keys) {
        if (
          params.get(params.keys[p]) != "null" &&
          params.get(params.keys[p]) != "" &&
          params.get(params.keys[p]) != "undefined"
        ) {
          if (params.keys[p] == "pagination") {
            continue;
          }
          if (
            params.keys[p] == "duration" &&
            params.get(params.keys[p]) != ","
          ) {
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
        .then((response) => {
          console.log(response);
          this.cars = response.data;
          this.amountAllcar = this.getAmountCarAvailable(this.cars);
          this.pagination = Array(Math.floor(this.amountAllcar / 30))
            .fill(0)
            .map((x, i) => i + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          let carsAvailable = [];
          this.cars.forEach((car) => {
            // axios
            //   .get("http://localhost:8080/api/member/" + car.ownerId + "/name")
            //   .then((response) => {
            //     this.name = response.data.name;
            //     console.log(this.name)
            //   });
            car.availability.forEach((element) => {
              let temp = Object.assign({}, car );
              let temp1 = Object.assign(temp, element);
              delete temp1["availability"];
              carsAvailable.push(temp1);
            });
          });
          this.carsAvailable = carsAvailable;
          this.carsAvailable = this.carsAvailable.slice(
            this.stateShowCar,
            this.stateShowCar + 30
          );
          console.log(this.carsAvailable);
        });
    });
  }
  getAmountCarAvailable(cars: any) {
    let sum = 0;
    cars.forEach((car) => {
      sum += car.availability.length;
    });
    console.log("allcar : " + sum);
    return sum;
  }
  togglePage(number: Number) {
    this.paginationCurrent += number;
    this.stateShowCar = this.paginationCurrent * 30;
    let allPag = this.elementref.nativeElement.querySelectorAll(
      ".pagination-link"
    );
    for (let i = 0; i < allPag.length; i++) {
      if (i != this.paginationCurrent) {
        allPag[i].className = "pagination-link";
      } else {
        allPag[i].className = "pagination-link is-current";
      }
    }
    this.getSearchCar();
  }
  paginationActive(pagination_num: number) {
    this.stateShowCar = pagination_num * 30;
    this.paginationCurrent = pagination_num + 1;
    console.log(this.stateShowCar);
    let allPag = this.elementref.nativeElement.querySelectorAll(
      ".pagination-link"
    );
    for (let i = 0; i < allPag.length; i++) {
      if (i != pagination_num) {
        allPag[i].className = "pagination-link";
      } else {
        allPag[i].className = "pagination-link is-current";
      }
    }
    this.getSearchCar();
  }
  closeAllDropdown(filter: String) {
    let allDropdown = this.elementref.nativeElement.querySelectorAll(
      ".dropdown"
    );
    for (let i = 0; i < allDropdown.length; i++) {
      if (allDropdown[i].id != filter) allDropdown[i].className = "dropdown";
    }
    this.getSearchCar();
  }

  toggleDropdown(filter: String) {
    this.closeAllDropdown(filter);
    filter = "#" + filter;
    this.elementref.nativeElement
      .querySelector(filter)
      .classList.toggle("is-active");
  }

  sortbyAvgRatingInc() {
    this.sortDropDown = "Rating";
    this.valueSort = "avgRating DESC";
    this.getSearchCar();
    this.toggleDropdown("sort");
  }

  sortbycapacityInc() {
    this.sortDropDown = "Capacity";
    this.valueSort = "capacity DESC";
    this.getSearchCar();
    this.toggleDropdown("sort");
  }

  orderbyDESC() {
    this.orderby = "Max -> Min";
    if (this.sortDropDown == "Capacity") {
      this.valueSort = "capacity DESC";
    } else if (this.sortDropDown == "Rating") {
      this.valueSort = "avgRating DESC";
    }
    this.getSearchCar();
    this.toggleDropdown("order");
  }
  orderbyASC() {
    this.orderby = "Min -> Max";
    if (this.sortDropDown == "Capacity") {
      this.valueSort = "capacity ASC";
    } else if (this.sortDropDown == "Rating") {
      this.valueSort = "avgRating ASC";
    }
    this.getSearchCar();
    this.toggleDropdown("order");
  }
  searchCapacity(capacity: number) {
    this.valueCapacity = capacity;
    this.toggleDropdown("capacity");
  }
  searchCarmodel(model: String) {
    this.valueCarmodel = model;
    this.toggleDropdown("carmodel");
  }
  searchCartype(type: String) {
    this.valueCartype = type;
    this.toggleDropdown("cartype");
  }

  setCurrentLocation() {
    if ("geolocation" in navigator) {
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
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }
  // Add Deal Button
  openMap() {
    document.getElementById("map").className =
      "modal modal-fx-fadeInScale is-active";
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"],
        }
      );
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
    this.area =
      "[[" +
      String(this.leftx) +
      "," +
      String(this.lefty) +
      "]," +
      "[" +
      String(this.rightx) +
      "," +
      String(this.righty) +
      "]]";
  }
  clearSearch() {
    this.valueCartype = null;
    this.valueCapacity = null;
    this.valueCarmodel = null;
    this.valueSort = null;
  }
}
