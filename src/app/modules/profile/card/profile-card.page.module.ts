import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  CommonHeaderComponentModule,
  CommonFooterComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';

import { ProfileUserCardModalModule } from '@components/profile';

import { SwiperModule } from 'swiper/angular';

import { ProfileCardPage } from './profile-card.page';
import { FormsModule } from '@angular/forms';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';

@NgModule({
  declarations: [ProfileCardPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    ProfileUserCardModalModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProfileCardPage,
      },
    ]),
  ],
})
export class ProfileCardPageModule {}
