import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AppAuthenticationPage } from './authentication.page';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';

export const routes: Routes = [];
@NgModule({
  declarations: [AppAuthenticationPage],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    RouterModule.forChild([
      {
        path: '',
        component: AppAuthenticationPage,
        children: routes,
      },
    ]),
  ],
})
export class AppAuthenticationPageModule {}
