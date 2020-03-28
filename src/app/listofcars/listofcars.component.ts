import { FormGroup, FormControl } from '@angular/forms';
import { RESERVATIONS } from './../reservations/mock-reservations';
import { Component, OnInit } from '@angular/core';
import { CARS } from './mock-cars';
// import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
// import { google } from “google-maps”; 


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
    pickup_location: new FormControl(),
    end_dates: new FormControl(),
    return_location: new FormControl()
  })

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  ngOnInit() {
    document.getElementsByClassName("unactive")[2].className = "active"
  }
 

  cars = CARS;
  reservations = RESERVATIONS;

  functionOne() {

    document.getElementById("popup").className = "modal modal-fx-fadeInScale is-active";
    console.log("work one");
  }
  closepopup() {

    document.getElementById("popup").className = "modal modal-fx-fadeInScale";
  }

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

  closeform() {

    document.getElementById("form").className = "modal modal-fx-fadeInScale";
  }

  startDateChange() {
    // document.getElementById("start_dates")
  }

  endDateChange() {
    // document.getElementById("start_dates")
  }

  pickupLocationChange() {

  }

  returnLocationChange() {

  }

  submit_add_deal() {
    // console.log(this.addDealForm.value["start_dates"])
    this.cars.unshift({
      id: 50, image: "https://assets.bugatti.com/fileadmin/_processed_/sei/p54/se-image-e6678a2b1c56c59044f81a3742c784d4.jpg",
      Availability: 'Available', Type: 'Sport', Model: 'BMW i8', LicensePlate: 'พซ 1150', Seats: '5', Doors: '4',
      StartDate: this.addDealForm.value["start_dates"], EndDate: this.addDealForm.value["end_dates"],
      PickupLocation: "latitude: " + this.latitude + ", " + this.longitude, ReturnLocation: "latitude: " + this.latitude + ", " + this.longitude, Price: '4,200'
    })
    this.closeform();
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

  // loadMap = () => {
  //   var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
  //     center: {lat: 24.5373, lng: 81.3042},
  //     zoom: 8
  //   });

  //   var marker = new window['google'].maps.Marker({
  //     position: {lat: 24.5373, lng: 81.3042},
  //     map: map,
  //     title: 'Hello World!',
  //     draggable: true,
  //     animation: window['google'].maps.Animation.DROP,
  //   });

  //   var contentString = '<div id="content">'+
  //   '<div id="siteNotice">'+
  //   '</div>'+
  //   '<h3 id="thirdHeading" class="thirdHeading">W3path.com</h3>'+
  //   '<div id="bodyContent">'+
  //   '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'+
  //   '</div>'+
  //   '</div>';

  //   var infowindow = new window['google'].maps.InfoWindow({
  //     content: contentString
  //   });

  //     marker.addListener('click', function() {
  //       infowindow.open(map, marker);
  //     });

  // }

  // renderMap() {
  //   console.log("please work")
  //   window['initMap'] = () => {
  //     this.loadMap();     
  //   }
  //   if(!window.document.getElementById('google-map-script')) {
  //     var s = window.document.createElement("script");
  //     s.id = "google-map-script";
  //     s.type = "text/javascript";
  //     s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-0c0j8f41aRTUyGLZdFhBEF-7TPwnZOQ&amp;callback=initMap";

  //     window.document.body.appendChild(s);
  //   } else {
  //     this.loadMap();
  //   }

  // }

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