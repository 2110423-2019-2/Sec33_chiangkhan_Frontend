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
      cartype :this.searchForm.value.cartype,
      capacity: this.searchForm.value.capacity,
      location : this.searchForm.value.location ,
      carmodel : this.searchForm.value.model
      }]);
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap) => {
      console.log(params.keys.length)
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
        let capacity = parseInt(params.get('capacity'))
        let cartype = String(params.get('cartype'))
        let location = String(params.get('location'))
        let carmodel = String(params.get('carmodel'))
        // let startDate = String(params.get('startDate'))
        // let endDate = String(params.get('endDate'))
        axios.get('http://localhost:8080/api/car/', { params: { 
          cartype : cartype , 
          capacity : capacity ,
          location : location ,
          carModel : carmodel
          }
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
  