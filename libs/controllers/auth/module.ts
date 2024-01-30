import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './effects/auth.effect';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [EffectsModule.forFeature([AuthEffect])],
  providers: [AuthService],
})
export class AuthControllersModule {}
