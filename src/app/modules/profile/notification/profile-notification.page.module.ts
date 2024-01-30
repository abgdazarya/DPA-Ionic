import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  CommonHeaderComponentModule,
  CommonFooterComponentModule,
  AppCommonIconComponentModule,
  AppCommonPaginationComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';

import { SwiperModule } from 'swiper/angular';

import { ProfileNotificationPage } from './profile-notification.page';
import { FormsModule } from '@angular/forms';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { ButtonSecondaryHeaderDirective } from 'libs/containers/common/header/common-header.container';

@NgModule({
  declarations: [ProfileNotificationPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,
    AppCommonPaginationComponentModule,
    AppCommonButtonComponentModule,
    ProfileHeaderComponentModule,

    ButtonSecondaryHeaderDirective,

    RouterModule.forChild([
      {
        path: '',
        component: ProfileNotificationPage,
      },
    ]),
  ],
})
export class ProfileNotificationPageModule {}
