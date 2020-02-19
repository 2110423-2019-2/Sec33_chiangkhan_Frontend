import { Component, OnInit } from '@angular/core';
import { RESERVATIONS } from './mock-reservations';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  reservations = RESERVATIONS;
}
