import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { GetPublicNewsReset } from '@controllers/menu';
import {
  GetListNews,
  GetListNewsReset,
  GetPublicListNews,
  NewsModel,
} from '@controllers/menu-news';
import { IonContent, Platform } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuNewsInteractionRepository,
  MenuNewsRepository,
  MenuNewsState,
} from '@stores/menu-news';
import { ProfileRepository } from '@stores/profile';
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
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-news-list-container',
  templateUrl: './news-list.container.html',
  providers: [
    ProfileRepository,
    MenuNewsRepository,
    MenuNewsInteractionRepository,
  ],
})
export class NewsListContainer implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';
  @ViewChild('targetScrollPos') targetScrollPos: any;
  private targetPage: number = 1;
  private subscribtions = new Subscription();

  public news$: Observable<NewsModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;
  listData: any = [];
  @ViewChild('scrollTo', { static: false }) scrollToElement!: ElementRef;
  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };

  constructor(
    private storageService: StorageService,
    public store: Store<MenuNewsState>,
    public profileRepo: ProfileRepository,
    public menuNewsRepo: MenuNewsRepository,
    public menuNewsInteractionRepo: MenuNewsInteractionRepository,
    private router: Router,
    private parent: IonContent,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    public screenSizeService: ScreenSizeService,
    private vps: ViewportScroller
  ) {
    this.news$ = this.menuNewsRepo.getNewsList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        this.listData = res?.data?.data;
        this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
        return res?.data?.data;
      })
    );

    this.pagination$ = this.menuNewsRepo.getNewsList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.loading$ = this.menuNewsInteractionRepo.getNewsListInteraction$().pipe(
      map((res) => {
        this.lodaingDataStatus = {
          isLoading: res.isLoading,
          isError: res.error ? true : false,
        };
        return res.isLoading;
      })
    );
  }

  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.resetData();
    this.screenSizeService.isDesktopResolution()
      ? (this.limitDefault = 9)
      : (this.limitDefault = 10);
    this.createEventScrollListener();
    // this.fetchListNews();
    this.cdr.markForCheck();
  }

  public handlePageChange(page: number): void {
    this.parent.scrollToTop(0);
    this.fetchListNews(page);
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // });
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
        this.lodaingDataStatus.isLoading = true;
        try {
          await this.fetchListNews(this.targetPage, 10);
          this.cdr.markForCheck();
        } catch (error) {
          console.error(error);
        }

        const parentElement = this.targetScrollPos.nativeElement;
        parentElement.scrollTo({
          top: top == 0 ? currentY : top,
          behavior: 'smooth',
        });
      }
    }, 200);
  };

  limitDefault = 10;
  public async fetchListNews(page: number = 1, limit: number = 0) {
    const response = combineLatest([
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        take(1),
        tap(async ([noPeserta, idProfilDpa]) => {
          this.limitDefault += limit;
          const idProfile = await this.storageService.getStorage(
            StorageKeyEnum.ID_PROFILE_DPA
          );
          const payload = {
            idProfile: idProfile,
            limit: this.limitDefault,
            keyword: this.keyword,
            page,
          };

          if (idProfile) {
            this.store.dispatch(
              GetListNews({
                payload,
                dataType: 'list',
              })
            );

            setTimeout(() => {
              this.isLoading = false;
              this.cdr.markForCheck();
            }, 500);

            return;
          }

          this.store.dispatch(
            GetPublicListNews({
              payload,
              dataType: 'list',
            })
          );

          setTimeout(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          }, 500);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  public handleNavigateToNews(): void {
    this.router.navigate(['news']).then();
  }

  public handleNavigateToNewsDetail(news: NewsModel): void {
    this.router.navigate([`/news/${news.idBeritaDpa}`]).then();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetData();
    this.fetchListNews();
  }

  resetData = () => {
    this.store.dispatch(
      GetListNewsReset({ response: INITIAL_STATE, dataType: 'list' })
    );
    this.store.dispatch(
      GetPublicNewsReset({ response: INITIAL_STATE, dataType: 'list' })
    );
  };

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
