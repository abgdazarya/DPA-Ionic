import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  Auth,
  OAuthProvider,
  UserCredential,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  SignInWithApple,
  SignInWithAppleOptions,
  SignInWithAppleResponse,
} from '@capacitor-community/apple-sign-in';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  DetailProfile,
  ToggleEmail,
  ToggleEmailReset,
  ToggleNotification,
  UserDetail,
} from '@controllers/profile';
import { ModalController, Platform, isPlatform } from '@ionic/angular';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  InteractionState,
  InteractionType,
  encryptContent,
} from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings';
import jwt_decode from 'jwt-decode';
import { UpdateFailedModal } from 'libs/components/common/update-failed/update-failed.modal';
import { PermissionRequestModalComponent } from 'libs/components/profile/modals/permission-request-modal/permission-request-modal.component';
import { ToggleEmailData } from 'libs/controllers/profile/models/toggle-email';
import { ToggleNotificationData } from 'libs/controllers/profile/models/toggle-notification';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileInteractionState } from 'libs/stores/profile/states/profile.interaction.state';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable, Subject, Subscription, filter, take, tap } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

interface ExpandMenu {
  isEmail: boolean;
  isNotification: boolean;
  [key: string]: boolean;
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: 'profile-settings.page.html',
})
export class ProfileSettingsPage implements OnInit, OnDestroy {
  private subs = new Subscription();

  public isNotificationOpen: boolean = true;
  public isEmailOpen: boolean = true;
  public expanedMenu: ExpandMenu = {
    isEmail: true,
    isNotification: true,
  };
  public toggleNotification: boolean = false;
  public toggleEmail: boolean = false;
  public toggleApple: boolean = false;
  public response$: Observable<ToggleNotificationData | undefined | null>;
  public userResponse$: Observable<DetailProfile | undefined | null>;
  public userInteraction$: Observable<InteractionState | undefined | null>;

  public interactionResponse$: Observable<InteractionState | undefined | null>;

  public toggleEmailGoogleRes$: Observable<ToggleEmailData | undefined | null>;
  public toggleEmailGoogleInteractionRes$: Observable<
    InteractionState | undefined | null
  >;
  public toggleEmailAppleRes$: Observable<ToggleEmailData | undefined | null>;
  public toggleEmailAppleInteractionRes$: Observable<
    InteractionState | undefined | null
  >;

  private idDpa: string = '';
  private unsubscribe$ = new Subject<void>();

  private toggleEmailPayload: any = {};

