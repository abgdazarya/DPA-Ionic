import { NgModule } from '@angular/core';
import { EklaimAjukanService } from './services/e-klaim-ajukan.service';
import { EklaimTrackService } from './services/e-klaim-track.service';
import { EklaimLoginService } from './services/e-klaim-login.service';

@NgModule({
  providers: [EklaimAjukanService, EklaimTrackService, EklaimLoginService],
})
export class MenuNewsControllersModule {}
