import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AstraHubPage } from './astra-hub.page';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

const routes: Routes = [
  {
    path: '',
    component: AstraHubPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), WaFloatingButtonModule],
  exports: [RouterModule],
})
export class AstraHubRoutingModule {}
