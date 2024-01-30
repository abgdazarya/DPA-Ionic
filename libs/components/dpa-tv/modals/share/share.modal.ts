import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContentsDataShareMedsos } from 'libs/components/common/share-media/share-media-list.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-dpa-tv-share-modal',
  templateUrl: './share.modal.html',
})
export class DpaTvShareModal {
  @Input() public content!: any & ContentsDataShareMedsos;

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
