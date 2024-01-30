import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentType } from '@components/common';
// import { DpaTvShareModal } from '@components/dpa-tv';
import { DpaTv, GetPublicDpaTv } from '@controllers/menu';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponsePagination } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, map } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-dpa-tv-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class IndexPage implements OnInit {
  public type: typeof ComponentType = ComponentType;

  public keyword: string = '';

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.handleChangeTemplateService();
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

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef
  ) {
    this.handleChangeTemplateService();
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px]'
    );
    this.templateService.handleChangePageTitle('DPA TV');
    this.templateService.handleUseSecondaryHeader(true);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.handleChangeTemplateService();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
