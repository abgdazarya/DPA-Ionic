import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentType } from '@components/common';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';

@Component({
  selector: 'app-job-index-vacancy-page',
  templateUrl: 'vacancy.page.html',
  styleUrls: ['vacancy.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class IndexVacancyPage {
  public type: typeof ComponentType = ComponentType;

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
  }

  public getComponentType(): ComponentType {
    const win = window;

    if (win.innerWidth <= 640) {
      return this.type.SMALL;
    }

    if (win.innerWidth > 640 && win.innerWidth <= 1024) {
      return this.type.MEDIUM;
    }

    return this.type.LARGE;
  }

  constructor(private store: Store, private router: Router) {}
}
