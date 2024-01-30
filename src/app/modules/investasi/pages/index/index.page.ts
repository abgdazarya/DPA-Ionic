import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { ComponentType } from '@components/common';
import { GetLaporanInvestasi, LaporanInvestasi } from '@controllers/menu';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponseArray, InteractionState } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, map } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-investasi-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class IndexPage implements OnInit {
  public type: typeof ComponentType = ComponentType;

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

  public laporanInvestasi$: Observable<LaporanInvestasi[] | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;

  public keyword: string = '';

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private storageService: StorageService,
    public templateService: AppMainTemplateService,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef
  ) {
    this.laporanInvestasi$ = this.menuRepository
      .getLaporanInvestasiList$()
      .pipe(
        map((res: DataResponseArray<LaporanInvestasi> | undefined | null) => {
          if (!res?.data?.length) return;
          const newData = res?.data;
          return newData;
        })
      );
    this.interactionResponse$ =
      this.menuInteractionRepository.getLaporanInvestasiListInteraction$();
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-neutral-0');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-lazuli-400 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Laporan Hasil Investasi');
    this.templateService.handleUseSecondaryHeader(true);

    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);
  }

  // handleDetailLaporanInvestasiClicked(laporan: LaporanInvestasi): void {
  //   this.router.navigate([`investasi/${laporan.idLaporanInvestasi}`], {
  //     queryParamsHandling: 'merge',
  //   });
  //   if (laporan.pdf) {
  //     // await Browser.open({
  //     //   url: laporan.pdf,
  //     //   presentationStyle: 'popover',
  //     // });
  //   }
  // }
}
