import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonBreadcrumbComponent } from './breadcrumb.component';
import { AppCommonIconComponentModule } from '../icon/module';

@NgModule({
  declarations: [CommonBreadcrumbComponent],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [CommonBreadcrumbComponent],
})
export class AppCommonBreadcrumbComponentModule {}
