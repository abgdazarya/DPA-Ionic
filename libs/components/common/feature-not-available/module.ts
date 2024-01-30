import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonFeatureNotAvailableComponent } from './feature-not-available.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [CommonFeatureNotAvailableComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [CommonFeatureNotAvailableComponent],
})
export class AppCommonFeatureNotAvailableComponentModule {}
