import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'delete-data-modal',
  templateUrl: './delete-data.modal.html',
})
export class DeleteDataModal {

  title:any = '';
  desc:any = '';
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private navParams: NavParams
  ) {
    this.title = navParams.get('title');
    this.desc = navParams.get('desc');
  }

  public async tutupModal(status:any) {
    await this.modalCtrl.dismiss(status);
  }
}
