import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {
  public list_banner_top:any[]=[];
  public list_banner_bottom:any[]=[];
  public currentSlide: number = 0;
  constructor(public http:HttpClient,private renderer: Renderer2) {
    
   }
   currentYear: number = new Date().getFullYear();
   ngOnInit(): void {
   }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   const slickElement = this.renderer.selectRootElement('.slick1', true);
    //   if (slickElement) {
    //     $(slickElement).slick({
    //       infinite: true,
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       autoplay: true,
    //       autoplaySpeed: 2000,
    //       arrows: true,
    //       dots: true
    //     });
    //   }
    // }, 0);
  }
}
