import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonLoadingFullComponent } from './loading-full.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [CommonLoadingFullComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [CommonLoadingFullComponent],
})
export class AppCommonLoadingFullComponentModule {}
