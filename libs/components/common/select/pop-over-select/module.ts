import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopOverSelect } from './pop-over-select.component';

@NgModule({
  declarations: [PopOverSelect],
  imports: [IonicModule, CommonModule],
  exports: [PopOverSelect],
})
export class PopOverSelectModule {}
