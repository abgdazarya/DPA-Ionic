import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LoginData,
  ReferralCodeFormController,
  VerifyReferralCode,
} from '@controllers/auth';
import { EditProfileInteractionReset } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { VerifyReferralCodeDto } from 'libs/controllers/auth/dtos/verify-referral-code.dto';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, filter, take, tap } from 'rxjs';

@Component({
  selector: 'auth-referral-code-modal',
  templateUrl: './referral-code.modal.html',
  providers: [
    ReferralCodeFormController,
    AuthRepository,
    AuthInteractionRepository,
  ],
})
export class AuthReferralCodeModal implements OnInit, OnDestroy {
  private subscribtions = new Subscription();

  public referralCode!: string;
  isError: any = null;

  public formGroup!: FormGroup;
  public interactRes$: Observable<InteractionState>;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    formController: ReferralCodeFormController,
    public screenSizeService: ScreenSizeService
  ) {
    this.formGroup = formController.create();
    this.interactRes$ =
      this.authInteractRepo.getVerifyReferralCodeInteraction$();
  }

  ngOnInit(): void {
    this.handleInitalizeInteraction();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  handleInitalizeInteraction(): void {
    const interaction = this.interactRes$
      .pipe(
        tap((interaction: InteractionState) => {
          if (interaction.type === InteractionType.PROCESS) {
            this.isError = null;
          }
          if (interaction.type === InteractionType.SUCCEED) {
            this.isError = false;
            setTimeout(() => {
              this.store.dispatch(
                EditProfileInteractionReset({
                  response: INITIAL_INTERACTION_STATE,
                })
              );
            }, 2000);
          }

          if (interaction.type === InteractionType.FAILED) {
            this.isError = true;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  public handleUseReferral() {
    const payload: VerifyReferralCodeDto = {
      // idProfilDpa: 'DPA000000001',
      ...this.formGroup.value,
    };

    this.store.dispatch(VerifyReferralCode({ payload }));

    return;
    const response = this.authRepo
      .getLogin$()
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap((response: DataResponse<LoginData>) => {
          if (!response?.data?.idProfilDpa) return;

          // const payload: VerifyReferralCodeDto = {
          //   idProfilDpa: response?.data?.idProfilDpa,
          //   kodeReferal: this.referralCode,
          // };

          const payload: VerifyReferralCodeDto = {
            // idProfilDpa: 'DPA000000001',
            kodeReferal: this.formGroup.value,
          };

          this.store.dispatch(VerifyReferralCode({ payload }));
        })
      )
      .subscribe();
    this.subscribtions.add(response);
  }

  public async handleClose() {
    await this.modalCtrl.dismiss();
  }

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  public async handleSubmit() {
    await this.modalCtrl.dismiss({ submitted: true });
  }
}
