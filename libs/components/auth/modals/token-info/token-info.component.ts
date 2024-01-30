import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { BottomSheetComponent } from '../../../common/bottom-sheet/bottom-sheet.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { CommonModule } from '@angular/common';
import { AppCommonIconComponentModule } from '@components/common';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss'],
  standalone: true,
  imports: [BottomSheetComponent, IonicModule, AppCommonIconComponentModule, CommonModule],
})
export class TokenInfoComponent {
  @Input() renderText: string = 'Data email Akun yang Anda pilih berbeda dengan Email yang terdaftar di Profile';
  @Input() renderSubText: string | undefined = undefined;
  constructor(
    public screenSizeService: ScreenSizeService,
    private modalCtrl: ModalController
  ) {}

  onDismiss = () => {
    this.modalCtrl.dismiss({ submitted: true });
  };
}
