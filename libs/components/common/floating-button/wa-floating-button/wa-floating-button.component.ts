import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'wa-floating-button',
  templateUrl: 'wa-floating-button.component.html',
  styleUrls: ['wa-floating-button.component.scss'],
})
export class WaFloatingButton {
  // @Input() disabled?: boolean | null = false;
  // @Input() isLoading?: boolean | null = false;
  // @Input() color?: string = 'primary';
  // @Input() class?: string = '';
  // @Input() loadingClass?: string = '';

  @Input() public link!: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public screenSizeService: ScreenSizeService) {}
}
