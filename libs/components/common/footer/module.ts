import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer.component';
import { AppCommonIconComponentModule } from '../icon/module';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import {
  MenuDpaTvInteractionStoreModule,
  MenuDpaTvStoreModule,
} from '@stores/menu-dpa-tv';
import { AppNewsFooterWebItemModule } from '@components/news';

import { AppDpaTvFooterWebItemModule } from 'libs/components/dpa-tv/items/footer/web/module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,

    AppNewsFooterWebItemModule,
    AppDpaTvFooterWebItemModule,

    // DpaTvItemModule,
    ProfileStoreModule,
    ProfileInteractionStoreModule,

    MenuStoreModule,
    MenuInteractionStoreModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,

    MenuDpaTvStoreModule,
    MenuDpaTvInteractionStoreModule,
  ],
  exports: [FooterComponent],
})
export class CommonFooterComponentModule {}
