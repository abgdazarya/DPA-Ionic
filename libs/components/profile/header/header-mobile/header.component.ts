import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { StorageService } from 'libs/services/common/storage.service';
interface ModalTheme {
  modal: string;
  leftIcon: string;
  text: string;
  rightIcon: string;
  iconColor: string;
}
@Component({
  selector: 'profile-header-component',
  templateUrl: './header.component.html',
  providers: [ProfileRepository, ProfileInteractionRepository, StorageService],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() headerTitle: string = 'Welcome';
  @Input() onBack?: void | any = undefined;
  @Input() rightBtn?: void | any = undefined;
  @Input() rightBtnText?: string | any = undefined;
  @Input() rightIcon?: string | any = undefined;
  @Input() theme?: string | any = 'normal';

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onClosePopup(): void {
    if (this.onBack) {
      this.onBack();
    }
  }

  onRightBtnClick(): void {
    if (this.rightBtn) {
      this.rightBtn();
    }
  }

  onClickBack(): void {
    this.location.back();
  }

  getThemplate = (): ModalTheme => {
    const theme: any = {
      normal: {
        modal: 'h-md-header flex !bg-white w-full animation-all',
        leftIcon: 'flex justify-end cursor-pointer',
        iconColor: 'w-6 h-6 text-neutral-700',
        text: 'text-center text-h7 text-700 pl-4',
        rightIcon: '',
      },
      transparent: {
        modal: 'h-md-header flex  w-full !bg-transparent animation-all',
        leftIcon: 'flex justify-end cursor-pointer !text-white',
        text: 'text-center text-h7 text-white pl-4',
        rightIcon: 'flex justify-end cursor-pointer !text-white',
        iconColor: 'w-6 h-6 !text-white',
      },
    };
    return theme[this.theme] || theme['normal'];
  };
}
