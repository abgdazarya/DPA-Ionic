import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DpaTvShareModal } from './share.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { ShareMediaListModule } from 'libs/components/common/share-media/module';

@NgModule({
  declarations: [DpaTvShareModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    ShareMediaListModule,
  ],
  exports: [DpaTvShareModal],
})
export class AppDpaTvShareModalModule {}
