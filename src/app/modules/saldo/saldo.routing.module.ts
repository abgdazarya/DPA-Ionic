import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaldoPage } from './saldo.page';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

const routes: Routes = [
  {
    path: '',
    component: SaldoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), WaFloatingButtonModule],
  exports: [RouterModule],
})
export class SaldoRoutingModule {}
