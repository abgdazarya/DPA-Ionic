import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./index/index.page.module').then(
            (m) => m.InvestasiIndexPageModule
          ),
      },
      {
        path: ':idLaporanInvestasi',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.InvestasiDetailPageModule
          ),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.InvestasiDetailPageModule
          ),
      },
    ]),
  ],
})
export class InvestasiModule {}
