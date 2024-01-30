import { Component, Input, OnInit } from '@angular/core';
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
import { DataResponse, InteractionState } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ProfileRepository } from '@stores/profile';
import { ChangeContactData } from 'libs/controllers/profile/models/change-contact';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { StorageService } from 'libs/services/common/storage.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'profile-upload-foto-modal',
  templateUrl: './upload-foto.modal.html',
  providers: [
    UbahEmailFormController,
    AuthRepository,
    AuthInteractionRepository,
    ProfileRepository,
  ],
})
export class ProfileUploadFotoModal implements OnInit {
  // @Input() detailData: DetailProfile | null | undefined = undefined;
  @Input() getAttachment: any | null | undefined = undefined;

  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {}

  public handleClose = async () => {
    await this.modalCtrl.dismiss({});
  };

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }
}
