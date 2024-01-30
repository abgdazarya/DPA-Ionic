import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopUpUserComponent } from './pop-up-user.component';
import { AppCommonIconComponentModule } from '../icon/module';
import { AppCommonButtonComponentModule } from '../button/module';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';
import { ButtonSecondaryHeaderDirective } from 'libs/containers/common/header/common-header.container';

@NgModule({
  declarations: [PopUpUserComponent],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,

    ButtonSecondaryHeaderDirective,
  ],
  exports: [PopUpUserComponent],
})
export class PopUpUserComponentModule {}
