import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromoBannerModal } from './banner.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';

@NgModule({
  declarations: [PromoBannerModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [PromoBannerModal],
})
export class PromoBannerModalModule {}
