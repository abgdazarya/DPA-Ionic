import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MenuLaporanInvestasiEffect } from './effects/menu-laporan-investasi.effect';
import { MenuLaporanInvestasiService } from './services/menu-laporan-investasi.service';
import { MenuPublicLaporanInvestasiService } from './services/menu-public-laporan-investasi.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuLaporanInvestasiEffect])],
  providers: [MenuLaporanInvestasiService, MenuPublicLaporanInvestasiService],
})
export class MenuLaporanInvestasiControllersModule {}
