import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffect } from './effects/profile.effect';
import { ProfileMasterService } from './services/profile-master.service';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [EffectsModule.forFeature([ProfileEffect])],
  providers: [ProfileService, ProfileMasterService],
})
export class ProfileControllersModule {}
