import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit,AfterViewInit {
  public list_banner_top:any[]=[];
  public list_banner_bottom:any[]=[];
  public currentSlide: number = 0;
  constructor(public http:HttpClient) { 
    this.http.get(environment.URL_API+"Banners/get?type=1",{}).subscribe(
      (res:any)=>{
        this.list_banner_top=res.data;
        console.log("banner",this.list_banner_top);
        this.startCountdown();
    });
    
  }
  countdownDisplay: string = '';
  countdownInterval: any;
  ngOnInit(): void {
  }
  getImage(path: string) {
    return `https://localhost:44302/Images/list-image-banner/${path}`;
}

currentIndex = 0; // Slide hiện tại

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.list_banner_top.length) % this.list_banner_top.length;
    this.updateSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.list_banner_top.length;
    this.updateSlide();
  }

  updateSlide() {
    const slider = document.querySelector('.slider') as HTMLElement;
    const slideWidth = slider.clientWidth; // Chiều rộng của một slide
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }

  ngAfterViewInit() {
    // Khởi động auto-slide
    setInterval(() => this.nextSlide(), 5000); // Chuyển slide sau mỗi 3 giây
  }
  countdownIntervals: any[] = [];
  ngOnDestroy() {
    // Dừng các interval khi component bị hủy
    this.countdownIntervals.forEach(interval => clearInterval(interval));
  }

  startCountdown() {
    this.list_banner_top.forEach((banner, index) => {
      const targetTime = new Date(banner.endDate).getTime();  // Lấy thời gian kết thúc từ banner
      const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
          clearInterval(countdownInterval);
          this.list_banner_top[index].countdownDisplay = "EXPIRED";
          return;
        }

        // Tính toán số ngày, giờ, phút và giây
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Cập nhật countdown cho banner
        this.list_banner_top[index].countdownDisplay = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }, 1000);

      // Lưu các interval để dừng chúng khi component bị hủy
      this.countdownIntervals.push(countdownInterval);
    });
  }

}
