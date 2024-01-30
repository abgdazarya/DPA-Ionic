import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { AppCommonIconComponentModule } from '@components/common';
import { SwiperOptions } from 'swiper';
import { AppCommonButtonComponentModule } from '../button/module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    SwiperModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
})
export class CustomPopupComponent {
  @ViewChild('promoSlides') public promoSlides!: SwiperComponent;
  @Input() type: 'news' | 'promo' | 'claim' | 'birthday' | 'custom' = 'promo';
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() description: string = '';
  @Input() picture: string = '';

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  public handleToBio(): void {
    this.router.navigateByUrl('/profile/bio');
  }

  public getPromoSlidesOptions(): any {
    let options: SwiperOptions = {
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
      slidesPerView: 1.6,
      centeredSlides: true,
      spaceBetween: 0,
      initialSlide: 2.4,
      autoplay: true,
      loop: true,
    };

    return options;
  }

  handleClose() {
    this.modalCtrl.dismiss({ isDismiss: true });
  }

  gotoEclaim = () => {
    this.modalCtrl.dismiss({ isDismiss: true, navigated: true });
    this.router.navigate(['/e-klaim']);
  };
  gotoNews = () => {
    this.modalCtrl.dismiss({ isDismiss: true, navigated: true });
    this.router.navigate(['/news/index']);
  };
  gotoSettings = () => {
    this.modalCtrl.dismiss({ isDismiss: true, navigated: true });
    this.router.navigate(['/profile/bio'], {
      queryParams: { bioPopupShow: true },
    });
  };
}
