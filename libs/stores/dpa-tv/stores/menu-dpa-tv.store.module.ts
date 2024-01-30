import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuDpaTvReducer } from '../reducers/menu-dpa-tv.reducer';
import { MenuDpaTvControllersModule } from '@controllers/menu-dpa-tv';

@NgModule({
  imports: [
    CommonModule,
    MenuDpaTvControllersModule,
    StoreModule.forFeature('menuDpaTv', menuDpaTvReducer),
  ],
})
export class MenuDpaTvStoreModule {}
