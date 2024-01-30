import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DetailProfile,
  EditKerabat,
  EditKerabatData,
  EditProfile,
  EditProfileInteractionReset,
  KerabatFormController,
  UserDetail,
} from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponseArray,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { IOption } from 'libs/components/common/select/option.type';
import { ProfileService } from 'libs/controllers/profile/services/profile.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { filter, map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'profile-relative-contact-modal',
  templateUrl: './relative-contact.modal.html',
  providers: [
    KerabatFormController,
    ProfileRepository,
    ProfileInteractionRepository,
  ],
})
export class ProfileRelativeContactModal {
  public formGroup: FormGroup;

  @Input() kerabatData: DetailProfile | null | undefined = undefined;
  @Input() datahubunganKerabat: any = [];
  public response$: Observable<
    DataResponse<EditKerabatData> | undefined | null
  >;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public interactionType = InteractionType;
  public errorResponse$: Observable<string | undefined | null>;
  public successResponse$: Observable<string | undefined | null>;
  public successMessage: string = '';
  public isDisabledButton: boolean = false;

  private subscribtions = new Subscription();
  constructor(
    private modalCtrl: ModalController,
    formController: KerabatFormController,
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    private profileService: ProfileService
  ) {
    this.formGroup = formController.create();
    this.response$ = this.profileRepository.editKerabat$();

    this.interactionResponse$ =
      this.profileInteractionRepository.editKerabatInteraction$();
    this.errorResponse$ = this.profileInteractionRepository
      .editKerabatInteraction$()
      .pipe(map((res) => res?.error));
    this.successResponse$ = this.profileInteractionRepository
      .editKerabatInteraction$()
      .pipe(map((res) => res?.success));
  }

  ionViewWillEnter() {
    this.changeType();
    this.formGroup
      .get('namaKerabat')
      ?.setValue(this.kerabatData?.namaKerabat || '');

    let idx = this.datahubunganKerabat.findIndex(
      (e: any) => e.ID_HUBUNGAN_KERABAT == this.kerabatData?.hubunganKerabat
    );
    if (idx == -1) {
      this.formGroup.get('hubunganKerabat')?.setValue('0000');

      this.formGroup
        .get('hubunganKerabatLainnya')
        ?.setValue(this.kerabatData?.hubunganKerabat || '');
    } else {
      this.formGroup
        .get('hubunganKerabat')
        ?.setValue(this.kerabatData?.hubunganKerabat || '');
    }
    this.formGroup
      .get('noHpKerabat')
      ?.setValue(this.kerabatData?.noHpKerabat || '');
  }

  public handleClose = async () => {
    await this.modalCtrl.dismiss();
  };

  changeType() {
    this.formGroup.valueChanges.subscribe((res) => {
      if (res.hubunganKerabat != '0000') {
        this.formGroup.get('hubunganKerabatLainnya')?.clearValidators();
        this.formGroup.get('hubunganKerabatLainnya')?.updateValueAndValidity();
      }
    });
  }

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  public async handleSelectMethod() {
    await this.modalCtrl.dismiss({ selected: true });
  }

  generateOptionHubungan = (arr: any): IOption[] => {
    const temp: IOption[] = [];
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        temp.push({
          id: item.ID_HUBUNGAN_KERABAT || '',
          label: item.HUBUNGAN_KERABAT || '',
        });
      }
    }
    return temp;
  };

  async submit() {
    this.isDisabledButton = true;
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    let hubungan =
      this.formGroup.get('hubunganKerabat')?.value == '0000'
        ? this.formGroup.get('hubunganKerabatLainnya')?.value
        : this.formGroup.get('hubunganKerabat')?.value;
    const payload = {
      // idProfilDpa,
      namaKerabat: this.formGroup.get('namaKerabat')?.value || '',
      hubunganKerabat: hubungan || '',
      noHpKerabat: this.formGroup.get('noHpKerabat')?.value || '',
      tempatLahir: this.kerabatData?.kotaKabupaten,
    };
    this.store.dispatch(EditKerabat({ payload }));
    const interaction = this.interactionResponse$
      .pipe(
        filter((res) => !!res),
        tap((interaction: InteractionState | null | undefined) => {
          if (interaction!.type === InteractionType.SUCCEED) {
            const payload = {};
            if (!idProfilDpa) return;
            this.store.dispatch(UserDetail({ payload }));
            // this.modalCtrl.dismiss(true);
            this.handleOpenSuccessModal();
          }
          if (
            interaction!.type === InteractionType.FAILED ||
            interaction!.type === InteractionType.SUCCEED
          ) {
            this.resetState();
          }
        })
      )
      .subscribe();
    this.subscribtions.add(interaction);
  }
  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  resetState() {
    setTimeout(() => {
      this.store.dispatch(
        EditProfileInteractionReset({
          response: INITIAL_INTERACTION_STATE,
        })
      );
    }, 6000);
  }

  async handleOpenSuccessModal() {
    this.successMessage = 'Data berhasil disimpan';
    setTimeout(() => {
      this.isDisabledButton = false;
      this.successMessage = '';
      this.modalCtrl.dismiss({ success: true });
    }, 3000);
    // this.modalCtrl.dismiss({ success: true });
    // const modal = await this.modalCtrl.create({
    //   component: UpdateSucceedModal,
    //   cssClass: this.screenSizeService.isMobileResolution()
    //     ? 'modal-web ion-background-transparent'
    //     : 'modal-web ion-background-white',
    //   componentProps: {
    //     type: 'kerabat',
    //   },
    // });
    // await modal.present();
    // modal.onDidDismiss().then(({ data }) => {});
  }
}
