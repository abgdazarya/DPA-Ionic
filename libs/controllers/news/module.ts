import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MenuNewsEffect } from './effects/menu-news.effect';
import { MenuNewsService } from './services/menu-news.service';
import { MenuPublicNewsService } from './services/menu-public-news.service';

@NgModule({
  imports: [EffectsModule.forFeature([MenuNewsEffect])],
  providers: [MenuNewsService, MenuPublicNewsService],
})
export class MenuNewsControllersModule {}
