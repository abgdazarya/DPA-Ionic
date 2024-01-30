import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  ButtonSecondaryHeaderDirective,
  CommonHeaderContainer,
} from './common-header.container';
import {
  AppCommonButtonComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';

@NgModule({
  declarations: [CommonHeaderContainer],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,

    ButtonSecondaryHeaderDirective,
  ],
  exports: [CommonHeaderContainer],
})
export class AppCommonHeaderContainerModule {}
