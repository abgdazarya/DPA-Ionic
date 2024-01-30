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
  GetListPostinganRuangPensiunReset,
  GetPublicListPostinganRuangPensiun,
  GetPublicListPostinganRuangPensiunReset,
  JualBeliRuangPensiun,
  LaporanInvestasi,
  PostinganRuangPensiun,
} from '@controllers/menu';
import { ModalController } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponsePagination,
  InteractionState,
  InteractionType,
  Pagination,
  decryptContent,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
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
  selector: 'app-activity-one',
  templateUrl: './activity-one.page.html',
  styleUrls: ['./activity-one.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class ActivityOnePage implements OnInit, OnDestroy {
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

  public postingan$: Observable<PostinganRuangPensiun[] | undefined | null>;
  isLoggedIn: boolean = false;

  public interactionPostingan$: Observable<InteractionState | undefined | null>;
  public interactionPostinganManage$: Observable<
    InteractionState | undefined | null
  >;
  public pagination$: Observable<Pagination | undefined | null>;

  public noPeserta$: Observable<NoPesertaData | undefined | null> = of(null);
  public responseKategori$: Observable<any>;

  public pageTypeEnum: typeof PageType = PageType;
  isLoading: boolean = true;
  dataParams: any = {};
  listData: any = [];
  listCategory: any = [];
  fromPage: any;

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
    this.activeRoute.queryParams.subscribe((data: any) => {
      if (data && data.from) {
        this.fromPage = data.from;
      }
      if (data && data.data) {
        this.dataParams = JSON.parse(data.data);
        this.setHandleOnBack();
        this.resetData();
        this.fetchPostinganRuangPensiun();
      }
    });

    this.responseKategori$ = this.menuRepository
      .getKategoriRuangPensiunList$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data?.data.length) return null;
          return res?.data?.data;
        })
      );

    this.postingan$ = this.menuRepository.getPostinganRuangPensiunList$().pipe(
      map(
        (
          res: DataResponsePagination<PostinganRuangPensiun> | undefined | null
        ) => {
          this.listData = res?.data?.data;
          if (!res?.data?.data?.length) return null;
          const newData = res?.data?.data;
          const updatedData = newData.map((e: any) => {
            let list_image =
              e.gambar != null && e.gambar.includes('{"MAIN_IMAGE"')
                ? JSON.parse(e.gambar)
                : e.gambar;
            const updatedRes = {
              ...e,
              gambar:
                list_image && typeof list_image === 'object'
                  ? list_image['MAIN_IMAGE']
                  : list_image,
            };

            return updatedRes;
          });
          return updatedData;
        }
      )
    );

    this.interactionPostingan$ =
      this.menuInteractionRepository.getPostinganRuangPensiunList$();

    this.interactionPostinganManage$ =
      this.menuInteractionRepository.getPostinganRuangPensiunManage$();

    this.pagination$ = this.menuRepository.getPostinganRuangPensiunList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );
  }

  getImageArr = (str: string | any): Array<any> => {
    if (str.match(/MAIN_IMAGE/gi)) {
      const obj = JSON.parse(str);
      const arr: Array<any> = [];
      for (const key in obj) {
        const itemImg = obj[key];
        if (itemImg) {
          arr.push(itemImg);
        }
      }
      return arr;
    }
    return [str];
  };

  errorLikeAOne: any = '';
  successLikeAOne: any = '';
  public async handleLikeContent(item: PostinganRuangPensiun): Promise<void> {
    if (this.isLoggedIn) {
      const payload = {
        idRuangPensiun: item.idRuangPensiun,
      };
      await this.store.dispatch(
        LikeContent({ payload, dataType: 'postinganRuangPensiun' })
      );
      await this.interactionPostinganManage$.subscribe((res) => {
        if (res?.type == InteractionType.SUCCEED) {
          this.successLikeAOne = 'Sukses Memperbarui Data Ruang Pensiun Like.';
          this.cdr.markForCheck();
          setTimeout(() => {
            this.successLikeAOne = '';
            this.cdr.markForCheck();
          }, 3000);
        } else if (res?.type === InteractionType.FAILED) {
          this.errorLikeAOne = res?.error;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.errorLikeAOne = '';
            this.cdr.markForCheck();
          }, 3000);
        }
      });
    }
    // await this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA).then(async (data) => {
    //   if (data) {
    //     const payload = {
    //       idRuangPensiun: item.idRuangPensiun,
    //     };
    //     await this.store.dispatch(
    //       LikeContent({ payload, dataType: 'postinganRuangPensiun' })
    //     );
    //     await this.interactionPostinganManage$.subscribe((res) => {
    //       if (res?.type == InteractionType.SUCCEED) {
    //         this.successLikeAOne =
    //           'Sukses Memperbarui Data Ruang Pensiun Like.';
    //         this.cdr.markForCheck();
    //         setTimeout(() => {
    //           this.successLikeAOne = '';
    //           this.cdr.markForCheck();
    //         }, 3000);
    //       } else if (res?.type === InteractionType.FAILED) {
    //         this.errorLikeAOne = res?.error;
    //         this.cdr.markForCheck();
    //         setTimeout(() => {
    //           this.errorLikeAOne = '';
    //           this.cdr.markForCheck();
    //         }, 3000);
    //       }
    //     });
    //   }
    // });
  }

  isPensiunan: boolean = false;
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    setTimeout(() => {
      this.templateService.handleInit();
      this.templateService.handleShowFooter(
        this.screenSizeService.isMobileResolution() ? false : true
      );
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
      this.templateService.handleChangePageTitle(
        this.dataParams.pageName
          ? this.dataParams.pageName
          : 'Aktivitas Pensiun'
      );
      this.templateService.handleUseSecondaryHeader(true);
      this.setHandleOnBack();
      this.cdr.markForCheck();
    }, 0);

    this.resetData();
    this.fetchPostinganRuangPensiun();

    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    this.isLoggedIn = idProfilDpa ? true : false;

    const interaction = this.menuInteractionRepository
      .getPostinganRuangPensiunManage$()
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.SUCCEED:
              setTimeout(() => {
                this.reloadPostinganRuangPensiun();
              }, 2000);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);

    const nomorPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (nomorPeserta) {
      this.noPeserta$ = of(nomorPeserta);
      if (nomorPeserta.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
        this.isPensiunan = true;
      }
    }
    this.cdr.markForCheck();

    await this.responseKategori$.subscribe((res) => {
      if (res) {
        this.listCategory = res;
      }
    });
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  setHandleOnBack() {
    if (this.fromPage) {
      this.templateService.handleOnBack(() => {
        const param: NavigationExtras = {
          queryParams: {
            from: this.fromPage,
          },
          onSameUrlNavigation: 'reload',
        };
        this.router.navigate(['/pensiun/categoryOne'], param).then(() => {
          this.location.replaceState('/pensiun/categoryOne');
        });
      });
    } else {
      this.templateService.handleOnBack(() => {
        this.router
          .navigate(['/pensiun'], { onSameUrlNavigation: 'reload' })
          .then(() => {
            this.location.replaceState('/pensiun');
          });
      });
    }
  }

  public decryptUser(content: any): any {
    if (content == false || !content) return null;
    return decryptContent(content);
  }

  resetData = () => {
    this.store.dispatch(
      GetListPostinganRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        dataType: 'list',
      })
    );
    this.store.dispatch(
      GetPublicListPostinganRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        dataType: 'list',
      })
    );
  };

  limitDefault = 10;
  public fetchData(
    keyword: string,
    pageType: PageType,
    noPeserta: any,
    idProfilDpa: string,
    limit: number
  ): void {
    this.noPeserta$ = of(noPeserta);
    this.limitDefault += limit;

    let payload = {
      idKategori: this.dataParams.idKategori
        ? this.dataParams.idKategori
        : 'KRP000000001',
      search: keyword || '',
      limit: this.limitDefault,
      page: 1,
      sort: 'DESC',
      sortBy: 'CREATED_ON',
    };

    if (pageType === this.pageTypeEnum.PERSONAL) {
      payload = {
        ...noPeserta,
        // idProfilDpa,
        flagMine: 1,
        ...payload,
      };
    }

    if (pageType === this.pageTypeEnum.PUBLIC) {
      payload = {
        ...noPeserta,
        // idProfilDpa,
        flagMine: 0,
        ...payload,
      };
    }

    if (idProfilDpa) {
      this.store.dispatch(
        GetListPostinganRuangPensiun({
          payload,
          dataType: 'list',
        })
      );
    } else {
      this.store.dispatch(
        GetPublicListPostinganRuangPensiun({
          payload,
          dataType: 'list',
        })
      );
    }

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 500);
  }

  public reloadPostinganRuangPensiun(): void {
    const response = combineLatest([
      this.pageService.pageType$,
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        take(1),
        tap(([pageType, noPeserta, idProfilDpa]) => {
          this.fetchData('', pageType, noPeserta, idProfilDpa, 0);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  public fetchPostinganRuangPensiun(limit: number = 0): void {
    const response = combineLatest([
      this.pageService.keyword$,
      this.pageService.pageType$,
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        tap(([keyword, pageType, noPeserta, idProfilDpa]) => {
          this.fetchData(keyword, pageType, noPeserta, idProfilDpa, limit);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  loadData(event: any, pagination: any) {
    if (this.listData.length != pagination.totalData) {
      setTimeout(() => {
        event.target.complete();
        this.fetchPostinganRuangPensiun(10);
        event.target.disabled = true;
      }, 500);
    } else {
      event.target.complete();
      event.target.disabled = true;
    }
  }

  public async handleOpenPostinganModal() {
    let dataKategori = {
      idKategori: this.dataParams.idKategori,
    };
    const modal = await this.modalCtrl.create({
      component: RuangPensiunPostinganModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        dataKategori: dataKategori,
        kategoriPensiun: this.listCategory,
      },
    });
    modal.present();

    modal.onDidDismiss().then((res) => {
      this.fetchPostinganRuangPensiun();
    });
  }

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  public handleNavigateToDetail(postingan: PostinganRuangPensiun): void {
    this.router.navigate([
      `/pensiun/detail/activity/${postingan.idRuangPensiun}`,
    ]);
  }

  handleDetailLaporanInvestasiClicked(laporan: LaporanInvestasi): void {
    this.router.navigate([`investasi/${laporan.idLaporanInvestasi}`], {
      queryParamsHandling: 'merge',
    });
    if (laporan.pdf) {
      // await Browser.open({
      //   url: laporan.pdf,
      //   presentationStyle: 'popover',
      // });
    }
  }
}
