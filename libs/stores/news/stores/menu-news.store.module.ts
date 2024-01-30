import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuNewsControllersModule } from '@controllers/menu-news';
import { StoreModule } from '@ngrx/store';
import { menuNewsReducer } from '../reducers/menu-news.reducer';

@NgModule({
  imports: [
    CommonModule,
    MenuNewsControllersModule,
    StoreModule.forFeature('menuNews', menuNewsReducer),
  ],
})
export class MenuNewsStoreModule {}
