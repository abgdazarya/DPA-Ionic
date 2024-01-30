import { Component, OnInit } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-e-klaim-empty-modal',
  templateUrl: './e-klaim-empty-modal.component.html',
  styleUrls: ['./e-klaim-empty-modal.component.scss'],
  standalone: true,
  imports: [AppCommonIconComponentModule, IonicModule],
})
export class EKlaimEmptyModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  public async handleClose() {
    await this.modalCtrl.dismiss();
  }
}
