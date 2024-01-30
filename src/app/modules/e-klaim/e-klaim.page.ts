import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EKlaimEmptyModalComponent } from './components/e-klaim-empty-modal/e-klaim-empty-modal.component';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-e-klaim',
  templateUrl: './e-klaim.page.html',
  styleUrls: ['./e-klaim.page.scss'],
})
export class EKlaimPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    public templateService: AppMainTemplateService
  ) {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('hidden md:hidden');
  }

  ngOnInit() {}

  async trackEKlaim() {
    const modal = await this.modalCtrl.create({
      component: EKlaimEmptyModalComponent,
      backdropDismiss: false,
    });
    modal.present();
  }
}
