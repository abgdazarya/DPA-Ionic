import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { LoginFormController } from '@controllers/auth';
import { FormValue } from '@shared';
import { LoginDto } from 'libs/controllers/auth/dtos/login.dto';
import { Subscription, distinctUntilChanged, filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-auth-login-form',
  templateUrl: './auth-login.form.html',
  styleUrls: ['./auth-login.form.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginForm implements OnInit, OnDestroy {
  subs = new Subscription();

  @Input() public formGroup!: FormGroup;

  @Output() public submitted: EventEmitter<FormValue<LoginDto>> =
    new EventEmitter<FormValue<LoginDto>>();
  @Output() public valueChanges: EventEmitter<LoginDto> =
    new EventEmitter<LoginDto>();

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

  // ngOnChanges(changes: SimpleChanges): void {
  //   // if (this.formGroup) {
  //   //   this.valueChanges.emit(this.formGroup);
  //   // }
  // }

  public submit(): void {
    const response: FormValue<LoginDto> = {
      value: this.formGroup.value,
      isValid: this.formGroup.valid,
    };
    this.submitted.emit(response);
  }
}
