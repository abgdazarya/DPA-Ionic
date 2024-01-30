import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthOtpModalModule } from '@components/auth';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import {
  ProfileContactEmailModalModule,
  ProfileContactPhoneModalModule,
  ProfileOcrModalModule,
  ProfileRelativeContactModalModule,
} from '@components/profile';
import { IonicModule } from '@ionic/angular';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { SwiperModule } from 'swiper/angular';
import { ProfileBioPage } from './profile-bio.page';
import { ProfileUploadFotoModalModule } from 'libs/components/profile/modals/upload-foto/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { DeleteAccountModalModule } from 'libs/components/profile/modals/detele-account/module';

@NgModule({
  declarations: [ProfileBioPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    CommonAlertComponentModule,
    AppCommonIconComponentModule,

    ProfileOcrModalModule,
    ProfileRelativeContactModalModule,
    ProfileContactEmailModalModule,
    ProfileContactPhoneModalModule,

    AuthOtpModalModule,
    TransformersModule,
    ProfileUploadFotoModalModule,

    DeleteAccountModalModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProfileBioPage,
      },
    ]),
  ],
})
export class ProfileBioPageModule {}
