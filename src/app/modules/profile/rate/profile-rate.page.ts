import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { ProfileRateSucceedModal } from '@components/profile';
import {
  DetailProfile,
  GetLink,
  LinkData,
  RateReview,
} from '@controllers/profile';
import { ModalController, isPlatform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { RateDirectionsModalComponent } from 'libs/components/profile/modals/rate-directions-modal/rate-directions-modal.component';
import { GetUserRate } from 'libs/controllers/profile/action/command/get-user-rate';
import { RateData, UserRateData } from 'libs/controllers/profile/models/rate';
import { NavigationService } from 'libs/services/common/navigation.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { DeviceService } from 'libs/services/devices/device.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { BehaviorSubject, Observable, filter, take, tap } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-rate',
  templateUrl: 'profile-rate.page.html',
  styleUrls: ['profile-rate.page.scss'],
})
export class ProfileRatePage implements OnInit, OnDestroy {
  private readonly rateSubject: BehaviorSubject<number[]> = new BehaviorSubject<
    number[]
  >([0, 0, 0, 0, 0]);
  public rate$: Observable<number[]>;
  rateValue: number = 0;
  review: string = '';
  public response$: Observable<RateData | undefined | null>;
  public interactionResponse$: Observable<InteractionState>;
  public userResponse$: Observable<DetailProfile | undefined | null>;
  private idDpa: string = '';
  public interactionType = InteractionType;
  public linkResponse$: Observable<DataResponse<LinkData> | undefined | null>;
  public responseRate$: Observable<
    DataResponse<UserRateData> | undefined | null
  >;
  public interactionResponseRate$: Observable<InteractionState>;
  public appStoreUrl: string | null | undefined = '';
  public playStoreUrl: string | null | undefined = '';
  public constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private deviceService: DeviceService,
    private navigationService: NavigationService,
    public screenSizeService: ScreenSizeService,
    private storageService: StorageService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {
    this.rate$ = this.rateSubject.asObservable();
    this.response$ = this.profileRepository.rateReviewData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.rateReviewInteraction$();
    this.userResponse$ = this.profileRepository.getUserDetailData$();
    this.linkResponse$ = this.profileRepository.getLink$();
    this.responseRate$ = this.profileRepository.getUserRate$();
    this.interactionResponseRate$ =
      this.profileInteractionRepository.getUserRateInteraction$();
  }
  onInitTheme = () => {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Nilai Kami');
    this.templateService.handleUseSecondaryHeader(true);
  };
  ngOnInit(): void {
    setTimeout(() => {
      this.onInitTheme();
      this.cdr.markForCheck();
    }, 0);
    this.getUserId();
    this.fetchLink();
    this.fetchUserRate();
    this.response$.subscribe((item) => {});
    this.handlePageChange();
  }

  async fetchUserRate() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(GetUserRate({ payload }));
    this.responseRate$.subscribe((data) => {
      let rateTmp = this.rateSubject.getValue();
      const ratingData = data?.data?.rating || 0;
      rateTmp = rateTmp.map((val, idx) => (idx <= ratingData - 1 ? 1 : 0));
      this.rateSubject.next(rateTmp);

      this.rateValue = ratingData;
      this.review = data?.data?.review || '';
    });
  }

  async getUserId() {
    this.idDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload: any = {};
    if (!this.idDpa) return;
    this.store.dispatch(RateReview({ payload }));
  }

  initializeLink() {
    this.linkResponse$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_APP_APPSTORE') {
        this.appStoreUrl = res.data.description;
      }
      if (res?.data?.condition === 'LINK_APP_PLAYSTORE') {
        this.playStoreUrl = res.data.description;
      }
    });
  }

  fetchLink() {
    this.fetchAppStoreLink();
    this.fetchPlayStoreLink();
    this.initializeLink();
  }

  fetchPlayStoreLink() {
    const payload = { condition: 'LINK_APP_PLAYSTORE' };
    this.store.dispatch(GetLink({ payload }));
  }

  fetchAppStoreLink() {
    const payload = { condition: 'LINK_APP_APPSTORE' };
    this.store.dispatch(GetLink({ payload }));
  }

  public handleSelectedStar(index: number): void {
    let rateTmp = this.rateSubject.getValue();
    rateTmp = rateTmp.map((val, idx) => (idx <= index ? 1 : 0));
    this.rateSubject.next(rateTmp);

    this.rate$.subscribe(
      (rate) => (this.rateValue = rate.filter((rt) => rt === 1).length)
    );
  }

  initialize(): void {
    this.interactionResponse$
      .pipe(
        filter(
          (res, index) => res.type === InteractionType.SUCCEED && index === 1
        ),
        take(1),
        tap((interaction: InteractionState) => {
          if (interaction.type === InteractionType.SUCCEED) {
            this.performModal(this.rateValue);

            // if (this.rateValue >= 3) {
            //   if (isPlatform('desktop')) {
            //     this.performDirection();
            //     return;
            //   }
            //   this.openAppUrl();
            // } else {
            //   this.performModal();
            // }
          }
        })
      )
      .subscribe();
  }

  async handleOpenRateSucceedModal() {
    const payload = {
      // idProfilDpa: this.idDpa,
      rating: this.rateValue.toString(),
      review: this.review,
      infoDevice: isPlatform('capacitor')
        ? await this.deviceService.getDeviceInfo()
        : '',
      infoBrowser: !isPlatform('capacitor')
        ? await this.deviceService.getBrowserName()
        : '',
    };

    await this.store.dispatch(RateReview({ payload }));
    this.initialize();
  }

  async performModal(rate: number) {
    const modal = await this.modalCtrl.create({
      component: ProfileRateSucceedModal,
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
      componentProps: {
        rate,
      },
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.openAppUrl();
      }
    });
  }

  async openAppUrl() {
    if (isPlatform('ios') || isPlatform('iphone') || isPlatform('ipad')) {
      if (!this.appStoreUrl) return;

      if (Capacitor.getPlatform() === 'web') {
        window.location.href = this.appStoreUrl;
        return;
      }

      await Browser.open({
        url: this.appStoreUrl,
        presentationStyle: 'popover',
        windowName: 'appstore rate',
      });

      // Test
    } else if (!isPlatform('desktop')) {
      if (!this.playStoreUrl) return;
      await Browser.open({
        url: this.playStoreUrl,
        presentationStyle: 'popover',
      });
    } else {
      this.performDirection();
    }
  }

  isErrorSubmit() {
    if (this.rateValue > 0 && this.review !== '') return false;
    return true;
  }

  async performDirection() {
    const modal = await this.modalCtrl.create({
      component: RateDirectionsModalComponent,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        title: 'Pilih penilaian kamu:',
      },
    });
    modal.present();
    modal.onDidDismiss().then(async ({ data }) => {
      this.modalCtrl.dismiss();
      if (data === 'playstore') {
        if (!this.playStoreUrl) return;
        await Browser.open({
          url: this.playStoreUrl,
          presentationStyle: 'popover',
        });
        // this.navigationService.openUrl(this.playStoreUrl!);
        // this.performModal();
        return;
      }
      if (data === 'appstore') {
        if (!this.appStoreUrl) return;

        if (Capacitor.getPlatform() === 'web') {
          window.open(this.appStoreUrl);
          return;
        }

        await Browser.open({
          url: this.appStoreUrl,
          presentationStyle: 'popover',
        });

        // this.navigationService.openUrl(this.appStoreUrl!);
        // this.performModal();
        return;
      }
    });
  }

  public handlePageChange(): void {
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }

  ngOnDestroy(): void {}
}
