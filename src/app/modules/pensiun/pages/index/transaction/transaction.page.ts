import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentType } from '@components/common';
import {
  GetListJualBeliRuangPensiun,
  GetListJualBeliRuangPensiunReset,
  GetPublicListJualBeliRuangPensiun,
  GetPublicListJualBeliRuangPensiunReset,
  GetPublicListKategoriRuangPensiun,
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
import { PageType, PensiunPageService } from '../../pensiun-page.service';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import { LikeContent } from 'libs/controllers/menu/action/commands/like-content';
import { OpenImageModal } from 'libs/components/ruang-pensiun/modals/open-image/open-image.modal';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { RuangPensiunJualBeliModal } from '@components/ruang-pensiun';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-pensiun-index-transaction-page',
  templateUrl: 'transaction.page.html',
  styleUrls: ['transaction.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class IndexTransactionPage implements OnInit, OnDestroy, OnChanges {
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

  public jualBeli$: Observable<JualBeliRuangPensiun[] | undefined | null>;
  public interactionJualBeli$: Observable<InteractionState | undefined | null>;
  public interactionJualBeliManage$: Observable<
    InteractionState | undefined | null
  >;

  public loading$: Observable<boolean | undefined | null>;

  public noPeserta$: Observable<NoPesertaData | undefined | null> = of(null);
  public pagination$: Observable<Pagination | undefined | null>;
  public responseKategori$: Observable<any>;

  public pageTypeEnum: typeof PageType = PageType;
  isPensiunan: boolean = false;
  isLoggedIn: boolean = false;
  dataParams: any = {};
  listCategory: any = [];
  successLikeTrx: any = '';
  errorLikeTrx: any = '';
  @Input() keyword: string = '';

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    public storageService: StorageService,
    public pageService: PensiunPageService,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    public templateService: AppMainTemplateService
  ) {
    this.activeRoute.queryParams.subscribe((data: any) => {
      this.resetData();
      if (data && data.data) {
        this.dataParams = JSON.parse(data.data);
      }
    });
    this.jualBeli$ = this.menuRepository.getJualBeliRuangPensiunList$().pipe(
      map(
        (
          res: DataResponsePagination<JualBeliRuangPensiun> | undefined | null
        ) => {
          if (!res?.data?.data?.length) return null;
          const newData = res?.data?.data;
          const updatedData = newData.map((e: any) => {
            let list_image =
              e.gambarJualBeli != null &&
              e.gambarJualBeli.includes('{"MAIN_IMAGE"')
                ? JSON.parse(e.gambarJualBeli)
                : e.gambarJualBeli;
            const updatedRes = {
              ...e,
              gambar: list_image ? list_image['MAIN_IMAGE'] : list_image,
            };
            return updatedRes;
          });
          return updatedData;
        }
      )
    );

    this.responseKategori$ = this.menuRepository
      .getKategoriRuangPensiunList$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data?.data.length) return null;
          return res?.data?.data;
        })
      );

    this.interactionJualBeli$ =
      this.menuInteractionRepository.getJualBeliRuangPensiunList$();

    this.loading$ = this.menuInteractionRepository
      .getJualBeliRuangPensiunList$()
      .pipe(
        map((res) => {
          return res?.isLoading;
        })
      );

    this.interactionJualBeliManage$ =
      this.menuInteractionRepository.getJualBeliRuangPensiunManage$();

    this.pagination$ = this.menuRepository.getJualBeliRuangPensiunList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.isLoading = true;
    // this.resetData();
    // this.fetchJualBeliRuangPensiun();
  }

  public decryptUser(content: any): any {
    if (content == false || !content) return null;
    return decryptContent(content);
  }

  public async handleLikeContent(item: PostinganRuangPensiun): Promise<void> {
    if (this.isLoggedIn) {
      const payload = {
        idRuangPensiun: item.idRuangPensiun,
      };
      this.store.dispatch(
        LikeContent({ payload, dataType: 'jualBeliRuangPensiun' })
      );
      await this.interactionJualBeliManage$.subscribe((res) => {
        if (res?.type === InteractionType.SUCCEED) {
          this.successLikeTrx = 'Sukses Memperbarui Data Ruang Pensiun Like.';
          this.cdr.markForCheck();
          setTimeout(() => {
            this.successLikeTrx = '';
            this.cdr.markForCheck();
          }, 3000);
        } else if (res?.type === InteractionType.FAILED) {
          this.errorLikeTrx = res.error;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.errorLikeTrx = '';
            this.cdr.markForCheck();
          }, 3000);
        }
      });
    }
    // this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA).then(async (data) => {
    //   if (data) {
    //     const payload = {
    //       idRuangPensiun: item.idRuangPensiun,
    //     };
    //     this.store.dispatch(
    //       LikeContent({ payload, dataType: 'jualBeliRuangPensiun' })
    //     );
    //     await this.interactionJualBeliManage$.subscribe((res) => {
    //       if (res?.type === InteractionType.SUCCEED) {
    //         this.successLikeTrx = 'Sukses Memperbarui Data Ruang Pensiun Like.';
    //         this.cdr.markForCheck();
    //         setTimeout(() => {
    //           this.successLikeTrx = '';
    //           this.cdr.markForCheck();
    //         }, 3000);
    //       } else if (res?.type === InteractionType.FAILED) {
    //         this.errorLikeTrx = res.error;
    //         this.cdr.markForCheck();
    //         setTimeout(() => {
    //           this.errorLikeTrx = '';
    //           this.cdr.markForCheck();
    //         }, 3000);
    //       }
    //     });
    //   }
    // });
  }

  isLoading: boolean = false;
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.pageService.handleChangePage('transaction');

    this.templateService.handleChangePageTitle(
      this.dataParams.pageName ? this.dataParams.pageName : 'Jual Beli'
    );

    const data = this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA);

    if (data) {
      this.noPeserta$ = of(data);
      if (data.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
        this.isPensiunan = true;
      }
    }
    this.cdr.markForCheck();

    const interaction = this.menuInteractionRepository
      .getJualBeliRuangPensiunManage$()
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.SUCCEED:
              setTimeout(() => {
                this.reloadJualBeliRuangPensiun();
              }, 1000);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
    this.fetchKategoriRuangPensiun();
    await this.responseKategori$.subscribe((res) => {
      if (res) {
        this.listCategory = res;
      }
    });

    const idProfileDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    this.isLoggedIn = idProfileDpa ? true : false;

    this.pageService.keyword$.subscribe((res) => {
      this.keyword = res;
      this.resetData();
      this.fetchJualBeliRuangPensiun();
    });

    this.cdr.markForCheck();
  }

  public async handleOpenJualBeliModal(dataKategori: any) {
    const modal = await this.modalCtrl.create({
      component: RuangPensiunJualBeliModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        dataKategori: this.dataParams ? this.dataParams : dataKategori,
        listKategori: this.listCategory,
      },
    });
    modal.present();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  public reloadJualBeliRuangPensiun(): void {
    // this.resetData();
    const response = combineLatest([
      this.pageService.pageType$,
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        take(1),
        tap(([pageType, noPeserta, idProfilDpa]) => {
          this.fetchData('', pageType, noPeserta, idProfilDpa);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  public fetchJualBeliRuangPensiun(): void {
    // this.resetData();
    const response = combineLatest([
      this.pageService.keyword$,
      this.pageService.pageType$,
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        take(1),
        tap(([keyword, pageType, noPeserta, idProfilDpa]) => {
          this.fetchData(keyword, pageType, noPeserta, idProfilDpa);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  resetData = () => {
    this.store.dispatch(
      GetListJualBeliRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        dataType: 'list',
      })
    );
    this.store.dispatch(
      GetPublicListJualBeliRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        dataType: 'list',
      })
    );
  };

  public handlePageChange(page: number): void {
    this.pageNumber = page;
    this.fetchJualBeliRuangPensiun();
  }

  pageNumber: any = 1;
  async fetchKategoriRuangPensiun() {
    const payload = {
      search: '',
      limit: 10,
      page: this.pageNumber,
      sort: 'DESC',
      SORT_BY: 'CREATED_ON',
    };

    await this.store.dispatch(
      GetPublicListKategoriRuangPensiun({
        payload,
      })
    );
  }

  public fetchData(
    keyword: string,
    pageType: PageType,
    noPeserta: any,
    idProfilDpa: string
  ): void {
    this.noPeserta$ = of(noPeserta);

    let payload = {
      idKategori: this.dataParams.idKategori
        ? this.dataParams.idKategori
        : 'KRP000000002',
      search: this.keyword || '',
      limit: 10,
      page: this.pageNumber,
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
      if (pageType === this.pageTypeEnum.PERSONAL) {
        if (noPeserta.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
          this.store.dispatch(
            GetListJualBeliRuangPensiun({
              payload,
              dataType: 'list',
            })
          );
        }
      } else {
        this.store.dispatch(
          GetListJualBeliRuangPensiun({
            payload,
            dataType: 'list',
          })
        );
      }
    } else {
      this.store.dispatch(
        GetPublicListJualBeliRuangPensiun({
          payload,
          dataType: 'list',
        })
      );
    }

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 500);

    // const response = combineLatest([
    //   this.pageService.keyword$,
    //   of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
    //   of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    // ])
    //   .pipe(
    //     take(1),
    //     tap(([keyword, noPeserta, idProfilDpa]) => {

    //     })
    //   )
    //   .subscribe();

    // this.subscribtions.add(response);
  }

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  public handleNavigateToDetail(jualBeli: JualBeliRuangPensiun): void {
    this.router.navigate([
      `/pensiun/detail/transaction/${jualBeli.idRuangPensiun}`,
    ]);
  }

  public async openImage(url: any) {
    const modal = await this.modalCtrl.create({
      component: OpenImageModal,
      cssClass: 'modal-web ion-background-transparent banner-modal-x ',
      componentProps: {
        url: url,
      },
    });
    modal.present();
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
