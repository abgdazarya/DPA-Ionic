import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'pilih-kategori-modal',
  templateUrl: './pilih-kategori.modal.html',
  styleUrls: ['./pilih-kategori.modal.scss'],
})
export class PilihKategoriModal implements OnInit {
  @Input()
  public kategoriPensiun:any = [];

  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {
  }

  ngOnInit(): void {}

  public async close() {
    await this.modalCtrl.dismiss();
  }

  public async handleSelectKategori(idKategori:any) {
    await this.modalCtrl.dismiss(idKategori);
  }

  public async handleAddUser() {
    await this.modalCtrl.dismiss({ added: true });
  }
}
