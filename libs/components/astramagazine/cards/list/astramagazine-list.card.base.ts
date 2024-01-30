import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AstramagazineModel } from '@controllers/menu-astramagazine';

@Component({
  template: ``,
})
export class AstramagazineListCardBase {
  @Input() public astramagazine!: AstramagazineModel;
  @Input() public currentMonth!: any;
  @Input() public currentYear!: any;
  @Input() public loading!: boolean;
  @Input() public nativeClass!: string;

  @Output() public onClick: EventEmitter<AstramagazineModel> =
    new EventEmitter<AstramagazineModel>();

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

  constructor() {}

  public handleChangeStatus(): void {
  }
}
