import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'auth-verification-method-modal',
  templateUrl: './verification-method.modal.html',
})
export class AuthVerificationMethodModal {
  @Input() title: string = 'Pilih Metode Verifikasi';
  @Input() number: string | undefined | null;

  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

  public handleClose = async () => {
    await this.modalCtrl.dismiss();
  };

  public handleBack = async () => {
    await this.modalCtrl.dismiss({ back: true, value: this.number });
  };

  public async handleSelectMethod(method: string) {
    await this.modalCtrl.dismiss({ method, value: this.number });
  }
}
