import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WaFloatingButton } from './wa-floating-button.component';
import { AppCommonIconComponentModule } from '../../icon/module';

@NgModule({
  declarations: [WaFloatingButton],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [WaFloatingButton],
})
export class WaFloatingButtonModule {}
