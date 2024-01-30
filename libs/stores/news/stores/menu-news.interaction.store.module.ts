import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuNewsInteractionReducer } from '../reducers/menu-news.interaction.reducer';
import { MenuNewsControllersModule } from '@controllers/menu-news';

@NgModule({
  imports: [
    CommonModule,
    MenuNewsControllersModule,
    StoreModule.forFeature('menuNewsInteraction', menuNewsInteractionReducer),
  ],
})
export class MenuNewsInteractionStoreModule {}
