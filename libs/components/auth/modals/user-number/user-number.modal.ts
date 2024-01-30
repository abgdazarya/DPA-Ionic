import { Component, Input, OnInit } from '@angular/core';
import { NoPesertaData } from '@controllers/auth';
import { ModalController } from '@ionic/angular';
import { convertEntries, decryptContent } from '@shared';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'auth-user-number-modal',
  templateUrl: './user-number.modal.html',
  styleUrls: ['./user-number.modal.scss'],
})
export class AuthUserNumberModal implements OnInit {
  @Input()
  public noPesertaData: NoPesertaData[] = [];
  // public noPesertaData: NoPesertaData[] = [
  //   convertEntries({
  //     ID_ACCOUNT: 'ACC000000002',
  //     NO_PESERTA: '55667788',
  //     NAMA_PESERTA: 'Michael Pradana',
  //     STATUS_PESERTA: 'AKTIF',
  //     UMUR: 20,
  //     GAJI: 2500000,
  //     MASA_KERJA: 1,
  //     NAMA_PERUSAHAAN: 'MTRAG0000002',
  //   }),
  //   convertEntries({
  //     ID_ACCOUNT: 'ACC000000003',
  //     NO_PESERTA: '99001122',
  //     NAMA_PESERTA: 'Michael Pradana',
  //     STATUS_PESERTA: 'PENSIUNAN',
  //     UMUR: 20,
  //     GAJI: 2500000,
  //     MASA_KERJA: 1,
  //     NAMA_PERUSAHAAN: 'MTRAG0000002',
  //   }),
  // ];

  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {}

  public decryptNoPes(noPes: string | undefined | null) {
    return decryptContent(<string>noPes);
  }

  public async close() {
    await this.modalCtrl.dismiss();
  }

  public async handleSelectNoPeserta(noPeserta: NoPesertaData) {
    await this.modalCtrl.dismiss({ noPeserta });
  }

  public async handleAddUser() {
    await this.modalCtrl.dismiss({ added: true });
  }
}
