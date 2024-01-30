import { Component, OnInit, Input } from '@angular/core';
import { ChangeContact, UbahEmailFormController } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ProfileRepository } from '@stores/profile';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ContentPromo } from '@controllers/menu';
import { ContentsDataShareMedsos } from 'libs/components/common/share-media/share-media-list.component';
@Component({
  selector: 'share-media-modal',
  templateUrl: './share-media.modal.html',
  styleUrls: ['share-media.modal.scss'],
  providers: [
    UbahEmailFormController,
    AuthRepository,
    AuthInteractionRepository,
    ProfileRepository,
    SocialSharing,
  ],
})
export class ShareMediaModal implements OnInit {
  @Input() promo: ContentPromo & any = {};
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {}

  public handleClose = async () => {
    await this.modalCtrl.dismiss({});
  };

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  getContentPromo = (): ContentsDataShareMedsos => {
    return {
      title: this.promo.judul,
      banner: this.promo.banner,
      link: this.promo.linkPromosi || window.location.href,
      text: this.promo.detailPromo,
      header: this.promo.namaKategori,
    };
  };
}
