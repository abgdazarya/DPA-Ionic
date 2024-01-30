import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Breadcrumb, ComponentType } from '@components/common';
import {
  GetDetailJualBeliRuangPensiun,
  GetDetailPostinganRuangPensiun,
  GetDetailPostinganRuangPensiunReset,
  GetListJualBeliRuangPensiun,
  GetListPostinganRuangPensiun,
  GetPublicDetailPostinganRuangPensiun,
  GetPublicListKategoriRuangPensiun,
  JualBeliRuangPensiun,
  LaporanInvestasi,
  PostinganRuangPensiun,
} from '@controllers/menu';
import { ModalController } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponsePagination,
  InteractionState,
  InteractionType,
  decryptContent,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { PageType, PensiunPageService } from '../../pensiun-page.service';
import { SwiperComponent } from 'swiper/angular';
import { Browser } from '@capacitor/browser';
import { LikeContent } from 'libs/controllers/menu/action/commands/like-content';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Location } from '@angular/common';
import { OpenImageModal } from 'libs/components/ruang-pensiun/modals/open-image/open-image.modal';
import { DeleteDataModal } from 'libs/components/ruang-pensiun/modals/delete-data/delete-data.modal';
import { DeletePostingan } from 'libs/controllers/menu/action/commands/delete-postingan';
import { RuangPensiunPostinganModal } from '@components/ruang-pensiun';
import { StatusPesertaEnum } from '@controllers/auth';

@Component({
  selector: 'app-pensiun-detail-activity-page',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
    PensiunPageService,
  ],
})
export class DetailActivityPage implements OnInit, OnDestroy {
  public breadcrumbs: Breadcrumb[] = [
    { label: 'Home', link: '/home' },
    { label: 'Ruang Pensiun', link: '/pensiun' },
    { label: 'Postingan', link: '/pensiun/activity' },
    { label: 'Detail Postingan', link: '' },
  ];

  // <div
  //   class="flex items-center space-x-3 mb-7"
  //   *ngIf="screenSizeService.isDesktopResolution()"
  // >
  //   <span class="text-600">Home</span>
  //   <app-common-icon-component
  //     name="chevron-right-normal"
  //     nativeClass="text-neutral-600 w-7 h-7"
  //   ></app-common-icon-component>
  //   <span class="text-600">Ruang Pensiun</span>
  //   <app-common-icon-component
  //     name="chevron-right-normal"
  //     nativeClass="text-neutral-600 w-7 h-7"
  //   ></app-common-icon-component>
  //   <span class="text-600">Postingan</span>
  //   <app-common-icon-component
  //     name="chevron-right-normal"
  //     nativeClass="text-neutral-600 w-7 h-7"
  //   ></app-common-icon-component>
  //   <span class="text-800 font-bold">Detail Postingan</span>
  // </div>

  @ViewChild('imageSlides') public imageSlides!: SwiperComponent;

  private subscribtions = new Subscription();
  isPensiunan: boolean = false;

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

  public postingan$: Observable<PostinganRuangPensiun | undefined | null>;

  public interactionPostingan$: Observable<InteractionState | undefined | null>;
  public interactionPostinganManage$: Observable<
    InteractionState | undefined | null
  >;
  public responseKategori$: Observable<any>;

