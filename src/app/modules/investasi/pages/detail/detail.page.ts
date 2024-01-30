import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentType } from '@components/common';
import {
  GetDetailLaporanInvestasi,
  LaporanInvestasiModel,
} from '@controllers/menu-laporan-investasi';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  MenuLaporanInvestasiInteractionRepository,
  MenuLaporanInvestasiRepository,
} from '@stores/menu-laporan-investasi';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-investasi-detail-page',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuLaporanInvestasiRepository,
    MenuLaporanInvestasiInteractionRepository,
  ],
})
export class DetailPage {
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
  public laporanInvestasi$: Observable<
    LaporanInvestasiModel | undefined | null
  >;
  public interactionResponse$: Observable<InteractionState | undefined | null>;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private menuLaporanInvestasiRepo: MenuLaporanInvestasiRepository,
    private menuLaporanInvestasiInteractionRepo: MenuLaporanInvestasiInteractionRepository,
    public templateService: AppMainTemplateService,
    public screenSizeService: ScreenSizeService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.laporanInvestasi$ = this.menuLaporanInvestasiRepo
      .getLaporanInvestasiDetail$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          return res?.data;
        })
      );

    this.interactionResponse$ =
      this.menuLaporanInvestasiInteractionRepo.getLaporanInvestasiDetailInteraction$();
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle(
      'Detail Laporan Pertanggung Jawaban'
    );
    this.templateService.handleUseSecondaryHeader(true);

    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    const { idLaporanInvestasi } = this.route.snapshot.params;

    if (!idLaporanInvestasi) return;
    const payload = {
      idLaporanInvestasi,
    };
    this.store.dispatch(GetDetailLaporanInvestasi({ payload }));
  }
}
