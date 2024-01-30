import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'open-image-modal',
  templateUrl: './open-image.modal.html',
})
export class OpenImageModal {

  url:any = '';
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private navParams: NavParams
  ) {
    this.url = navParams.get('url');
  }

  public async tutupModal() {
    await this.modalCtrl.dismiss({ submitted: true });
  }
}
