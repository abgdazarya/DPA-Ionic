import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PromoBannerModal } from 'libs/components/promo/modals/banner/banner.modal';

@Component({
  template: ``,
})
export class PromotionBannerCardBase {
  @Input() public bannerUri!: string;
  @Input() public loading!: boolean;
  @Input() public nativeClass!: string;

  public bannerStatus: 'onload' | 'error' | 'succeed' | null = null;

  constructor(private modalCtrl: ModalController) {}

  public handleChangeStatus(): void {}

  parseText(text: string | null = '') {
    let arr: Array<any> = text?.toString?.()?.split?.(' ') || [];
    if (arr.length >= 10) {
      arr = arr.slice(0, 9);
      arr.push('...');
      return arr?.join?.(' ');
    }
    return text;
  }

  async handleOpenModal() {
    const modal = await this.modalCtrl.create({
      component: PromoBannerModal,
      cssClass: 'modal-web ion-background-transparent banner-modal-x ',
      componentProps: {
        bannerUri: this.bannerUri,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({}) => {});
  }
}
