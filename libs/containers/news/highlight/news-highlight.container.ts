import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetListNews,
  GetPublicListNews,
  NewsModel,
} from '@controllers/menu-news';
import { Store } from '@ngrx/store';
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
  selector: 'app-news-highlight-container',
  templateUrl: './news-highlight.container.html',
  styleUrls: ['./news-highlight.container.scss'],
  providers: [
    ProfileRepository,
    MenuNewsRepository,
    MenuNewsInteractionRepository,
  ],
})
export class NewsHighlightContainer implements OnInit, OnDestroy {
  public news$: Observable<NewsModel | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

  constructor(
    public store: Store<MenuNewsState>,
    public storageService: StorageService,
    public profileRepo: ProfileRepository,
    public menuRepo: MenuNewsRepository,
    public menuInteractionRepo: MenuNewsInteractionRepository,
    private router: Router
  ) {
    this.news$ = this.menuRepo.getNewsHighlight$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data[0];
      })
    );

    this.loading$ = this.menuInteractionRepo
      .getNewsHighlightInteraction$()
      .pipe(
        map((res) => {
          return res.isLoading;
        })
      );
  }

  public handleNavigateToNews(): void {
    this.router.navigate(['news']).then();
  }

  public handleNavigateToNewsDetail(news: NewsModel): void {
    this.router.navigate([`/news/${news.idBeritaDpa}`]).then();
  }

  public async fetchListNews() {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      keyword: '',
      page: 1,
      limit: 1,
    };

    if (noPeserta) {
      this.store.dispatch(
        GetListNews({
          payload,
          dataType: 'highlight',
        })
      );

      return;
    }

    this.store.dispatch(
      GetPublicListNews({
        payload,
        dataType: 'highlight',
      })
    );
  }

  ngOnInit(): void {
    this.fetchListNews();
  }

  ngOnDestroy(): void {}
}
