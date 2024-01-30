import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuDpaTvInteractionReducer } from '../reducers/menu-dpa-tv.interaction.reducer';
import { MenuDpaTvControllersModule } from '@controllers/menu-dpa-tv';

@NgModule({
  imports: [
    CommonModule,
    MenuDpaTvControllersModule,
    StoreModule.forFeature('menuDpaTvInteraction', menuDpaTvInteractionReducer),
  ],
})
export class MenuDpaTvInteractionStoreModule {}
