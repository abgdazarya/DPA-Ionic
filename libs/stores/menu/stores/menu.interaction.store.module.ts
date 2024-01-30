import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuInteractionReducer } from '../reducers/menu.interaction.reducer';
import { MenuControllersModule } from '@controllers/menu';

@NgModule({
  imports: [
    CommonModule,
    MenuControllersModule,
    StoreModule.forFeature('menuInteraction', menuInteractionReducer),
  ],
})
export class MenuInteractionStoreModule {}
