import { Component, OnInit } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { ModalController, NavParams } from '@ionic/angular';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';

@Component({
  selector: 'app-rate-directions-modal',
  templateUrl: './rate-directions-modal.component.html',
  styleUrls: ['./rate-directions-modal.component.scss'],
  standalone: true,
  imports: [AppCommonIconComponentModule, AppCommonButtonComponentModule],
})
export class RateDirectionsModalComponent implements OnInit {
  title:any = '';
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.title = navParams.get('title');
  }

  ngOnInit() {}
  handleClose() {
    this.modalCtrl.dismiss();
  }
  choose(option: string) {
    this.modalCtrl.dismiss(option);
  }
}
