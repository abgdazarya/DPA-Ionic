import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { PromotionModel } from '@controllers/menu-promotion';
import { Store } from '@ngrx/store';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
  MenuPromotionState,
} from '@stores/menu-promotion';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-promotion-landing-container',
  templateUrl: './promotion-landing.container.html',
  styleUrls: ['./promotion-landing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuPromotionRepository, MenuPromotionInteractionRepository],
})
export class PromotionLandingContainer {
  @ViewChild('slidesLoading') public slidesLoading!: SwiperComponent;

  @Output() public navigateClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public promotionClicked: EventEmitter<PromotionModel> =
    new EventEmitter<PromotionModel>();

  public promotion$: Observable<PromotionModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public showPrevButton: boolean = false;
  public showNextButton: boolean = true;

  constructor(
    public store: Store<MenuPromotionState>,
    public promotionRepo: MenuPromotionRepository,
    public promotionInteractionRepo: MenuPromotionInteractionRepository,
    public storageService: StorageService
  ) {
    this.promotion$ = this.promotionRepo.getPromotionLanding$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data;
      })
    );

    this.loading$ = this.promotionInteractionRepo
      .getPromotionLandingInteraction$()
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
  }
}
