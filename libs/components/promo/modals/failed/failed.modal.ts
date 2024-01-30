import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'promo-failed-modal',
  templateUrl: './failed.modal.html',
})
export class PromoFailedModal {
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

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
