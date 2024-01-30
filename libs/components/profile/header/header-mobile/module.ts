import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileHeaderComponent } from './header.component';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [ProfileHeaderComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [ProfileHeaderComponent],
})
export class ProfileHeaderComponentModule {}
