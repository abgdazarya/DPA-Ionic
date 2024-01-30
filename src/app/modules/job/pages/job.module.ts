import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@controllers/auth';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./index/index.page.module').then((m) => m.JobIndexPageModule),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.JobDetailPageModule
          ),
        // canActivate: [AuthGuard],
      },
      {
        path: ':idJob',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.JobDetailPageModule
          ),
        // canActivate: [AuthGuard],
      },
      // {
      //   path: 'detail',
      //   loadChildren: () =>
      //     import('./detail/detail.page.module').then(
      //       (m) => m.NewsDetailPageModule
      //     ),
      // },
      // {
      //   path: 'astramagz',
      //   loadChildren: () =>
      //     import('./astramagz/astramagz.page.module').then(
      //       (m) => m.NewsAstramagzPageModule
      //     ),
      // },
    ]),
  ],
})
export class JobModule {}
