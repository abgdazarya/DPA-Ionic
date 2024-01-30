import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { DpaTvModel } from '@controllers/menu-dpa-tv';
import { Store } from '@ngrx/store';
import {
  MenuDpaTvInteractionRepository,
  MenuDpaTvRepository,
  MenuDpaTvState,
} from '@stores/menu-dpa-tv';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-dpa-tv-landing-container',
  templateUrl: './dpa-tv-landing.container.html',
  styleUrls: ['./dpa-tv-landing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuDpaTvRepository, MenuDpaTvInteractionRepository],
})
export class DpaTvLandingContainer {
  @ViewChild('slidesLoading') public slidesLoading!: SwiperComponent;

  @Output() public navigateClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public dpaTvClicked: EventEmitter<DpaTvModel> =
    new EventEmitter<DpaTvModel>();

  public dpaTv$: Observable<DpaTvModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public showPrevButton: boolean = false;
  public showNextButton: boolean = true;

  constructor(
    public store: Store<MenuDpaTvState>,
    public dpaTvRepo: MenuDpaTvRepository,
    public dpaTvInteractionRepo: MenuDpaTvInteractionRepository,
    public storageService: StorageService
  ) {
    this.dpaTv$ = this.dpaTvRepo.getDpaTvLanding$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data;
      })
    );

    this.loading$ = this.dpaTvInteractionRepo
      .getDpaTvLandingInteraction$()
      .pipe(
        map((res) => {
          return res?.isLoading;
        })
      );
  }

  public handleSlide(type: string): void {
    const slidesLoading = this.slidesLoading.swiperRef;

    type === 'next'
      ? slidesLoading.slideNext(500)
      : slidesLoading.slidePrev(500);

    if (!slidesLoading.isEnd && !slidesLoading.isBeginning) {
      this.showNextButton = true;
      this.showPrevButton = true;
    }

    if (slidesLoading.isEnd) {
      this.showNextButton = false;
    }

    if (slidesLoading.isBeginning) {
      this.showPrevButton = false;
    }
  }
}
