import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffect } from './effects/menu.effect';
import { MenuService } from './services/menu.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuEffect])],
  providers: [
    MenuService,
    // MenuHttpClient,
    // MenuInterceptorProvider,
    // MenuPublicHttpClient,
    // MenuPublicInterceptorProvider,
  ],
})
export class MenuControllersModule {}
