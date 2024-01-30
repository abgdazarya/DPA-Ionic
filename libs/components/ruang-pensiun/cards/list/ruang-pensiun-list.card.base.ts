import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllKontenRuangPensiun } from '@controllers/menu';

@Component({
  template: ``,
})
export class RuangPensiunListCardBase {
  @Input() public allKonten!: AllKontenRuangPensiun;
  @Input() public loading!: boolean;
  @Input() public isPensiunan!: boolean;
  @Input() public nativeClass!: string;
  @Input() public pageTypeEnum: any;
  @Input() public pageService: any;

  @Output() public onClick: EventEmitter<AllKontenRuangPensiun> =
    new EventEmitter<AllKontenRuangPensiun>();

  @Output() public onClickImage: EventEmitter<AllKontenRuangPensiun> =
    new EventEmitter<AllKontenRuangPensiun>();

  @Output() public onClickLike: EventEmitter<AllKontenRuangPensiun> =
    new EventEmitter<AllKontenRuangPensiun>();

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

  constructor() {}
  
}
