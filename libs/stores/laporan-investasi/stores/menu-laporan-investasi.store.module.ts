import { NgModule } from '@angular/core';
import { MenuLaporanInvestasiControllersModule } from '@controllers/menu-laporan-investasi';
import { StoreModule } from '@ngrx/store';
import { menuLaporanInvestasiReducer } from '../reducers/menu-laporan-investasi.reducer';

@NgModule({
  imports: [
    MenuLaporanInvestasiControllersModule,
    StoreModule.forFeature('menuLaporanInvestasi', menuLaporanInvestasiReducer),
  ],
})
export class MenuLaporanInvestasiStoreModule {}
