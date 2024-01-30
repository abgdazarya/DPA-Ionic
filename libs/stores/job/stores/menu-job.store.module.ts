import { NgModule } from '@angular/core';
import { MenuJobControllersModule } from '@controllers/menu-job';
import { StoreModule } from '@ngrx/store';
import { menuJobReducer } from '../reducers/menu-job.reducer';

@NgModule({
  imports: [
    MenuJobControllersModule,
    StoreModule.forFeature('menuJob', menuJobReducer),
  ],
})
export class MenuJobStoreModule {}
