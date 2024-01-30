import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonIconComponent } from './icon.component';

@NgModule({
  declarations: [CommonIconComponent],
  imports: [IonicModule, CommonModule],
  exports: [CommonIconComponent],
})
export class AppCommonIconComponentModule {}
