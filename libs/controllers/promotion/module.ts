import { NgModule } from '@angular/core';
import { MenuHttpClient, MenuPublicHttpClient } from '@clients';
import { EffectsModule } from '@ngrx/effects';
import { MenuPromotionEffect } from './effects/menu-promotion.effect';
import { MenuPromotionService } from './services/menu-promotion.service';
import { MenuPublicPromotionService } from './services/menu-public-promotion.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuPromotionEffect])],
  providers: [
    MenuPromotionService,
    MenuPublicPromotionService,
    // MenuHttpClient,
    // MenuPublicHttpClient,
  ],
})
export class MenuPromotionControllersModule {}
