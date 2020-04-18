import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService} from '../auth.service'
import axios from 'axios';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  cars: any[] ;  
           
  review_popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  popup(){
    document.getElementById('review_popup').className = "modal modal-fx-fadeInScale is-active" ;
  }
  constructor(private elem : ElementRef , private router: Router,private auth:AuthService) { 
    
  }

  ngOnInit(){
    this.auth.checkStatus()
    document.getElementsByClassName("unactive")[3].className = "active"
    axios.get('http://localhost:8080/api/car/mycar')
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
