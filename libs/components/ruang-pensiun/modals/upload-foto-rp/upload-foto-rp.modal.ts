import { Component, Input, OnInit } from '@angular/core';
import {
  UbahEmailFormController,
} from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ProfileRepository } from '@stores/profile';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'upload-foto-rp-modal',
  templateUrl: './upload-foto-rp.modal.html',
  providers: [
    UbahEmailFormController,
    AuthRepository,
    AuthInteractionRepository,
    ProfileRepository,
  ],
})
export class UploadFotoRpModal implements OnInit {
  @Input() getAttachment: any | null | undefined = undefined;
  @Input() index: any | null | undefined = undefined;

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
