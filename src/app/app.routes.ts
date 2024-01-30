import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./templates/main/main.template.module').then(
        (m) => m.AppMainTemplateModule
      ),
  },

  {
    path: 'loading',
    loadChildren: () =>
      import('./templates/loading/loading.template.module').then(
        (m) => m.AppLoadingTemplateModule
      ),
  },
  // {
  //   path: '',
  //   redirectTo: 'authentication',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
