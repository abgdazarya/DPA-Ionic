import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ComponentType } from '@components/common';
import {
  GetListPostinganRuangPensiun,
  GetPublicListKategoriRuangPensiun,
  GetPublicListKategoriRuangPensiunReset,
  GetPublicListPostinganRuangPensiun,
  JualBeliRuangPensiun,
  LaporanInvestasi,
  PostinganRuangPensiun,
} from '@controllers/menu';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponsePagination,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { StorageService } from 'libs/services/common/storage.service';
import {
  Observable,
  Subscription,
  combineLatest,
  filter,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { PageType, PensiunPageService } from '../pensiun-page.service';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import { LikeContent } from 'libs/controllers/menu/action/commands/like-content';
import { RuangPensiunPostinganModal } from '@components/ruang-pensiun';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Location } from '@angular/common';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-category-one',
  templateUrl: './category-one.page.html',
  styleUrls: ['./category-one.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class CategoryOnePage implements OnInit {

  private subscribtions = new Subscription();

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

  public responseKategori$: Observable<any>;

  public pageTypeEnum: typeof PageType = PageType;
  isLoading: boolean = true;
  fromPage:any;
  haveAnyCategory:boolean = true;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    public storageService: StorageService,
    public pageService: PensiunPageService,
    private location: Location,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.activeRoute.queryParams.subscribe((data:any) => {
      if (data && data.from) {
        this.fromPage = data.from;
      }
    });

    this.responseKategori$ = this.menuRepository
      .getKategoriRuangPensiunList$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data?.data.length) return null;
          const newData = res?.data?.data;
          this.haveAnyCategory = newData.some(data => data.judulKategori !== 'Jual Beli' && data.judulKategori !== 'Aktivitas Pensiun' && data.judulKategori !== 'Aktifitas Pensiun');

          if(this.fromPage) {
            const updatedData = newData.filter((e:any) => this.fromPage == 'postingan' ? e.templateRuangPensiun == 'AKTIVITAS-PENSIUN':e.templateRuangPensiun == 'JUAL-BELI');
            return updatedData;
          } else {
            return newData;
          }
        })
      );
  }

  async ngOnInit(): Promise<void> {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(this.screenSizeService.isMobileResolution() ? false:true);
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeIonContentClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'ion-background-white-blur relative'
        : 'relative'
    );
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Kategori');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/pensiun'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/pensiun');
        });
    });

    this.fetchKategoriRuangPensiun();
    this.cdr.markForCheck();
  }

  private timeOutTracker: any = null;
  keyword:any = '';
  onSearchChange = (event: any) => {
    clearTimeout(this.timeOutTracker);
    this.timeOutTracker = setTimeout(() => {
      if (event?.target?.value) {
        this.keyword = event.target.value;
      } else {
        this.keyword = '';
        this.fetchKategoriRuangPensiun();
      }
    }, 500);
  };

  public fetchKategoriRuangPensiun(): void {
    const response = combineLatest([
      this.pageService.keyword$
    ])
      .pipe(
        tap(([keyword]) => {
          this.fetchData(keyword);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  public async fetchData(
    keyword: string
  ): Promise<void> {
    this.resetData();
    const payload = {
      search: keyword || '',
      limit: 10,
      page: 1,
      sort: 'DESC',
      SORT_BY: 'CREATED_ON',
    };

    await this.store.dispatch(
      GetPublicListKategoriRuangPensiun({
        payload,
      })
    );
  }

  resetData = () => {
    this.store.dispatch(
      GetPublicListKategoriRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
      })
    );
  };

  public handleNavigate(page: string, pageName = null, idKategori = null): void {
    let dt:any;
    let pageOpen:any;
    if(page == 'activity' || page == 'AKTIVITAS-PENSIUN') {
      dt = {
        pageName : pageName ? pageName:'Aktivitas Pensiun',
        idKategori: idKategori ? idKategori:'KRP000000001'
      }
      pageOpen = page != 'activity' ? 'activity':page;
    }
    if(page == 'transaction' || page == 'JUAL-BELI') {
      dt = {
        pageName : pageName ? pageName:'Jual Beli',
        idKategori: idKategori ? idKategori:'KRP000000002'
      }
      pageOpen = page != 'transaction' ? 'transaction':page;
    }
    if(page == 'category') {
      pageOpen = 'category';
    }
    const param: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(dt),
        from: this.fromPage
      }
    }
    
    if (this.screenSizeService.isDesktopResolution()) {
      this.router.navigate([`/pensiun/${pageOpen}`], param);
    } else {
      this.router.navigate([`/pensiun/${pageOpen}One`], param);
    }
  }

}
