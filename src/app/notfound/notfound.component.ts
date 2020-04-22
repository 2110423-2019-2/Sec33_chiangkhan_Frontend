import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  @Input() message;
  constructor() { }

  ngOnInit() {
  }

}
