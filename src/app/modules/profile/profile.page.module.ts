import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  CommonHeaderComponentModule,
  CommonFooterComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';

import { SwiperModule } from 'swiper/angular';

import { ProfilePage } from './profile.page';
import { FormsModule } from '@angular/forms';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AuthInteractionStoreModule } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { ToggleComponent } from 'libs/components/common/toogle/toogle.component';

function routeMap(): Routes {
  const homeBaseRoute: Array<Route> =
    new ScreenSizeService().isMobileResolution()
      ? []
      : [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'bio',
          },
        ];

  return [
    {
      path: '',
      component: ProfilePage,
      children: [
        ...homeBaseRoute,
        {
          path: 'bio',
          loadChildren: () =>
            import('./bio/profile-bio.page.module').then(
              (m) => m.ProfileBioPageModule
            ),
        },
        {
          path: 'card',
          loadChildren: () =>
            import('./card/profile-card.page.module').then(
              (m) => m.ProfileCardPageModule
            ),
        },
        {
          path: 'notification',
          loadChildren: () =>
            import('./notification/profile-notification.page.module').then(
              (m) => m.ProfileNotificationPageModule
            ),
        },
        {
          path: 'help',
          loadChildren: () =>
            import('./help/profile-help.page.module').then(
              (m) => m.ProfileHelpPageModule
            ),
        },
        {
          path: 'rate',
          loadChildren: () =>
            import('./rate/profile-rate.page.module').then(
              (m) => m.ProfileRatePageModule
            ),
        },
        {
          path: 'settings',
          loadChildren: () =>
            import('./settings/profile-settings.page.module').then(
              (m) => m.ProfileSettingsPageModule
            ),
        },
        {
          path: 'privacy',
          loadChildren: () =>
            import('./privacy/profile-privacy.page.module').then(
              (m) => m.ProfilePrivacyPageModule
            ),
        },
      ],
    },
  ];
}
@NgModule({
  declarations: [ProfilePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,
    TransformersModule,
    CommonAlertComponentModule,
    AuthInteractionStoreModule,
    ProfileHeaderComponentModule,
    WaFloatingButtonModule,
    ToggleComponent,
    RouterModule.forChild(routeMap()),
    // RouterModule.forChild(() => ),
  ],
})
export class ProfilePageModule {}
