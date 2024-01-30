import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetListNews,
  GetPublicListNews,
  NewsModel,
} from '@controllers/menu-news';
import { Store } from '@ngrx/store';
import { MenuNewsState } from '@stores/menu-news';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';

@Injectable()
export class NewsHomePageService {
  constructor(
    private store: Store<MenuNewsState>,
    private storageService: StorageService,
    private router: Router
  ) {}

  public handleFetchNewsLanding(): void {
    const noPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    const payload = {
      ...noPeserta,
      keyword: '',
      page: 1,
      limit: 3,
    };

    if (noPeserta) {
      this.store.dispatch(
        GetListNews({
          payload,
          dataType: 'landing',
        })
      );

      return;
    }

    this.store.dispatch(
      GetPublicListNews({
        payload,
        dataType: 'landing',
      })
    );
  }

  public handleNavigateToNews(): void {
    this.router.navigate(['news']).then();
  }

  public handleNavigateToNewsDetail(news: NewsModel): void {
    this.router.navigate([`/news/${news.idBeritaDpa}`]).then();
  }
}
