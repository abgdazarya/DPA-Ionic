import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { ContentPage } from './content.page';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';

@NgModule({
  declarations: [ContentPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,

    RouterModule.forChild([
      {
        path: '',
        component: ContentPage,
      },
    ]),
  ],
})
export class PensiunContentPageModule {}
