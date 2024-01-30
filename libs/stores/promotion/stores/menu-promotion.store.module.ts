import { NgModule } from '@angular/core';
import { MenuPromotionControllersModule } from '@controllers/menu-promotion';
import { StoreModule } from '@ngrx/store';
import { menuPromotionReducer } from '../reducers/menu-promotion.reducer';

@NgModule({
  imports: [
    MenuPromotionControllersModule,
    StoreModule.forFeature('menuPromotion', menuPromotionReducer),
  ],
})
export class MenuPromotionStoreModule {}
