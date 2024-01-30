import { NgModule } from '@angular/core';
import { HomeControllersModule } from '@controllers/home';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from '../reducers/home.reducer';

@NgModule({
  imports: [HomeControllersModule, StoreModule.forFeature('home', homeReducer)],
})
export class HomeStoreModule {}
