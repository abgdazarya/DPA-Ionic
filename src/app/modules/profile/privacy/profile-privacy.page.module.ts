import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfilePrivacyPage } from './profile-privacy.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfilePrivacyPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProfilePrivacyPage,
      },
    ]),
  ],
})
export class ProfilePrivacyPageModule {}
