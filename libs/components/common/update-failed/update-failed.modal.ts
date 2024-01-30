import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'update-failed-modal',
  templateUrl: './update-failed.modal.html',
})
export class UpdateFailedModal {
  @Input() type: string | undefined = 'email';
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public screenSizeService: ScreenSizeService
  ) {}

  public async handleClose() {
    await this.modalCtrl.dismiss({ succeed: true });
  }
}
