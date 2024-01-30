import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NotFoundPage } from './not-found.page';
import { RouterModule } from '@angular/router';
import { AppCommonFeatureNotAvailableComponentModule } from '@components/common';

@NgModule({
  declarations: [NotFoundPage],
  imports: [
    CommonModule,
    IonicModule,
    AppCommonFeatureNotAvailableComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: NotFoundPage,
      },
    ]),
  ],
  providers: [],
})
export class NotFoundModule {}
