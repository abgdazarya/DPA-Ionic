import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from './effects/home.effect';
import { HomeService } from './services/home.service';

@NgModule({
  imports: [EffectsModule.forFeature([HomeEffect])],
  providers: [HomeService],
})
export class HomeControllersModule {}
