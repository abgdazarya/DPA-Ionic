import { NgModule } from '@angular/core';
import { AuthControllersModule } from '@controllers/auth';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../reducers/auth.reducer';

@NgModule({
  imports: [AuthControllersModule, StoreModule.forFeature('auth', authReducer)],
})
export class AuthStoreModule {}
