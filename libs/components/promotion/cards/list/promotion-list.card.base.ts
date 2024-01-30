import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PromotionModel } from '@controllers/menu-promotion';

@Component({
  template: ``,
})
export class PromotionListCardBase {
  @Input() public promotion!: PromotionModel;
  @Input() public loading!: boolean;
  @Input() public nativeClass!: string;

  @Output() public onClick: EventEmitter<PromotionModel> =
    new EventEmitter<PromotionModel>();

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
