import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ComponentType } from '@components/common';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { PageType, PensiunPageService } from '../pensiun-page.service';
import {
  RuangPensiunJualBeliModal,
  RuangPensiunPostinganModal,
} from '@components/ruang-pensiun';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import {
  Observable,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { DetailProfile, UserDetail } from '@controllers/profile';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponsePagination,
  InteractionState,
  InteractionType,
  Pagination,
  decryptContent,
} from '@shared';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import {
  GetListAllKontenRuangPensiunReset,
  GetPublicListAllKontenRuangPensiunReset,
  GetPublicListKategoriRuangPensiun,
} from '@controllers/menu';
import { PilihKategoriModal } from 'libs/components/ruang-pensiun/modals/pilih-kategori/pilih-kategori.modal';
import { Location } from '@angular/common';
import { LodaingDataStatus } from 'libs/containers/promotion/list/promotion-list.container';

@Component({
  selector: 'app-pensiun-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository, PensiunPageService],
})
export class IndexPage implements OnInit {
  public type: typeof ComponentType = ComponentType;
  private interactionPage = new Subscription();

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

  public noPeserta$: Observable<NoPesertaData | undefined | null> = of(null);
  public response$: Observable<DetailProfile | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public responseKategori$: Observable<any>;
  public loading$: Observable<boolean | undefined | null>;
  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };

  public pageTypeEnum: typeof PageType = PageType;
  showIndexContent: boolean = true;
  isShowCariTeman: boolean = false;
  listAllDataPublic: any = [];
  listPostingan: any = [];
  listJualBeli: any = [];
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  public pageTypeSelected: string = '';
  public pageTypeSelectedParams: any;
  successLikeIdx: any = '';
  errorLikeIdx: any = '';

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    public storageService: StorageService,
    public pageService: PensiunPageService,
    private profileRepository: ProfileRepository,
    public cdr: ChangeDetectorRef,
    private platform: Platform,
    private parent: IonContent,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    public screenSizeService: ScreenSizeService,
    private location: Location,
    public templateService: AppMainTemplateService
  ) {
    this.route.queryParams.subscribe((data: any) => {
      if (data && data.pageTypeSelected) {
        this.pageTypeSelectedParams = data.pageTypeSelected;
        localStorage.setItem(
          'pageTypeSelectedParams',
          this.pageTypeSelectedParams
        );
      }
    });
    this.response$ = this.profileRepository.getUserDetailData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getUserDetailInteraction$();
    this.responseKategori$ = this.menuRepository
      .getKategoriRuangPensiunList$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data?.data.length) return null;
          return res?.data?.data;
        })
      );

    this.loading$ = this.menuInteractionRepository
      .getAllKontenRuangPensiunInteraction$()
      .pipe(
        map((res) => {
          this.lodaingDataStatus = {
            isLoading: res.isLoading,
            isError: res.error ? true : false,
          };
          return res.isLoading;
        })
      );
  }

  isPensiunan: boolean = false;
  showKontenSaya: boolean = false;
  listCategory: any = [];
  async ngOnInit(): Promise<void> {
    const data = this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA);

    if (data) {
      this.noPeserta$ = of(data);

      if (data.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
        this.isPensiunan = true;
      }
      if (
        data.statusPeserta == StatusPesertaEnum.AKTIF ||
        data.statusPeserta == StatusPesertaEnum.PASIF ||
        data.statusPeserta == StatusPesertaEnum.PENSIUNAN
      ) {
        this.isShowCariTeman = true;
      }
    }

    this.cdr.markForCheck();

    this.pageService.handleChangePage('index');
    setTimeout(() => {
      this.templateService.handleShowIconQuiz(false);
      this.templateService.handleChangeIonHeaderClass('');
      this.templateService.handleChangeSecondaryHeaderClass('text-800');
      this.templateService.handleChangeIonContentClass(
        this.screenSizeService.isDesktopNativeResolution()
          ? 'ion-background-white relative'
          : 'ion-background-white relative'
      );
      this.templateService.handleChangeHeaderContainerClass(
        this.screenSizeService.isDesktopNativeResolution()
          ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
          : 'bg-bg-0 h-[78px] text-800'
      );
      this.templateService.handleChangePageTitle('Ruang Pensiun');
      this.templateService.handleUseSecondaryHeader(true);
      this.templateService.handleShowFooter(
        this.screenSizeService.isMobileResolution() ? false : true
      );
      this.cdr.markForCheck();
    }, 0);

    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/home'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/home');
        });

      localStorage.removeItem('pageTypeSelectedParams');
    });

    this.fetchUserDetail();

    this.fetchKategoriRuangPensiun();

    await this.responseKategori$.subscribe((res) => {
      if (res) {
        this.listCategory = res;
      }
    });

    const response = combineLatest([this.pageService.page$])
      .pipe(
        distinctUntilChanged(),
        take(1),
        tap(([page]) => {
          if (!this.pageTypeSelectedParams) {
            if (page == 'index') {
              this.showIndexContent = true;
              this.pageTypeSelected = this.pageTypeEnum.PUBLIC;
              this.pageService.handleChangePageType(this.pageTypeEnum.PUBLIC);
              this.pageActive = 'pensiun';
            } else {
              this.showIndexContent = false;
            }
          } else {
            this.changePageService(this.pageTypeSelectedParams);
          }
        })
      )
      .subscribe();
    this.interactionPage.add(response);

    setTimeout(() => {
      this.showKontenSaya = true;
      this.cdr.markForCheck();
    }, 1500);
  }

  // async listeningLikeEvent() {
  //   await this.interactionAllKontenManage$.subscribe((res) => {
  //     if (res?.type === InteractionType.SUCCEED) {
  //       this.successLikeIdx = 'Sukses Memperbarui Data Ruang Pensiun Like.';
  //       this.cdr.markForCheck();
  //       setTimeout(() => {
  //         this.successLikeIdx = '';
  //         this.cdr.markForCheck();
  //       }, 3000);
  //     } else if (res?.type === InteractionType.FAILED) {
  //       this.errorLikeIdx = res.error;
  //       this.cdr.markForCheck();
  //       setTimeout(() => {
  //         this.errorLikeIdx = '';
  //         this.cdr.markForCheck();
  //       }, 3000);
  //     }
  //   });
  // }

  public handlePageChange(page: number): void {
    this.pageNumber = page;
    this.parent.scrollToTop(0);
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

  async fetchUserDetail() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserDetail({ payload }));
  }

  public async checkCategoryPensiunFirst() {
    let updatedData = this.listCategory.filter(
      (e: any) =>
        e.templateRuangPensiun?.toLowerCase?.() ==
        'AKTIVITAS-PENSIUN'?.toLowerCase()
    );

    // updatedData = [updatedData[updatedData.length - 1]];
    if (!this.screenSizeService.isMobileNativeResolution()) {
      if (updatedData.length > 1) {
        const modal = await this.modalCtrl.create({
          component: PilihKategoriModal,
          backdropDismiss: false,
          componentProps: {
            kategoriPensiun: updatedData,
          },
          cssClass: 'modal-web ion-background-white',
        });
        modal.present();

        modal.onDidDismiss().then(({ data }) => {
          if (data) {
            this.handleOpenPostinganModal(data, updatedData);
          }
        });
      } else {
        this.handleOpenPostinganModal(
          updatedData[updatedData.length - 1],
          updatedData
        );
      }
    } else {
      if (updatedData.length > 1) {
        const param: NavigationExtras = {
          queryParams: {
            from: 'postingan',
          },
        };
        this.router.navigate([`/pensiun/categoryOne`], param);
      } else {
        this.handleOpenPostinganModal(
          updatedData[updatedData.length - 1],
          updatedData
        );
      }
    }
  }

  public async handleOpenPostinganModal(
    dataKategori: any,
    kategoriPensiun: any
  ) {
    const modal = await this.modalCtrl.create({
      component: RuangPensiunPostinganModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        dataKategori: dataKategori,
        kategoriPensiun: kategoriPensiun,
      },
    });
    modal.present();
  }

  public async checkCategoryJualBeliFirst() {
    let updatedData = this.listCategory.filter(
      (e: any) =>
        e.templateRuangPensiun?.toLowerCase() == 'JUAL-BELI'?.toLowerCase()
    );
    // updatedData = [updatedData[updatedData.length - 1]];
    if (!this.screenSizeService.isMobileNativeResolution()) {
      if (updatedData.length > 1) {
        const modal = await this.modalCtrl.create({
          component: PilihKategoriModal,
          backdropDismiss: false,
          componentProps: {
            kategoriPensiun: updatedData,
          },
          cssClass: 'modal-web ion-background-white',
        });
        modal.present();

        modal.onDidDismiss().then(({ data }) => {
          if (data) {
            this.handleOpenJualBeliModal(data, updatedData);
          }
        });
      } else {
        this.handleOpenJualBeliModal(
          updatedData[updatedData.length - 1],
          updatedData
        );
      }
    } else {
      if (updatedData.length > 1) {
        const param: NavigationExtras = {
          queryParams: {
            from: 'jualBeli',
          },
        };
        this.router.navigate([`/pensiun/categoryOne`], param);
      } else {
        this.handleOpenJualBeliModal(
          updatedData[updatedData.length - 1],
          updatedData
        );
      }
    }
  }

  public async handleOpenJualBeliModal(dataKategori: any, listKategori: any) {
    const modal = await this.modalCtrl.create({
      component: RuangPensiunJualBeliModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        dataKategori: dataKategori,
        listKategori: listKategori,
      },
    });
    modal.present();
  }

  public handleSearch(): void {
    // this.fetchPostinganRuangPensiun();
  }

  pageActive: any = 'pensiun';
  public handleNavigate(
    page: string,
    pageName = null,
    idKategori = null
  ): void {
    this.resetData();
    this.showIndexContent = false;
    this.pageTypeSelected = this.pageTypeEnum.PUBLIC;
    localStorage.removeItem('pageTypeSelectedParams');
    this.pageService.handleChangePageType(this.pageTypeEnum.PUBLIC);
    this.pageActive = page;
    this.pageNumber = 1;
    let dt: any;
    let pageOpen: any;
    if (page == 'activity' || page == 'AKTIVITAS-PENSIUN') {
      dt = {
        pageName: pageName ? pageName : 'Aktivitas Pensiun',
        idKategori: idKategori ? idKategori : 'KRP000000001',
      };
      pageOpen = page != 'activity' ? 'activity' : page;
    }
    if (page == 'transaction' || page == 'JUAL-BELI') {
      dt = {
        pageName: pageName ? pageName : 'Jual Beli',
        idKategori: idKategori ? idKategori : 'KRP000000002',
      };
      pageOpen = page != 'transaction' ? 'transaction' : page;
    }
    if (page == 'category') {
      pageOpen = 'category';
    }
    if (page == 'friend') {
      pageOpen = 'friend';
    }

    const param: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(dt),
      },
      onSameUrlNavigation: 'reload',
    };

    const pagePath = this.screenSizeService.isDesktopResolution()
      ? pageOpen
      : `${pageOpen}One`;

    this.router.navigate([`/pensiun/${pagePath}`], param).then(() => {
      this.location.replaceState(`/pensiun/${pagePath}`);
    });
    this.cdr.markForCheck();
  }

  public handleNavigateHome(): void {
    this.showIndexContent = true;
    this.pageTypeSelected = this.pageTypeEnum.PUBLIC;
    localStorage.removeItem('pageTypeSelectedParams');
    this.pageService.handleChangePageType(this.pageTypeEnum.PUBLIC);
    this.pageService.handleChangePage('index');
    this.pageActive = 'pensiun';
    this.router.navigate([`/pensiun`]);
  }

  changePageService(pageType: any) {
    if (!this.screenSizeService.isDesktopResolution()) {
      if (pageType == this.pageTypeEnum.PUBLIC) {
        localStorage.removeItem('pageTypeSelectedParams');
        this.showIndexContent = true;
        this.pageActive = 'pensiun';
        this.pageService.handleChangePage('index');
        this.router.navigate([`/pensiun`]);
      }
    }

    if (
      this.screenSizeService.isDesktopResolution() &&
      !this.pageTypeSelectedParams
    ) {
      this.showIndexContent = true;
      this.pageActive = 'pensiun';
      this.pageService.handleChangePage('index');
      this.router.navigate([`/pensiun`]);
    }

    this.pageTypeSelected = !this.pageTypeSelectedParams
      ? pageType
      : this.pageTypeSelectedParams;
    this.pageNumber = 1;
    this.pageService.handleChangePageType(
      !this.pageTypeSelectedParams ? pageType : this.pageTypeSelectedParams
    );
    this.cdr.markForCheck();
  }

  resetData = () => {
    this.store.dispatch(
      GetListAllKontenRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        dataType: 'list',
      })
    );
    this.store.dispatch(
      GetPublicListAllKontenRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
        dataType: 'list',
      })
    );
  };

  public handleBack = async () => {
    await this.router.navigate([`/home`]);
  };

  ngOnDestroy(): void {
    this.interactionPage.unsubscribe();
  }

  isMainRoute = () => {
    const url = this.router.url;
    if (url == '/pensiun') {
      return true;
    }
    return false;
  };
}
