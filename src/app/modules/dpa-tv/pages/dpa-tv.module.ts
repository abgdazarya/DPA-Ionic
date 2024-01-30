import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./index/index.page.module').then(
            (m) => m.DpaTvIndexPageModule
          ),
      },
    ]),
  ],
})
export class DpaTvModule {}
