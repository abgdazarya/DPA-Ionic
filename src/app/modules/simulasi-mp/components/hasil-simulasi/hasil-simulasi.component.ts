import { registerLocaleData, DecimalPipe } from '@angular/common';
import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');

@Component({
  selector: 'app-hasil-simulasi',
  templateUrl: './hasil-simulasi.component.html',
  styleUrls: ['./hasil-simulasi.component.scss'],
  standalone: true,
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'id',
    },
  ],
  imports: [
    DecimalPipe
  ]
})

export class HasilSimulasiComponent {
  @Input() development: number = 0;
  @Input() increment: number = 0;
  @Input() lastSalary: number = 0;
  @Input() total: number = 0;

  constructor() {}
}
