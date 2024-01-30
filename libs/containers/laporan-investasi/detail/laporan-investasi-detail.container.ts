import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionModel } from '@controllers/menu-promotion';
import { Store } from '@ngrx/store';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
  MenuPromotionState,
} from '@stores/menu-promotion';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';
import { SwiperComponent } from 'swiper/angular';
import {
  PromoBiodataFormModal,
  PromoTermModal,
  PromoSucceedModal,
} from '@components/promo';
import { DetailProfile } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { InteractionState } from '@shared';

@Component({
  selector: 'app-promotion-detail-container',
  templateUrl: './promotion-detail.container.html',
  styleUrls: ['./promotion-detail.container.scss'],
  providers: [
    ProfileRepository,
    MenuPromotionRepository,
    MenuPromotionInteractionRepository,
  ],
})
export class PromotionDetailContainer implements OnInit, OnDestroy {
  @ViewChild('slides') public slides!: SwiperComponent;

  public promotion$: Observable<PromotionModel | undefined | null>;
  public response$: Observable<DetailProfile | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;

  public loading$: Observable<boolean | undefined | null>;

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

  public shareButtons: any[] = [
    {
      type: 'telegram',
      imageSrc: 'logos/news-telegram.png',
    },
    {
      type: 'twitter',
      imageSrc: 'logos/news-twitter.png',
    },
    {
      type: 'facebook',
      imageSrc: 'logos/news-facebook.png',
    },
    {
      type: 'whatsapp',
      imageSrc: 'logos/news-whatsapp.png',
    },
    {
      type: 'share-link',
      imageSrc: 'logos/news-share-link.png',
    },
  ];

  constructor(
    public store: Store<MenuPromotionState>,
    public storageService: StorageService,
    public profileRepo: ProfileRepository,
    public menuRepo: MenuPromotionRepository,
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private profileInteractionRepository: ProfileInteractionRepository,
    public menuInteractionRepo: MenuPromotionInteractionRepository,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.response$ = this.profileRepo.getUserDetailData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getUserDetailInteraction$();
    this.promotion$ = this.menuRepo.getPromotionDetail$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data) return null;
        return res?.data;
      })
    );

    this.loading$ = this.menuInteractionRepo
      .getPromotionDetailInteraction$()
      .pipe(
        map((res) => {
          return res.isLoading;
        })
      );
  }

  public handleSlide(type: string): void {
    const slides = this.slides.swiperRef;

    type === 'next' ? slides.slideNext(500) : slides.slidePrev(500);
  }

  public async handleOpenShare(sharedButton: any) {
    if (sharedButton?.type === 'share-link') {
      await Clipboard.write({
        string: location.href,
      });
      alert('Berhasil menyalin link');
    }

    if (sharedButton?.type === 'telegram') {
      await Browser.open({
        url: 'https://web.telegram.org/',
        presentationStyle: 'popover',
      });
    }

    if (sharedButton?.type === 'twitter') {
      await Browser.open({
        url: 'https://twitter.com/',
        presentationStyle: 'popover',
      });
    }

    if (sharedButton?.type === 'whatsapp') {
      await Browser.open({
        url: 'https://wa.me/',
        presentationStyle: 'popover',
      });
    }

    if (sharedButton?.type === 'facebook') {
      await Browser.open({
        url: 'https://www.facebook.com/',
        presentationStyle: 'popover',
      });
    }
  }

  ngOnInit(): void {}

  errorMsg: any;
  public async handleOpenPromo(promotion: PromotionModel) {
    this.errorMsg = null;
    if (!promotion.linkPromosi) {
      this.errorMsg = 'Tautan promo tidak tersedia.';
      return;
    }
    await Browser.open({
      url: promotion.linkPromosi,
      presentationStyle: 'popover',
    });
  }

  async handleOpenPromoBiodataFormModal(promotion: any) {
    let promoImg: string = '';
    let userDetail: DetailProfile | any = {};
    promoImg = promotion.banner;
    await this.response$.subscribe((user) => {
      userDetail = user;
    });
    const modal = await this.modalCtrl.create({
      component: PromoBiodataFormModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        promoImg,
        userDetail,
        idPromosi: promotion.idPromosi,
        perusahaan: promotion.perusahaanPenyelenggara,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.handleOpenPromoTermModal(data.payload);
      }
    });
  }

  submitCoupon = (payload: any) => {
    this.handleOpenPromoSucceedModal();
  };

  async handleOpenPromoTermModal(payload: any) {
    const modal = await this.modalCtrl.create({
      component: PromoTermModal,
      cssClass: this.screenSizeService.isDesktopResolution()
        ? 'modal-web ion-background-white'
        : 'modal-web ion-background-transparent',
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.submitCoupon(payload);
        // this.handleOpenPromoSucceedModal();
      }
    });
  }
  async handleOpenPromoSucceedModal() {
    const modal = await this.modalCtrl.create({
      component: PromoSucceedModal,
      cssClass: this.screenSizeService.isDesktopResolution()
        ? 'modal-web ion-background-white'
        : 'modal-web ion-background-transparent',
    });
    modal.present();
  }

  ngOnDestroy(): void {}
}
