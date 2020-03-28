import { FormGroup, FormControl } from '@angular/forms';
import { RESERVATIONS } from './../reservations/mock-reservations';
import { Component, OnInit } from '@angular/core';
import { CARS } from './mock-cars';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-listofcars',
  templateUrl: './listofcars.component.html',
  styleUrls: ['./listofcars.component.css']
})

  export class ListofcarsComponent implements OnInit {
    
    // @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
    
    addDealForm = new FormGroup({
      start_dates: new FormControl(),
      pickup_location: new FormControl(),
      end_dates: new FormControl(),
      return_location: new FormControl()
    })

    constructor() { }

    ngOnInit() {
    }

    cars = CARS;
    reservations = RESERVATIONS;
    
    functionOne() {

        document.getElementById("popup").className = "modal modal-fx-fadeInScale is-active"; 
        console.log("work one");
    }
    closepopup(){
    
        document.getElementById("popup").className = "modal modal-fx-fadeInScale";
    }

    functionTwo() {

      document.getElementById("form").className = "modal modal-fx-fadeInScale is-active"; 
      // this.renderMap();
      console.log("work two");
  }

  closeform(){
    
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
    this.cars.unshift({ id: 50, image: "https://assets.bugatti.com/fileadmin/_processed_/sei/p54/se-image-e6678a2b1c56c59044f81a3742c784d4.jpg", 
    Availability: 'Available', Type: 'Sport', Model: 'BMW i8', LicensePlate: 'พซ 1150', Seats: '5', Doors: '4',
    StartDate: this.addDealForm.value["start_dates"], EndDate: this.addDealForm.value["end_dates"],
     PickupLocation: this.addDealForm.value["pickup_location"], ReturnLocation: this.addDealForm.value["return_location"], Price: '4,200' })
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

  }