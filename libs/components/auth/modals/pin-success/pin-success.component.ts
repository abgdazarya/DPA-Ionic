import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { BottomSheetComponent } from '../../../common/bottom-sheet/bottom-sheet.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-pin-success',
  templateUrl: './pin-success.component.html',
  styleUrls: ['./pin-success.component.scss'],
  standalone: true,
  imports: [BottomSheetComponent, IonicModule],
})
export class PinSuccessComponent {
  constructor(
    public screenSizeService: ScreenSizeService,
    private modalCtrl: ModalController
  ) {}

  onDismiss = () => {
    this.modalCtrl.dismiss({ submitted: true });
  };
}
