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
            (m) => m.AstramagazineIndexPageModule
          ),
      },
    ]),
  ],
})
export class AstramagazineModule {}
