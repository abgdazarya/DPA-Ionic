import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuLaporanInvestasiInteractionReducer } from '../reducers/menu-laporan-investasi.interaction.reducer';
import { MenuLaporanInvestasiControllersModule } from '@controllers/menu-laporan-investasi';

@NgModule({
  imports: [
    CommonModule,
    MenuLaporanInvestasiControllersModule,
    StoreModule.forFeature(
      'menuLaporanInvestasiInteraction',
      menuLaporanInvestasiInteractionReducer
    ),
  ],
})
export class MenuLaporanInvestasiInteractionStoreModule {}
