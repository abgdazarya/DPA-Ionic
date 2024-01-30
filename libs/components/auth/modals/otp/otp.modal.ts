import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  LoginData,
  VerifyOtp,
  VerifyOtpInteractionReset,
} from '@controllers/auth';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, Subscription, filter, map, take, tap } from 'rxjs';

@Component({
  selector: 'auth-otp-modal',
  templateUrl: './otp.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class AuthOtpModal implements OnInit, OnDestroy {
  private subscribtions = new Subscription();

  @Input() public type: 'email' | 'phonenumber' = 'email';
  @Input() public value: string | undefined | null;
  @Input() public menu: string | undefined | null = 'AUTH';

  @Input() public data: any = null;
  @Input() public idProfilDpa: any = null;
  @Input() public requestOptForgetPin: any = null;

  @ViewChild('firstInput', { static: false }) public firstInput: any;
  @ViewChild('secondInput', { static: false }) public secondInput: any;
  @ViewChild('thirdInput', { static: false }) public thirdInput: any;
  @ViewChild('fourthInput', { static: false }) public fourthInput: any;

  public loginRes$: Observable<DataResponse<LoginData> | undefined | null>;

  public interactVerifyRes$: Observable<InteractionState>;

  otpInterval: any = null;

  otpCounter = 0;
  minutes = 4;
  seconds = 59;

  isError: boolean | null = false;
  public verifyOtpSuccess$: Observable<string | undefined | null>;
  public verifyOtpError$: Observable<string | undefined | null>;
  public requestError$: Observable<string | undefined | null>;
  public requestOptState$: Observable<InteractionState>;
  public isLoading: boolean = false;

  constructor(
    private store: Store,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService
  ) {
    this.loginRes$ = this.authRepo.getLogin$();
    this.interactVerifyRes$ = this.authInteractRepo.getVerifyOtpInteraction$();
    this.requestError$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((res) => res.error));
    this.verifyOtpSuccess$ = this.authInteractRepo
      .getVerifyOtpInteraction$()
      .pipe(map((res) => res.success));
    this.verifyOtpError$ = this.authInteractRepo
      .getVerifyOtpInteraction$()
      .pipe(map((res) => res.error));

    this.requestOptState$ = this.authInteractRepo.getRequestOtpInteraction$();
    this.requestOptState$.subscribe((e) => {
      if (e.isLoading) {
        this.isLoading = true;
      }
      if (e.type == InteractionType.SUCCEED) {
        this.handleOtpCounter();
        this.isLoading = false;
      }
      if (e.type == InteractionType.FAILED) {
        this.isLoading = false;
      }
    });
  }

  public getEncryptedValue(): string {
    if (!this.value) return '';

    let text = this.value;

    if (this.type === 'email') {
      return `${'&#x2022;'.repeat(text?.split('@')[0].length - 3)} ${text
        ?.split('@')[0]
        .substring(text?.split('@')[0].length - 3)}@${text?.split('@')[1]}`;
    }

    if (this.type === 'phonenumber') {
      return `${'&#x2022;'.repeat(text?.length - 3)} ${text.substring(
        text?.length - 3
      )}`;
    }

    return '';
  }

  public ngOnInit(): void {
    // this.handleOtpCounter();
    this.handleInitializeVerifyOtpInteract();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  public handleOtpCounter(): void {
    this.otpCounter = 300;
    this.otpInterval = setInterval(() => {
      this.otpCounter -= 1;
      this.seconds = this.otpCounter % 60;
      this.minutes = Math.floor(this.otpCounter / 60);
      if (this.otpCounter <= 0) {
        clearInterval(this.otpInterval);
      }

      this.cdr.markForCheck();
    }, 1000);
  }

  public handleBack = async () => {
    await this.modalCtrl.dismiss({ back: true });
  };

  public async handleClose() {
    await this.modalCtrl.dismiss({ back: true });
  }

  handleInitializeVerifyOtpInteract(): void {
    this.store.dispatch(
      VerifyOtpInteractionReset({
        response: INITIAL_INTERACTION_STATE,
      })
    );
    const interaction = this.interactVerifyRes$
      .pipe(
        tap((interaction: InteractionState) => {
          if (interaction.type === InteractionType.SUCCEED) {
            this.isError = false;
            this.modalCtrl.dismiss({ succeed: true });

            this.store.dispatch(
              VerifyOtpInteractionReset({
                response: INITIAL_INTERACTION_STATE,
              })
            );
          } else if (interaction.type === InteractionType.FAILED) {
            this.isError = true;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  async handleVerifyOtp(value: string) {
    this.store.dispatch(
      VerifyOtpInteractionReset({
        response: INITIAL_INTERACTION_STATE,
      })
    );
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    const response = this.loginRes$
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap((response: DataResponse<LoginData>) => {
          const payload = {
            idProfilDpa: response?.data?.idProfilDpa || idProfilDpa,
            otp: value,
            menu: this.menu,
            method: this.type.toUpperCase(),
          };

          this.store.dispatch(VerifyOtp({ payload }));
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  public handleChangeValue(index: number, e: any): void {
    if (isNaN(e.target.value)) {
      e.target.value = null;
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    this.isError = null;

    if (e.detail.event.inputType === 'deleteContentBackward') {
      return;
    }

    this.handleSetValue(index, isNaN(e.target.value) ? null : e.target.value);

    const value =
      this.firstInput.value +
      this.secondInput.value +
      this.thirdInput.value +
      this.fourthInput.value;

    if (value?.length == 4) {
      this.handleVerifyOtp(value);
    }

    if (index >= 3) return;
    this.handleFocus(index + 1);
  }

  public handleDeleteValue(index: number, e: any): void {
    this.isError = null;
    if (e.code === 'Backspace') {
      this.handleSetValue(index, null);

      if (index <= 0) return;
      this.handleFocus(index - 1);
    }
  }

  public handleFocus(index: number): void {
    switch (index) {
      case 0:
        this.firstInput.setFocus().then();
        break;
      case 1:
        this.secondInput.setFocus().then();
        break;
      case 2:
        this.thirdInput.setFocus().then();
        break;
      case 3:
        this.fourthInput.setFocus().then();
        break;
    }
  }

  public handleSetValue(index: number, value: any): void {
    switch (index) {
      case 0:
        this.firstInput.value = value;
        break;
      case 1:
        this.secondInput.value = value;
        break;
      case 2:
        this.thirdInput.value = value;
        break;
      case 3:
        this.fourthInput.value = value;
        break;
    }
  }

  reRequest = () => {
    this.isLoading = true;
    if (this.requestOptForgetPin) {
      this.requestOptForgetPin(this.data, this.idProfilDpa, true);
    }
    this.handleInitializeVerifyOtpInteract();
    // this.modalCtrl.dismiss({ request: true });
  };
}
