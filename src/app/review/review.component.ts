import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit,OnChanges {
 
  @Input()  
  review : any ;
 
  
  constructor() {
    
  }
  ngOnChanges(){
   
  }

  ngOnInit() {
   
  }
  
  
  
}
