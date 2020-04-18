import { Component, OnInit, ViewChild, Input, OnChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit,OnChanges {
 
  @Input()  
  review : any ;
 
  
  constructor(private elementref:ElementRef) {
    
  }
  ngOnChanges(){
   
  }

  ngOnInit() {

  }
  ngAfterViewInit(){
    let arr = this.elementref.nativeElement.querySelectorAll(".fa")
    for(let j = 0 ; j < this.review.rating ; j++){
      arr[j].className = "fa fa-star checked"    
    }

  }
  
   
  
}
