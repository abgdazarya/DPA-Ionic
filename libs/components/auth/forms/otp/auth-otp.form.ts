import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginData } from '@controllers/auth';
import { IonInput } from '@ionic/angular';
import { DataResponse, FormValue, InteractionState } from '@shared';
import { VerifyOtpDto } from 'libs/controllers/auth/dtos/verify-otp.dto';
import {
  Observable,
  Subscription,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-auth-otp-form',
  templateUrl: './auth-otp.form.html',
  styleUrls: ['./auth-otp.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthOtpForm implements OnInit, OnDestroy {
  subs = new Subscription();

  private subscribtions = new Subscription();

  @ViewChild('firstInput', { static: false }) public firstInput!: IonInput;
  @ViewChild('secondInput', { static: false }) public secondInput!: IonInput;
  @ViewChild('thirdInput', { static: false }) public thirdInput!: IonInput;
  @ViewChild('fourthInput', { static: false }) public fourthInput!: IonInput;

  @Input() public formGroup!: FormGroup;
  @Input('isError') public set setIsError(value: boolean | undefined | null) {
    this.isError = value;
  }

  @Output() public submitted: EventEmitter<FormValue<VerifyOtpDto>> =
    new EventEmitter<FormValue<VerifyOtpDto>>();
  @Output() public valueChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() public clearInterval: EventEmitter<any> = new EventEmitter<any>();
  @Output() public verifyOtp: EventEmitter<any> = new EventEmitter<any>();

  public isError!: boolean | undefined | null;

  public inputModel: {
    input0: number | null;
    input1: number | null;
    input2: number | null;
    input3: number | null;
  } = {
    input0: null,
    input1: null,
    input2: null,
    input3: null,
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const func$ = this.formGroup.valueChanges
      .pipe(
        filter((res) => !!res),
        distinctUntilChanged(),
        tap((form) => {
          this.valueChanges.emit(form);
        })
      )
      .subscribe();

    this.subs.add(func$);
  }

  public handleResetOtpForm(): void {
    this.handleSetValue(0, null);
    this.handleSetValue(1, null);
    this.handleSetValue(2, null);
    this.handleSetValue(3, null);
    this.handleFocus(0);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public handleInputFocus(index: number, e: any): void {
    if (!e.target.value) {
      e.target.value = null;
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    setTimeout(() => {
      this.handleFocus(index + 1);
    }, 1);
  }

  public handleChangeValue(index: number, e: any, val: any): void {
    setTimeout(() => {
      if (e?.detail?.event?.inputType == 'deleteContentBackward') return;
      if (isNaN(e?.detail?.value) || e?.detail?.value === ' ') {
        this.handleSetValue(index, null);
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      this.handleSetValue(index, e?.detail?.value);
      this.valueChanges.emit(this.getValue);
      if (this.getValue?.length == 4) {
        this.clearInterval.emit();
        this.verifyOtp.emit(this.getValue);
      }
      if (index >= 3) {
        return;
      }

      this.handleFocus(index + 1);
    }, 100);
  }

  public isValidNumber(index: number, e: any, val: any) {
    const charKeyCode = e.keyCode || e.which;

    if (charKeyCode == 0 || charKeyCode == 229) {
      if (!val) {
        setTimeout(() => {
          this.valueChanges.emit(this.getValue);
          if (this.getValue?.length == 4) {
            this.clearInterval.emit();
            this.verifyOtp.emit(this.getValue);
          }
          if (index >= 3) {
            return;
          }

          this.handleFocus(index + 1);
        }, 100);
      }
    }

    if (
      (charKeyCode >= 48 && charKeyCode <= 57) || // 0-9
      (charKeyCode >= 96 && charKeyCode <= 105)
    ) {
      setTimeout(() => {
        this.handleSetValue(index, e?.key);
        this.valueChanges.emit(this.getValue);
        if (this.getValue?.length == 4) {
          this.clearInterval.emit();
          this.verifyOtp.emit(this.getValue);
        }
        if (index >= 3) {
          return;
        }

        this.handleFocus(index + 1);
      }, 100);
    }

    if (charKeyCode === 8) {
      setTimeout(() => {
        this.handleSetValue(index, null);

        if (!val && index - 1 >= 0) {
          this.handleSetValue(index - 1, null);
        }

        this.valueChanges.emit(this.getValue);

        if (index <= 0) {
          return;
        }

        this.handleFocus(index - 1);
        return;
      }, 100);
    }

    // if(e.keyCode === 229 &&){

    // }

    e.preventDefault();
    return false;
  }

  public handleFormFocus(index: number, e: any): void {}

  public handleDeleteValue(index: number, e: any, val: any): void {
    this.cdr.markForCheck();

    if (e.code === 'Backspace') {
      setTimeout(() => {
        this.handleSetValue(index, null);

        if (!val && index - 1 >= 0) {
          this.handleSetValue(index - 1, null);
        }

        this.valueChanges.emit(this.getValue);

        if (index <= 0) {
          return;
        }

        this.handleFocus(index - 1);
        return;
      }, 100);
    }
  }

  public handleFocus(index: number): void {
    switch (index) {
      case 0:
        this.firstInput.setFocus();
        break;
      case 1:
        this.secondInput.setFocus();
        break;
      case 2:
        this.thirdInput.setFocus();
        break;
      case 3:
        this.fourthInput.setFocus();
        break;
    }
  }

  public get getValue(): string {
    const value =
      <string>this.firstInput?.value +
      <string>this.secondInput?.value +
      <string>this.thirdInput?.value +
      <string>this.fourthInput?.value;

    return value;
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

  // ngOnChanges(changes: SimpleChanges): void {
  //   // if (this.formGroup) {
  //   //   this.valueChanges.emit(this.formGroup);
  //   // }
  // }

  public submit(): void {
    const response: FormValue<VerifyOtpDto> = {
      value: this.formGroup.value,
      isValid: this.formGroup.valid,
    };
    this.submitted.emit(response);
  }
}
