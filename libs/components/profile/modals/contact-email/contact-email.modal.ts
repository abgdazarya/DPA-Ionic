import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthOtpModal } from '@components/auth';
import { RequestOtp, RequestOtpData, RequestOtpDto } from '@controllers/auth';
import {
  ChangeContact,
  DetailProfile,
  UbahEmailFormController,
} from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { UpdateSucceedModal } from 'libs/components/common/update-succeed/update-succeed.modal';
import { ChangeContactData } from 'libs/controllers/profile/models/change-contact';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'profile-contact-email-modal',
  templateUrl: './contact-email.modal.html',
  providers: [
    UbahEmailFormController,
    AuthRepository,
    AuthInteractionRepository,
    ProfileRepository,
    ProfileInteractionRepository,
  ],
})
export class ProfileContactEmailModal implements OnInit {
  @Input() detailUser: DetailProfile | null | undefined = undefined;
  public formGroup: FormGroup;
  public requestOtpRes$: Observable<
    DataResponse<RequestOtpData> | undefined | null
  >;

  public requestOtpInteractRes$: Observable<InteractionState>;
  public contactResponse$: Observable<
    DataResponse<ChangeContactData> | undefined | null
  >;
  public contactInteractRes$: Observable<InteractionState>;

  public verifyOtpSuccess$: Observable<string | undefined | null>;
  public verifyOtpError$: Observable<string | undefined | null>;
  errorMessage = '';
  private isShow: boolean = true;
  public disabledClose: boolean = false;
  public modalSuccess: any = null;
  constructor(
    private modalCtrl: ModalController,
    formController: UbahEmailFormController,
    private store: Store,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    private profileRepo: ProfileRepository,
    private storageService: StorageService,
    private profileInteractionRepository: ProfileInteractionRepository,
    public screenSizeService: ScreenSizeService
  ) {
    this.formGroup = formController.create();
    this.requestOtpRes$ = this.authRepo.getRequestOtp$();
    this.requestOtpInteractRes$ =
      this.authInteractRepo.getRequestOtpInteraction$();
    this.contactResponse$ = this.profileRepo.changeContact$();
    this.verifyOtpSuccess$ = this.authInteractRepo
      .getVerifyOtpInteraction$()
      .pipe(map((res) => res.success));
    this.verifyOtpError$ = this.authInteractRepo
      .getVerifyOtpInteraction$()
      .pipe(map((res) => res.error));
    this.contactInteractRes$ =
      this.profileInteractionRepository.changeContactInteraction$();
  }

  ngOnInit(): void {
    if (this.detailUser?.email) {
      this.formGroup.get('email')?.setValue(this.detailUser?.email);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.contactInteractRes$;
  }

  public handleClose = async () => {
    if (!this.disabledClose) await this.modalCtrl.dismiss();
  };

  public async handleBack() {
    if (!this.disabledClose) await this.modalCtrl.dismiss({ back: true });
  }

  async handleOpenSuccessModal() {
    if (this.modalSuccess) return;
    this.modalCtrl.dismiss({ succeed: true });
    this.hideAndShowPopup(false);
    const modal = await this.modalCtrl.create({
      component: UpdateSucceedModal,
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
      componentProps: {
        type: 'email',
      },
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {
      this.hideAndShowPopup(true);
    });
    this.modalSuccess = modal;
  }

  handleOpenOtpModal = async () => {
    this.hideAndShowPopup(false);
    const modal = await this.modalCtrl.create({
      component: AuthOtpModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        type: 'email',
        value: this.formGroup?.get?.('email')?.value,
        requestOptForgetPin: this.handleSubmit,
        data: this.formGroup?.get?.('email')?.value,
        menu: 'KONTAK',
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      this.hideAndShowPopup(true);
      if (data?.succeed) {
        this.changeContact();
      }
    });
  };

  async changeContact() {
    this.modalSuccess = null;
    this.disabledClose = true;
    this.hideAndShowPopup(true);
    this.errorMessage = '';
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload: any = {
      idProfilDpa,
      email: this.formGroup.get('email')?.value,
    };
    await this.store.dispatch(ChangeContact({ payload }));

    this.contactResponse$.subscribe(
      (res) => {
        if (res?.code === '01') {
          this.hideAndShowPopup(true);
          this.handleOpenSuccessModal();
        }
        this.disabledClose = false;
      },
      (err) => {
        this.hideAndShowPopup(true);
        this.disabledClose = false;
      }
    );
    this.contactInteractRes$.subscribe((res) => {
      if (res.type === InteractionType.FAILED) this.errorMessage = res.error!;
    });
  }

  public async handleSubmit(
    data: any = null,
    id: any = null,
    isSecondRequest: boolean = false
  ) {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const otpPayload: RequestOtpDto = {
      idProfilDpa,
      noHpEmail: this.formGroup?.get?.('email')?.value || data,
      method: 'EMAIL',
      menu: 'KONTAK',
    };

    await this.store.dispatch(RequestOtp({ payload: otpPayload }));
    if (isSecondRequest) return;
    this.handleOpenOtpModal();
  }

  hideAndShowPopup = (value: boolean) => {
    this.isShow = value;
  };

  getIsModalShow = (): boolean => {
    if (this.screenSizeService.isMobileResolution()) {
      return true;
    } else {
      return this.isShow;
    }
  };
}
