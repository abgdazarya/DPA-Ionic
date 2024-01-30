import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button-component',
  templateUrl: './button.component.html',
})
export class CommonButtonComponent {
  @Input() disabled?: boolean | null = false;
  @Input() isLoading?: boolean | null = false;
  @Input() color?: string = 'primary';
  @Input() class?: string = '';
  @Input() loadingClass?: string = '';

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
}
