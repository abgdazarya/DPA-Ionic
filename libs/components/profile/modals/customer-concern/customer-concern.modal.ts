import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveCustomerConcern } from '@controllers/home';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { InteractionType } from '@shared';
import { HomeInteractionRepository, HomeRepository } from '@stores/home';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import {
  Observable,
  Subscriber,
  Subscription,
  filter,
  from,
  map,
  take,
  tap,
} from 'rxjs';
@Component({
  selector: 'app-customer-concern-modal',
  templateUrl: './customer-concern.modal.html',
  styleUrls: ['./customer-concern.modal.scss'],
  providers: [HomeRepository, HomeInteractionRepository],
})
export class CustomerConcernModal implements OnInit, OnDestroy {
  subs = new Subscription();

  public loading$: Observable<boolean | undefined | null>;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store,
    private repo: HomeRepository,
    private interactionRepo: HomeInteractionRepository,
    private storageService: StorageService
  ) {
    this.loading$ = this.interactionRepo.getCustomerConcernInteraction$().pipe(
      map((interaction) => {
        return interaction?.isLoading;
      })
    );
  }

  ngOnInit(): void {
    this.handleInteraction();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleClose() {
    this.modalCtrl.dismiss({ isDismiss: true });
  }

  handleInteraction() {
    const action = this.interactionRepo
      .getCustomerConcernInteraction$()
      .pipe(
        filter((res) => !!res),
        tap((interaction) => {
          if (interaction?.type === InteractionType.SUCCEED) {
            this.handleClose();
          }
        })
      )
      .subscribe();

    this.subs.add(action);
  }

  async handleAcceptTerm() {
    const action = from(
      this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)
    )
      .pipe(
        filter((res) => !!res),
        take(1),
        tap((idProfilDpa) => {
          if (!idProfilDpa) return;

          this.store.dispatch(
            SaveCustomerConcern({ payload: { custConcern: '1' } })
          );
        })
      )
      .subscribe();

    this.subs.add(action);
  }
}
