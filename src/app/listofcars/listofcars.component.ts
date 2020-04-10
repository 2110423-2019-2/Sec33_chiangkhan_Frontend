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

  // @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
  // @ViewChild(‘search’, {static: false}) public searchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  // geoCoder:any;


  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  addDealForm = new FormGroup({
    start_dates: new FormControl(),
    end_dates: new FormControl(),
    location: new FormGroup({
      pickup_location: new FormControl(),
      return_location: new FormControl()
    })
  })


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ,
    private elem : ElementRef
  ) { }
  ngOnInit() {
    document.getElementsByClassName("unactive")[2].className = "active"
  }
 

  cars = CARS;
  reservations = RESERVATIONS;

  
  // Add Deal Button
  functionTwo() {
    document.getElementById("form").className = "modal modal-fx-fadeInScale is-active";
    // this.renderMap();
    console.log("work two");
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


  submit_add_deal() {
    axios.post('http://localhost:8080/api/car/', this.addDealForm.value)
    .then(function (response) {
      console.log(response);
      this.closeform();
    })
    .catch(function (error) {
      console.log(error);
      alert("Fail")
    });
}

  remove_deal_popup() {
    document.getElementById('remove_deal_popup').className = "modal modal-fx-fadeInScale is-active";
    console.log("hey you")
  }

  close_remove_deal_popup() {
    document.getElementById('remove_deal_popup').className = "modal modal-fx-fadeInScale";
  }

  activate_remove_deal_popup() {
    this.cars.splice(0, 1);
    this.close_remove_deal_popup();
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
}