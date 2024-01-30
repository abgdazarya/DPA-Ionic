import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./index/index.page.module').then(
            (m) => m.PensiunIndexPageModule
          ),
      },
      {
        path: 'activityOne',
        loadChildren: () =>
          import('./activity-one/activity-one.page.module').then(
            (m) => m.PensiunActivityOnePageModule
          ),
      },
      {
        path: 'transactionOne',
        loadChildren: () =>
          import('./transaction-one/transaction-one.page.module').then(
            (m) => m.PensiunTransactionOnePageModule
          ),
      },
      {
        path: 'friendOne',
        loadChildren: () =>
          import('./friend-one/friend-one.page.module').then(
            (m) => m.PensiunFriendOnePageModule
          ),
      },
      {
        path: 'categoryOne',
        loadChildren: () =>
          import('./category-one/category-one.page.module').then(
            (m) => m.PensiunCategoryOnePageModule
          ),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./detail/detail.page.module').then(
            (m) => m.PensiunDetailPageModule
          ),
      },
    ]),
  ],
})
export class PensiunModule {}
