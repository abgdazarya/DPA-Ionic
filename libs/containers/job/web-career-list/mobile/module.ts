import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppJobWebCareerListWebItemModule,
  AppJobWebCareerListMobileItemModule,
} from '@components/job';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuJobInteractionStoreModule,
  MenuJobStoreModule,
} from '@stores/menu-job';
import { WebCareerListPartMobile } from './job-web-career-list.part';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';

@NgModule({
  declarations: [WebCareerListPartMobile],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppJobWebCareerListWebItemModule,
    AppJobWebCareerListMobileItemModule,
    TransformersModule,

    MenuJobStoreModule,
    MenuJobInteractionStoreModule,
  ],
  exports: [WebCareerListPartMobile],
})
export class WebCareerListPartMobileModule {}
