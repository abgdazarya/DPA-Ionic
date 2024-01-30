import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./index/index.page.module').then(
            (m) => m.PromotionIndexPageModule
          ),
      },
      {
        path: 'type/:idType',
        loadChildren: () =>
          import('./index/index.page.module').then(
            (m) => m.PromotionIndexPageModule
          ),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.PromotionDetailPageModule
          ),
      },
      {
        path: ':idPromosi',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.PromotionDetailPageModule
          ),
      },
    ]),
  ],
})
export class PromotionModule {}
