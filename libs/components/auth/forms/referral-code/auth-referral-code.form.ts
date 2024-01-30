import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreatePinDto } from '@controllers/auth';
import { FormValue } from '@shared';
import { Subscription, distinctUntilChanged, filter, tap } from 'rxjs';

@Component({
  selector: 'app-auth-referral-code-form',
  templateUrl: './auth-referral-code.form.html',
  styleUrls: ['./auth-referral-code.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReferralCodeForm implements OnInit, OnDestroy {
  subs = new Subscription();

  @Input() public formGroup!: FormGroup;
  @Input() public isError: boolean | null = null;
  @Input() public loading: boolean | undefined | null = false;

  @Output() public submitted: EventEmitter<FormValue<CreatePinDto>> =
    new EventEmitter<FormValue<CreatePinDto>>();
  @Output() public valueChanges: EventEmitter<CreatePinDto> =
    new EventEmitter<CreatePinDto>();
  @Output() public submitCode: EventEmitter<string> =
    new EventEmitter<string>();
  // @Output() public valueChanges: EventEmitter<CreatePinDto> =
  // new EventEmitter<CreatePinDto>();

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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleSubmitCode(): void {
    this.submitCode.emit();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // if (this.formGroup) {
  //   //   this.valueChanges.emit(this.formGroup);
  //   // }
  // }

  public submit(): void {
    const response: FormValue<CreatePinDto> = {
      value: this.formGroup.value,
      isValid: this.formGroup.valid,
    };
    this.submitted.emit(response);
  }
}
