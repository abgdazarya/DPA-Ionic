import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EKlaimPage } from './e-klaim.page';
import { AjukanComponent } from './pages/ajukan/ajukan.component';
import { CaraMengajukanComponent } from './pages/cara-mengajukan/cara-mengajukan.component';
import { FormDownloadComponent } from './pages/form-download/form-download.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

const routes: Routes = [
  {
    path: '',
    component: EKlaimPage,
  },
  {
    path: 'tracking',
    component: TrackingComponent,
  },
  {
    path: 'ajukan',
    component: AjukanComponent,
  },
  {
    path: 'cara-mengajukan',
    component: CaraMengajukanComponent,
  },
  {
    path: 'form-download',
    component: FormDownloadComponent,
  },
];

@NgModule({
  imports: [WaFloatingButtonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EKlaimRoutingModule {}
