import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';

@Component({
  selector: 'app-saldo-card',
  templateUrl: './saldo-card.component.html',
  styleUrls: ['./saldo-card.component.scss'],
  standalone: true,
  imports: [AppCommonIconComponentModule, CommonModule],
})
export class SaldoCardComponent {
  @Input() saldo: string = '';
  @Input() nomorPeserta: string = '';
  @Input() monthYear: string = '';
  @Input() investment: string = '';
  @Input() iuranSukarela: string = '';
  @Input() errorMsg: string = '';

  constructor() {}

  renderSaldo = (saldo: string) => {
    saldo = saldo.split(',')[0];
    return saldo || '';
  };
}
