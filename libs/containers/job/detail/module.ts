import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonButtonComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { JobDetailContainer } from './job-detail.container';

@NgModule({
  declarations: [JobDetailContainer],
  imports: [IonicModule, CommonModule, AppCommonButtonComponentModule],
  exports: [JobDetailContainer],
})
export class AppJobDetailContainerModule {}
