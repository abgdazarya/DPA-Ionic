import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { DpaTvModel } from '@controllers/menu-dpa-tv';
import { NewsModel } from '@controllers/menu-news';
import { Store } from '@ngrx/store';
import {
  MenuNewsInteractionRepository,
  MenuNewsRepository,
  MenuNewsState,
} from '@stores/menu-news';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-news-landing-container',
  templateUrl: './news-landing.container.html',
  styleUrls: ['./news-landing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuNewsRepository, MenuNewsInteractionRepository],
})
export class NewsLandingContainer {
  @Output() public navigateClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public newsClicked: EventEmitter<NewsModel> =
    new EventEmitter<NewsModel>();

  public news$: Observable<NewsModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  constructor(
    public store: Store<MenuNewsState>,
    public newsRepo: MenuNewsRepository,
    public newsInteractionRepo: MenuNewsInteractionRepository,
    public storageService: StorageService
  ) {
    this.news$ = this.newsRepo.getNewsLanding$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data;
      })
    );

    this.loading$ = this.newsInteractionRepo.getNewsLandingInteraction$().pipe(
      map((res) => {
        return res?.isLoading;
      })
    );
  }
}
