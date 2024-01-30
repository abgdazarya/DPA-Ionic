import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [HeaderComponent],
})
export class CommonHeaderComponentModule {}
