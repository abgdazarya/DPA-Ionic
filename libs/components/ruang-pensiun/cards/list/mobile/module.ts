import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunListMobileCard } from './ruang-pensiun-list-mobile.card';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { MenuPipesModule } from '@controllers/menu';

@NgModule({
  declarations: [RuangPensiunListMobileCard],
  imports: [
    IonicModule,
    CommonModule,
    MenuPipesModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    TransformersModule,
  ],
  exports: [RuangPensiunListMobileCard],
})
export class AppRuangPensiunListMobileCardModule {}
