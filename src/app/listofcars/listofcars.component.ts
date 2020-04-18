import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ViewChild, ElementRef, NgZone } from "@angular/core";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { AuthService} from '../auth.service'
import axios from "axios";


@Component({
  selector: "app-listofcars",
  templateUrl: "./listofcars.component.html",
  styleUrls: ["./listofcars.component.css"],
})
export class ListofcarsComponent implements OnInit {
  
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  myCars: any;
  myCar_id: number;
  myDeal: any;
  private geoCoder;
  pickuplocation: String;

  @ViewChild("search", { static: true })
  public searchElementRef: ElementRef;

  addDealForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl(),
    agreement: new FormControl(),
  });

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private elem: ElementRef,
    private auth:AuthService
  ) {}
  ngOnInit() {
    this.auth.checkStatus()
    document.getElementsByClassName("unactive")[2].className = "active";
    axios
      .get("http://localhost:8080/api/car/mycar")
      .then((response) => {
        console.log(response);
        this.myCars = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8080/api/car/myDeal")
      .then((response) => {
        console.log(response);
        this.myDeal = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        let carsDeal = [];
        this.myDeal.forEach((car) => {
          car.availability.forEach((element) => {
            let temp = Object.assign({}, car);
            let temp1 = Object.assign(temp, element);
            delete temp1["availability"];
            carsDeal.push(temp1);
          });
        });
        this.myDeal = carsDeal
        console.log(this.myDeal)
      });
  }

  // Add Deal Button
  functionTwo() {
    document.getElementById("form").className =
      "modal modal-fx-fadeInScale is-active";
    // this.renderMap();
    //load Places Autocomplete
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

  closeform(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale";
  }
  openform(form: String) {
    form = "#" + form;
    this.elem.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale is-active";
  }
  fetchcar() {
    axios
      .get("http://localhost:8080/api/car")
      .then((response) => {
        console.log(response);
        this.myCars = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submit_add_deal() {
    this.pickuplocation = "(" + this.latitude + "," + this.longitude + ")";
    this.addDealForm.value["pickupLocation"] = this.pickuplocation;
    this.addDealForm.value["carId"] = this.myCar_id;
    console.log(this.addDealForm.value);
    if (this.verify_submit()) {
      console.log("can submit");
      axios
        .post("http://localhost:8080/api/carAvailable/", this.addDealForm.value)
        .then((response)=> {
          console.log(response);
          this.closeform('form')
        })
        .catch(function (error) {
          console.log(error);
          alert("Fail");
        });
    } else {
      console.log("can't submit");
      alert("Missing Value!");
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
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
  selectCar(mycar: any) {
    this.closeform("add_car_popup");
    this.myCar_id = mycar.carId;
  }

  verify_submit() {
    console.log("executed verify submit");
    if (this.addDealForm.value["startDate"] == null) {
      console.log("datepicker start is null!");
      return false;
    }
    if (this.addDealForm.value["endDate"] == null) {
      console.log("datepicker end is null!");
      return false;
    }
    if (this.addDealForm.value["price"] == null) {
      console.log("price is null!");
      return false;
    }
    if (this.addDealForm.value["carId"] == null) {
      console.log("car is null!");
      return false;
    }
    return true;
  }
}
