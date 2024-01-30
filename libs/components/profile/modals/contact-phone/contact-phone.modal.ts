import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthOtpModal, AuthVerificationMethodModal } from '@components/auth';
import {
  RequestOtp,
  RequestOtpData,
  RequestOtpDto,
  RequestOtpInteractionReset,
} from '@controllers/auth';
import {
  ChangeContact,
  ChangeContactData,
  ChangeContactInteractionReset,
  DetailProfile,
  UbahHpFormController,
} from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { log } from 'console';
import { UpdateSucceedModal } from 'libs/components/common/update-succeed/update-succeed.modal';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'profile-contact-phone-modal',
  templateUrl: './contact-phone.modal.html',
  providers: [
    UbahHpFormController,
    AuthRepository,
    AuthInteractionRepository,
    ProfileRepository,
  ],
})
export class ProfileContactPhoneModal {
  @Input() detailUser: DetailProfile | null | undefined = undefined;
  public formGroup: FormGroup;
  public requestOtpRes$: Observable<
    DataResponse<RequestOtpData> | undefined | null
  >;

  public requestOtpInteractRes$: Observable<InteractionState>;
  public contactResponse$: Observable<
    DataResponse<ChangeContactData> | undefined | null
  >;

  public isError$: Observable<string | any>;
  public isErrorOtp$: Observable<string | any>;
  public isLoadingOtp$: Observable<boolean | any>;

  private isShow: boolean = true;
  constructor(
    private modalCtrl: ModalController,
    formController: UbahHpFormController,
    private store: Store,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    private profileRepo: ProfileRepository,
    private profileRepoInteraction: ProfileInteractionRepository,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService
  ) {
    this.formGroup = formController.create();
    this.requestOtpRes$ = this.authRepo.getRequestOtp$();
    this.requestOtpInteractRes$ =
      this.authInteractRepo.getRequestOtpInteraction$();
    this.contactResponse$ = this.profileRepo.changeContact$();
    this.isError$ = this.profileRepoInteraction
      .changeContactInteraction$()
      .pipe(map((e) => e.error));
    this.isErrorOtp$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((e) => e.error));
    this.isLoadingOtp$ = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((e) => e.isLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(ChangeContactInteractionReset({ response: {} }));
    this.store.dispatch(RequestOtpInteractionReset({ response: {} }));
    if (this.detailUser?.noHp) {
      this.formGroup.get('hp')?.setValue(this.detailUser?.noHp);
    }
  }

  public handleClose = async () => {
    await this.modalCtrl.dismiss();
  };

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  async handleOpenSuccessModal() {
    this.modalCtrl.dismiss({ success: true });
    const modal = await this.modalCtrl.create({
      component: UpdateSucceedModal,
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
      componentProps: {
        type: 'phone',
      },
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {});
  }

  async handleOpenOtpModal(type: string = 'SMS') {
    const modal = await this.modalCtrl.create({
      component: AuthOtpModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        value: this.formGroup.get('hp')?.value,
        menu: 'KONTAK',
        type: type,
        data: type,
        requestOptForgetPin: this.requestOtpSms,
      },
    });
    await modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (!this.screenSizeService.isMobileNativeResolution()) {
        this.hideAndShowPopup(true);
      }
      if (data?.succeed) {
        this.changeContact();
      }
    });
  }

  private subsSontactResponse: any = null;
  async changeContact() {
    if (this.subsSontactResponse) {
      this.subsSontactResponse.unsubscribe();
      this.subsSontactResponse = null;
    }
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload: any = {
      idProfilDpa,
      noHp: this.formGroup.get('hp')?.value,
    };
    await this.store.dispatch(ChangeContactInteractionReset({ response: {} }));
    await this.store.dispatch(ChangeContact({ payload }));

    this.subsSontactResponse = await this.contactResponse$.subscribe((res) => {
      if (res?.code === '01') {
        if (!this.screenSizeService.isMobileNativeResolution()) {
          this.modalCtrl.dismiss({});
        }
        this.handleOpenSuccessModal();
      }
    });
  }

  showVerificationMethod = async () => {
    const modal = await this.modalCtrl.create({
      component: AuthVerificationMethodModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        number: this.formGroup.get('hp')?.value,
      },
    });
    await modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data?.method) {
        this.requestOtpSms(data?.method);
      }
    });
  };

  private subsRequestOtp: any = null;
  requestOtpSms = async (
    type: string = 'SMS',
    id: any = null,
    isSecondReq: boolean = false
  ) => {
    if (this.subsRequestOtp) {
      this.subsRequestOtp.unsubscribe();
      this.subsRequestOtp = null;
    }
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const otpPayload: RequestOtpDto = {
      idProfilDpa,
      noHpEmail: this.formGroup.get('hp')?.value,
      method: type,
      menu: 'KONTAK',
    };
    await this.store.dispatch(RequestOtpInteractionReset({ response: {} }));
    await this.store.dispatch(RequestOtp({ payload: otpPayload }));
    this.subsRequestOtp = await this.requestOtpInteractRes$.subscribe((e) => {
      if (e.type == InteractionType.SUCCEED) {
        if (isSecondReq) return;
        if (!this.screenSizeService.isMobileNativeResolution()) {
          this.hideAndShowPopup(false);
        }
        this.handleOpenOtpModal(type);
      }
    });
  };

  public async handleSubmit() {
    this.showVerificationMethod();
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

  public isReady = (status: any) => status;

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
