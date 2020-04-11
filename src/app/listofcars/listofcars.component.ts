import { FormGroup, FormControl } from '@angular/forms';
import { RESERVATIONS } from './../reservations/mock-reservations';
import { Component, OnInit } from '@angular/core';
import { CARS } from './mock-cars';
// import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
// import { google } from “google-maps”; 
import axios from 'axios';


@Component({
  selector: 'app-listofcars',
  templateUrl: './listofcars.component.html',
  styleUrls: ['./listofcars.component.css']
})

export class ListofcarsComponent implements OnInit {

  reservations = RESERVATIONS;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  myCars : any
  myCar_id : number;
  private geoCoder;
  pickuplocation : String;

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  addDealForm = new FormGroup({
    start_dates: new FormControl(),
    end_dates: new FormControl(),
    price : new FormControl(),
  })

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ,
    private elem : ElementRef
  ) { }
  ngOnInit() {
    document.getElementsByClassName("unactive")[2].className = "active"
    axios
    .get("http://localhost:8080/api/car/")
    .then(response => {
      console.log(response);
      this.myCars = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  // Add Deal Button
  functionTwo() {
    document.getElementById("form").className = "modal modal-fx-fadeInScale is-active";
    // this.renderMap();
    //load Places Autocomplete
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

  closeform(form:String) {
    form = "#" + form ;
    this.elem.nativeElement.querySelector(form).className = "modal modal-fx-fadeInScale"
  }
  openform(form:String) {
    form = "#" + form ;
    this.elem.nativeElement.querySelector(form).className = "modal modal-fx-fadeInScale is-active"
  }
  fetchcar(){
    axios.get("http://localhost:8080/api/car/")
    .then(response => {
      console.log(response);
      this.myCars = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  submit_add_deal() {
    this.pickuplocation = "(" + this.latitude + "," + this.longitude + ")"
    this.addDealForm.value["pickuplocation"] = this.pickuplocation
    this.addDealForm.value["carId"] = this.myCar_id
    console.log(this.addDealForm.value)
    axios.post('http://localhost:8080/api/carAvailable/', this.addDealForm.value)
    .then(function (response) {
      console.log(response);
      this.closeform();
    })
    .catch(function (error) {
      console.log(error);
      alert("Fail")
    });
}
  removeDeal(){

  }

  // Get Current Location Coordinates
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
  selectCar(mycar:any){
    this.closeform('add_car_popup')
    this.myCar_id = mycar.carId ;
  }
}