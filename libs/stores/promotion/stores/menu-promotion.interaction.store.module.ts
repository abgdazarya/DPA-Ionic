import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { menuPromotionInteractionReducer } from '../reducers/menu-promotion.interaction.reducer';
import { MenuPromotionControllersModule } from '@controllers/menu-promotion';

@NgModule({
  imports: [
    CommonModule,
    MenuPromotionControllersModule,
    StoreModule.forFeature(
      'menuPromotionInteraction',
      menuPromotionInteractionReducer
    ),
  ],
})
export class MenuPromotionInteractionStoreModule {}
