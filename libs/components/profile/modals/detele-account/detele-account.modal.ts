import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DeleteProfil,
  DeleteProfilInteractionReset,
  DeleteProfilReset,
} from '@controllers/auth';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AuthInteractionState } from 'libs/stores/auth/states/auth.interaction.state';
import { AuthState } from 'libs/stores/auth/states/auth.state';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  filter,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-detele-account-modal',
  templateUrl: './detele-account.modal.html',
  styleUrls: ['./detele-account.modal.scss'],
  providers: [AuthInteractionRepository],
})
export class DeleteAccountModal implements OnInit, OnDestroy {
  @Input() renderTitle: string = 'Apakah Anda yakin ingin menghapus akun?';
  @Input() renderText: string =
    'Jika Anda menghapus akun, data diri Anda pada aplikasi akan terhapus. Mohon pertimbangkan dengan baik sebelum melanjutkan';
  @Input() appLink: string = '';

  private subs = new Subscription();
  public interaction$: Observable<InteractionState>;

  public loading$: Observable<boolean | undefined | null>;
  public error$: Observable<string | undefined | null>;
  private readonly errorSubject: BehaviorSubject<string | undefined | null> =
    new BehaviorSubject<string | undefined | null>(null);

  constructor(
    public screenSizeService: ScreenSizeService,
    private modalCtrl: ModalController,
    private store: Store<AuthState>,
    private interactionStore: Store<AuthInteractionState>,
    private interactionRepo: AuthInteractionRepository
  ) {
    this.interaction$ = this.interactionRepo.getDeleteProfilInteraction$();
    this.error$ = this.errorSubject.asObservable();
    this.loading$ = this.interactionRepo
      .getDeleteProfilInteraction$()
      .pipe(map((res) => res.isLoading));
  }

  onDismiss = (submitted?: boolean) => {
    this.modalCtrl.dismiss({ submitted });
  };

  public handleDeleteProfil() {
    this.store.dispatch(DeleteProfil({}));
  }

  public handleInteraction() {
    const interaction = this.interaction$
      .pipe(
        filter((res) => !!res),
        tap((res) => {
          if (res?.type === InteractionType.SUCCEED) {
            setTimeout(() => {
              this.handleResetInteraction();
              this.onDismiss(true);
            }, 100);
          }

          if (res?.type === InteractionType.FAILED) {
            this.errorSubject.next(
              'Gagal hapus profil, coba beberapa saat lagi'
            );
            setTimeout(() => {
              this.errorSubject.next(null);
              this.handleResetInteraction();
            }, 3000);
          }
        })
      )
      .subscribe();
    this.subs.add(interaction);
  }

  public handleResetInteraction() {
    this.store.dispatch(
      DeleteProfilReset({ response: DATA_RESPONSE_INITIAL_STATE })
    );
    this.interactionStore.dispatch(
      DeleteProfilInteractionReset({ response: INITIAL_INTERACTION_STATE })
    );
  }

  ngOnInit(): void {
    this.handleInteraction();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
