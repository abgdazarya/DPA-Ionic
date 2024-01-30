import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DpaTvModel } from '@controllers/menu-dpa-tv';

@Component({
  template: ``,
})
export class DpaTvListCardBase {
  @Input() public dpaTv!: DpaTvModel;
  @Input() public loading!: boolean;
  @Input() public nativeClass!: string;

  @Output() public shareClicked: EventEmitter<DpaTvModel> =
    new EventEmitter<DpaTvModel>();
  @Output() public clicked: EventEmitter<DpaTvModel> =
    new EventEmitter<DpaTvModel>();

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

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
