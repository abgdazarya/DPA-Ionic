import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MenuJobEffect } from './effects/menu-job.effect';
import { MenuJobService } from './services/menu-job.service';
import { MenuPublicJobService } from './services/menu-public-job.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuJobEffect])],
  providers: [MenuJobService, MenuPublicJobService],
})
export class MenuJobControllersModule {}
