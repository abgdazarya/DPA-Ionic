import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EKlaimPage } from './e-klaim.page';
import { EKlaimRoutingModule } from './e-klaim.routing.module';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AjukanComponent } from './pages/ajukan/ajukan.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { CaraMengajukanComponent } from './pages/cara-mengajukan/cara-mengajukan.component';
import { FormDownloadComponent } from './pages/form-download/form-download.component';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { EklaimAjukanService } from 'libs/controllers/e-klaim/services/e-klaim-ajukan.service';
import { EklaimTrackService } from 'libs/controllers/e-klaim/services/e-klaim-track.service';
import { EklaimLoginService } from 'libs/controllers/e-klaim/services/e-klaim-login.service';

@NgModule({
  declarations: [
    EKlaimPage,
    TrackingComponent,
    AjukanComponent,
    CaraMengajukanComponent,
    FormDownloadComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    EKlaimRoutingModule,
    HeaderSecondComponent,
    CommonHeaderComponentModule,
    CommonFooterComponentModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    WaFloatingButtonModule,
  ],
  providers: [ProfileRepository, ProfileInteractionRepository, EklaimAjukanService, EklaimTrackService, EklaimLoginService],
})
export class EKlaimModule {}
