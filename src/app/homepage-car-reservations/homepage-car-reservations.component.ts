import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild,
} from "@angular/core";
import { Router, NavigationStart, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-homepage-car-reservations",
  templateUrl: "./homepage-car-reservations.component.html",
  styleUrls: ["./homepage-car-reservations.component.css"],
})
export class HomepageCarReservationsComponent implements OnInit {
  isConfirm: boolean = false;
  reserveForm = new FormGroup({
    pickupDate: new FormControl(),
    returnDate: new FormControl(),
  });
  carReserve: any;
  pickuplocation: any;
  returnlocation: any;
  @ViewChild("search", { static: true })
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
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private elementref: ElementRef,
    private route: ActivatedRoute,
    public _location: Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.carReserve = navigation.extras.state
      ? navigation.extras.state.data
      : 0;
  }

  ngOnInit() {
    console.log(this.carReserve);
  }

  openPopup() {
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className =
      "modal modal-fx-fadeInScale is-active";
  }

  genarateAgreement() {
    Object.assign(
      this.reserveForm.value,
      { carAvailableId: this.carReserve.carAvailableId },
      { status: "RESERVED" },
      { returnLocation: this.returnlocation }
    );
    console.log(this.reserveForm.value);
    if (this.isConfirm) {
      document.getElementsByClassName(
        "modal modal-fx-fadeInScale"
      )[1].className = "modal modal-fx-fadeInScale is-active";
    } else {
      alert("You must confirm agreement");
    }
  }

  confirmAgreement() {
    if (!this.isConfirm) {
      this.isConfirm = true;
    } else {
      this.isConfirm = false;
    }
  }
  openMap(form: String) {
    form = "#" + form;
    this.elementref.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale is-active";
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.elementref.nativeElement,
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
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
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
  addreturnLocation() {
    console.log("ee");
    this.returnlocation = "(" + this.latitude + "," + this.longitude + ")";
    this.closeform("return");
  }
  addpickupLocation() {
    console.log("aa");
    this.pickuplocation = "(" + this.latitude + "," + this.longitude + ")";
    this.closeform("pickup");
  }
  closeform(form: String) {
    form = "#" + form;
    this.elementref.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale";
  }
}
