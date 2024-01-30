import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'quiz-floating-button',
  templateUrl: 'quiz-floating-button.component.html',
  styleUrls: ['quiz-floating-button.component.scss'],
})
export class QuizFloatingButton {
  // @Input() disabled?: boolean | null = false;
  // @Input() isLoading?: boolean | null = false;
  // @Input() color?: string = 'primary';
  // @Input() class?: string = '';
  // @Input() loadingClass?: string = '';

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public screenSizeService: ScreenSizeService) {}
}
