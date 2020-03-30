import { Component, OnInit , ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
   
  cars: any[] ; 
  dateForm = new FormGroup({
    startDate : new FormControl()
  })
  state:number = 0 ;
  constructor(private elementref:ElementRef) {
    
  }

  ngOnInit() {
    axios.get('http://localhost:8080/api/car/')
    .then((response) => {
      console.log(response);
      this.cars = response.data
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
    // always executed
    });
    document.getElementsByClassName("unactive")[0].className = "active"
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
  getSearchCar(){
    
  }
}
