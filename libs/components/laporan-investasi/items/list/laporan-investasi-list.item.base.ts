import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LaporanInvestasiModel } from '@controllers/menu-laporan-investasi';

@Component({
  template: ``,
})
export class LaporanInvestasiListItemBase {
  @Input() public laporanInvestasi!: LaporanInvestasiModel;
  @Input() public loading!: boolean;
  @Input() public nativeClass!: string;

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

  @Output() public onClick: EventEmitter<LaporanInvestasiModel> =
    new EventEmitter<LaporanInvestasiModel>();
  @Output() public onTitleClick: EventEmitter<LaporanInvestasiModel> =
    new EventEmitter<LaporanInvestasiModel>();

  constructor() {}

  public handleChangeStatus(): void {}

  parseText(text: string | null = '') {
    let arr: Array<any> = text?.toString?.()?.split?.(' ') || [];
    if (arr.length >= 10) {
      arr = arr.slice(0, 9);
      arr.push('...');
      return arr?.join?.(' ');
    }
    return text;
  }
}
