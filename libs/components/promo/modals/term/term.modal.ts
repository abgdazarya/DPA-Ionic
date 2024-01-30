import { Component } from '@angular/core';
import { DetailProfile } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
@Component({
  selector: 'promo-term-modal',
  templateUrl: './term.modal.html',
})
export class PromoTermModal {
  public isTermInfo: boolean = false;
  public userInfo: DetailProfile | any;
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

  onClickHere = () => {
    this.isTermInfo = !this.isTermInfo;
  };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.isTermInfo = false;
  }
}
