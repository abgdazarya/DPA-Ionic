import { NgModule } from '@angular/core';
import {
  MasterHttpClient,
  MenuHttpClient,
  MenuPublicHttpClient,
} from '@clients';
import { EffectsModule } from '@ngrx/effects';
import { MenuAstramagazineEffect } from './effects/menu-astramagazine.effect';
import { MenuAstramagazineService } from './services/menu-astramagazine.service';
import { MenuMasterAstramagazineService } from './services/menu-master-astramagazine.service';
import { MenuPublicAstramagazineService } from './services/menu-public-astramagazine.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuAstramagazineEffect])],
  providers: [
    MenuAstramagazineService,
    MenuPublicAstramagazineService,
    MenuMasterAstramagazineService,
    MenuHttpClient,
    MenuPublicHttpClient,
    MasterHttpClient,
  ],
})
export class MenuAstramagazineControllersModule {}
