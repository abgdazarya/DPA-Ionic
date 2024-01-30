import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppCommonIconComponentModule } from '../icon/module';
import { AppCommonButtonComponentModule } from '../button/module';
import { CommonPaginationComponent } from './pagination.component';

@NgModule({
  declarations: [CommonPaginationComponent],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [CommonPaginationComponent],
})
export class AppCommonPaginationComponentModule {}
