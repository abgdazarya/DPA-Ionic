import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'promo-banner-modal',
  templateUrl: './banner.modal.html',
})
export class PromoBannerModal {
  @Input() bannerUri: string | undefined = '';
  constructor(private modalCtrl: ModalController) {}

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
