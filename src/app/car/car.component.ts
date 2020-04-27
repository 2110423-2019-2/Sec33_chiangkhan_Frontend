import { Component, OnInit, Input, ElementRef } from "@angular/core";
import axios from "axios";
import { environment } from '../../environments/environment.prod'
@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"],
})
export class CarComponent implements OnInit {
  @Input() car;
  constructor(private elem: ElementRef) {}
  hasReview:boolean = true
  reviews: any;
  carStatus: String;
  ngOnInit() {
    this.setStatus();
    axios
      .get("http://"+environment.host+":8080/api/car/" + this.car.carId + "/carReview")
      .then((response) => {
        console.log(response);
        this.reviews = response.data[0].review;
      })
      .catch((error) => {
        console.log(error);
      }).then(()=>{
        this.hasReview = this.reviews.length == 0 ? false : true
      });
  }
  setStatus() {
    if (this.car.isInUse) {
      this.carStatus = "Reserved";
    } else {
      this.carStatus = "Available";
    }
  }
  ngAfterViewInit(): void {
    let arr = this.elem.nativeElement.querySelectorAll(".fa")
    for(let j = 0 ; j < this.car.avgRating ; j++){
      arr[j].className = "fa fa-star checked"    
    }
    setTimeout(() => {
      this.elem.nativeElement.querySelector(".card-before").className = "card";
    }, 500);
  }
  showPopup(popup: String) {
    popup = "#" + popup;
    this.elem.nativeElement.querySelector(popup).className =
      "modal modal-fx-fadeInScale is-active";
  }
  deletePopup(popup: String) {
    popup = "#" + popup;
    this.elem.nativeElement.querySelector(popup).className =
      "modal modal-fx-fadeInScale";
  }
  removeCar() {
    axios
      .delete("http://"+environment.host+":8080/api/car/"+this.car.carId+"/deleteCar")
      .then((response) => {
        console.log(response);
        this.deletePopup('popupremove')
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
