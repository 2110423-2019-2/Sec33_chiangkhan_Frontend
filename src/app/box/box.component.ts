import { Component, OnInit, ElementRef } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { REVIEWS } from '../review/mock-review';
import axios from 'axios';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  cars: any[] ;  
  reviews = REVIEWS ;
  // mock_car = [{ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/cc00ff/ffffff'},
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/cc00aa/ffffff'},
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/00ff00/ffffff'},
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/aa00cc/ffffff'},
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/ff0000/ffffff'},
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/ccff00/ffffff'}, 
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/cc0000/ffffff'},
  //             {ownerId : 8  ,licenseplate : 'F5-10-69-79-F7-8F' , capacity : 2 ,carType : "personal", carModel : 'GMC' , car_description: "Hello world" , avgRating : 2 , photoOfCarDocument :'http://dummyimage.com/250x250.png/cc0000/ffffff'}]
  review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  constructor(private elem : ElementRef) { 
    
  }

  ngOnInit(){
    document.getElementsByClassName("unactive")[3].className = "active"
    axios.get('http://localhost:8080/api/car/')
    .then((response) => {
      console.log(response);
      this.cars = response.data
      
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      
    });
    console.log(this.cars)
  }

  popupadd() {
    document.getElementById('popupadd').className = "modal modal-fx-fadeInScale is-active";
  }
  del_popupadd() {
    document.getElementById('popupadd').className = "modal modal-fx-fadeInScale";
    console.log("work")
  }
  untab(tab:String){
    var t = this.elem.nativeElement.querySelectorAll('li')
    for(let i = 0 ; i < t.length ; i++){
      if(t[i].id != tab){
        t[i].className = ""
      }
    }
  }
  tab(tab:String){
    this.untab(tab);
    tab = '#' + tab ;
    this.elem.nativeElement.querySelector(tab).className = 'is-active'
  }

}
