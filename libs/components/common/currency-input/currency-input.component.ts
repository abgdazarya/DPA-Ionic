import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class CurrencyInputComponent {
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() class!: boolean;
  @Input() type!: 'text' | 'password' | 'email' | 'number' | 'date';
  @Input() error!: string;
  @Input() placeholder!: string;
  @Input() disable!: boolean;
  @Input() thousandsSeparator: string = '.';
  @Input() mask: string = 'separator.2';
  @Input() prefix: string = 'Rp';
  constructor() {}
}
