import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetCustomPopup,
  GetPopupBirthdayResign,
  Popup,
} from '@controllers/home';
import {
  GetListPromotion,
  GetPublicListPromotion,
  PromotionModel,
} from '@controllers/menu-promotion';
import { Store } from '@ngrx/store';
import { DataResponseArray, InteractionState } from '@shared';
import {
  HomeInteractionRepository,
  HomeRepository,
  HomeState,
} from '@stores/home';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PopupHomePageService {
  private readonly isPopupShowSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public isPopupShow$: Observable<boolean | undefined | null> =
    this.isPopupShowSubject.asObservable();

  public customPopup$: Observable<DataResponseArray<Popup> | undefined | null>;
  public customPopupInteraction$: Observable<
    InteractionState | undefined | null
  >;

  public birhtdayAndResignPopup$: Observable<
    DataResponseArray<Popup> | undefined | null
  >;
  public birhtdayAndResignPopupInteraction$: Observable<
    InteractionState | undefined | null
  >;

  constructor(
    private store: Store<HomeState>,
    private repo: HomeRepository,
    private interactionRepo: HomeInteractionRepository,
    private storageService: StorageService
  ) {
    this.customPopup$ = this.repo.getCustomPopup$();
    this.customPopupInteraction$ =
      this.interactionRepo.getCustomPopupInteraction$();

    this.birhtdayAndResignPopup$ = this.repo.getPopupBirthdayResign$();
    this.birhtdayAndResignPopupInteraction$ =
      this.interactionRepo.getPopupBirthdayResignInteraction$();
  }

  public handleShowPopup(isShow: boolean): void {
    this.isPopupShowSubject.next(isShow);
  }

  public handleFetchPopup() {
    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (idProfilDpa) {
      const noPeserta = this.storageService.getStorage(
        StorageKeyEnum.NOMOR_PESERTA
      );

      if (noPeserta) {
        this.store.dispatch(
          GetCustomPopup({
            payload: { idAccountDpa: noPeserta?.idAccount },
          })
        );
      }

      this.store.dispatch(
        GetPopupBirthdayResign({
          payload: {},
        })
      );
    }
  }
}
