import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authInteractionReducer } from '../reducers/auth.interaction.reducer';
import { AuthControllersModule } from '@controllers/auth';

@NgModule({
  imports: [
    CommonModule,
    AuthControllersModule,
    StoreModule.forFeature('authInteraction', authInteractionReducer),
  ],
})
export class AuthInteractionStoreModule {}
