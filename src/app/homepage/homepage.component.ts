import { Component, OnInit , ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { Router, ParamMap } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common"
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchForm = new FormGroup({
    cartype : new FormControl(),
    capacity : new FormControl(),
    model : new FormControl(),
    location : new FormControl(),
    startDate : new FormControl(),
    endDate : new FormControl()
  })
  cars: any[] ; 
  dateForm = new FormGroup({
    startDate : new FormControl()
  })

  state:number = 0 ;
  constructor(private elementref:ElementRef ,private router : Router  ,private route: ActivatedRoute ,public _location : Location) {}

  getSearchCar(){ 
    this.router.navigate(['/homepage', { 
      carType :this.searchForm.value.cartype,
      capacity: this.searchForm.value.capacity,
      location : this.searchForm.value.location ,
      carModel : this.searchForm.value.model
      }]);
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap) => {
      // console.log(params.keys.length)
      if(params.keys.length == 0){
        axios.get('http://localhost:8080/api/car/')
        .then((response) => {
          console.log(response);
          this.cars = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      }else{
        let paramm = { capacity : null , carType : null , carModel : null , location : null }
        for(let p in params.keys){
          // console.log(p)
          // console.log(params.keys[p])
          // console.log(params.get(params.keys[p]))
          if(params.get(params.keys[p]) != ""){
            paramm[params.keys[p]] = params.get(params.keys[p])
          }
        }
        console.log(paramm)
        axios.get('http://localhost:8080/api/car/', { params: paramm
        })
        .then((response) => {
          console.log(response);
          this.cars = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      }
    })
  }

  onChangeDate(){
    // console.log(this.dateForm.value)
  }
  toggleFilter(){
    // console.log(this.elementref.nativeElement.querySelectorAll('.input'))
    if(this.state == 0){
      // console.log("yes")
      this.elementref.nativeElement.querySelector('.input.input-0').className = "input input-1"
      this.elementref.nativeElement.querySelector('.input.input-0').className = "input input-1"
      this.elementref.nativeElement.querySelector('.input.input-0').className = "input input-1"
      this.elementref.nativeElement.querySelector('.input.input-0').className = "input input-1"
      this.elementref.nativeElement.querySelector('.input.input-0').className = "input input-1"
      this.elementref.nativeElement.querySelector('.input.input-0').className = "input input-1"
      this.elementref.nativeElement.querySelector('.fil').className = "fill"
      this.elementref.nativeElement.querySelector('.fil').className = "fill"
      this.elementref.nativeElement.querySelector('.fil').className = "fill"
      this.elementref.nativeElement.querySelector('.fil').className = "fill"
      this.elementref.nativeElement.querySelector('.fil').className = "fill"
      this.elementref.nativeElement.querySelector('.fil').className = "fill"
      this.state = 1
    }else{
      // console.log("no")
      this.elementref.nativeElement.querySelector('.input.input-1').className = "input input-0"
      this.elementref.nativeElement.querySelector('.input.input-1').className = "input input-0"
      this.elementref.nativeElement.querySelector('.input.input-1').className = "input input-0"
      this.elementref.nativeElement.querySelector('.input.input-1').className = "input input-0"
      this.elementref.nativeElement.querySelector('.input.input-1').className = "input input-0"
      this.elementref.nativeElement.querySelector('.input.input-1').className = "input input-0"
      this.elementref.nativeElement.querySelector('.fill').className = "fil"
      this.elementref.nativeElement.querySelector('.fill').className = "fil"
      this.elementref.nativeElement.querySelector('.fill').className = "fil"
      this.elementref.nativeElement.querySelector('.fill').className = "fil"
      this.elementref.nativeElement.querySelector('.fill').className = "fil"
      this.elementref.nativeElement.querySelector('.fill').className = "fil"
      this.state = 0
    }
    
  }

}  
  
