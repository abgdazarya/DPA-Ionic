import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'index',
      },
      {
        path: 'index',
        loadChildren: () =>
          import('./index/index.page.module').then(
            (m) => m.NewsIndexPageModule
          ),
      },

      {
        path: ':idBeritaDpa',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.NewsDetailPageModule
          ),
      },
    ]),
  ],
})
export class NewsModule {}
