import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AlertComponent } from './alert.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [AlertComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [AlertComponent],
})
export class CommonAlertComponentModule {}
