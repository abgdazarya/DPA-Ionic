import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuAstramagazineInteractionReducer } from '../reducers/menu-astramagazine.interaction.reducer';
import { MenuAstramagazineControllersModule } from '@controllers/menu-astramagazine';

@NgModule({
  imports: [
    CommonModule,
    MenuAstramagazineControllersModule,
    StoreModule.forFeature(
      'menuAstramagazineInteraction',
      menuAstramagazineInteractionReducer
    ),
  ],
})
export class MenuAstramagazineInteractionStoreModule {}
