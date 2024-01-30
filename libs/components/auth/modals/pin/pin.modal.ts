import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CreatePin,
  CreatePinData,
  CreatePinDto,
  CreatePinInteractionReset,
  LoginData,
  LupaPin,
  PinFormController,
} from '@controllers/auth';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  FormValue,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { StorageService } from 'libs/services/common/storage.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, filter, take, tap } from 'rxjs';

@Component({
  selector: 'auth-pin-modal',
  templateUrl: './pin.modal.html',
  providers: [PinFormController, AuthInteractionRepository, AuthRepository],
})
export class AuthPinModal implements OnInit, OnDestroy {
  private subscribtions = new Subscription();

  public formGroup!: FormGroup;

  public isError: boolean = false;

  public interactRes$: Observable<InteractionState>;
  public lupaInteractRes$: Observable<InteractionState>;
  @Input() isForget: boolean = false;
  changePinMessage: string = '';
  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    private storageService: StorageService,
    formController: PinFormController,
    public screenSizeService: ScreenSizeService
  ) {
    this.formGroup = formController.create();
    this.interactRes$ = this.authInteractRepo.getCreatePinInteraction$();
    this.lupaInteractRes$ = this.authInteractRepo.getLupaPinInteraction$();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(
      CreatePinInteractionReset({
        response: INITIAL_INTERACTION_STATE,
      })
    );
    this.handleInitalizeLoginInteraction();
  }

  public async handleClose() {
    await this.modalCtrl.dismiss();
  }

  handleInitalizeLoginInteraction(): void {
    const interaction = this.interactRes$
      .pipe(
        tap((interaction: InteractionState) => {
          this.isError = false;
          if (interaction.type === InteractionType.SUCCEED) {
            // setTimeout(() => {
            //   this.store.dispatch(
            //     CreatePinInteractionReset({
            //       response: INITIAL_INTERACTION_STATE,
            //     })
            //   );
            // }, 2000);
            this.modalCtrl.dismiss({ submitted: true });
          }

          if (interaction.type === InteractionType.FAILED) {
            this.isError = true;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  public async handleCreatePin(formValue: FormValue<CreatePinDto>) {
    if (!formValue.isValid || !formValue.value) return;

    if (!!this.isForget) {
      const payload = {
        newPin: this.formGroup.get('pin')?.value,
      };
      this.store.dispatch(LupaPin({ payload }));
      this.lupaInteractRes$.subscribe((res) => {
        if (res.type === InteractionType.SUCCEED) {
          this.changePinMessage = 'Sukses memperbarui data PIN.';
          setTimeout(() => {
            this.changePinMessage = '';
            this.modalCtrl.dismiss({ success: true });
          }, 2000);
        }
      });
      return;
    }

    const response = this.authRepo
      .getLogin$()
      .pipe(
        filter((res: any) => !!res),
        take(1),
        tap((response: DataResponse<LoginData>) => {
          const payload: CreatePinDto = {
            ...this.formGroup.value,
            idProfilDpa: response?.data?.idProfilDpa,
          };
          this.store.dispatch(CreatePin({ payload }));
        })
      )
      .subscribe();
    this.subscribtions.add(response);
  }

  public handleBack = async () => {
    await this.modalCtrl.dismiss({ back: true });
  };
}
