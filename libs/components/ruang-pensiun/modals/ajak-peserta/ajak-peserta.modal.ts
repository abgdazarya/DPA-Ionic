import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'ajak-peserta-modal',
  templateUrl: './ajak-peserta.modal.html',
})
export class AjakPesertaModal {
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

  public async handleClose() {
    await this.modalCtrl.dismiss();
  }

  public handleBack = async () => {
    await this.modalCtrl.dismiss({ back: true });
  };

  public async handleSubmit() {
    await this.modalCtrl.dismiss({ submitted: true });
  }
}
