import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  dateForm = new FormGroup({
    startDate : new FormControl()
  })
  constructor() {
 
  }

  ngOnInit() {
    document.getElementsByClassName("unactive")[0].className = "active"
  }
 
  onChangeDate(){
    console.log(this.dateForm.value)
  }
}
