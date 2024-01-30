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
  GetListPromotion,
  GetPublicListPromotion,
  PromotionModel,
} from '@controllers/menu-promotion';
import { Store } from '@ngrx/store';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
  MenuPromotionState,
} from '@stores/menu-promotion';
import { ProfileRepository } from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-promotion-landing-container',
  templateUrl: './promotion-landing.container.html',
  styleUrls: ['./promotion-landing.container.scss'],
  providers: [
    ProfileRepository,
    MenuPromotionRepository,
    MenuPromotionInteractionRepository,
  ],
})
export class PromotionLandingContainer implements OnInit, OnDestroy, OnChanges {
  @ViewChild('slidesLoading') public slidesLoading!: SwiperComponent;

  @Input() public keyword: string = '';

  public promotion$: Observable<PromotionModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public showPrevButton: boolean = false;
  public showNextButton: boolean = true;

  constructor(
    public store: Store<MenuPromotionState>,
    public profileRepo: ProfileRepository,
    public promotionRepo: MenuPromotionRepository,
    public promotionInteractionRepo: MenuPromotionInteractionRepository,
    public storageService: StorageService,
    private router: Router
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

  public handleNavigateToPromotion(): void {
    this.router.navigate(['promotion']).then();
  }

  public handleNavigateToPromotionDetail(promotion: PromotionModel): void {
    this.router.navigate([`/promotion/${promotion.idPromosi}`]).then();
  }

  public async fetchListPromotion() {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      keyword: this.keyword,
      page: 1,
      limit: 5,
    };

    // if (noPeserta) {
    //   this.store.dispatch(
    //     GetListPromotion({
    //       payload,
    //       dataType: 'landing',
    //     })
    //   );

    //   return;
    // }

    this.store.dispatch(
      GetPublicListPromotion({
        payload,
        dataType: 'landing',
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchListPromotion();
  }

  ngOnInit(): void {
    this.fetchListPromotion();
  }

  ngOnDestroy(): void {}
}
