import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunListWebCard } from './ruang-pensiun-list-web.card';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { MenuPipesModule } from '@controllers/menu';

@NgModule({
  declarations: [RuangPensiunListWebCard],
  imports: [
    IonicModule,
    CommonModule,
    TransformersModule,
    MenuPipesModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [RuangPensiunListWebCard],
})
export class AppRuangPensiunListWebCardModule {}
