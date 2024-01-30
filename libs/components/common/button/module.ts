import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonButtonComponent } from './button.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [CommonButtonComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [CommonButtonComponent],
})
export class AppCommonButtonComponentModule {}
