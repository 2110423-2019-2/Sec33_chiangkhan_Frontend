import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
   
  @Input() car ;
  popup(){
    // var element = document.getElementById("popup");
    // element.classList.toggle("is-active");
    document.getElementById('popup').className = "modal is-active" ;

  }
  del_popup(){
    document.getElementById('popup').className = "modal" ;
    console.log("work")
  }

  constructor() { }

  ngOnInit() {
  }

}
