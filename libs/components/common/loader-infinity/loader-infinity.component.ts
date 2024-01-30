import { CommonModule } from '@angular/common';
import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const ANIMATION_LIST = [
  'null animation-loader',
  'animation_speed_two animation-loader',
  'animation_speed_three animation-loader',
  'animation_speed_foure animation-loader',
  'animation_speed_five animation-loader',
];

@Component({
  selector: 'app-loader-infinity',
  templateUrl: './loader-infinity.component.html',
  styleUrls: ['./loader-infinity.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class LoaderInfinityComponent {
  @Input() isLoading: boolean | any = false;
  @Input() arrLength: boolean | any = false;
  public arr: Array<any> = Array(this.arrLength || 5)
    .fill(0)
    .map((e, i) => ++i);
  public lastIndex = 0;
  constructor() {}

  classNameCallAnimationRandom = (index: number) => {
    const animationClassName = ANIMATION_LIST[this.lastIndex];
    this.lastIndex += 1;
    if (index % 3 === 0) {
      this.lastIndex = 1;
    }
    return animationClassName;
  };
}
