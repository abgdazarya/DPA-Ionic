import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetListPromotion,
  GetPublicListPromotion,
  PromotionModel,
} from '@controllers/menu-promotion';
import { Store } from '@ngrx/store';
import { MenuPromotionState } from '@stores/menu-promotion';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';

@Injectable()
export class PromotionHomePageService {
  constructor(
    private store: Store<MenuPromotionState>,
    private storageService: StorageService,
    private router: Router
  ) {}

  public handleFetchPromotionLanding(): void {
    const noPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    const payload = {
      ...noPeserta,
      keyword: '',
      page: 1,
      limit: 5,
    };

    if (noPeserta) {
      this.store.dispatch(
        GetListPromotion({
          payload,
          dataType: 'landing',
        })
      );

      return;
    }

    this.store.dispatch(
      GetPublicListPromotion({
        payload,
        dataType: 'landing',
      })
    );
  }

  public handleNavigateToPromotion(): void {
    this.router.navigate(['promotion']).then();
  }

  public handleNavigateToPromotionDetail(promotion: PromotionModel): void {
    this.router.navigate([`/promotion/${promotion.idPromosi}`]).then();
  }
}
