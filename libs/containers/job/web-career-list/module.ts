import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WebCareerListContainer } from './job-web-career-list.container';
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
import { WebCareerListPartWebModule } from './web/module';
import { WebCareerListPartMobileModule } from './mobile/module';

@NgModule({
  declarations: [WebCareerListContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppJobWebCareerListWebItemModule,
    AppJobWebCareerListMobileItemModule,

    MenuJobStoreModule,
    MenuJobInteractionStoreModule,
    WebCareerListPartWebModule,
    WebCareerListPartMobileModule,
  ],
  exports: [WebCareerListContainer],
})
export class AppJobWebCareerListContainerModule {}
