import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'profile-rate-succeed-modal',
  templateUrl: './rate-succeed.modal.html',
})
export class ProfileRateSucceedModal {
  @Input() rate!: number;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public screenSizeService: ScreenSizeService
  ) {}

  public async handleClose() {
    await this.modalCtrl.dismiss();
    // this.router.navigate(['/profile'])
  }

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  public async handleSubmit() {
    await this.modalCtrl.dismiss({ submitted: true });
  }
}
