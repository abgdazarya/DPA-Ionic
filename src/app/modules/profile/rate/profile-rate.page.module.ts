import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonIconComponentModule } from '@components/common';
import { ProfileRateSucceedModalModule } from '@components/profile';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { ProfileRatePage } from './profile-rate.page';

@NgModule({
  declarations: [ProfileRatePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    AppCommonIconComponentModule,

    ProfileRateSucceedModalModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProfileRatePage,
      },
    ]),
  ],
})
export class ProfileRatePageModule {}
