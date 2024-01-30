import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  GetListPromotion,
  GetListPromotionReset,
  GetPublicListPromotion,
  PromotionModel,
} from '@controllers/menu-promotion';
import { DetailProfile, UserDetail } from '@controllers/profile';
import { IonContent, Platform } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
  MenuPromotionState,
} from '@stores/menu-promotion';
import { ProfileRepository } from '@stores/profile';
import { PromotionListDto } from 'libs/controllers/promotion/dtos/promotion-list.dto';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';

export interface LodaingDataStatus {
  isLoading: boolean | any;
  isError: boolean | any;
  totalPage?: number | any;
}
@Component({
  selector: 'app-promotion-list-container',
  templateUrl: './promotion-list.container.html',
  providers: [
    ProfileRepository,
    MenuPromotionRepository,
    MenuPromotionInteractionRepository,
  ],
})
export class PromotionListContainer implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';
  @Input() type: any;
  @Input() categoryId?: string | undefined | null = '';
  @ViewChild('targetScrollPos') targetScrollPos: any;

  public promotion$: Observable<PromotionModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;
  public profileUser$: Observable<DetailProfile | undefined | null>;
  // public error$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;
  private targetPage: number = 1;
  public listOfPromotions: PromotionModel[] = [];
  private isFirstTimeLoad: boolean = true;

  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };

  private profileDetail: any | DetailProfile = {};

  constructor(
    private storageService: StorageService,
    public store: Store<MenuPromotionState>,
    public profileRepo: ProfileRepository,
    public menuPromotionRepo: MenuPromotionRepository,
    public menuPromotionInteractionRepo: MenuPromotionInteractionRepository,
    private router: Router,
    private parent: IonContent,
    private platform: Platform,
    public screenSizeService: ScreenSizeService
  ) {
    this.promotion$ = this.menuPromotionRepo.getPromotionList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
        return res?.data?.data;
      })
    );

    this.pagination$ = this.menuPromotionRepo.getPromotionList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    // this.error
    this.loading$ = this.menuPromotionInteractionRepo
      .getPromotionListInteraction$()
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
  }

  public handlePageChange(page: number): void {
    this.targetPage = page;
    this.parent.scrollToTop(0);
    this.initdata(page);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public async fetchListPromotion(
    page: number = 1,
    category: any = this.categoryId
  ) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload: any = {
      ...noPeserta,
      limit: this.screenSizeService.isDesktopNativeResolution() ? 9 : 10,
      keyword: this.keyword,
      page,
    };

    if (category) {
      payload['idKategori'] = category;
    }

    // if (category == '') return;

    if (noPeserta) {
      this.store.dispatch(
        GetListPromotion({
          payload,
          dataType: 'list',
        })
      );

      return;
    }
    this.store.dispatch(
      GetPublicListPromotion({
        payload,
        dataType: 'list',
      })
    );
  }

  public handleNavigateToPromotion(): void {
    this.router.navigate(['promotion']).then();
  }

  public handleNavigateToPromotionDetail(promotion: PromotionModel): void {
    this.router.navigate([`/promotion/${promotion.idPromosi}`]).then();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes?.['keyword']?.firstChange ||
      !changes?.['categoryId']?.firstChange
    ) {
      this.initdata(1);
    }
  }

  ngOnInit(): void {
    this.targetPage = 1;
    this.initdata(1);
    this.createEventScrollListener();
  }

  initdata = async (page = 1) => {
    await this.store.dispatch(
      GetListPromotionReset({
        response: INITIAL_STATE,
        dataType: 'list',
      })
    );
    await this.fetchListPromotion(page, this.categoryId);
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

  goToClientScroll = () => {
    const { top, y } =
      this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};
    this.parent.scrollToBottom(top);
  };

  onScrollListener = async (e: any) => {
    const { currentY, clientHeight, scrollTop, scrollHeight } = e?.detail;
    const { top, y } =
      this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};
    if (
      top <= this.platform.height() &&
      !this.lodaingDataStatus.isLoading &&
      this.targetPage < this.lodaingDataStatus.totalPage
    ) {
      this.targetPage = this.targetPage + 1;
      this.isFirstTimeLoad = false;
      this.fetchListPromotion(this.targetPage, this.categoryId);
    }
  };
}
