import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';

@Component({
  selector: 'app-toggle',
  templateUrl: './toogle.component.html',
  styleUrls: ['./toogle.component.scss'],
  standalone: true,
  imports: [CommonModule, AppCommonIconComponentModule],
})
export class ToggleComponent {
  @Input() disabled: boolean | undefined | null = false;
  @Input() isToggled: boolean = false;
  @Output() onToggleChange = new EventEmitter();
  constructor() {}
  toggleNotif(value: boolean) {
    if (this.disabled) return;
    this.onToggleChange.emit(value);
  }
}
