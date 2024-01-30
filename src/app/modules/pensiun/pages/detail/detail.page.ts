import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentType } from '@components/common';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { StorageService } from 'libs/services/common/storage.service';
import { PageType, PensiunPageService } from '../pensiun-page.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-pensiun-detail-page',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    PensiunPageService,
    // MenuRepository,
    // MenuInteractionRepository,
  ],
})
export class DetailPage implements OnInit {
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

  public pageTypeEnum: typeof PageType = PageType;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    public screenSizeService: ScreenSizeService,
    private storageService: StorageService,
    public pageService: PensiunPageService
  ) {}

  ngOnInit(): void {}

  public handleSearch(): void {}

  public handleNavigate(page: string): void {
    this.router.navigate([page], { relativeTo: this.route });
  }
}
