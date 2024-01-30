import { NgModule } from '@angular/core';
import { MenuAstramagazineControllersModule } from '@controllers/menu-astramagazine';
import { StoreModule } from '@ngrx/store';
import { menuAstramagazineReducer } from '../reducers/menu-astramagazine.reducer';

@NgModule({
  imports: [
    MenuAstramagazineControllersModule,
    StoreModule.forFeature('menuAstramagazine', menuAstramagazineReducer),
  ],
})
export class MenuAstramagazineStoreModule {}
