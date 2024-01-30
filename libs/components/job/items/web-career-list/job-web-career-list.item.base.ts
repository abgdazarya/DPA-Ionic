import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobModel } from '@controllers/menu-job';

@Component({
  template: ``,
})
export class JobWebCareerListItemBase {
  @Input() public job!: JobModel;
  @Input() public loading!: boolean;
  @Input() public nativeClass!: string;

  @Output() public onClick: EventEmitter<JobModel> =
    new EventEmitter<JobModel>();

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
