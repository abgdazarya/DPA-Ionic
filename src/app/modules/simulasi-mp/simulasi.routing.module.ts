import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailSimulasiMpComponent } from './components/detail-simulasi-mp/detail-simulasi-mp.component';
import { SimulasiMpPage } from './simulasi-mp.page';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

const routes: Routes = [
  {
    path: '',
    component: SimulasiMpPage,
  },
  {
    path: 'detail',
    component: DetailSimulasiMpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), WaFloatingButtonModule],
  exports: [RouterModule],
})
export class SimulasiMpRoutingModule {}
