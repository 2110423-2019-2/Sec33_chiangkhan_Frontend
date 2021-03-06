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
import { AuthService } from "../auth.service";
import axios from "axios";
import { environment } from 'src/environments/environment';
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
  duration: number;
  totalPrice:number
  constructor(
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private elementref: ElementRef,
    private route: ActivatedRoute,
    public _location: Location,
    private auth: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.carReserve = navigation.extras.state
      ? navigation.extras.state.data
      : 0;
  }

  ngOnInit() {
    this.auth.checkStatus();
  }
  ngDoCheck(): void {
    if(this.reserveForm.value.returnDate != null && this.reserveForm.value.pickupDate != null){
      this.calculateDuration()
    }
    
  }

  openPopup() {
    document.getElementsByClassName("modal modal-fx-fadeInScale")[0].className =
      "modal modal-fx-fadeInScale is-active";
  }
  checkDate() {
    let returnDate = new Date(this.reserveForm.value.returnDate);
    let pickupDate = new Date(this.reserveForm.value.pickupDate);
    this.duration =
      (returnDate.getTime() - pickupDate.getTime());
    return this.duration >= 0 ? true : false;
  }
  genarateAgreement() {
    Object.assign(
      this.reserveForm.value,
      { carAvailableId: this.carReserve.carAvailableId },
      { status: "PENDING" },
      { returnLocation: this.returnlocation }
    );
    if (this.isConfirm) {
      if(this.checkDate()){
         axios
        .post(
          "http://"+environment.host+":8080/api/car-reservation",
          this.reserveForm.value
        )
        .then((response) => {
          console.log(response);
          document.getElementsByClassName(
            "modal modal-fx-fadeInScale"
          )[1].className = "modal modal-fx-fadeInScale is-active";
        })
        .catch((error) => {
          console.log(error.response);
          if(error.response.data.message.massage == "notEnoughtMoney"){
            alert("Your cash not enough to reserve this car")
          }else{
            alert(error.response.data.message)
          }
        })
        .finally(() => {});
      }else{
        alert("picupDate , returnDate invalid")
      }
     
    } else{
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
    this.returnlocation = "(" + this.latitude + "," + this.longitude + ")";
    this.closeform("return");
  }

  closeform(form: String) {
    form = "#" + form;
    this.elementref.nativeElement.querySelector(form).className =
      "modal modal-fx-fadeInScale";
  }
  calculateDuration() {
    let returnDate = new Date(this.reserveForm.value.returnDate);
    let pickupDate = new Date(this.reserveForm.value.pickupDate);
    this.duration =
      (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24)+1;
    let price:number = this.carReserve.price
    this.totalPrice = this.duration * price
  }
}
