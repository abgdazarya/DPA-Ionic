import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MenuDpaTvEffect } from './effects/menu-dpa-tv.effect';
import { MenuDpaTvService } from './services/menu-dpa-tv.service';
import { MenuPublicDpaTvService } from './services/menu-public-dpa-tv.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuDpaTvEffect])],
  providers: [MenuDpaTvService, MenuPublicDpaTvService],
})
export class MenuDpaTvControllersModule {}
