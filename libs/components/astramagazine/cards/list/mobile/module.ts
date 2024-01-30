import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AstramagazineListMobileCard } from './astramagazine-list-mobile.card';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';

@NgModule({
  declarations: [AstramagazineListMobileCard],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    TransformersModule,
  ],
  exports: [AstramagazineListMobileCard],
})
export class AppAstramagazineListMobileCardModule {}
