import { Component, OnInit, Input, ElementRef } from '@angular/core';
@Component({
  selector: 'app-homepage-car',
  templateUrl: './homepage-car.component.html',
  styleUrls: ['./homepage-car.component.css']
})
export class HomepageCarComponent implements OnInit {
  @Input() car;
  constructor(private elementref:ElementRef) { }

  ngOnInit() {
    console.log(this.car)
  }
  
  ngAfterViewInit(){
    setTimeout(() => {
      this.elementref.nativeElement.querySelector(".card-before").className = "card";
    }, 500);
    let arr = this.elementref.nativeElement.querySelectorAll(".fa")
    for(let j = 0 ; j < this.car.avgRating ; j++){
      arr[j].className = "fa fa-star checked"   
      arr[j+5].className = "fa fa-star checked"      
    }

  }
  
  openPopup(form:String){
    form = "#" + form
    this.elementref.nativeElement.querySelector(form).className = "modal modal-fx-fadeInScale is-active";
  }


}
