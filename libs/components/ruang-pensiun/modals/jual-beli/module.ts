import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunJualBeliModal } from './jual-beli.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { RuangPensiunJualBeliFormModule } from '../../forms/jual-beli/module';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';

@NgModule({
  declarations: [RuangPensiunJualBeliModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    RuangPensiunJualBeliFormModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
  ],
  exports: [RuangPensiunJualBeliModal],
})
export class RuangPensiunJualBeliModalModule {}
