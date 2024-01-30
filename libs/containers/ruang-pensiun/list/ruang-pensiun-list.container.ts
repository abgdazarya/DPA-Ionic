import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import {
  AllKontenRuangPensiun,
  GetListAllKontenRuangPensiun,
  GetListAllKontenRuangPensiunReset,
  GetPublicListAllKontenRuangPensiun,
  GetPublicListAllKontenRuangPensiunReset,
} from '@controllers/menu';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  InteractionState,
  InteractionType,
  Pagination,
  decryptContent,
  encryptContent,
} from '@shared';
import { MenuRepository, MenuInteractionRepository } from '@stores/menu';
import { ProfileRepository } from '@stores/profile';
import { OpenImageModal } from 'libs/components/ruang-pensiun/modals/open-image/open-image.modal';
import { LodaingDataStatus } from 'libs/containers/promotion/list/promotion-list.container';
import { LikeAllContent } from 'libs/controllers/menu/action/commands/like-all-content';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import {
  PageType,
  PensiunPageService,
} from 'src/app/modules/pensiun/pages/pensiun-page.service';

@Component({
  selector: 'app-ruang-pensiun-list-container',
  templateUrl: './ruang-pensiun-list.container.html',
  providers: [
    ProfileRepository,
    MenuRepository,
    MenuInteractionRepository,
    DatePipe,
  ],
})
export class RuangPensiunListContainer implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: any;
  @Input() isPensiunan: any;
  @Input() listCategory: any;
  @Input() pageTypeSelected: any;
  public pageTypeEnum: typeof PageType = PageType;
  public noPeserta$: Observable<NoPesertaData | undefined | null> = of(null);

  public allKonten$: Observable<AllKontenRuangPensiun[] | undefined | null>;
  public interactionAllKonten$: Observable<InteractionState | undefined | null>;
  public interactionAllKontenManage$: Observable<
    InteractionState | undefined | null
  >;

  public pagination$: Observable<Pagination | undefined | null>;
  public loading$: Observable<boolean | any>;
  private subscribtions = new Subscription();
  private subscribtionsPageType = new Subscription();

  listData: any = [];
  @ViewChild('targetScrollPosRP') targetScrollPosRP: any;
  private targetPage: number = 1;
  @ViewChild('scrollTo', { static: false }) scrollToElement!: ElementRef;
  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };
  isLoggedIn: boolean = false;
  noPeserta: any = {};
  idProfilDpa: any;
  isCountReload= 0;

  public mappingLoading!: boolean;

  public interactionTypeEnum: typeof InteractionType = InteractionType;

  constructor(
    private storageService: StorageService,
    public store: Store,
    public profileRepo: ProfileRepository,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    public screenSizeService: ScreenSizeService,
    private router: Router,
    private modalCtrl: ModalController,
    private datePipe: DatePipe,
    public pageService: PensiunPageService,
    private parent: IonContent,
    private platform: Platform,
    private cdr: ChangeDetectorRef
  ) {
    this.allKonten$ = this.menuRepository.getAllKontenRuangPensiunList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        this.mappingLoading = true;
        const newData = res?.data?.data;
        this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
        const updatedData = newData.map((e: any) => {
          if (e.templateRuangPensiun != 'JUAL-BELI') {
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

            this.mappingLoading = false;
            return updatedRes;
          } else {
            let list_image =
              e.gambarJualBeli != null &&
              e.gambarJualBeli.includes('{"MAIN_IMAGE"')
                ? JSON.parse(e.gambarJualBeli)
                : e.gambarJualBeli;
            const updatedRes = {
              ...e,
              category: 'Jual Beli',
              gambar: list_image ? list_image['MAIN_IMAGE'] : list_image,
            };
            this.mappingLoading = false;
            return updatedRes;
          }
        });
        return updatedData;
      })
    );

    this.interactionAllKonten$ =
      this.menuInteractionRepository.getAllKontenRuangPensiunList$();

    this.interactionAllKontenManage$ =
      this.menuInteractionRepository.getAllKontenRuangPensiunManage$();

    this.pagination$ = this.menuRepository.getAllKontenRuangPensiunList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.loading$ = this.menuInteractionRepository
      .getAllKontenRuangPensiunInteraction$()
      .pipe(
        map((res) => {
          return res.isLoading;
          // if (res.type == 'succeed' || res.type == 'failed') {
          //   this.lodaingDataStatus = {
          //     isLoading: false,
          //     isError: res.error ? true : false,
          //   };
          //   this.isLoading = false;
          //   return false;
          // } else {
          //   this.lodaingDataStatus = {
          //     isLoading: res.isLoading,
          //     isError: res.error ? true : false,
          //   };
          //   this.isLoading = res.isLoading || false;
          //   return res.isLoading || false;
          // }
        })
      );
  }

  async ngOnChanges(changes: any): Promise<void> {

    if(changes) {
      if(this.isCountReload <= 2){
        this.isCountReload ++
      }else{
        this.fetchAllKontenRuangPensiun();
      }
    }

    this.noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    this.idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    this.cdr.markForCheck();
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    this.idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    this.screenSizeService.isDesktopResolution()
      ? (this.limitDefault = 8)
      : (this.limitDefault = 10);
    this.createEventScrollListener();
    const data = this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA);

    if (data) {
      this.noPeserta$ = of(data);
      if (data.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
        this.isPensiunan = true;
      }
    }

    this.cdr.markForCheck();

    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    this.isLoggedIn = idProfilDpa ? true : false;

    const interaction = this.menuInteractionRepository
      .getAllKontenRuangPensiunManage$()
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.SUCCEED:
              setTimeout(() => {
                this.fetchAllKontenRuangPensiun();
              }, 2000);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);

    const keywordAction = this.pageService.keyword$
      .pipe(
        distinctUntilChanged(),
        tap(async (keyword) => {
          this.resetData();
          this.noPeserta = await this.storageService.getStorage(
            StorageKeyEnum.NOMOR_PESERTA
          );
          this.idProfilDpa = await this.storageService.getStorage(
            StorageKeyEnum.ID_PROFILE_DPA
          );
          this.keyword = keyword;

          this.fetchAllKontenRuangPensiun();
          this.cdr.markForCheck();
        })
      )
      .subscribe();

    this.subscribtions.add(keywordAction);
  }

  private parentEventListener: any = null;
  createEventScrollListener = () => {
    if (this.screenSizeService.isDesktopNativeResolution()) return;
    this.parentEventListener = this.parent?.ionScroll.subscribe(
      this.onScrollListener
    );
  };

  clearEventScrollListener = () => {
    if (this.parentEventListener) {
      this.parentEventListener.unsubscribe();
    }
  };

  onScrollListener = async (e: any) => {
    const { currentY, scrollTop } = e?.detail;
    const { top, y } =
      this.targetScrollPosRP?.nativeElement?.getBoundingClientRect() || {};

    if (
      (top <= this.platform.height() ||
        Math.floor(top) <= this.platform.height()) &&
      !this.lodaingDataStatus.isLoading &&
      this.targetPage < this.lodaingDataStatus.totalPage
    ) {
      await this.fetchAllKontenRuangPensiun(this.targetPage, 10);
    }
  };

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

  public handleNavigateToDetail(data: AllKontenRuangPensiun): void {
    const response = combineLatest([
      this.pageService.pageType$,
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        take(1),
        tap(([pageType, noPeserta, idProfilDpa]) => {
          this.pageTypeSelected = pageType;
          const param: NavigationExtras = {
            queryParams: {
              pageTypeSelected: this.pageTypeSelected,
            },
            onSameUrlNavigation: 'reload',
          };

          if (data.templateRuangPensiun == 'JUAL-BELI') {
            this.router.navigate(
              [`/pensiun/detail/transaction/${data.idRuangPensiun}`],
              param
            );
          } else {
            this.router.navigate(
              [`/pensiun/detail/activity/${data.idRuangPensiun}`],
              param
            );
          }
        })
      )
      .subscribe();

    this.subscribtionsPageType.add(response);
  }

  public decryptUser(content: any): any {
    if (content.namaUser) {
      content.namaUser = decryptContent(content.namaUser);
    }

    if (content.photoUser) {
      if (!content.photoUser.includes('http')) {
        content.photoUser = decryptContent(content.photoUser);
      }
    }

    return content;
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
    this.subscribtionsPageType.unsubscribe();
    if (this.parentEventListener) {
      this.parentEventListener.unsubscribe();
    }
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

  public handlePageChange(page: number): void {
    this.parent.scrollToTop(0);
    this.fetchAllKontenRuangPensiun(page);
    // const el: any = document.querySelector('.page-container-main');
    // if (el) {
    //   el.scrollToTop?.();
    // }
  }

  limitDefault = 10;
  isLoading: boolean = false;
  public async fetchAllKontenRuangPensiun(page: number = 1, limit: number = 0) {
    const response = combineLatest([
      this.pageService.pageType$,
      this.pageService.keyword$,
    ])
      .pipe(
        take(1),
        tap(async ([pageType, keyword]) => {
          this.pageTypeSelected = pageType;
          this.keyword = keyword;
          this.isLoading = true;
          this.limitDefault += limit;

          let payload = {
            search: this.keyword,
            limit: this.limitDefault,
            page: page,
            sort: 'DESC',
            sortBy: 'CREATED_ON',
          };

          if (this.idProfilDpa) {
            if (this.pageTypeSelected === this.pageTypeEnum.PERSONAL) {
              payload = {
                ...this.noPeserta,
                idProfilDpa: this.idProfilDpa,
                flagMine: 1,
                ...payload,
              };
            }

            if (this.pageTypeSelected === this.pageTypeEnum.PUBLIC) {
              payload = {
                ...this.noPeserta,
                idProfilDpa: this.idProfilDpa,
                flagMine: 0,
                ...payload,
              };
            }
          }

          if (this.idProfilDpa) {
            await this.store.dispatch(
              GetListAllKontenRuangPensiun({
                payload,
                dataType: 'list',
              })
            );
          } else {
            await this.store.dispatch(
              GetPublicListAllKontenRuangPensiun({
                payload,
                dataType: 'list',
              })
            );
          }

          setTimeout(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          }, 3000);
        })
      )
      .subscribe();
    this.subscribtions.add(response);
  }

  successLikeIdx: any = '';
  errorLikeIdx: any = '';
  public async handleLikeContent(item: AllKontenRuangPensiun): Promise<void> {
    const dataType =
      item.templateRuangPensiun == 'JUAL-BELI'
        ? 'jualBeliRuangPensiun'
        : 'postinganRuangPensiun';
    if (this.isLoggedIn) {
      const payload = {
        idRuangPensiun: item.idRuangPensiun,
      };
      await this.store.dispatch(
        LikeAllContent({ payload, dataType: dataType })
      );
    }
    await this.interactionAllKontenManage$.subscribe((res) => {
      if (res?.type === InteractionType.SUCCEED) {
        this.successLikeIdx = 'Sukses Memperbarui Data Ruang Pensiun Like.';
        this.cdr.markForCheck();
        setTimeout(() => {
          this.successLikeIdx = '';
          this.cdr.markForCheck();
        }, 3000);
      } else if (res?.type === InteractionType.FAILED) {
        this.errorLikeIdx = res.error;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.errorLikeIdx = '';
          this.cdr.markForCheck();
        }, 3000);
      }
    });
    // await this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA).then(async (data) => {
    //   if (data) {
    //     const payload = {
    //       idRuangPensiun: item.idRuangPensiun,
    //     };
    //     await this.store.dispatch(
    //       LikeAllContent({ payload, dataType: dataType })
    //     );
    //   }
    // });
  }
}
