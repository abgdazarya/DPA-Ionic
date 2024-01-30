import { NgModule } from '@angular/core';
import { MenuControllersModule } from '@controllers/menu';
import { StoreModule } from '@ngrx/store';
import { menuReducer } from '../reducers/menu.reducer';

@NgModule({
  imports: [MenuControllersModule, StoreModule.forFeature('menu', menuReducer)],
})
export class MenuStoreModule {}
