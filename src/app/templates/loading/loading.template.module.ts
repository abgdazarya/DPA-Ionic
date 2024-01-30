import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AppLoadingTemplate } from './loading.template';

export const routes: Routes = [];
@NgModule({
  declarations: [AppLoadingTemplate],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: AppLoadingTemplate,
        children: routes,
      },
    ]),
  ],
})
export class AppLoadingTemplateModule {}
