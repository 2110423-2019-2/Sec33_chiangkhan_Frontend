import { Component, OnInit } from '@angular/core';
import { IImage } from '../IImage';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  imageUrls: (string | IImage)[] = [
    { url: '../assets/images/slide1.jpg', caption: 'The first slide', href: '#config' },
    { url: '../assets/images/slide2.jpg', clickAction: () => alert('custom click function') },
    { url: '../assets/images/slide3.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
    { url: '../assets/images/slide4.jpg'}
  ];

  height: string = '600px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  enableZoom: boolean = false;
  enablePan: boolean = false;
  noLoop: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
