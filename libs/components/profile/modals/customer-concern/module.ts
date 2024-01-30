import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AppCommonButtonComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { HomeInteractionStoreModule, HomeStoreModule } from '@stores/home';
import { CustomerConcernModal } from './customer-concern.modal';

@NgModule({
  declarations: [CustomerConcernModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    HomeStoreModule,
    HomeInteractionStoreModule,
  ],
  exports: [CustomerConcernModal],
})
export class CustomerConcernModalModule {}
