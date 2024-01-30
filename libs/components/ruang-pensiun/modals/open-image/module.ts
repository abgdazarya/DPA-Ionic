import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OpenImageModal } from './open-image.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';

@NgModule({
  declarations: [OpenImageModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    HeaderSecondComponent,
  ],
  exports: [OpenImageModal],
})
export class OpenImageModalModule {}
