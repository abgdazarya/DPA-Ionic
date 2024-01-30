import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { homeInteractionReducer } from '../reducers/home.interaction.reducer';
import { HomeControllersModule } from '@controllers/home';

@NgModule({
  imports: [
    CommonModule,
    HomeControllersModule,
    StoreModule.forFeature('homeInteraction', homeInteractionReducer),
  ],
})
export class HomeInteractionStoreModule {}
