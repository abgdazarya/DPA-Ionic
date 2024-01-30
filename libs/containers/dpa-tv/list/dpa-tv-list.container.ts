import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  GetListDpaTv,
  GetPublicListDpaTv,
  DpaTvModel,
  GetListDpaTvReset,
  GetPublicListDpaTvReset,
} from '@controllers/menu-dpa-tv';
import { DpaTvShareModal } from '@components/dpa-tv';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuDpaTvInteractionRepository,
  MenuDpaTvRepository,
  MenuDpaTvState,
} from '@stores/menu-dpa-tv';
import { ProfileRepository } from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Browser } from '@capacitor/browser';
import { LodaingDataStatus } from 'libs/containers/promotion/list/promotion-list.container';
import { DetailProfile } from '@controllers/profile';
import { DpaTvListDto } from 'libs/controllers/dpa-tv/dtos/dpatv-list.dto';

@Component({
  selector: 'app-dpa-tv-list-container',
  templateUrl: './dpa-tv-list.container.html',
  providers: [
    ProfileRepository,
    MenuDpaTvRepository,
    MenuDpaTvInteractionRepository,
  ],
})
export class DpaTvListContainer implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';
  @ViewChild('targetScrollPos') targetScrollPos: any;
  private targetPage: number = 1;

  public dpaTv$: Observable<DpaTvModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;
  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };

  public profileUser$: Observable<DetailProfile | undefined | null>;
  private profileDetail: any | DetailProfile = {};

  constructor(
    private storageService: StorageService,
    public store: Store<MenuDpaTvState>,
    public profileRepo: ProfileRepository,
    public menuDpaTvRepo: MenuDpaTvRepository,
    public menuDpaTvInteractionRepo: MenuDpaTvInteractionRepository,
    public modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private router: Router,
    private parent: IonContent,
    private platform: Platform
  ) {
    this.dpaTv$ = this.menuDpaTvRepo.getDpaTvList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;

        this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
        return res?.data?.data;
      })
    );

    this.pagination$ = this.menuDpaTvRepo.getDpaTvList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.loading$ = this.menuDpaTvInteractionRepo
      .getDpaTvListInteraction$()
      .pipe(
        map((res) => {
          this.lodaingDataStatus = {
            isLoading: res.isLoading,
            isError: res.error ? true : false,
          };
          return res.isLoading;
        })
      );
    this.profileUser$ = this.profileRepo.getUserDetailData$();
    this.profileUser$.subscribe((e) => {
      if (e) {
        this.profileDetail = e;
      }
    });
  }

  public handlePageChange(page: number): void {
    this.resetData();
    this.parent.scrollToTop(0);
    this.fetchListDpaTv(page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public async fetchListDpaTv(page: number = 1) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      limit: this.screenSizeService.isDesktopNativeResolution() ? 9 : 10,
      keyword: this.keyword,
      page,
    };

    if (noPeserta) {
      this.store.dispatch(
        GetListDpaTv({
          payload,
          dataType: 'list',
        })
      );

      return;
    }

    this.store.dispatch(
      GetPublicListDpaTv({
        payload,
        dataType: 'list',
      })
    );
  }

  async handleOpenDpaTvShareModal(item: DpaTvModel) {
    const modal = await this.modalCtrl.create({
      component: DpaTvShareModal,
      cssClass: this.screenSizeService.isDesktopResolution()
        ? 'modal-web ion-background-white'
        : 'modal-web ion-background-transparent',
      componentProps: {
        content: {
          title: item.judulDpatv,
          banner: item.imageThumbnail,
          link: item.linkYoutube,
          text: item.judulDpatv,
          header: 'DPA TV',
        },
      },
    });
    modal.present();
  }

  public handleNavigateToDpaTv(): void {
    this.router.navigate(['dpatv']).then();
  }

  public async handleNavigateToYoutube(dpaTv: DpaTvModel) {
    if (!dpaTv.linkYoutube) return;
    await Browser.open({
      url: dpaTv.linkYoutube,
      presentationStyle: 'popover',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['keyword'].firstChange) {
      this.resetData();
      this.fetchListDpaTv();
    }
  }

  ngOnInit(): void {
    this.resetData();
    this.fetchListDpaTv();
    this.createEventScrollListener();
  }

  resetData = () => {
    this.store.dispatch(
      GetListDpaTvReset({ response: INITIAL_STATE, dataType: 'list' })
    );
    this.store.dispatch(
      GetPublicListDpaTvReset({ response: INITIAL_STATE, dataType: 'list' })
    );
  };

  ngOnDestroy(): void {
    this.clearEventScrollListener();
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
      this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};
    if (
      top <= this.platform.height() &&
      !this.lodaingDataStatus.isLoading &&
      this.targetPage < this.lodaingDataStatus.totalPage
    ) {
      this.targetPage = this.targetPage + 1;
      this.fetchListDpaTv(this.targetPage);
    }
  };
}
