import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromoBiodataFormModal } from './biodata-form.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
} from '@stores/menu-promotion';

@NgModule({
  declarations: [PromoBiodataFormModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonIconComponentModule,
    ProfileHeaderComponentModule,
  ],
  exports: [PromoBiodataFormModal],
  providers: [MenuPromotionInteractionRepository, MenuPromotionRepository],
})
export class PromoBiodataFormModalModule {}
