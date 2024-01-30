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
  selector: 'app-auth-pin-form',
  templateUrl: './auth-pin.form.html',
  styleUrls: ['./auth-pin.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPinForm implements OnInit, OnDestroy {
  subs = new Subscription();

  @Input() public formGroup!: FormGroup;

  @Output() public submitted: EventEmitter<FormValue<CreatePinDto>> =
    new EventEmitter<FormValue<CreatePinDto>>();
  @Output() public valueChanges: EventEmitter<CreatePinDto> =
    new EventEmitter<CreatePinDto>();

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

  onInputChange = (event: any, key: string) => {
    // if (/[^0-9]*/g.test(event.target?.value)) {
    //
    // }
    // const newVal = event.target?.value?.replace?.(/[^0-9]*/g, '');
    // // this.formGroup.get(key)?.setValue(newVal);
    // this.formGroup.get(key)?.setValue(newVal);
  };

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
