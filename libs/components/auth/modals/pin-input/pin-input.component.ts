import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { VerifyPin, VerifyPinData } from '@controllers/auth';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { CodeInputModule } from 'angular-code-input';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { Observable, filter, tap } from 'rxjs';
@Component({
  selector: 'app-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss'],
  standalone: true,
  imports: [
    NgOtpInputModule,
    HeaderSecondComponent,
    IonicModule,
    CommonModule,
    CodeInputModule,
    CommonAlertComponentModule,
  ],
  providers: [AuthRepository, AuthInteractionRepository],
})
export class PinInputComponent {
  @Input() length: number = 6;
  @Input() expectedPin: string | undefined = undefined;
  @Input() allowNumbersOnly: boolean = true;
  @Input() isPasswordInput: boolean = false;
  @ViewChild('firstInput', { static: false }) public firstInput: any;
  @ViewChild('secondInput', { static: false }) public secondInput: any;
  @ViewChild('thirdInput', { static: false }) public thirdInput: any;
  @ViewChild('fourthInput', { static: false }) public fourthInput: any;
  @ViewChild('fiveInput', { static: false }) public fiveInput: any;
  @ViewChild('sixInput', { static: false }) public sixInput: any;

  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput:
    | NgOtpInputComponent
    | any;
  isWrong: boolean = false;
  isCorrect: boolean = false;
  isError: boolean | null = false;
  wrongCounter = 2;
  ngOtpInputRef!: NgOtpInputComponent;
  public response$: Observable<DataResponse<VerifyPinData> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  errorMessage: string = '';
  public otpInput: any;
  public tempSrtingOtp: string = '';
  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private authRepo: AuthRepository,
    private authRepoInteraction: AuthInteractionRepository,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService
  ) {
    this.response$ = this.authRepo.getVerifyPin$();
    this.interactionResponse$ =
      this.authRepoInteraction.getVerifyPinInteraction$();
    this.response$.subscribe((e) => {
      if (e?.data) {
        this.storageService.setStorage(
          StorageKeyEnum.TOKEN_SALDO,
          e.data?.token
        );
      }
    });
  }

  onOtpChange(pin: string) {
    this.tempSrtingOtp = pin;
    this.isWrong = false;
    this.isError = false;
    if (pin.length === this.length) {
      const inputElement: HTMLInputElement =
        document.querySelectorAll('input')[5];
      inputElement.blur();
      this.verifyPin(pin);
      if (this.errorMessage) {
        this.wrongCounter--;
        if (this.wrongCounter === 0) {
          this.isWrong = true;
          this.ngOtpInputRef.otpForm.disable();
        }
      }
      this.isWrong = false;
      this.errorMessage = '';
    }
  }

  onInput = (e: any = {}) => {
    var key = e?.keyCode || e?.charCode;
    if (key == 8 || key == 46) {
      this.ngOtpInput.setValue(this.tempSrtingOtp);
    }
  };

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
      this.fourthInput.value +
      this.fiveInput.value +
      this.sixInput.value;

    if (value?.length == 6) {
      this.verifyPin(value);
    }

    if (index >= 5) return;
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
      case 4:
        this.fiveInput.setFocus().then();
        break;
      case 5:
        this.sixInput.setFocus().then();
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
      case 4:
        this.fiveInput.value = value;
        break;
      case 5:
        this.sixInput.value = value;
        break;
    }
  }

  async verifyPin(pin: string) {
    const { noPeserta } = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = { pin, noPeserta };
    this.store.dispatch(VerifyPin({ payload }));

    const interaction = this.interactionResponse$
      .pipe(
        filter((res) => !!res),
        tap((interaction: InteractionState | null | undefined) => {
          if (interaction!.type === InteractionType.SUCCEED) {
            this.isCorrect = true;
            setTimeout(() => {
              this.modalCtrl.dismiss({ correct: true });
            }, 200);
          }
          if (
            interaction!.type === InteractionType.FAILED ||
            interaction!.type === InteractionType.SUCCEED
          ) {
          }
          if (interaction!.type === InteractionType.FAILED) {
            this.errorMessage = interaction?.error || '';
            this.isError = true;
          }
        })
      )
      .subscribe();
  }
  forgotPin() {
    this.modalCtrl.dismiss('forgot-pin');
  }

  isMobile = () => {
    return this.screenSizeService.isMobileNativeResolution() ? false : true;
  };
}
