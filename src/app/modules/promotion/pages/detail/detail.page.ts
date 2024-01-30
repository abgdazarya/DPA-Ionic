import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { Breadcrumb, ComponentType } from '@components/common';
import {
  PromoBiodataFormModal,
  PromoSucceedModal,
  PromoTermModal,
} from '@components/promo';
import {
  GetDetailPromotion,
  PromotionModel,
} from '@controllers/menu-promotion';
import { DetailProfile, UserDetail } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
} from '@stores/menu-promotion';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { PromoBannerModal } from 'libs/components/promo/modals/banner/banner.modal';
import { ShareMediaModal } from 'libs/components/promo/modals/share-media/share-media.modal';
import { ContentPromo } from 'libs/controllers/menu/models/content-promo.model';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, map } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-promotion-detail-page',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuPromotionRepository,
    MenuPromotionInteractionRepository,
  ],
})
export class DetailPage implements OnInit {
  @ViewChild('promoSlides') public promoSlides!: SwiperComponent;

  public type: typeof ComponentType = ComponentType;

  public breadcrumbs: Breadcrumb[] = [
    { label: 'Home', link: '/home' },
    { label: 'Promosi', link: '/promotion' },
    { label: 'Detail Promo', link: '' },
  ];

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.handleChangeTemplateService();
  }

  public getComponentType(): ComponentType {
    const win = window;

    if (win.innerWidth <= 640) {
      return this.type.SMALL;
    }

    if (win.innerWidth > 640 && win.innerWidth <= 1024) {
      return this.type.MEDIUM;
    }

    return this.type.LARGE;
  }
  public response$: Observable<DetailProfile | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public promotion$: Observable<PromotionModel | undefined | null>;

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
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    public screenSizeService: ScreenSizeService,
    private route: ActivatedRoute,

    private storageService: StorageService,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private menuPromotionRepository: MenuPromotionRepository,
    private menuPromotionInteractionRepository: MenuPromotionInteractionRepository,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef
  ) {
    this.response$ = this.profileRepository.getUserDetailData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getUserDetailInteraction$();

    this.promotion$ = this.menuPromotionRepository
      .getPromotionDetail$()
      .pipe(map((res) => res?.data));
    this.redirectPromotion();
  }

  public handleSelectBreadcrumb(link: string): void {
    if (!link) return;
    this.router.navigateByUrl(link);
  }

  ngOnDestroy(): void {
    this.modalCtrl.dismiss();
  }

  async handleOpenPromoBannerModal() {
    let promoImg: string = '';
    this.promotion$.subscribe((data: any) => {
      promoImg = data.banner;
    });
    const modal = await this.modalCtrl.create({
      component: PromoBannerModal,
      cssClass: 'modal-web ion-background-transparent ion-no-box-shadow',
      componentProps: {
        promoImg,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.handleOpenPromoTermModal();
      }
    });
  }

  async handleOpenPromoBiodataFormModal() {
    let promoImg: string = '';
    let userDetail: DetailProfile | any = {};
    // await this.promotion$.subscribe((data: any) => {
    //   promoImg = this.getBanner(data.banner);
    // });
    // await this.response$.subscribe((user) => {
    //   userDetail = user;
    // });
    // const modal = await this.modalCtrl.create({
    //   component: PromoBiodataFormModal,
    //   cssClass: 'modal-web ion-background-white',
    //   componentProps: {
    //     promoImg,
    //     userDetail,
    //   },
    // });
    // modal.present();

    // modal.onDidDismiss().then(({ data }) => {
    //   if (data?.submitted) {
    //     this.handleOpenPromoTermModal();
    //   }
    // });
  }

  async handleOpenPromoTermModal() {
    const modal = await this.modalCtrl.create({
      component: PromoTermModal,
      cssClass: this.screenSizeService.isDesktopResolution()
        ? 'modal-web ion-background-white'
        : 'modal-web ion-background-transparent',
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.handleOpenPromoSucceedModal();
      }
    });
  }
  async handleOpenPromoSucceedModal() {
    const modal = await this.modalCtrl.create({
      component: PromoSucceedModal,
      cssClass: 'modal-web ion-background-white',
    });
    modal.present();
  }

  public handleSlide(type: string): void {
    type === 'next'
      ? this.promoSlides.swiperRef.slideNext(500)
      : this.promoSlides.swiperRef.slidePrev(500);
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

  handleOpenShareMediaModal = async () => {
    let promo: ContentPromo | any = {};
    this.promotion$.subscribe((data: any) => {
      promo = data;
    });
    const modal = await this.modalCtrl.create({
      component: ShareMediaModal,
      cssClass: 'modal-web ion-background-transparent',
      componentProps: {
        promo,
      },
    });
    modal.present();
  };

  onShare = async () => {
    this.handleOpenShareMediaModal();
    // await Share.share({
    //   title: 'Cashback Saldo Hingga Rp75.000, Yuk Ajak Teman Pakai AstraPay!',
    //   text: `Promo Kode Referral kembali lagi! Khusus bulan ini, kamu bisa dapetin cashback saldo hingga Rp75.000. Yuk ajak 5 teman kamu untuk pakai AstraPayReally awesome thing you need to see right meow`,
    //   url: window.location.href,
    //   dialogTitle: 'Share with buddies',
    // });
  };

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(true);
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeIonContentClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'ion-background-white relative'
        : 'ion-background-white relative'
    );
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Detail Promosi');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleRightBtnClick(this.handleOpenShareMediaModal);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.handleChangeTemplateService();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    const { idPromosi } = this.route.snapshot.params;

    if (!idPromosi) return;
    const payload = {
      idPromosi,
    };
    this.store.dispatch(GetDetailPromotion({ payload }));
    this.fetchUserDetail();
  }

  async fetchUserDetail() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserDetail({ payload }));
  }

  redirectPromotion = async () => {
    const idProfilDpa: string | any = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) {
      this.router.navigate(['/login']);
    }
  };
}
