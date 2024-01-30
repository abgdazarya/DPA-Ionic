import { NgModule } from '@angular/core';
import { ProfileControllersModule } from '@controllers/profile';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from '../reducers/profile.reducer';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ProfileControllersModule,
    StoreModule.forFeature('profile', profileReducer),
  ],
})
export class ProfileStoreModule {}
