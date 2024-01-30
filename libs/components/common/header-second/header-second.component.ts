import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AppCommonIconComponentModule } from '@components/common';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-header-second',
  templateUrl: './header-second.component.html',
  styleUrls: ['./header-second.component.scss'],
  standalone: true,
  imports: [IonicModule, AppCommonIconComponentModule, CommonModule],
})
export class HeaderSecondComponent {
  @Input() title: string = '';
  @Input() transparent: boolean = false;
  @Input() showClose: boolean = true;
  @Output() onBackClick = new EventEmitter();
  @Output() onCloseClick = new EventEmitter();
  @Input() isModal: boolean = false;
  @Input() darkColor: boolean = false;
  @Input() isShowBack: boolean = false;
  constructor(
    private location: Location,
    private modalCtrl: ModalController,
    public router: Router,
    public screenSize: ScreenSizeService
  ) {}

  handleBack() {
    if (!!this.isModal) {
      this.onBackClick.emit();
      this.modalCtrl.dismiss();
      return;
    }
    // this.location.back();
    const arrLink = this.router.url?.split('/');
    arrLink.pop();
    if (arrLink.length <= 1) arrLink[0] = '/';
    const newLink = arrLink.join('/');
    this.router
      .navigate([newLink], { onSameUrlNavigation: 'reload' })
      .then(() => {
        this.location.replaceState(newLink);
      });
  }

  handleClose() {
    if (!!this.isModal) {
      this.modalCtrl.dismiss();
      return;
    }
  }
}
