import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LoginData,
  NoPesertaData,
  OtpFormController,
  RequestOtp,
  RequestOtpDto,
  VerifyOtp,
  VerifyOtpInteractionReset,
} from '@controllers/auth';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { AuthOtpForm } from 'libs/components/auth/forms/otp/auth-otp.form';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, Subscription, filter, map, take, tap } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-auth-otp-container',
  templateUrl: './otp.container.html',
  styleUrls: ['./otp.container.scss'],
  providers: [OtpFormController, AuthRepository, AuthInteractionRepository],
})
export class AuthOtpContainer implements OnInit, OnDestroy, OnChanges {
  @ViewChild('form', { static: false }) public authOtpForm!: AuthOtpForm;

  private interactionSubs = new Subscription();
  private subscribtions = new Subscription();

  @Input() public type: 'email' | 'phonenumber' = 'email';
  @Input() public value: string | undefined | null;
  @Input() public menu: string | undefined | null = 'AUTH';
  @Input() public method: string = 'EMAIL';

  @Input() public isOpenModal!: boolean | null;
  public isModalVisible!: boolean | null;

  public requestOtpSuccess$: Observable<string | undefined | null>;
  public requestOtpError$: Observable<string | undefined | null>;

  public loginRes$: Observable<DataResponse<LoginData> | undefined | null>;

  public interactVerifyRes$: Observable<InteractionState>;

  public formGroup!: FormGroup;
  // public interactRes$: Observable<InteractionState>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleSetContainer();
  }

  @Output() public clicked: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();
  @Output() public backClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public closeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output() public completed: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();

  otpInterval: any = null;

  otpCounter: any = null;
  minutes: any = null;
  seconds: any = null;

  public isError: boolean | null = false;
  public verifyOtpSuccess$: Observable<string | undefined | null>;
  public verifyOtpError$: Observable<string | undefined | null>;

  constructor(
    private store: Store,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    formController: OtpFormController,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.formGroup = formController.create();
    this.loginRes$ = this.authRepo.getLogin$();
    this.interactVerifyRes$ = this.authInteractRepo.getVerifyOtpInteraction$();
    this.verifyOtpSuccess$ = this.authInteractRepo
      .getVerifyOtpInteraction$()
      .pipe(map((res) => res.success));
    this.verifyOtpError$ = this.authInteractRepo
      .getVerifyOtpInteraction$()
      .pipe(map((res) => res.error));

    this.requestOtpSuccess$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((res) => res.success));
    this.requestOtpError$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((res) => res.error));
  }

  private handleSetContainer() {
    this.isModalVisible = this.screenSizeService.isMobileNativeResolution()
      ? false
      : true;

    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interactionSubs.unsubscribe();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleSetContainer();
    }, 0);
    this.handleSetOtpResponse();
    this.handleInitializeVerifyOtpInteract();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  handleResetCounter(): void {
    this.otpCounter = null;
    this.minutes = null;
    this.seconds = null;
  }

  handleSetOtpResponse(): void {
    const interaction = this.authRepo
      .getRequestOtp$()
      .pipe(
        filter((res) => !!res),
        tap((res) => {
          clearInterval(this.otpInterval);

          if (res?.data?.timeExpired && res?.data?.timestamp) {
            const seconds =
              (new Date(res?.data?.timeExpired).getTime() -
                new Date(res?.data?.timestamp).getTime()) /
              1000;

            this.handleOtpCounter(seconds);
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  handleInitializeVerifyOtpInteract(): void {
    const interaction = this.interactVerifyRes$
      .pipe(
        tap((interaction: InteractionState) => {
          this.isError = false;
          if (interaction.type === InteractionType.SUCCEED) {
            this.store.dispatch(
              VerifyOtpInteractionReset({
                response: INITIAL_INTERACTION_STATE,
              })
            );
            this.templateService.handleChangeIonHeaderClass('md:hidden');
            this.isOpenModal = false;
            clearInterval(this.otpInterval);
            this.completed.emit();
            this.authOtpForm.handleResetOtpForm();
            this.handleResetCounter();
            this.cdr.markForCheck();
          } else if (interaction.type === InteractionType.FAILED) {
            this.isError = true;
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  public handleClearInterval() {}

  public handleChangeValue(value: string): void {
    this.isError = null;
  }

  async handleVerifyOtp(value: string) {
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
            method: this.method,
            otp: value,
            menu: this.menu,
          };
          this.store.dispatch(VerifyOtp({ payload }));
        })
      )
      .subscribe();
    this.interactionSubs.add(response);
  }

  handleResendOtp(): void {
    const response = this.loginRes$
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap((response: DataResponse<LoginData>) => {
          if (!this.value) return;
          const otpPayload: RequestOtpDto = {
            idProfilDpa: response?.data?.idProfilDpa || '',
            noHpEmail: this.value,
            method: this.method,
            menu: 'AUTH',
          };

          this.store.dispatch(RequestOtp({ payload: otpPayload }));
        })
      )
      .subscribe();
    this.subscribtions.add(response);
  }

  public handleOtpCounter(timer: number): void {
    this.otpCounter = timer;
    this.cdr.markForCheck();
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

  public async handleClose() {
    clearInterval(this.otpInterval);
    this.authOtpForm.handleResetOtpForm();
    this.isError = null;
    this.handleResetCounter();
    this.cdr.markForCheck();
    this.closeClicked.emit();
  }

  public async handleBack() {
    clearInterval(this.otpInterval);
    this.authOtpForm.handleResetOtpForm();
    this.isError = null;
    this.handleResetCounter();
    this.cdr.markForCheck();
    this.backClicked.emit();
  }

  public async handleSubmit() {
    clearInterval(this.otpInterval);
    this.authOtpForm.handleResetOtpForm();
    this.isError = null;
    this.handleResetCounter();
    this.cdr.markForCheck();
    this.clicked.emit();
  }
}
