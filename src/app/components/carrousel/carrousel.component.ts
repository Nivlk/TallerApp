import { Component } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {
  activeSlideIndex = 0;

  slides=[
    {'url':"../../../assets/img/noimage.jpg"},
    {'url':"../../../assets/img/jimy.png"}
  ]
  
}
