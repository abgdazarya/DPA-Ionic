import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { profileInteractionReducer } from '../reducers/profile.interaction.reducer';
import { ProfileControllersModule } from '@controllers/profile';

@NgModule({
  imports: [
    CommonModule,
    ProfileControllersModule,
    StoreModule.forFeature('profileInteraction', profileInteractionReducer),
  ],
})
export class ProfileInteractionStoreModule {}
