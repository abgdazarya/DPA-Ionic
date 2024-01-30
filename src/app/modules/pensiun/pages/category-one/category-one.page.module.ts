import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonFeatureNotAvailableComponentModule,
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { MenuPipesModule } from '@controllers/menu';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { CategoryOnePage } from './category-one.page';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { PensiunPageService } from '../pensiun-page.service';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [CategoryOnePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,
    AppCommonFeatureNotAvailableComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    ProfileHeaderComponentModule,
    CommonAlertComponentModule,
    MenuPipesModule,
    TransformersModule,

    RouterModule.forChild([
      {
        path: '',
        component: CategoryOnePage,
      },
    ]),
  ],
  providers: [PensiunPageService]
})
export class PensiunCategoryOnePageModule {}
