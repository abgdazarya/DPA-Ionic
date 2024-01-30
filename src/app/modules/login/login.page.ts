import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import {
  Auth,
  OAuthProvider,
  UserCredential,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  SignInWithApple,
  SignInWithAppleOptions,
  SignInWithAppleResponse,
} from '@capacitor-community/apple-sign-in';
import { Capacitor } from '@capacitor/core';
import { AuthVerificationMethodModal } from '@components/auth';
import {
  CreatePinInteractionReset,
  GetNoPeserta,
  GetNoPesertaDto,
  GetNoPesertaInteractionReset,
  GetNoPesertaReset,
  GetToken,
  GetTokenByIdProfil,
  Login,
  LoginData,
  LoginFormController,
  LoginInteractionReset,
  LoginReset,
  NoPesertaData,
  RequestOtp,
  RequestOtpData,
  RequestOtpDto,
  RequestOtpInteractionReset,
  RequestOtpReset,
  VerifyOtpData,
  VerifyOtpInteractionReset,
  VerifyOtpReset,
  VerifyReferralCodeInteractionReset,
} from '@controllers/auth';
import { Notification, NotificationEnum, UserInfo } from '@controllers/profile';
import { ModalController, ToastController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponseArray,
  FormValue,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
  decryptContent,
  encryptContent,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';
import jwt_decode from 'jwt-decode';
import { LoginDto } from 'libs/controllers/auth/dtos/login.dto';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import {
  Observable,
  Subscription,
  combineLatest,
  filter,
  from,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { AppComponentService } from 'src/app/app.component.service';
import { AppMainTemplateService } from '../../templates/main/main.template.service';
import { LoginPageService } from './login.page.service';
import { TokenInfoComponent } from 'libs/components/auth/modals/token-info/token-info.component';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProfileRepository,
    ProfileInteractionRepository,
    AuthRepository,
    AuthInteractionRepository,
    LoginFormController,
  ],
})
export class LoginPage
  implements OnInit, OnDestroy, AfterViewInit, AfterContentInit
{
  private subscribtions = new Subscription();
  private profileSubscribtions = new Subscription();

  public loginRes$: Observable<DataResponse<LoginData> | undefined | null>;
  public loginInteractRes$: Observable<InteractionState>;
  public loginInteractReSinggle$: Observable<InteractionState>;

  public requestOtpRes$: Observable<
    DataResponse<RequestOtpData> | undefined | null
  >;
  public requestOtpInteractRes$: Observable<InteractionState>;

  public noPesertaRes$: Observable<
    DataResponseArray<NoPesertaData> | undefined | null
  >;
  public noPesertaInteractRes$: Observable<InteractionState>;
  public noPeserta: NoPesertaData | undefined | null;

  public loginSuccess$: Observable<string | undefined | null>;
  public loginError$: Observable<string | undefined | null>;

  public requestOtpSuccess$: Observable<string | undefined | null>;
  public requestOtpError$: Observable<string | undefined | null>;

  public idProfilDpa: string | undefined | null;
  public token: string | undefined | null;

  public formGroup: FormGroup;
  public formGroupGoogle: FormGroup;
  public isServiceAuth: boolean = false;
  public appleEmail: boolean = false;

  public prevAction!: string;

  public isModalOtpOpen: boolean = false;
  public isModalOtpType: 'email' | 'phonenumber' = 'email';
  public isModalOtpValue: string = '';

  public method: string = 'EMAIL';

  private statusCode: string | undefined | null = '';
  private loginResponseRaw: any = null;
  private responseVerifyPin: any = null;

  public isUseBiomteric$: Observable<string | undefined | null> = of(
    this.storageService.getStorage(StorageKeyEnum.BIOMETRIC)
  );

  public biometricResult$: Observable<AvailableResult> = from(
    NativeBiometric.isAvailable()
  );

  public username!: string;
  public subribeTokenProcess: any = null;
  public isUsingThirParty: boolean = false;
  public loginThirdPartyError: boolean = false;

  public constructor(
    loginForm: LoginFormController,
    private modalCtrl: ModalController,
    private store: Store,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    public appService: AppComponentService,
    public pageService: LoginPageService,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    private profileRepo: ProfileRepository,
    private profileInteractRepo: ProfileInteractionRepository,
    public storageService: StorageService,
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController
  ) {
    this.formGroup = loginForm.create();
    this.formGroupGoogle = loginForm.create();

    this.loginRes$ = this.authRepo.getLogin$();
    this.loginInteractRes$ = this.authInteractRepo.getLoginInteraction$();
    this.loginInteractReSinggle$ = this.authInteractRepo.getLoginInteraction$();

    this.requestOtpRes$ = this.authRepo.getRequestOtp$();
    this.requestOtpInteractRes$ =
      this.authInteractRepo.getRequestOtpInteraction$();

    this.noPesertaRes$ = this.authRepo.getNoPeserta$();
    this.noPesertaInteractRes$ =
      this.authInteractRepo.getNoPesertaInteraction$();

    this.loginSuccess$ = this.authInteractRepo
      .getLoginInteraction$()
      .pipe(map((res) => res.success));
    this.loginError$ = this.authInteractRepo
      .getLoginInteraction$()
      .pipe(map((res) => res.error));

    this.requestOtpSuccess$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((res) => res.success));
    this.requestOtpError$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((res) => res.error));
    this.subribeTokenProcess = this.loginInteractReSinggle$.subscribe(
      this.handlePopupTokenColector
    );
  }

  private modularPopup: ModalController | any = null;
  handlePopupTokenColector = async (e: InteractionState) => {
    if (!this.isUsingThirParty) return;
    if (e.type == InteractionType.PROCESS) {
      this.loginThirdPartyError = false;
    }

    if (e.type == InteractionType.FAILED) {
      if (this.modularPopup !== null) {
        this.modularPopup.dismiss();
      }
      if (e.code == '03') {
        const modal = await this.modalCtrl.create({
          component: TokenInfoComponent,
          backdropDismiss: false,
          cssClass: this.screenSizeService.isDesktopNativeResolution()
            ? 'modal-web ion-background-white'
            : 'modal-web ion-background-transparent',
          componentProps: {
            renderText:
              'Anda belum pernah mendaftarkan Google/Apple Account untuk aktivasi akun.',
            renderSubText:
              'Silahkan aktifkan pengaturan pada biodata anda dengan login melalui pengisian email pada kolom yang disediakan terlebih dahulu.',
          },
        });
        modal.present();
      } else {
        this.loginThirdPartyError = true;
        setTimeout(() => {
          this.loginThirdPartyError = false;
        }, 3000);
      }
    }
  };

  getFormValue(field?: string): any {
    if (field) {
      return this.formGroup.controls[field].value;
    }

    return this.formGroup.value;
  }

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {}

  @HostListener('window:resize')
  public onResize() {
    this.handleChangeTemplateService();
  }

  async handleBiometricSignIn() {
    this.isUsingThirParty = false;
    const isUseBiometric = await this.storageService.getStorage(
      StorageKeyEnum.BIOMETRIC
    );
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return;

    const verified = await NativeBiometric.verifyIdentity({
      reason: 'For easy log in',
      title: 'Log in myDPA',
      subtitle: '',
      description:
        'Anda akan login menggunakan metode biometrik ke akun anda sebelumnya',
    })
      .then(() => true)
      .catch(() => false);

    if (!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: 'com.dpareborn.id',
    });

    if (credentials && isUseBiometric) {
      this.isServiceAuth = true;
      this.username = decryptContent(isUseBiometric?.username);
      this.store.dispatch(
        GetTokenByIdProfil({
          payload: {
            idProfilDpa: isUseBiometric?.idProfilDpa,
          },
        })
      );
    }
  }

  handleChangeTemplateService() {
    combineLatest([
      this.pageService.isOtpModalShow$,
      this.pageService.isReferralCodeModalShow$,
      this.pageService.isPinModalShow$,
      this.pageService.isUserNumberModalShow$,
    ])
      .pipe(
        take(1),
        tap((show) => {
          this.templateService.handleInit();
          this.templateService.handleChangeFooterClass('hidden md:hidden');

          this.templateService.handleChangeIonHeaderClass(
            show.some((res) => res) ? 'hidden md:hidden' : 'md:hidden'
          );

          this.templateService.handleChangeHeaderContainerClass(
            'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none h-[96px]'
          );

          this.templateService.handleChangePageTitle('Login');
          this.templateService.handleUseSecondaryHeader(true);
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);

    this.handleInitalizeLoginInteraction();
    this.handleInitalizeNoPesertaInteraction();
    this.handleInitalizeRequestOtpInteraction();
    this.handleFetchProfileResponse();
    this.handleVerifyOtpResponse();
    this.appService.handleShowLoadingPending(false);
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      GetNoPesertaReset({ response: DATA_RESPONSE_INITIAL_STATE })
    );
    this.store.dispatch(
      GetNoPesertaInteractionReset({ response: INITIAL_INTERACTION_STATE })
    );

    this.store.dispatch(LoginReset({ response: DATA_RESPONSE_INITIAL_STATE }));
    this.store.dispatch(
      LoginInteractionReset({ response: INITIAL_INTERACTION_STATE })
    );

    this.store.dispatch(
      RequestOtpReset({ response: DATA_RESPONSE_INITIAL_STATE })
    );
    this.store.dispatch(
      RequestOtpInteractionReset({ response: INITIAL_INTERACTION_STATE })
    );

    this.store.dispatch(
      VerifyOtpReset({ response: DATA_RESPONSE_INITIAL_STATE })
    );
    this.store.dispatch(
      VerifyOtpInteractionReset({ response: INITIAL_INTERACTION_STATE })
    );

    this.subscribtions.unsubscribe();
    this.profileSubscribtions.unsubscribe();
    this.subribeTokenProcess.unsubscribe();
    this.isUsingThirParty = false;
  }

  //  Login Function
  handleLogin(formValue: FormValue<LoginDto>): void {
    this.isUsingThirParty = false;
    if (!formValue.isValid || !formValue.value) return;
    this.username = formValue.value.username?.toLowerCase();
    this.store.dispatch(Login({ payload: formValue.value }));
  }

  // Login Interaction
  handleInitalizeLoginInteraction(): void {
    const resetFunction = () => {
      setTimeout(() => {
        this.store.dispatch(
          LoginInteractionReset({ response: INITIAL_INTERACTION_STATE })
        );
      }, 5000);
    };

    const interaction = this.loginInteractRes$
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.FAILED:
              resetFunction();
              break;
            case InteractionType.SUCCEED:
              this.handleLoginResponse();
              resetFunction();
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  // Need Verification Interaction
  // handleInitalizeNeedVerificationInteraction(): void {
  //   const resetFunction = () => {
  //     setTimeout(() => {
  //       this.store.dispatch(
  //         NeedVerificationInteractionReset({
  //           response: INITIAL_INTERACTION_STATE,
  //         })
  //       );
  //     }, 5000);
  //   };

  //   const interaction = this.authInteractRepo
  //     .getNeedVerificationInteraction$()
  //     .pipe(
  //       tap((interaction: InteractionState) => {
  //         this.appService.handleShowLoadingPending(
  //           interaction.isLoading || false,
  //           'need verification'
  //         );

  //         if (interaction.type === InteractionType.SUCCEED) {
  //           this.handleNeedVerificationResponse();
  //         }
  //       })
  //     )
  //     .subscribe();

  //   this.subscribtions.add(interaction);
  // }

  // No Peserta Interaction
  handleInitalizeNoPesertaInteraction(): void {
    const resetFunction = () => {
      setTimeout(() => {
        this.store.dispatch(
          GetNoPesertaInteractionReset({
            response: INITIAL_INTERACTION_STATE,
          })
        );
      }, 5000);
    };

    const interaction = this.noPesertaInteractRes$
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.FAILED:
              this.handleGetNoPesertaResponse();
              resetFunction();
              break;
            case InteractionType.SUCCEED:
              this.handleGetNoPesertaResponse();
              resetFunction();
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  // Request OTP Interaction
  handleInitalizeRequestOtpInteraction(): void {
    const resetFunction = () => {
      setTimeout(() => {
        this.store.dispatch(
          RequestOtpInteractionReset({
            response: INITIAL_INTERACTION_STATE,
          })
        );
      }, 5000);
    };

    const interaction = this.requestOtpInteractRes$
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.FAILED:
              resetFunction();
              break;
            case InteractionType.SUCCEED:
              this.handleRequestOtpResponse();
              resetFunction();
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  // Login Response
  handleLoginResponse(): void {
    const response = this.loginRes$
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap((response: DataResponse<LoginData>) => {
          this.idProfilDpa = response?.data?.idProfilDpa;
          this.statusCode = response?.code;
          this.loginResponseRaw = response;

          if (!response?.data?.idProfilDpa) return;
          if (this.isServiceAuth) {
            const { token, refreshToken, timestamp } = response?.data || {};
            if (token && refreshToken && timestamp) {
              this.storageService.setStorage(StorageKeyEnum.TOKEN, token);
              this.storageService.setStorage(
                StorageKeyEnum.REFRESH_TOKEN,
                refreshToken
              );
              this.storageService.setStorage(
                StorageKeyEnum.TIMESTAPM,
                timestamp
              );
            }
            // If login use google or apple auth
            this.handleOpenPinModal(response);
            return;
          }

          // If login use email input
          const value: string = this.getFormValue('username');

          if (value.includes('@')) {
            this.method = 'EMAIL';
            const otpPayload: RequestOtpDto = {
              idProfilDpa: response?.data?.idProfilDpa,
              noHpEmail: value,
              method: 'EMAIL',
              menu: 'AUTH',
            };

            this.store.dispatch(RequestOtp({ payload: otpPayload }));

            this.cdr.markForCheck();
            return;
          }

          this.handleOpenVerificationMethodModal(
            value,
            response?.data?.idProfilDpa
          );
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  // Need Verification Response
  // handleNeedVerificationResponse(): void {
  //   const response = combineLatest([
  //     this.authRepo.getVerifyOtp$(),
  //     this.authRepo.getNeedVerification$(),
  //   ])
  //     .pipe(
  //       take(1),
  //       tap(([otpRes, needRes]) => {
  //         switch (needRes?.code) {
  //           case '00':
  //             if (otpRes?.data?.pin || otpRes?.data?.pin === 1) {
  //               this.handleOpenReferralCodeModal();
  //               return;
  //             }

  //             this.pageService.handleShowPinModal(true);
  //             this.handleChangeTemplateService();
  //             this.handleOpenPinModal(otpRes);
  //             break;

  //           default:
  //             break;
  //         }
  //       })
  //     )
  //     .subscribe();

  //   this.subscribtions.add(response);
  // }

  handleVerifyOtpResponse(): void {
    const response = this.authRepo
      .getVerifyOtp$()
      .pipe(
        filter((res: any) => !!res),
        tap((response: DataResponse<VerifyOtpData>) => {
          if (response.data?.token) {
            const { token, refreshToken, timestamp } = response?.data || {};
            if (token && refreshToken && timestamp) {
              this.storageService.setStorage(StorageKeyEnum.TOKEN, token);
              this.storageService.setStorage(
                StorageKeyEnum.REFRESH_TOKEN,
                refreshToken
              );
              this.storageService.setStorage(
                StorageKeyEnum.TIMESTAPM,
                timestamp
              );
            }

            setTimeout(() => {
              this.handleOpenPinModal(response);
            }, 0);
          }
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  // No Peserta Response
  handleGetNoPesertaResponse(): void {
    const response = combineLatest([this.noPesertaRes$, this.loginRes$])
      .pipe(
        filter((res: any) => !!res),
        take(1),
        map(([noPeserta, login]) => {
          if (!noPeserta?.data?.length && noPeserta?.code === '01') {
            this.continueProceedAfterVerifyPin(this.responseVerifyPin);
          }

          if (noPeserta?.data?.length === 1) {
            this.noPeserta = noPeserta?.data[0];
            this.continueProceedAfterVerifyPin(this.responseVerifyPin);
          } else {
            this.handleOpenUserNumberModal();
          }
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  // Request OTP Response
  // Finish
  handleRequestOtpResponse(): void {
    const response = this.requestOtpRes$
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap((response: DataResponse<RequestOtpData>) => {
          switch (response?.code) {
            case '00':
              // this.handleOpenOtpModal();
              const regexExp =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

              const value: string = this.getFormValue('username');

              const type = regexExp.test(value) ? 'email' : 'phonenumber';

              this.pageService.handleShowOtpModal(true);
              this.handleChangeTemplateService();
              this.isModalOtpType = type;
              this.isModalOtpValue = value;

              break;

            default:
              break;
          }
        })
      )
      .subscribe();
    this.subscribtions.add(response);
  }

  handleRequestOtpCompleted(): void {
    setTimeout(() => {
      this.pageService.handleShowOtpModal(false);
      this.handleChangeTemplateService();
      this.store.dispatch(
        RequestOtpInteractionReset({
          response: INITIAL_INTERACTION_STATE,
        })
      );

      this.handleOpenPinModal();
      // this.authRepo
      //   .getVerifyOtp$()
      //   .pipe(
      //     take(1),
      //     tap((res) => {
      //       res?.data.

      //       // this.store.dispatch(NeedVerification({}));
      //     })
      //   )
      //   .subscribe();
    }, 0);
  }

  // handleRequestOtpBack(): void {
  //   setTimeout(() => {
  //     this.pageService.handleShowOtpModal(false);
  //     this.handleChangeTemplateService();

  //     if (this.prevAction === 'method') {
  //       this.handleLoginResponse();
  //     }
  //   }, 0);
  // }

  handleUserNumberCompleted(res: NoPesertaData | null): void {
    setTimeout(() => {
      this.noPeserta = res;
      this.handleSelectPeserta();
      this.pageService.handleShowUserNumberModal(false);
      this.handleChangeTemplateService();
    }, 0);
  }

  handleReferralCodeCompleted(): void {
    setTimeout(() => {
      this.pageService.handleShowReferralCodeModal(false);
      this.handleChangeTemplateService();
      this.store.dispatch(
        VerifyReferralCodeInteractionReset({
          response: INITIAL_INTERACTION_STATE,
        })
      );

      const action = combineLatest([this.authRepo.getLogin$()])
        .pipe(
          filter((res: any) => !!res),
          take(1),
          tap(async ([res]) => {
            if (this.noPeserta) {
              this.storageService.setStorage(
                StorageKeyEnum.NOMOR_PESERTA,
                this.noPeserta
              );
            }

            this.storageService.setStorage(
              StorageKeyEnum.ID_PROFILE_DPA,
              res?.data?.idProfilDpa
            );
            this.storageService.setStorage(
              StorageKeyEnum.ID_ACCOUNT_DPA,
              this.noPeserta?.idAccount
            );
            if (this.isServiceAuth) {
              const { token, refreshToken, timestamp } = res?.data || {};
              if (token && refreshToken && timestamp) {
                this.storageService.setStorage(StorageKeyEnum.TOKEN, token);
                this.storageService.setStorage(
                  StorageKeyEnum.REFRESH_TOKEN,
                  refreshToken
                );
                this.storageService.setStorage(
                  StorageKeyEnum.TIMESTAPM,
                  timestamp
                );
              }
            }

            const isUseBiometric = await this.storageService.getStorage(
              StorageKeyEnum.BIOMETRIC
            );
            if (isUseBiometric?.username !== encryptContent(this.username)) {
              this.storageService.removeStorage(StorageKeyEnum.BIOMETRIC);
            }

            this.appService.handleShowLoadingPending(
              true,
              'referral code completed trigger'
            );

            setTimeout(() => {
              this.fetchProfile(res?.data?.idProfilDpa);
            }, 0);
          })
        )
        .subscribe();

      this.subscribtions.add(action);
    }, 0);
  }

  handlePinCompleted(): void {
    setTimeout(() => {
      this.pageService.handleShowPinModal(false);
      this.store.dispatch(
        CreatePinInteractionReset({
          response: INITIAL_INTERACTION_STATE,
        })
      );

      this.handleOpenReferralCodeModal();
    }, 0);
  }

  async fetchProfile(idProfilDpa: string) {
    const payload = {};

    if (!idProfilDpa) return;
    this.store.dispatch(UserInfo({ payload }));
    this.store.dispatch(
      Notification({
        payload: {},
        dataType: 'header',
      })
    );
  }

  handleFetchProfileResponse(): void {
    const response = this.profileRepo
      .getUserInfoData$()
      .pipe(
        filter((res) => !!res),
        tap((res: any) => {
          if (res?.statusVerify && res?.statusVerify === 'Y') {
            this.storageService.setStorage(StorageKeyEnum.LOG_CONDITION, true);
            this.router.navigateByUrl('/home');
          }

          if (res?.statusVerify && res?.statusVerify === 'N') {
            this.storageService.setStorage(StorageKeyEnum.LOG_CONDITION, true);
            this.appService.handleBackFunction(() => {
              this.router.navigateByUrl('/profile');
            });
            this.router.navigateByUrl('/profile/bio');
          }
        })
      )
      .subscribe();

    const interaction = this.profileInteractRepo
      .getUserInfoInteraction$()
      .pipe(
        filter((res: any) => !!res),
        tap((interaction: InteractionState) => {
          if (interaction.type === InteractionType.SUCCEED) {
            this.appService.handleShowLoadingPending(
              false,
              'user info interaction success trigger'
            );
          }
          if (interaction.type === InteractionType.FAILED) {
            this.appService.handleShowLoadingPending(
              false,
              'user info interaction failed trigger'
            );
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();
    this.profileSubscribtions.add(response);
    this.profileSubscribtions.add(interaction);
  }

  // Select Peserta
  handleSelectPeserta(): void {
    const response = combineLatest([this.noPesertaRes$, this.loginRes$])
      .pipe(
        filter((res: any) => !!res),
        take(1),
        map(([noPeserta, login]) => {
          this.continueProceedAfterVerifyPin(login);
          return;
        })
      )
      .subscribe();
    this.subscribtions.add(response);
  }

  public handleSignInApple() {
    this.isServiceAuth = true;
    this.isUsingThirParty = true;
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
        if (res) {
          const email: string | null = res.user.email;
          this.username = <string>email?.toLowerCase();
          res?.user?.getIdToken().then((idToken) => {
            const token = idToken;
            this.store.dispatch(
              GetToken({ payload: { token, type: 'APPLE' } })
            );
          });
        }
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
        const token = res.response.identityToken;
        const email: any = res.response.email;
        if (email) {
          this.store.dispatch(GetToken({ payload: { token, type: 'APPLE' } }));
        } else {
          const decodeRes: any = jwt_decode(res.response.identityToken);

          if (decodeRes?.email) {
            const email: string = decodeRes?.email;
            this.username = <string>email?.toLowerCase();
            this.store.dispatch(
              GetToken({ payload: { token, type: 'APPLE' } })
            );
          }
        }
      })
      .catch((err) => {});
  }

  public async handleSignInGoogle() {
    this.isUsingThirParty = true;
    const user = await GoogleAuth.signIn();

    if (user) {
      const token = user.authentication.idToken;
      this.username = user.email?.toLowerCase();
      this.isServiceAuth = true;
      this.store.dispatch(GetToken({ payload: { token, type: 'GOOGLE' } }));
    }
  }

  handleOpenUserNumberModal() {
    const action = combineLatest([this.noPesertaRes$])
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap(async ([res]) => {
          if (!res?.data) return;

          this.pageService.handleShowUserNumberModal(true);
          this.handleChangeTemplateService();
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  async handleOpenVerificationMethodModal(number: string, idProfilDpa: string) {
    const modal = await this.modalCtrl.create({
      component: AuthVerificationMethodModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        number,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.method) {
        this.prevAction = 'method';
        this.method = data?.method;
        const otpPayload: RequestOtpDto = {
          idProfilDpa: idProfilDpa,
          noHpEmail: number,
          method: data?.method,
          menu: 'AUTH',
        };

        this.cdr.markForCheck();

        this.store.dispatch(RequestOtp({ payload: otpPayload }));
      }
      if (data?.added) {
        // this.handleOpenReferralCodeModal();
      }
      if (data?.back) {
        if (this.prevAction === 'method') {
          this.handleLoginResponse();
        }
        // this.handleOpenUserNumberModal();
      }
    });
  }

  continueProceedAfterVerifyPin = (res: any) => {
    if (res?.data?.pin || res?.data?.pin === 1) {
      if (this.isServiceAuth) {
        const { token, refreshToken, timestamp } = res?.data || {};
        if (token && refreshToken && timestamp) {
          this.storageService.setStorage(StorageKeyEnum.TOKEN, token);
          this.storageService.setStorage(
            StorageKeyEnum.REFRESH_TOKEN,
            refreshToken
          );
          this.storageService.setStorage(StorageKeyEnum.TIMESTAPM, timestamp);
        }
      }
      this.handleOpenReferralCodeModal();
      return;
    }

    this.pageService.handleShowPinModal(true);
    this.handleChangeTemplateService();
  };

  handleOpenPinModal(response: any = this.loginResponseRaw) {
    const action = combineLatest([this.authRepo.getLogin$()])
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap(async ([res]) => {
          this.responseVerifyPin = res;
          if (this.statusCode == '01') {
            if (!response?.data?.idProfilDpa) return;
            const noPesertaPayload: GetNoPesertaDto = {
              idProfilDpa: response?.data?.idProfilDpa,
              username: this.username,
            };

            this.store.dispatch(GetNoPeserta({ payload: noPesertaPayload }));
          } else {
            this.continueProceedAfterVerifyPin(res);
          }
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  handleOpenReferralCodeModal() {
    const action = combineLatest([this.authRepo.getLogin$()])
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap(async ([res]) => {
          if (res?.data?.referal || res?.data?.referal === 1) {
            if (this.noPeserta) {
              this.storageService.setStorage(
                StorageKeyEnum.NOMOR_PESERTA,
                this.noPeserta || null
              );
            }
            this.storageService.setStorage(
              StorageKeyEnum.ID_PROFILE_DPA,
              res?.data?.idProfilDpa
            );
            this.storageService.setStorage(
              StorageKeyEnum.ID_ACCOUNT_DPA,
              this.noPeserta?.idAccount
            );
            if (this.isServiceAuth) {
              const { token, refreshToken, timestamp } = res?.data || {};
              if (token && refreshToken && timestamp) {
                this.storageService.setStorage(StorageKeyEnum.TOKEN, token);
                this.storageService.setStorage(
                  StorageKeyEnum.REFRESH_TOKEN,
                  refreshToken
                );
                this.storageService.setStorage(
                  StorageKeyEnum.TIMESTAPM,
                  timestamp
                );
              }
            }

            const isUseBiometric = await this.storageService.getStorage(
              StorageKeyEnum.BIOMETRIC
            );
            if (isUseBiometric?.username !== encryptContent(this.username)) {
              this.storageService.removeStorage(StorageKeyEnum.BIOMETRIC);
            }

            this.appService.handleShowLoadingPending(
              true,
              'referral code open trigger'
            );

            setTimeout(() => {
              this.fetchProfile(res?.data?.idProfilDpa);
            }, 0);

            return;
          }

          this.pageService.handleShowReferralCodeModal(true);
          this.handleChangeTemplateService();
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }
}