  constructor(
    private store: Store<ProfileState>,
    private interactionStore: Store<ProfileInteractionState>,

    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private action$: Actions,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    private auth: Auth,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    this.response$ = this.profileRepository.setNotificationData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.setNotificationInteraction$();
    this.userResponse$ = this.profileRepository.getUserDetailData$();
    this.userInteraction$ =
      this.profileInteractionRepository.getUserDetailInteraction$();

    this.toggleEmailGoogleRes$ =
      this.profileRepository.toggleEmailGoogleData$();
    this.toggleEmailGoogleInteractionRes$ =
      this.profileInteractionRepository.toggleEmailGoogleInteraction$();

    this.toggleEmailAppleRes$ = this.profileRepository.toggleEmailAppleData$();
    this.toggleEmailAppleInteractionRes$ =
      this.profileInteractionRepository.toggleEmailAppleInteraction$();
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
    this.templateService.handleChangePageTitle('Pengaturan');
    this.templateService.handleUseSecondaryHeader(true);
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.onInitTheme();
      this.cdr.markForCheck();
    }, 0);

    this.fetchUserDetail();
    // this.handleUserResponse();
    this.handleGoogleInteraction();
    this.handleAppleInteraction();
    this.handlePageChange();
    this.handleSetData();
  }

  async fetchUserDetail() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserDetail({ payload }));
  }

  public handleSetData(): void {
    const interaction = this.profileInteractionRepository
      .getUserDetailInteraction$()
      .pipe(
        filter((interaction) => !!interaction),
        tap((interaction) => {
          if (interaction?.type === InteractionType.SUCCEED) {
            const action = this.profileRepository
              .getUserDetailData$()
              .pipe(
                filter((res) => !!res),
                take(1),
                tap((res: any) => {
                  this.toggleEmail = res?.googleAccount == 1 ? true : false;
                  this.toggleApple = res?.appleId == 1 ? true : false;
                  this.toggleNotification =
                    res?.notificationToggle == 1 ? true : false;
                })
              )
              .subscribe();

            this.subs.add(action);
          }
        })
      )
      .subscribe();

    this.subs.add(interaction);
  }

  public handleSignInApple() {
    if (Capacitor.getPlatform() === 'web') {
      this.handleSignInAppleWeb();
    } else {
      this.handleSignInAppleNative();
    }
  }

  public handleSignInAppleWeb() {
    const provider = new OAuthProvider('apple.com');

    signInWithPopup(this.auth, provider).then(
      (res: UserCredential) => {
        const email: string | null = res.user.email;

        this.store.dispatch(
          ToggleEmail({
            payload: { appleId: encryptContent(email?.toLowerCase()) },
            toggleType: 'apple',
          })
        );
      },
      (err) => {}
    );
  }

  public handleSignInAppleNative() {
    let options: SignInWithAppleOptions = {
      clientId: 'com.dpareborn.id',
      redirectURI:
        'https://dpa-mobile-reborn-prod.firebaseapp.com/__/auth/handler',
      scopes: 'email',
      state: '12345',
      nonce: 'nonce',
    };

    SignInWithApple.authorize(options)
      .then((res: SignInWithAppleResponse) => {
        const email: any = res.response.email;
        if (email) {
          this.store.dispatch(
            ToggleEmail({
              payload: { appleId: encryptContent(email?.toLowerCase()) },
              toggleType: 'apple',
            })
          );
        } else {
          const decodeRes: any = jwt_decode(res.response.identityToken);

          if (decodeRes?.email) {
            const email: string = decodeRes?.email;

            this.store.dispatch(
              ToggleEmail({
                payload: { appleId: encryptContent(email?.toLowerCase()) },
                toggleType: 'apple',
              })
            );
          }
        }
      })
      .catch((err) => {});
  }

  handleGoogleInteraction(): void {
    const interaction = this.toggleEmailGoogleInteractionRes$
      .pipe(
        filter((res) => !!res),
        tap((interaction) => {
          if (interaction?.type === InteractionType.SUCCEED) {
            this.handleToggleGoogleResponse();
            this.store.dispatch(
              ToggleEmailReset({
                response: DATA_RESPONSE_INITIAL_STATE,
                toggleType: 'google',
              })
            );
          }

          if (interaction?.type === InteractionType.FAILED) {
            if (interaction?.code === '02') {
              this.handleShowErrorModal('toggle-invalid');
              this.store.dispatch(
                ToggleEmailReset({
                  response: DATA_RESPONSE_INITIAL_STATE,
                  toggleType: 'google',
                })
              );
            }

            if (interaction?.code === '03') {
              this.handleShowErrorModal('toggle-failed');
              this.store.dispatch(
                ToggleEmailReset({
                  response: DATA_RESPONSE_INITIAL_STATE,
                  toggleType: 'google',
                })
              );
            }
          }
        })
      )
      .subscribe();
    this.subs.add(interaction);
  }

  handleShowErrorModal = async (type: string) => {
    const modal = await this.modalCtrl.create({
      component: UpdateFailedModal,
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
      componentProps: {
        type,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {});
  };

  handleToggleGoogleResponse(): void {
    const response = this.toggleEmailGoogleRes$
      .pipe(
        take(1),
        tap((data) => {
          this.toggleEmail =
            this.toggleEmailPayload?.googleAccount == 1 ? true : false;
        })
      )
      .subscribe();

    this.subs.add(response);
  }

  handleAppleInteraction(): void {
    const interaction = this.toggleEmailAppleInteractionRes$
      .pipe(
        filter((res) => !!res),
        tap((interaction) => {
          if (interaction?.type === InteractionType.SUCCEED) {
            this.handleToggleAppleResponse();
            this.store.dispatch(
              ToggleEmailReset({
                response: DATA_RESPONSE_INITIAL_STATE,
                toggleType: 'apple',
              })
            );
          }

          if (interaction?.type === InteractionType.FAILED) {
            if (interaction?.code === '02') {
              this.handleShowErrorModal('toggle-invalid');
              this.store.dispatch(
                ToggleEmailReset({
                  response: DATA_RESPONSE_INITIAL_STATE,
                  toggleType: 'apple',
                })
              );
            }

            if (interaction?.code === '03') {
              this.handleShowErrorModal('toggle-failed');
              this.store.dispatch(
                ToggleEmailReset({
                  response: DATA_RESPONSE_INITIAL_STATE,
                  toggleType: 'apple',
                })
              );
            }
          }
        })
      )
      .subscribe();
    this.subs.add(interaction);
  }

  handleToggleAppleResponse(): void {
    const response = this.toggleEmailAppleRes$
      .pipe(
        take(1),
        tap((data) => {
          this.toggleApple =
            this.toggleEmailPayload?.appleId == 1 ? true : false;
        })
      )
      .subscribe();

    this.subs.add(response);
  }

  // handleUserResponse(): void {
  //   const response = this.userResponse$
  //     .pipe(
  //       filter((res) => !!res),
  //       take(1),
  //       tap((res) => {
  //         if (!res) return;
  //         this.toggleNotification =
  //           res?.notificationToggle === '1' ? true : false;
  //         this.toggleEmail = res?.googleAccount === '1' ? true : false;
  //         this.toggleApple = res?.appleId === '1' ? true : false;
  //       })
  //     )
  //     .subscribe();

  //   this.subs.add(response);
  // }

  ngOnDestroy(): void {
    this.store.dispatch(
      ToggleEmailReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        toggleType: 'google',
      })
    );
    this.store.dispatch(
      ToggleEmailReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        toggleType: 'apple',
      })
    );
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.subs.unsubscribe();
  }

  public async toggleNotif(notification: boolean) {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {
      notificationToggle: !!notification ? '1' : '0',
    };
    if (payload.notificationToggle == '1') {
      const modal = await this.modalCtrl.create({
        component: PermissionRequestModalComponent,
        cssClass: 'modal-web ion-background-white option',
        componentProps: {
          title:
            'Izinkan Notifikasi untuk selalu mendapatkan informasi terkini seputar DPA dan Astra.',
        },
      });
      modal.present();

      modal.onDidDismiss().then(async ({ data }) => {
        if (data === 'pengaturan') {
          if (this.platform.is('ios')) {
            await NativeSettings.openIOS({
              option: IOSSettings.Notifications,
            });
          } else {
            await NativeSettings.openAndroid({
              option: AndroidSettings.AppNotification,
            });
          }
        }
      });
    }
    await this.store.dispatch(ToggleNotification({ payload }));
    this.toggleNotification = notification;
  }

  public async handleSignInGoogle() {}

  public async onToggleEmail(value: boolean) {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (value) {
      this.toggleEmailPayload = {
        googleAccount: 1,
      };
      const user = await GoogleAuth.signIn();
      if (!idProfilDpa) return;
      if (user) {
        await this.store.dispatch(
          ToggleEmail({
            payload: {
              googleAccount: encryptContent(user?.email?.toLowerCase()),
            },
            toggleType: 'google',
          })
        );
      }
    } else {
      this.toggleEmailPayload = {
        googleAccount: 0,
      };
      await this.store.dispatch(
        ToggleEmail({
          payload: { googleAccount: null },
          toggleType: 'google',
        })
      );
    }
  }

  public async onToggleApple(value: boolean) {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (value) {
      this.toggleEmailPayload = {
        appleId: 1,
      };
      this.handleSignInApple();
    } else {
      this.toggleEmailPayload = {
        appleId: 0,
      };
      await this.store.dispatch(
        ToggleEmail({
          payload: { appleId: null },
          toggleType: 'apple',
        })
      );
    }
  }

  public onSetExpand(target: string) {
    this.expanedMenu[target] = !this.expanedMenu[target];
  }

  public handlePageChange(): void {
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }

  isMobile = (): boolean => {
    if (
      isPlatform('capacitor') ||
      isPlatform('cordova') ||
      isPlatform('electron')
    ) {
      return true;
    }

    return false;
  };
}
