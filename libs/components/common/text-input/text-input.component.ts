import { CommonModule } from '@angular/common';
import { Component, Input, SkipSelf } from '@angular/core';
import {
  ControlContainer,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class TextInputComponent {
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() type!: 'text' | 'password' | 'email' | 'number' | 'date';
  @Input() error!: string;
  @Input() placeholder!: string;
  @Input() min!: number;
  @Input() disable!: boolean;
  constructor() {}
}
