import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonDeviceRootedDetectionsComponent } from './device-rooted-detections.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [CommonDeviceRootedDetectionsComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [CommonDeviceRootedDetectionsComponent],
})
export class AppCommonDeviceRootedDetectionsComponentModule {}
