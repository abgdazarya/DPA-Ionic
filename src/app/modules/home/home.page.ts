import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher, ModalController, ToastController } from '@ionic/angular';

import { DataResponse, InteractionState, InteractionType } from '@shared';
import { CustomPopupComponent } from 'libs/components/common/custom-popup/custom-popup.component';
import { NavigationService } from 'libs/services/common/navigation.service';
import {
  Observable,
  Subscription,
  combineLatest,
  distinct,
  filter,
  firstValueFrom,
  take,
  tap,
} from 'rxjs';

import { Location } from '@angular/common';
import {
  AuthOtpModal,
  AuthPinModal,
  AuthVerificationMethodModal,
} from '@components/auth';
import { CustomerConcernModal } from '@components/profile';
import { RequestOtp, RequestOtpData, RequestOtpDto } from '@controllers/auth';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { HomeInteractionRepository, HomeRepository } from '@stores/home';
import { ForgetPinComponent } from 'libs/components/auth/modals/forget-pin/forget-pin.component';
import { PinInputComponent } from 'libs/components/auth/modals/pin-input/pin-input.component';
import { PinSuccessComponent } from 'libs/components/auth/modals/pin-success/pin-success.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { DeviceService } from 'libs/services/devices/device.service';
import { AppMainTemplateService } from '../../templates/main/main.template.service';
import { AksesButtonHomePageService } from './services/akses-button-home.page.service';
import { DpaTvHomePageService } from './services/dpa-tv-home.page.service';
import { HomePageService } from './services/home.page.service';
import { NewsHomePageService } from './services/news-home.page.service';
import { PopupHomePageService } from './services/popup-home.page.service';
import { PromotionHomePageService } from './services/promotion-home.page.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AksesButtonHomePageService,
    PromotionHomePageService,
    DpaTvHomePageService,
    NewsHomePageService,
    PopupHomePageService,
    HomePageService,

    HomeRepository,
    HomeInteractionRepository,
    AuthRepository,
    AuthInteractionRepository,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('refesherHome', { static: false })
  public refesherHome!: IonRefresher;

  private subscribtions = new Subscription();

  public requestOtpRes$: Observable<
    DataResponse<RequestOtpData> | undefined | null
  >;
  public requestOtpInteractRes$: Observable<InteractionState>;

  public counter = 1;
  public typeOfModal = ['promo', 'news', 'claim', 'birthday'];

  public targetPinPageReload: string = '';

  public concernInteraction: any;
  public birthdayInteraction: any;
  public customInteraction: any;

  constructor(
    public aksesButtonHomeService: AksesButtonHomePageService,
    public promotionHomeService: PromotionHomePageService,
    public dpaTvHomeService: DpaTvHomePageService,
    public newsHomeService: NewsHomePageService,
    public popupHomeService: PopupHomePageService,
    public homeService: HomePageService,

    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private navigationService: NavigationService,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    public deviceService: DeviceService,
    private storageService: StorageService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository
  ) {
    this.requestOtpRes$ = this.authRepo.getRequestOtp$();
    this.requestOtpInteractRes$ =
      this.authInteractRepo.getRequestOtpInteraction$();
  }

  public handleSetAksesMenu(): void {
    const interaction = this.aksesButtonHomeService.aksesMenuInteraction$
      .pipe(
        filter((interaction) => !!interaction),
        tap((interaction) => {
          if (interaction?.type === InteractionType.PROCESS) {
            this.aksesButtonHomeService.handleResetAccessMenu();
          }
          if (interaction?.type === InteractionType.SUCCEED) {
            const action = this.aksesButtonHomeService.aksesMenuRes$
              .pipe(
                filter((res) => !!res),
                take(1),
                tap(async (res) => {
                  if (res?.aksesMenu?.length) {
                    res.aksesMenu.forEach((val, idx) => {
                      if (!val.aksesMenu) return;
                      this.aksesButtonHomeService.handleSetAksesMenuButton(
                        val.aksesMenu
                      );
                    });
                  }
                })
              )
              .subscribe();

            this.subscribtions.add(action);
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  public handleSetPopupConcern(): void {
    this.concernInteraction = this.homeService.profileInteractionRepo
      .getUserInfoInteraction$()
      .pipe(
        filter((interaction) => !!interaction),
        distinct((e) => e?.type),
        tap((interaction) => {
          if (interaction?.type === InteractionType.SUCCEED) {
            const action = this.homeService.profileRepo
              .getUserInfoData$()
              .pipe(
                take(1),
                tap((userInfo) => {
                  const offset = new Date().getTimezoneOffset() * 60000;

                  const currentDate = new Date(Date.now() - offset)
                    ?.toISOString()
                    ?.split('T')[0]
                    ?.split('-');

                  const popupConcern =
                    this.storageService.getStorage(`popupConcern`);
                  const popupConcernCondition =
                    (currentDate[2] === '01' && !userInfo?.custConcern) ||
                    (!userInfo?.custConcern && !popupConcern);

                  if (popupConcernCondition) {
                    this.storageService.setStorage(
                      `popupConcern`,
                      currentDate.join('-')
                    );
                    this.handleOpenCustomerConcernModal();
                    this.popupHomeService.handleShowPopup(true);
                    return;
                  }

                  if (this.birthdayInteraction) {
                    this.subscribtions.remove(this.birthdayInteraction);
                    this.birthdayInteraction = null;
                  }
                  this.handleSetPopupBirthday();
                })
              )
              .subscribe();

            this.subscribtions.add(action);
          }
          if (interaction?.type === InteractionType.FAILED) {
            if (this.birthdayInteraction) {
              this.subscribtions.remove(this.birthdayInteraction);
              this.birthdayInteraction = null;
            }
            this.handleSetPopupBirthday();
          }
        })
      )
      .subscribe();

    this.subscribtions.add(this.concernInteraction);
  }

  public handleSetPopupBirthday(): void {
    // this.subscribtions.remove(this.concernInteraction);
    this.birthdayInteraction =
      this.popupHomeService.birhtdayAndResignPopupInteraction$
        .pipe(
          filter((interaction) => !!interaction),
          distinct((e) => e?.type),
          tap((interaction) => {
            if (interaction?.type === InteractionType.SUCCEED) {
              const action = combineLatest([
                this.popupHomeService.birhtdayAndResignPopup$,
                this.homeService.profileRepo.getUserDetailData$(),
              ])
                .pipe(
                  take(1),
                  tap(async ([birthdayPopup, userDetail]) => {
                    const offset = new Date().getTimezoneOffset() * 60000;
                    const currentDate = new Date(Date.now() - offset)
                      ?.toISOString()
                      ?.split('T')[0]
                      ?.split('-');

                    const birthdayDate = new Date(
                      <string>userDetail?.tanggalLahir
                    )
                      ?.toISOString()
                      ?.split('T')[0]
                      ?.split('-');

                    const popupBirthday = await this.storageService.getStorage(
                      StorageKeyEnum.POPUP_BIRTHDAY
                    );
                    const popupBirthdayCondition =
                      !popupBirthday &&
                      birthdayDate[2] === currentDate[2] &&
                      birthdayDate[1] === currentDate[1];
                    const popupBirthdayConditionFalse =
                      popupBirthday &&
                      popupBirthday?.split('-')[1] !== currentDate[1] &&
                      popupBirthday?.split('-')[2] !== currentDate[2];

                    const popupResign = await this.storageService.getStorage(
                      StorageKeyEnum.POPUP_RESIGN
                    );
                    const popupResignCondition = !popupResign;
                    const popupResignConditionFalse =
                      popupResign &&
                      popupResign?.split('-')[1] !== currentDate[1] &&
                      popupResign?.split('-')[2] !== currentDate[2];

                    if (popupResignCondition) {
                      const findedResign =
                        birthdayPopup?.data &&
                        birthdayPopup?.data.find(
                          (val) => val.jenisPopup === 'POPUP-RESIGN-ALERT'
                        );
                      if (findedResign) {
                        // this.openCustomPopUpModal(
                        //   'claim',
                        //   <string>findedResign.judulKonten,
                        //   <string>findedResign.isiTextPopup,
                        //   <string>findedResign.picture
                        // );
                        this.popupHomeService.handleShowPopup(true);
                        this.storageService.setStorage(
                          StorageKeyEnum.POPUP_RESIGN,
                          currentDate.join('-')
                        );

                        return;
                      }
                    } else if (popupResignConditionFalse) {
                      this.storageService.removeStorage(
                        StorageKeyEnum.POPUP_RESIGN
                      );
                    }

                    if (popupBirthdayCondition) {
                      const findedBirthday =
                        birthdayPopup?.data &&
                        birthdayPopup?.data.find(
                          (val) => val.jenisPopup === 'POPUP-ULANG-TAHUN'
                        );

                      if (findedBirthday) {
                        // this.openCustomPopUpModal(
                        //   'birthday',
                        //   <string>'Ulang Tahun',
                        //   <string>findedBirthday.isiTextPopup,
                        //   <string>findedBirthday.picture
                        // );
                        this.popupHomeService.handleShowPopup(true);

                        this.storageService.setStorage(
                          StorageKeyEnum.POPUP_BIRTHDAY,
                          currentDate.join('-')
                        );
                        return;
                      }
                    } else if (popupBirthdayConditionFalse) {
                      this.storageService.removeStorage(
                        StorageKeyEnum.POPUP_BIRTHDAY
                      );
                    }

                    if (this.customInteraction) {
                      this.subscribtions.remove(this.customInteraction);
                      this.customInteraction = null;
                    }
                    this.handleSetPopupCustom();
                  })
                )
                .subscribe();
              this.subscribtions.add(action);
            }
            if (interaction?.type === InteractionType.FAILED) {
              if (this.customInteraction) {
                this.subscribtions.remove(this.customInteraction);
                this.customInteraction = null;
              }
              this.handleSetPopupCustom();
            }
          })
        )
        .subscribe();

    this.subscribtions.add(this.birthdayInteraction);
  }

  public handleSetPopupCustom(): void {
    this.subscribtions.remove(this.birthdayInteraction);
    this.customInteraction = this.popupHomeService.customPopupInteraction$
      .pipe(
        filter((interaction) => !!interaction),
        distinct((e) => e?.type),
        tap((interaction) => {
          if (interaction?.type === InteractionType.SUCCEED) {
            const action = this.popupHomeService.customPopup$

              .pipe(
                take(1),
                tap(async (customPopup) => {
                  const offset = new Date().getTimezoneOffset() * 60000;

                  const currentDate = new Date(Date.now() - offset)
                    ?.toISOString()
                    ?.split('T')[0]
                    ?.split('-');

                  if (customPopup?.data?.length) {
                    for (
                      let index = 0;
                      index < customPopup?.data?.length;
                      index++
                    ) {
                      const val = customPopup?.data[index];

                      const popupCustom = await this.storageService.getStorage(
                        `popup${val.idDpaPopup}`
                      );

                      const startDate = val.startDateDisplay?.split(' ')[0];
                      const endDate = val.endDateDisplay?.split(' ')[0];

                      const popupCustomCondition =
                        (!popupCustom &&
                          new Date(<string>currentDate.join('-')) >=
                            new Date(<string>startDate) &&
                          new Date(<string>currentDate.join('-')) <=
                            new Date(<string>endDate)) ||
                        (popupCustom &&
                          popupCustom.split('-')[1] !== currentDate[1] &&
                          popupCustom.split('-')[2] !== currentDate[2]);

                      const popupCustomConditionFalse =
                        new Date(<string>currentDate.join('-')) <
                          new Date(<string>startDate) &&
                        new Date(<string>currentDate.join('-')) >
                          new Date(<string>endDate);

                      if (popupCustomCondition) {
                        // this.openCustomPopUpModal(
                        //   'custom',
                        //   <string>val.judulKonten,
                        //   <string>val.isiTextPopup,
                        //   <string>val.picture
                        // );
                        this.popupHomeService.handleShowPopup(true);

                        this.storageService.setStorage(
                          `popup${val.idDpaPopup}`,
                          currentDate.join('-')
                        );
                        return;
                      } else if (popupCustomConditionFalse) {
                        this.storageService.removeStorage(
                          `popup${val.idDpaPopup}`
                        );
                      }
                    }
                  }
                })
              )
              .subscribe();

            this.subscribtions.add(action);
          }
        })
      )
      .subscribe();

    this.subscribtions.add(this.customInteraction);
  }

  // public handleGetUserInteraction(): void {
  //   const interaction = this.profileInteractionRepository
  //     .getUserInfoInteraction$()
  //     .pipe(
  //       filter((res) => !!res),
  //       tap((interaction) => {
  //         // if (interaction?.type === InteractionType.SUCCEED) {
  //           // if (this.refesherHome) this.refesherHome.complete();
  //           // if (this.promotionLandingContainer)
  //           //   this.promotionLandingContainer.fetchListPromotion();
  //           // if (this.newsLandingContainer)
  //           //   this.newsLandingContainer.fetchListNews();
  //           // if (this.dpaTvLandingContainer)
  //           //   this.dpaTvLandingContainer.fetchListDpaTv();
  //         // }

  //         // if (interaction?.type === InteractionType.FAILED) {
  //         //   if (this.refesherHome) this.refesherHome.complete();
  //         // }
  //       })
  //     )
  //     .subscribe();

  //   this.subscribtions.add(interaction);
  // }

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleChangeHeaderContainerClass(
      'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
    );
    this.templateService.handleChangePageTitle('');
    this.templateService.handleUseSecondaryHeader(false);
    this.templateService.handleShowIconQuiz(true);
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.handleFetchInitData();
    this.handleSetAksesMenu();
  }

  async handleFetchInitData() {
    this.handleChangeTemplateService();

    this.homeService
      .handleFetchToken({
        path: '/home',
        accessable: true,
        callback: '/home',
      })
      .subscribe((res) => {
        this.homeService.handleFetchProfile();
        this.homeService.handleFetchUserDetail();
        this.homeService.handleFetchWhatsappLink();

        this.aksesButtonHomeService.handleFetchAksesMenu();
        this.aksesButtonHomeService.handleFetchAksesSaldo();
        this.dpaTvHomeService.handleFetchDpaTvLanding();
        this.promotionHomeService.handleFetchPromotionLanding();
        this.newsHomeService.handleFetchNewsLanding();
        this.popupHomeService.handleFetchPopup();

        this.homeService.handleFetchHubDpa();

        if (this.customInteraction) {
          this.subscribtions.remove(this.customInteraction);
          this.customInteraction = null;
        }
        this.handleSetPopupConcern();

        this.homeService.handleSetFCMToken();
        if (this.refesherHome) this.refesherHome.complete();
      });
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  async navigateToQuiz() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (idProfilDpa) {
      this.router
        .navigate(['quiz'], { onSameUrlNavigation: 'reload', replaceUrl: true })
        .then(() => {
          this.location.replaceState('quiz');
        });

      setTimeout(() => {
        const el: any = document.querySelector('.page-container-main');
        if (el) {
          el.scrollToTop?.();
        }
      }, 0);
    } else {
      this.storageService.clearStorage();
      window.location.replace('/login');
    }
  }

  public handleOpenCustomerConcernModal() {
    const action = this.popupHomeService.isPopupShow$
      .pipe(
        take(1),
        tap(async (popupShow) => {
          if (popupShow) return;
          const modal = await this.modalCtrl.create({
            component: CustomerConcernModal,
            cssClass: 'modal-web ion-background-transparent ion-no-box-shadow',
          });
          modal.present();
          modal.onDidDismiss().then(({ data }) => {
            this.popupHomeService.handleShowPopup(false);
          });
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  public handleOpenCustomModal(
    type: string = 'promo',
    title?: string,
    description?: string,
    picture?: string
  ) {
    const action = this.popupHomeService.isPopupShow$
      .pipe(
        take(1),
        tap(async (popupShow) => {
          if (popupShow) return;
          const modal = await this.modalCtrl.create({
            component: CustomPopupComponent,
            cssClass: 'modal-web ion-background-transparent ion-no-box-shadow',
            componentProps: {
              type,
              title,
              description,
              picture,
            },
          });
          modal.present();
          modal.onDidDismiss().then(({ data }) => {
            if (data?.isDismiss && !data?.navigated && type == 'claim') {
              this.popupHomeService.handleShowPopup(false);
              this.handleSetPopupConcern();
            }
            if (data?.isDismiss && !data?.navigated && type == 'birthday') {
              this.popupHomeService.handleShowPopup(false);
              this.handleSetPopupConcern();
            }
            if (data?.isDismiss && !data?.navigated && type == 'custom') {
              this.popupHomeService.handleShowPopup(false);
              this.handleSetPopupConcern();
            }
          });
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  navigateError = '';
  navigateUrl(path: string) {
    this.router.navigate([`${path}`]).then((res) => {
      if (!res) {
        this.navigateError = 'Authentikasi dibutuhkan.';
        setTimeout(() => {
          this.navigateError = '';
          this.cdr.markForCheck();
        }, 3000);
        this.cdr.markForCheck();
      }
    });
  }

  async showPin(targetPage: any = this.targetPinPageReload) {
    if (targetPage) {
      this.targetPinPageReload =
        targetPage == 'saldo' ? 'saldo' : 'simulasi-mp';
    }

    const responseToken = await firstValueFrom(
      this.homeService.handleFetchToken(
        targetPage == 'saldo'
          ? {
              path: '/saldo',
              callback: '/login',
            }
          : {
              path: '/simulasi-mp',
              callback: '/login',
            }
      )
    );

    if (responseToken !== true) return;

    const modal = await this.modalCtrl.create({
      component: PinInputComponent,
      backdropDismiss: false,
      cssClass: this.screenSizeService.isMobileNativeResolution()
        ? 'rounded-none custom-pin-input'
        : 'rounded-md custom-pin-input',
      componentProps: {
        expectedPin: '123456',
        isPasswordInput: true,
        allowNumbersOnly: true,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data === 'forgot-pin') this.showForgetPin();
      if (data?.correct) this.router.navigate([this.targetPinPageReload]);
    });
  }

  async showForgetPin(value: any = null) {
    const modal = await this.modalCtrl.create({
      component: ForgetPinComponent,
      cssClass: this.screenSizeService.isMobileNativeResolution()
        ? 'rounded-none forget-pin'
        : 'rounded-md forget-pin',
      backdropDismiss: false,
      componentProps: {
        continueForgetPin: this.continueForgetPin,
        inputValue: value,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data === 'back') {
        this.showPin();
        return;
      }
      // this.handleOpenOtpModal(data.type, data.value);
      // if (data.type === 'email') {
      //   this.requestOptForgetPin(data, idProfilDpa);
      // } else if (data.type === 'phone') {
      //   this.showVerificationMethod(data.type, data);
      // }
    });
  }

  continueForgetPin = async (data: any) => {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (data.type === 'email') {
      this.requestOptForgetPin(data, idProfilDpa);
    } else if (data.type === 'phone') {
      this.showVerificationMethod(data.type, data);
    }
  };

  private subribtions: any = null;
  requestOptForgetPin = async (
    data: any,
    idProfilDpa: any,
    isReRequest: boolean = false
  ) => {
    if (this.subribtions) {
      this.subribtions.unsubscribe();
      this.subribtions = null;
    }
    const otpPayload: RequestOtpDto = {
      idProfilDpa,
      noHpEmail: data.value,
      method: data.type === 'email' ? 'EMAIL' : data.phoneReq || data.type,
      menu: 'SALDO',
    };
    await this.store.dispatch(RequestOtp({ payload: otpPayload }));
    this.subribtions = this.requestOtpInteractRes$.subscribe(
      (e: InteractionState) => {
        if (isReRequest) {
          return;
        }
        if (e.type == InteractionType.SUCCEED) {
          this.handleOpenOtpModal(
            data.type === 'email' ? 'email' : data.phoneReq || data.type,
            data.value,
            data,
            idProfilDpa
          );
        }
      }
    );
  };

  async showVerificationMethod(type: string, dataParams: any) {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    const modal = await this.modalCtrl.create({
      component: AuthVerificationMethodModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        number: dataParams.value,
      },
    });
    modal.present();

    modal.onDidDismiss().then(async ({ data }) => {
      if (data?.method) {
        dataParams.phoneReq = data?.method;
        // this.showForgetPin(data.value);
        await this.requestOptForgetPin(dataParams, idProfilDpa);
      }
      if (data.back) {
        this.showForgetPin(data.value);
      }
    });
  }

  async handleOpenOtpModal(
    type: string,
    value: any,
    dataParams: any,
    idProfilDpa: any
  ) {
    const modal = await this.modalCtrl.create({
      component: AuthOtpModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        menu: 'SALDO',
        type,
        value,
        data: dataParams,
        idProfilDpa: idProfilDpa,
        requestOptForgetPin: this.requestOptForgetPin,
      },
    });
    await modal.present();

    modal.onDidDismiss().then(({ data }: any) => {
      if (data?.succeed) {
        this.handleOpenPinModal(type, value);
      } else if (data.back) {
        this.showForgetPin();
      }
    });
  }

  async handleOpenPinModal(type: string, value: any) {
    const modal = await this.modalCtrl.create({
      component: AuthPinModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        isForget: true,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (!!data.back) {
        this.showForgetPin();
      } else if (!!data?.success) {
        if (this.screenSizeService.isDesktopNativeResolution()) {
          this.showPin();
        } else {
          this.handleOpenPinSuccessModal();
        }
      }
    });
  }

  handleOpenPinSuccessModal = async () => {
    const modal = await this.modalCtrl.create({
      component: PinSuccessComponent,
      backdropDismiss: true,
      cssClass: this.screenSizeService.isDesktopNativeResolution()
        ? 'modal-web ion-background-white'
        : 'modal-web modal-transparent',
    });
    await modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.showPin();
      }
    });
  };
}
