import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'success-post-modal',
  templateUrl: './success-post.modal.html',
})
export class SuccessPostModal {

  title:any = '';
  desc:any = '';
  status:any = '';
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private navParams: NavParams
  ) {
    this.title = navParams.get('title');
    this.desc = navParams.get('desc');
    this.status = navParams.get('status');
  }

  public async tutupModal() {
    await this.modalCtrl.dismiss({ submitted: true });
  }
}
