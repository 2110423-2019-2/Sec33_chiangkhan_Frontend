import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  carArray = ['https://img4.icarcdn.com/5580256/gallery_used-car-one2car-toyota-yaris-e-hatchback-thailand_5580256_XRh0lun10ZIkBfdXh5CsBX.JPG?smia=xTM',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQD7lGm4S1qFo16yBq4F43Qm10XedkgfSlA_pNBqBr2cipdrQm6',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-bmw-i8-coupe-1551888099.jpg',
    'https://auto.mthai.com/app/uploads/2019/02/123.jpg',
    'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/body-image/public/honda-nsx_3.jpg']

  carsArray = [{
    pic: 'https://img4.icarcdn.com/5580256/gallery_used-car-one2car-toyota-yaris-e-hatchback-thailand_5580256_XRh0lun10ZIkBfdXh5CsBX.JPG?smia=xTM',
    status: 'Available'
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
