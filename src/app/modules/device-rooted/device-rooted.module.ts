import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DeviceRootedPage } from './device-rooted.page';
import { RouterModule } from '@angular/router';
import { AppCommonDeviceRootedDetectionsComponentModule } from '@components/common';

@NgModule({
  declarations: [DeviceRootedPage],
  imports: [
    CommonModule,
    IonicModule,
    AppCommonDeviceRootedDetectionsComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: DeviceRootedPage,
      },
    ]),
  ],
  providers: [],
})
export class DeviceRootedModule {}
