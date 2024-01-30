import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuJobInteractionReducer } from '../reducers/menu-job.interaction.reducer';
import { MenuJobControllersModule } from '@controllers/menu-job';

@NgModule({
  imports: [
    CommonModule,
    MenuJobControllersModule,
    StoreModule.forFeature('menuJobInteraction', menuJobInteractionReducer),
  ],
})
export class MenuJobInteractionStoreModule {}
