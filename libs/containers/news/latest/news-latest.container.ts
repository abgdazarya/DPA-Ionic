import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  GetListNews,
  GetPublicListNews,
  NewsModel,
} from '@controllers/menu-news';
import { Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuNewsInteractionRepository,
  MenuNewsRepository,
  MenuNewsState,
} from '@stores/menu-news';
import { ProfileRepository } from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-news-latest-container',
  templateUrl: './news-latest.container.html',
  providers: [
    ProfileRepository,
    MenuNewsRepository,
    MenuNewsInteractionRepository,
  ],
})
export class NewsLatestContainer implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';

  public news$: Observable<NewsModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;

  constructor(
    private storageService: StorageService,
    public store: Store<MenuNewsState>,
    public profileRepo: ProfileRepository,
    public menuNewsRepo: MenuNewsRepository,
    public menuNewsInteractionRepo: MenuNewsInteractionRepository,
    private router: Router
  ) {
    this.news$ = this.menuNewsRepo.getNewsLatest$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data;
      })
    );

    this.pagination$ = this.menuNewsRepo.getNewsLatest$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.loading$ = this.menuNewsInteractionRepo
      .getNewsLatestInteraction$()
      .pipe(
        map((res) => {
          return res.isLoading;
        })
      );
  }

  public handlePageChange(page: number): void {
    this.fetchListNews(page);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public fetchListNews(page: number = 1) {
    const noPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      limit: 3,
      keyword: this.keyword,
      page,
    };

    if (noPeserta) {
      this.store.dispatch(
        GetListNews({
          payload,
          dataType: 'latest',
        })
      );

      return;
    }

    this.store.dispatch(
      GetPublicListNews({
        payload,
        dataType: 'latest',
      })
    );
  }

  public handleNavigateToNews(): void {
    this.router.navigate(['news']).then();
  }

  public handleNavigateToNewsDetail(news: NewsModel): void {
    this.router.navigate([`/news/${news.idBeritaDpa}`]).then();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.fetchListNews();
  }

  ngOnInit(): void {
    this.fetchListNews();
  }

  ngOnDestroy(): void {}
}
