import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileUserCardModal } from './user-card.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';

@NgModule({
  declarations: [ProfileUserCardModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    ProfileHeaderComponentModule,
  ],
  exports: [ProfileUserCardModal],
})
export class ProfileUserCardModalModule {}
