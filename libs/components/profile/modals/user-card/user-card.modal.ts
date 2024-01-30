import { Component, Input } from '@angular/core';
import { KartuPesertaData } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { decryptContent } from '@shared';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'profile-user-card-modal',
  templateUrl: './user-card.modal.html',
})
export class ProfileUserCardModal {
  isProduction:boolean = false;
  @Input() kartuPesertaData: KartuPesertaData | null | undefined = undefined;
  constructor(private modalCtrl: ModalController) {
    this.isProduction = environment.production;
  }

  public async handleClose() {
    await this.modalCtrl.dismiss();
  }

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  public decryptNoPes(noPes: string | undefined | null) {
    return decryptContent(<string>noPes);
  }

  public async handleSelectMethod() {
    await this.modalCtrl.dismiss({ selected: true });
  }
  getDate = (date: any = '1995-7-6'): string => {
    if (!date) return '-';
    return dayjs(date).format('DD-MMM-YYYY');
  };
}
