import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunPostinganModal } from './postingan.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { RuangPensiunPostinganFormModule } from '../../forms/postingan/module';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';

@NgModule({
  declarations: [RuangPensiunPostinganModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    RuangPensiunPostinganFormModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
  ],
  exports: [RuangPensiunPostinganModal],
})
export class RuangPensiunPostinganModalModule {}