  public pageTypeEnum: typeof PageType = PageType;
  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;
  public loading$: Observable<boolean | undefined | null>;
  isMe: boolean = false;
  pageTypeSelected: any;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private storageService: StorageService,
    public pageService: PensiunPageService,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    public templateService: AppMainTemplateService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      this.resetData();
      if (data && data.pageTypeSelected) {
        this.pageTypeSelected = data.pageTypeSelected;
      }
    });
    this.postingan$ = this.menuRepository
      .getPostinganRuangPensiunDetail$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data) return;
          const newData = res?.data;
          let list_image =
            newData.gambar != null && newData.gambar.includes('{"MAIN_IMAGE"')
              ? JSON.parse(newData.gambar)
              : newData.gambar;
          const updatedRes = {
            ...newData,
            gambar:
              list_image && typeof list_image === 'object'
                ? list_image['MAIN_IMAGE']
                : list_image,
          };
          if (updatedRes.isMe) {
            this.isMe = true;
          }
          return updatedRes;
          // return res?.data;
        })
      );
    this.interactionPostingan$ =
      this.menuInteractionRepository.getPostinganRuangPensiunDetail$();

    this.interactionPostinganManage$ =
      this.menuInteractionRepository.getPostinganRuangPensiunManage$();

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
      .getPostinganRuangPensiunDetail$()
      .pipe(
        map((res) => {
          return res.isLoading;
        })
      );
  }

  listCategory: any = [];
  async ngOnInit(): Promise<void> {
    this.createListener();
    setTimeout(() => {
      this.templateService.handleInit();
      this.templateService.handleShowFooter(
        this.screenSizeService.isDesktopNativeResolution()
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
      this.templateService.handleChangePageTitle('Aktivitas Pensiun');
      this.templateService.handleUseSecondaryHeader(true);

      this.templateService.handleOnBack(() => {
        const param: NavigationExtras = {
          queryParams: {
            pageTypeSelected: this.pageTypeSelected,
          },
          onSameUrlNavigation: 'reload',
        };
        this.router.navigate(['/pensiun'], param).then(() => {
          this.location.replaceState('/pensiun');
        });
        if (this.isMe) {
          this.pageService.handleChangePageType(this.pageTypeEnum.PERSONAL);
          localStorage.setItem(
            'pageTypeSelectedParams',
            this.pageTypeEnum.PERSONAL
          );
        }
      });
      this.cdr.markForCheck();
    }, 0);

    this.fetchPostinganRuangPensiun();
    this.fetchKategoriRuangPensiun();

    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    this.isLoggedIn = idProfilDpa ? true : false;

    const nomorPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (nomorPeserta.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
      this.isPensiunan = true;
    }

    this.cdr.markForCheck();

    const interaction = this.menuInteractionRepository
      .getPostinganRuangPensiunManage$()
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.SUCCEED:
              setTimeout(() => {
                this.fetchPostinganRuangPensiun();
              }, 0);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);

    await this.responseKategori$.subscribe(async (res) => {
      if (res) {
        this.listCategory = res;
      }
    });
  }

  createListener = () => {
    window.addEventListener('popstate', this.eventListenerPopState);
  };

  deleteListener = () => {
    window.removeEventListener('popstate', this.eventListenerPopState);
  };

  eventListenerPopState = async (e: any) => {
    if (this.isMe) {
      await this.pageService.handleChangePageType(this.pageTypeEnum.PERSONAL);
      localStorage.setItem(
        'pageTypeSelectedParams',
        this.pageTypeEnum.PERSONAL
      );
      this.cdr.markForCheck();
    }

    // const param: NavigationExtras = {
    //   queryParams: {
    //     pageTypeSelected: this.pageTypeSelected,
    //   },
    //   onSameUrlNavigation: 'reload',
    // };
    // this.router.navigate(['/pensiun'], param).then(() => {
    //   this.location.replaceState('/pensiun');
    // });
  };

  public handleSelectBreadcrumb(link: string): void {
    if (!link) return;
    this.router.navigateByUrl(link);
  }

  ngOnDestroy(): void {
    this.deleteListener();
    this.fetchPostinganRuangPensiun();
  }

  public decryptUser(content: any): any {
    if (content == false || !content) return null;
    return decryptContent(content);
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

  errorLikeAOne: any = '';
  successLikeAOne: any = '';
  isLoggedIn: boolean = false;
  public handleLikeContent(item: PostinganRuangPensiun): void {
    if (this.isLoggedIn) {
      const payload = {
        idRuangPensiun: item.idRuangPensiun,
      };
      this.store.dispatch(
        LikeContent({ payload, dataType: 'postinganRuangPensiun' })
      );

      this.interactionPostinganManage$.subscribe((res) => {
        if (res?.type == InteractionType.SUCCEED) {
          this.successLikeAOne = 'Sukses Memperbarui Data Ruang Pensiun Like.';
          this.cdr.markForCheck();
          setTimeout(() => {
            this.successLikeAOne = '';
            this.cdr.markForCheck();
          }, 3000);
        } else if (res?.type == InteractionType.FAILED) {
          this.errorLikeAOne = res.error;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.errorLikeAOne = '';
            this.cdr.markForCheck();
          }, 3000);
        }
      });
    }
    // this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA).then((data) => {
    //   if (data) {
    //     const payload = {
    //       idRuangPensiun: item.idRuangPensiun,
    //     };
    //     this.store.dispatch(
    //       LikeContent({ payload, dataType: 'postinganRuangPensiun' })
    //     );

    //     this.interactionPostinganManage$.subscribe((res) => {
    //       if (res?.type == InteractionType.SUCCEED) {
    //         this.successLikeAOne =
    //           'Sukses Memperbarui Data Ruang Pensiun Like.';
    //         this.cdr.markForCheck();
    //         setTimeout(() => {
    //           this.successLikeAOne = '';
    //           this.cdr.markForCheck();
    //         }, 3000);
    //       } else if (res?.type == InteractionType.FAILED) {
    //         this.errorLikeAOne = res.error;
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

  public async handleNavigateToLocation() {
    const map =
      'https://www.google.com/maps/place/Monas,+Gambir,+Kecamatan+Gambir,+Kota+Jakarta+Pusat,+Daerah+Khusus+Ibukota+Jakarta/@-6.2008435,106.8583305,16z/data=!4m6!3m5!1s0x2e69f5d2db8c5617:0x4e446b7ac891d847!8m2!3d-6.1753917!4d106.8271533!16s%2Fg%2F11bw3wnng2?entry=ttu';
    await Browser.open({
      url: map,
      presentationStyle: 'popover',
    });
  }

  public fetchPostinganRuangPensiun(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    const { idRuangPensiun } = this.route.snapshot.params;

    if (!idRuangPensiun) return;
    const payload = {
      idRuangPensiun,
    };

    const nomorPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    )

    if (idProfilDpa) {
      this.store.dispatch(GetDetailPostinganRuangPensiun({ payload }));
      return;
    }

    this.store.dispatch(GetPublicDetailPostinganRuangPensiun({ payload }));
  }

  async fetchKategoriRuangPensiun() {
    const payload = {
      search: '',
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

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  async updateData(dataPostingan: any) {
    let dataKategori = {
      idKategori: dataPostingan.idKategoriRuangPensiun,
    };
    const modal = await this.modalCtrl.create({
      component: RuangPensiunPostinganModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        dataKategori: dataKategori,
        kategoriPensiun: this.listCategory,
        dataPostingan: dataPostingan,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.resetData();
        this.fetchPostinganRuangPensiun();
        this.cdr.markForCheck();
      }
    });
  }

  resetData = () => {
    this.store.dispatch(
      GetDetailPostinganRuangPensiunReset({
        response: DATA_RESPONSE_INITIAL_STATE,
      })
    );
  };

  async deleteData(dataPostingan: any) {
    const modal = await this.modalCtrl.create({
      component: DeleteDataModal,
      componentProps: {
        title: 'Kamu akan menghapus tulisanmu',
        desc: 'Tulisan yang kamu buat akan di hapus, jika kamu melanjutkan aksi ini.',
        status: 'oke',
      },
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        const payload = {
          idRuangPensiun: dataPostingan.idRuangPensiun,
        };
        this.store.dispatch(DeletePostingan({ payload }));
        this.interactionPostinganManage$.subscribe((res) => {
          if (res?.type == InteractionType.SUCCEED) {
            this.successLikeAOne = res.success;
            this.cdr.markForCheck();
            setTimeout(() => {
              this.successLikeAOne = '';
              this.cdr.markForCheck();
            }, 3000);

            setTimeout(() => {
              this.router
                .navigate(['/pensiun'], { onSameUrlNavigation: 'reload' })
                .then(() => {
                  this.location.replaceState('/pensiun');
                });
            }, 2000);
          } else if (res?.type == InteractionType.FAILED) {
            this.errorLikeAOne = res.error;
            this.cdr.markForCheck();
            setTimeout(() => {
              this.errorLikeAOne = '';
              this.cdr.markForCheck();
            }, 3000);
          }
        });
      }
    });
  }

  public handleSlide(type: string): void {
    if (!this.imageSlides) return;
    type === 'next'
      ? this.imageSlides.swiperRef.slideNext(500)
      : this.imageSlides.swiperRef.slidePrev(500);
  }
}
