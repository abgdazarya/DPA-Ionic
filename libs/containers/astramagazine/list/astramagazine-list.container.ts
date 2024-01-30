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
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import {
  GetListAstramagazine,
  GetPublicListAstramagazine,
  AstramagazineModel,
  GetOptionAstramagazine,
  AstramagazineOptionModel,
  GetListAstramagazineReset,
  GetPublicListAstramagazineReset,
} from '@controllers/menu-astramagazine';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import {
  InteractionState,
  InteractionType,
  Pagination,
  encryptContent,
} from '@shared';
import {
  MenuAstramagazineInteractionRepository,
  MenuAstramagazineRepository,
  MenuAstramagazineState,
} from '@stores/menu-astramagazine';
import { ProfileRepository } from '@stores/profile';
import { PreviewPdfComponent } from 'libs/components/common/preview-pdf/preview-pdf.component';
import { LodaingDataStatus } from 'libs/containers/promotion/list/promotion-list.container';
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
  filter,
  map,
  of,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-astramagazine-list-container',
  templateUrl: './astramagazine-list.container.html',
  providers: [
    ProfileRepository,
    MenuAstramagazineRepository,
    MenuAstramagazineInteractionRepository,
    DatePipe,
  ],
})
export class AstramagazineListContainer
  implements OnInit, OnDestroy, OnChanges
{
  @Input() keyword: string = '';
  @Input() filterData: any;
  @Output() public errorPdf = new EventEmitter();
  currentMonth: any;
  currentYear: any;

  public astramagazine$: Observable<AstramagazineModel[] | undefined | null>;
  public astramagazineOption$: Observable<
    AstramagazineOptionModel | undefined | null
  >;

  public loading$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;
  private subscribtions = new Subscription();
  listData: any = [];
  @ViewChild('targetScrollPos') targetScrollPos: any;
  private targetPage: number = 1;
  @ViewChild('scrollTo', { static: false }) scrollToElement!: ElementRef;
  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };

  constructor(
    private storageService: StorageService,
    public store: Store<MenuAstramagazineState>,
    public profileRepo: ProfileRepository,
    public menuAstramagazineRepo: MenuAstramagazineRepository,
    public screenSizeService: ScreenSizeService,
    public menuAstramagazineInteractionRepo: MenuAstramagazineInteractionRepository,
    private router: Router,
    private datePipe: DatePipe,
    private parent: IonContent,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController
  ) {
    this.astramagazine$ = this.menuAstramagazineRepo
      .getAstramagazineList$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data?.data.length) return null;
          this.listData = res?.data?.data;
          this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
          const newData = res?.data?.data;
          const updatedData = newData.map((e: any) => {
            const dateCreated = new Date();
            dateCreated.setMonth(e.monthEdt - 1);
            dateCreated.setFullYear(e.yearEdt);

            const updatedRes = {
              ...e,
              dateCreated: this.datePipe.transform(dateCreated, 'MMMM yyyy'),
            };

            return updatedRes;
          });

          return updatedData;
        })
      );

    this.loading$ = this.menuAstramagazineInteractionRepo
      .getAstramagazineListInteraction$()
      .pipe(
        map((res) => {
          this.lodaingDataStatus = {
            isLoading: res.isLoading,
            isError: res.error ? true : false,
          };
          return res.isLoading;
        })
      );

    this.pagination$ = this.menuAstramagazineRepo.getAstramagazineList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.astramagazineOption$ = this.menuAstramagazineRepo
      .getAstramagazineOption$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data) return null;
          return res?.data;
        })
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    this.resetData();
    this.fetchListAstramagazine();
    this.fetchOptionAstramagazine();
  }

  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.resetData();
    this.currentMonth = this.datePipe.transform(new Date(), 'M');
    this.currentYear = this.datePipe.transform(new Date(), 'yyyy');

    this.screenSizeService.isDesktopResolution()
      ? (this.limitDefault = 8)
      : (this.limitDefault = 10);
    this.createEventScrollListener();
    // this.fetchListAstramagazine();
    // this.fetchOptionAstramagazine();
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
    setTimeout(async () => {
      const { currentY, scrollTop } = e?.detail;
      let { top, y } =
        this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};

      if (
        top <= this.platform.height() &&
        !this.lodaingDataStatus.isLoading &&
        this.targetPage < this.lodaingDataStatus.totalPage
      ) {
        // this.lodaingDataStatus.isLoading = true;
        try {
          await this.fetchListAstramagazine(this.targetPage, 4);
        } catch (error) {
          console.error(error);
        }

        const parentElement = this.targetScrollPos.nativeElement;
        parentElement.scrollTo({
          top: top == 0 ? currentY : top,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
    if (this.parentEventListener) {
      this.parentEventListener.unsubscribe();
    }
  }

  public handlePageChange(page: number): void {
    this.parent.scrollToTop(0);
    this.fetchListAstramagazine(page);
    // const el: any = document.querySelector('.page-container-main');
    // if (el) {
    //   el.scrollToTop?.();
    // }
  }

  limitDefault = 10;
  public async fetchListAstramagazine(page: number = 1, limit: number = 0) {
    // this.resetData();

    const response = combineLatest([
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        tap(async ([noPeserta, idProfilDpa]) => {
          this.isLoading = true;
          this.limitDefault += limit;

          const payload = {
            ...noPeserta,
            limit: this.limitDefault,
            keyword: this.keyword,
            page,
          };

          if (this.filterData) {
            if (this.filterData.month !== null) {
              payload.month = this.filterData.month;
            }

            if (this.filterData.year !== null) {
              payload.year = this.filterData.year;
            }

            if (this.filterData.kategori !== null) {
              payload.kategori = this.filterData.kategori;
            }
          }

          if (noPeserta) {
            noPeserta.namaPeserta = encryptContent(noPeserta.namaPeserta);
            noPeserta.umur = encryptContent(noPeserta.umur);
            noPeserta.gaji = encryptContent(noPeserta.gaji);
            noPeserta.masaKerja = encryptContent(noPeserta.masaKerja);

            await this.store.dispatch(
              GetListAstramagazine({
                payload,
                dataType: 'list',
              })
            );
          } else {
            await this.store.dispatch(
              GetPublicListAstramagazine({
                payload,
                dataType: 'list',
              })
            );
          }

          setTimeout(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          }, 1000);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  public async fetchOptionAstramagazine() {
    this.store.dispatch(GetOptionAstramagazine({}));
  }

  public handleNavigateToAstramagazine(): void {
    this.router.navigate(['astramagazine']).then();
  }

  resetData = () => {
    this.store.dispatch(
      GetListAstramagazineReset({ response: INITIAL_STATE, dataType: 'list' })
    );
    this.store.dispatch(
      GetPublicListAstramagazineReset({
        response: INITIAL_STATE,
        dataType: 'list',
      })
    );
  };

  public async handleOpenAstramagazine(astramagazine: AstramagazineModel) {
    const urlPDF = astramagazine.pdf;
    if (!urlPDF) {
      this.errorPdf.emit('Tautan PDF tidak tersedia.');
      this.cdr.markForCheck();
      setTimeout(() => {
        this.errorPdf.emit('');
        this.cdr.markForCheck();
      }, 3000);
      return;
    }

    if (
      Capacitor.getPlatform() == 'android' ||
      this.screenSizeService.isMobileBrowser()
    ) {
      const modal = await this.modalCtrl.create({
        component: PreviewPdfComponent,
        cssClass: 'modal-web ion-background-transparent ion-no-box-shadow',
        componentProps: {
          urlPDF: urlPDF,
        },
      });

      modal.onDidDismiss().then(async (res) => {
        if (res.data == 'download') {
          await Browser.open({
            url: urlPDF,
            presentationStyle: 'popover',
          });
        }
      });
      modal.present();
    } else {
      await Browser.open({
        url: urlPDF,
        presentationStyle: 'popover',
      });
    }
  }
}
